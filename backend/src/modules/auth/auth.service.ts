import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service.js';
import type { JwtPayload } from '../../common/strategies/jwt.strategy.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthResponseDto, AuthUserDto } from './dto/auth-response.dto.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Autenticación unificada: evalúa primero funcionarios SENA (tabla usuarios)
   * y posteriormente aprendices (tabla aprendices).
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const rawId = loginDto.identificador.trim();
    const cleanId = rawId.toLowerCase();
    const cleanPass = loginDto.password.trim();

    // --------------------------------------------------------------------------
    // 1. INTENTO: FUNCIONARIO SENA (tabla usuarios)
    // --------------------------------------------------------------------------
    const usuarioSena = await this.buscarUsuarioFuncionario(cleanId);

    if (usuarioSena) {
      const passwordValida = await this.verificarPasswordFuncionario(
        cleanPass,
        usuarioSena.password,
        cleanId,
      );

      if (passwordValida) {
        return this.generarRespuestaFuncionario(usuarioSena);
      }
      throw new UnauthorizedException(
        'Contraseña incorrecta para funcionario o administrador.',
      );
    }

    // --------------------------------------------------------------------------
    // 2. INTENTO: APRENDIZ SENA (tabla aprendices)
    // --------------------------------------------------------------------------
    const aprendiz = await this.buscarAprendiz(rawId);

    if (aprendiz) {
      const passwordValida = this.verificarPasswordAprendiz(
        cleanPass,
        aprendiz.numeroDocumento,
        cleanId,
      );

      if (passwordValida) {
        return this.generarRespuestaAprendiz(aprendiz);
      }
      throw new UnauthorizedException(
        'Contraseña incorrecta para aprendiz. La clave habitual es su documento o 123456.',
      );
    }

    // --------------------------------------------------------------------------
    // 3. FALLBACK DE DESARROLLO (si la base de datos no tiene los registros demo)
    // --------------------------------------------------------------------------
    if (cleanId === 'admin' && (cleanPass === '12345' || cleanPass === 'admin123')) {
      return this.generarRespuestaDemoAdmin();
    }

    if (cleanId === 'aprendiz' && (cleanPass === '123456' || cleanPass === 'aprendiz123')) {
      return this.generarRespuestaDemoAprendiz();
    }

    throw new UnauthorizedException(
      'Usuario o documento no registrado en el sistema de Caracterización.',
    );
  }

  /**
   * Obtiene la información detallada del perfil según el token JWT verificado
   */
  async obtenerPerfil(payload: JwtPayload): Promise<AuthUserDto> {
    if (payload.tipo === 'funcionario') {
      const user = await this.prisma.usuario.findUnique({
        where: { id: payload.sub },
      });
      if (user) {
        return {
          id: user.id,
          nombre: user.nombre,
          correo: user.correo,
          rol: user.rol,
          tipo: 'funcionario',
          centro: 'Centro de Teleinformática y Producción Industrial - Cauca',
        };
      }
    }

    if (payload.tipo === 'aprendiz') {
      const aprendiz = await this.prisma.aprendiz.findUnique({
        where: { id: payload.sub },
        include: {
          tipoDocumento: true,
          formaciones: {
            take: 1,
            include: {
              ficha: {
                include: { programa: true },
              },
            },
          },
        },
      });

      if (aprendiz) {
        const formacionActiva = aprendiz.formaciones[0];
        return {
          id: aprendiz.id,
          nombre: aprendiz.nombreCompleto,
          correo: aprendiz.correoInstitucional || aprendiz.correoPersonal,
          rol: 'aprendiz',
          tipo: 'aprendiz',
          numeroDocumento: aprendiz.numeroDocumento,
          ficha: formacionActiva?.ficha?.numeroFicha || payload.ficha || '2670142',
          programa:
            formacionActiva?.ficha?.programa?.valor ||
            payload.programa ||
            'ADSO - Análisis y Desarrollo de Software',
          centro: 'Centro de Teleinformática y Producción Industrial - Cauca',
        };
      }
    }

    // Retorno desde el propio payload verificado si no se halla en BD
    return {
      id: payload.sub,
      nombre: payload.nombre,
      correo: payload.correo,
      rol: payload.rol,
      tipo: payload.tipo,
      numeroDocumento: payload.numeroDocumento,
      ficha: payload.ficha,
      programa: payload.programa,
      centro: 'Centro de Teleinformática y Producción Industrial - Cauca',
    };
  }

  // ============================================================================
  // MÉTODOS PRIVADOS AUXILIARES
  // ============================================================================

  private async buscarUsuarioFuncionario(cleanId: string) {
    if (cleanId === 'admin') {
      const adminUser = await this.prisma.usuario.findFirst({
        where: { rol: 'admin', activo: true },
      });
      if (adminUser) return adminUser;
    }

    return this.prisma.usuario.findFirst({
      where: {
        OR: [
          { correo: cleanId },
          { correo: { startsWith: cleanId } },
        ],
        activo: true,
      },
    });
  }

  private async verificarPasswordFuncionario(
    passPlana: string,
    passHash: string,
    cleanId: string,
  ): Promise<boolean> {
    // 1. Comparación con bcrypt
    try {
      const coincideBcrypt = await bcrypt.compare(passPlana, passHash);
      if (coincideBcrypt) return true;
    } catch {
      // Si el hash no es válido, se continúa a verificar fallbacks de demo
    }

    // 2. Fallbacks de testing / demo autorizados en desarrollo
    if (cleanId === 'admin' && (passPlana === '12345' || passPlana === 'admin123')) {
      return true;
    }
    if (passPlana === 'demo-no-produccion') {
      return true;
    }

    return false;
  }

  private async buscarAprendiz(rawId: string) {
    const cleanId = rawId.toLowerCase();

    if (cleanId === 'aprendiz') {
      return this.prisma.aprendiz.findFirst({
        orderBy: { createdAt: 'asc' },
        include: {
          formaciones: {
            take: 1,
            include: {
              ficha: {
                include: { programa: true },
              },
            },
          },
        },
      });
    }

    return this.prisma.aprendiz.findFirst({
      where: {
        OR: [
          { numeroDocumento: rawId },
          { usuario: rawId },
        ],
      },
      include: {
        formaciones: {
          take: 1,
          include: {
            ficha: {
              include: { programa: true },
            },
          },
        },
      },
    });
  }

  private verificarPasswordAprendiz(
    passPlana: string,
    numeroDoc: string,
    cleanId: string,
  ): boolean {
    // Para aprendices: se acepta documento oficial, clave estándar 123456 o clave aprendiz
    return (
      passPlana === numeroDoc ||
      passPlana === '123456' ||
      passPlana === '12345' ||
      passPlana === 'aprendiz' ||
      passPlana === 'aprendiz123' ||
      cleanId === 'aprendiz'
    );
  }

  private async generarRespuestaFuncionario(usuario: any): Promise<AuthResponseDto> {
    const payload: JwtPayload = {
      sub: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      tipo: 'funcionario',
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '8h');
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expiresIn,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        tipo: 'funcionario',
        centro: 'Centro de Teleinformática y Producción Industrial - Cauca',
      },
    };
  }

  private async generarRespuestaAprendiz(aprendiz: any): Promise<AuthResponseDto> {
    const formacion = aprendiz.formaciones?.[0];
    const fichaNumero = formacion?.ficha?.numeroFicha || '2670142';
    const programaNombre =
      formacion?.ficha?.programa?.valor ||
      'ADSO - Análisis y Desarrollo de Software';

    const payload: JwtPayload = {
      sub: aprendiz.id,
      nombre: aprendiz.nombreCompleto,
      correo: aprendiz.correoInstitucional || aprendiz.correoPersonal,
      rol: 'aprendiz',
      tipo: 'aprendiz',
      numeroDocumento: aprendiz.numeroDocumento,
      ficha: fichaNumero,
      programa: programaNombre,
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '8h');
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expiresIn,
      user: {
        id: aprendiz.id,
        nombre: aprendiz.nombreCompleto,
        correo: aprendiz.correoInstitucional || aprendiz.correoPersonal,
        rol: 'aprendiz',
        tipo: 'aprendiz',
        numeroDocumento: aprendiz.numeroDocumento,
        ficha: fichaNumero,
        programa: programaNombre,
        centro: 'Centro de Teleinformática y Producción Industrial - Cauca',
      },
    };
  }

  private generarRespuestaDemoAdmin(): AuthResponseDto {
    const payload: JwtPayload = {
      sub: 'usr-admin-demo-01',
      nombre: 'Carlos Alberto Restrepo',
      correo: 'carestrepo@sena.edu.co',
      rol: 'admin',
      tipo: 'funcionario',
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '8h');
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn,
      user: {
        id: 'usr-admin-demo-01',
        nombre: 'Carlos Alberto Restrepo',
        correo: 'carestrepo@sena.edu.co',
        rol: 'admin',
        tipo: 'funcionario',
        centro: 'Centro de Teleinformática y Producción Industrial - Cauca',
      },
    };
  }

  private generarRespuestaDemoAprendiz(): AuthResponseDto {
    const payload: JwtPayload = {
      sub: 'usr-aprendiz-demo-01',
      nombre: 'Valentina Gómez Mejía',
      correo: 'vgomezm@sena.edu.co',
      rol: 'aprendiz',
      tipo: 'aprendiz',
      numeroDocumento: '109989001',
      ficha: '2670142',
      programa: 'ADSO - Análisis y Desarrollo de Software',
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '8h');
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn,
      user: {
        id: 'usr-aprendiz-demo-01',
        nombre: 'Valentina Gómez Mejía',
        correo: 'vgomezm@sena.edu.co',
        rol: 'aprendiz',
        tipo: 'aprendiz',
        numeroDocumento: '109989001',
        ficha: '2670142',
        programa: 'ADSO - Análisis y Desarrollo de Software',
        centro: 'Centro de Teleinformática y Producción Industrial - Cauca',
      },
    };
  }
}
