import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service.js';
import type { JwtPayload } from '../../common/strategies/jwt.strategy.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { UsuarioResponseDto } from './dto/usuario-response.dto.js';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista usuarios del sistema con filtros de búsqueda y rol
   */
  async listar(
    query?: string,
    rol?: string,
    activo?: boolean,
  ): Promise<UsuarioResponseDto[]> {
    const where: any = {};

    if (query && query.trim() !== '') {
      const q = query.trim();
      where.OR = [
        { nombre: { contains: q, mode: 'insensitive' } },
        { correo: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (rol && rol.trim() !== '') {
      where.rol = rol.trim();
    }

    if (activo !== undefined) {
      where.activo = activo;
    }

    return this.prisma.usuario.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        activo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Obtiene un usuario específico por su UUID
   */
  async obtenerPorId(id: string): Promise<UsuarioResponseDto> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        activo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    return usuario;
  }

  /**
   * Crea un nuevo usuario funcionario o administrador con contraseña encriptada
   */
  async crear(
    dto: CreateUsuarioDto,
    currentUser?: JwtPayload,
  ): Promise<UsuarioResponseDto> {
    const correoLimpio = dto.correo.trim().toLowerCase();

    // 1. Validar unicidad del correo electrónico
    const existente = await this.prisma.usuario.findUnique({
      where: { correo: correoLimpio },
    });

    if (existente) {
      throw new ConflictException(
        `Ya existe una cuenta registrada con el correo ${correoLimpio}.`,
      );
    }

    // 2. Hashear la contraseña con bcrypt de forma segura (10 salt rounds)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password.trim(), saltRounds);

    // 3. Crear el usuario en PostgreSQL
    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre.trim(),
        correo: correoLimpio,
        password: passwordHash,
        rol: dto.rol,
        activo: dto.activo !== undefined ? dto.activo : true,
      },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        activo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 4. Registro de auditoría
    await this.registrarAuditoria(
      currentUser?.sub,
      'crear',
      'usuarios',
      `Cuenta creada: ${nuevoUsuario.correo} (rol: ${nuevoUsuario.rol})`,
    );

    this.logger.log(
      `Usuario creado exitosamente: ${nuevoUsuario.correo} (${nuevoUsuario.id})`,
    );

    return nuevoUsuario;
  }

  /**
   * Actualiza los datos de un usuario existente
   */
  async actualizar(
    id: string,
    dto: UpdateUsuarioDto,
    currentUser?: JwtPayload,
  ): Promise<UsuarioResponseDto> {
    const usuarioActual = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuarioActual) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    const dataParaActualizar: any = {};

    if (dto.nombre && dto.nombre.trim() !== '') {
      dataParaActualizar.nombre = dto.nombre.trim();
    }

    if (dto.correo && dto.correo.trim() !== '') {
      const nuevoCorreo = dto.correo.trim().toLowerCase();
      if (nuevoCorreo !== usuarioActual.correo) {
        const correoOcupado = await this.prisma.usuario.findUnique({
          where: { correo: nuevoCorreo },
        });
        if (correoOcupado) {
          throw new ConflictException(
            `El correo ${nuevoCorreo} ya está en uso por otra cuenta.`,
          );
        }
        dataParaActualizar.correo = nuevoCorreo;
      }
    }

    if (dto.password && dto.password.trim() !== '') {
      dataParaActualizar.password = await bcrypt.hash(dto.password.trim(), 10);
    }

    if (dto.rol) {
      dataParaActualizar.rol = dto.rol;
    }

    if (dto.activo !== undefined) {
      dataParaActualizar.activo = dto.activo;
    }

    const usuarioActualizado = await this.prisma.usuario.update({
      where: { id },
      data: dataParaActualizar,
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        activo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await this.registrarAuditoria(
      currentUser?.sub,
      'modificar',
      'usuarios',
      `Cuenta actualizada: ${usuarioActualizado.correo}`,
    );

    return usuarioActualizado;
  }

  /**
   * Activa o desactiva la cuenta de un usuario
   */
  async toggleActivo(
    id: string,
    currentUser?: JwtPayload,
  ): Promise<UsuarioResponseDto> {
    if (currentUser?.sub === id) {
      throw new BadRequestException(
        'Por seguridad, no puedes desactivar tu propia cuenta mientras estás en sesión.',
      );
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    const nuevoEstado = !usuario.activo;

    const actualizado = await this.prisma.usuario.update({
      where: { id },
      data: { activo: nuevoEstado },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        activo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await this.registrarAuditoria(
      currentUser?.sub,
      'modificar',
      'usuarios',
      `Estado cambiado a ${nuevoEstado ? 'ACTIVO' : 'INACTIVO'} para: ${actualizado.correo}`,
    );

    return actualizado;
  }

  /**
   * Elimina un usuario del sistema
   */
  async eliminar(
    id: string,
    currentUser?: JwtPayload,
  ): Promise<{ success: boolean; message: string }> {
    if (currentUser?.sub === id) {
      throw new BadRequestException(
        'Por seguridad, no puedes eliminar tu propia cuenta en sesión.',
      );
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    await this.prisma.usuario.delete({
      where: { id },
    });

    await this.registrarAuditoria(
      currentUser?.sub,
      'eliminar',
      'usuarios',
      `Cuenta eliminada: ${usuario.correo} (rol: ${usuario.rol})`,
    );

    this.logger.log(`Usuario eliminado: ${usuario.correo} (${id})`);

    return {
      success: true,
      message: `Cuenta de ${usuario.nombre} eliminada correctamente.`,
    };
  }

  /**
   * Auxiliar seguro para registrar auditoría sin romper la transacción principal
   */
  private async registrarAuditoria(
    usuarioId?: string | null,
    accion: string = 'consultar',
    tabla: string = 'usuarios',
    detalle?: string,
  ) {
    try {
      await this.prisma.auditoriaAcceso.create({
        data: {
          usuarioId: usuarioId || null,
          accion,
          tabla,
          detalle: detalle || null,
        },
      });
    } catch (err: any) {
      this.logger.warn(`No se pudo registrar auditoría: ${err.message}`);
    }
  }
}
