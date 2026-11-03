import {
  Injectable,
  Logger,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import { CatalogoResolverService } from './services/catalogo-resolver.service.js';
import { CreateCaracterizacionDto } from './dto/create-caracterizacion.dto.js';
import { CaracterizacionResponseDto } from './dto/caracterizacion-response.dto.js';
import { ROLES } from '../../common/constants/roles.constant.js';
import { JwtPayload } from '../../common/strategies/jwt.strategy.js';

@Injectable()
export class CaracterizacionesService {
  private readonly logger = new Logger(CaracterizacionesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly catalogoResolver: CatalogoResolverService,
  ) {}

  /**
   * Crea una caracterización completa dentro de una transacción atómica ($transaction).
   * Mapea todas las respuestas del gestor a las tablas satélite de la BD.
   */
  async crearCaracterizacion(
    dto: CreateCaracterizacionDto,
    user: JwtPayload,
  ): Promise<CaracterizacionResponseDto> {
    // Control de seguridad: Si es un aprendiz autenticado, solo puede caracterizarse a sí mismo
    if (user.rol === ROLES.APRENDIZ && user.numeroDocumento !== dto.numero_documento) {
      throw new ForbiddenException(
        'Acceso denegado: un aprendiz solo puede registrar su propia caracterización',
      );
    }

    const { modulos } = dto;
    const { basica, salud, socioeconomica, formativo } = modulos;

    // --- PRE-RESOLUCIÓN DE CATÁLOGOS (R1 y R7) ---
    // Resuelve antes de entrar a la transacción para fallar rápido en caso de error 422
    const tipoDocumentoId = (await this.catalogoResolver.resolver(
      'tipo_documento',
      basica.tipoDoc,
      'tipoDoc',
    ))!;
    const sexoId = (await this.catalogoResolver.resolver(
      'sexo',
      basica.sexo,
      'sexo',
    ))!;
    const orientacionId =
      basica.orientacion === 'Prefiero no responder'
        ? null
        : await this.catalogoResolver.resolver(
            'orientacion_sexual',
            basica.orientacion,
            'orientacion',
            true,
          );
    const estadoCivilId = (await this.catalogoResolver.resolver(
      'estado_civil',
      basica.estadoCivil,
      'estadoCivil',
    ))!;
    const parentescoAcudienteId = await this.catalogoResolver.resolver(
      'parentesco_acudiente',
      basica.parentesco,
      'parentesco',
      true,
    );
    const ciudadId = (await this.catalogoResolver.resolver(
      'ciudad',
      basica.municipio,
      'municipio',
    ))!;
    const estratoId = (await this.catalogoResolver.resolver(
      'estrato',
      basica.estrato,
      'estrato',
    ))!;

    // Salud
    const epsId = (await this.catalogoResolver.resolver(
      'eps',
      salud.eps,
      'eps',
    ))!;
    const regimenSaludId = (await this.catalogoResolver.resolver(
      'regimen_salud',
      salud.regimenSalud,
      'regimenSalud',
    ))!;
    const sisbenEstadoId = (await this.catalogoResolver.resolver(
      'sisben_estado',
      salud.sisben,
      'sisben',
    ))!;
    const grupoSisbenId = await this.catalogoResolver.resolver(
      'grupo_sisben',
      salud.grupoSisben,
      'grupoSisben',
      true,
    );
    const tipoDiscapacidadId =
      salud.tipoDiscapacidad === 'Ninguna'
        ? null
        : await this.catalogoResolver.resolver(
            'tipo_discapacidad',
            salud.tipoDiscapacidad,
            'tipoDiscapacidad',
            true,
          );
    const metodoAnticonceptivoId =
      salud.utilizaMetodoPlanificacion === 'No' ||
      salud.utilizaMetodoPlanificacion === 'Prefiero no responder'
        ? null
        : await this.catalogoResolver.resolver(
            'metodo_anticonceptivo',
            salud.utilizaMetodoPlanificacion,
            'utilizaMetodoPlanificacion',
            true,
          );

    // Socioeconómica
    const sustentoPrincipalId = (await this.catalogoResolver.resolver(
      'sustento_principal',
      socioeconomica.jefaturaHogar,
      'jefaturaHogar',
    ))!;
    const rangoIngresosId = (await this.catalogoResolver.resolver(
      'rango_ingresos',
      socioeconomica.rangoIngresosMensuales,
      'rangoIngresosMensuales',
    ))!;
    const fuenteIngresosId = (await this.catalogoResolver.resolver(
      'fuente_ingresos',
      socioeconomica.fuenteIngresos,
      'fuenteIngresos',
    ))!;
    const grupoEtnicoId = (await this.catalogoResolver.resolver(
      'grupo_etnico',
      socioeconomica.grupoEtnico,
      'grupoEtnico',
    ))!;
    const apoyoEstadoId = await this.catalogoResolver.resolver(
      'apoyo_estado',
      socioeconomica.apoyosEstatales || 'Ninguno',
      'apoyosEstatales',
      true,
    );

    // Formativo
    const nivelFormacionPrevioId = (await this.catalogoResolver.resolver(
      'nivel_formacion_previo',
      formativo.nivelEducativoPrevio,
      'nivelEducativoPrevio',
    ))!;
    const motivacionId = (await this.catalogoResolver.resolver(
      'motivacion',
      formativo.motivacionIngreso,
      'motivacionIngreso',
    ))!;
    const vacunaCovidId = await this.catalogoResolver.resolver(
      'vacuna_covid',
      formativo.biologico,
      'biologico',
      true,
    );

    // --- REGLAS DE TRANSFORMACIÓN R2, R3, R4, R6 ---
    const toBool = (val?: string | boolean | null): boolean => {
      if (typeof val === 'boolean') return val;
      if (!val) return false;
      const v = val.trim().toLowerCase();
      return v.startsWith('si') || v.startsWith('sí');
    };

    const toNullableBool = (val?: string | null): boolean | null => {
      if (!val) return null;
      const v = val.trim().toLowerCase();
      if (v.includes('no aplica') || v.includes('prefiero no')) return null;
      if (v.startsWith('si') || v.startsWith('sí')) return true;
      if (v.startsWith('no')) return false;
      return null;
    };

    const toInt = (val?: string | number | null, fallback = 0): number => {
      if (typeof val === 'number') return isNaN(val) ? fallback : Math.floor(val);
      if (!val) return fallback;
      const n = parseInt(String(val), 10);
      return isNaN(n) ? fallback : n;
    };

    // Coherencia del trigger fn_se_bandera_coherente en situacion_economica:
    // jefe_hogar y sostiene_hogar DEBEN ser TRUE exactamente cuando sustento es 'El propio aprendiz'
    const esPropioAprendiz =
      socioeconomica.jefaturaHogar.trim().toLowerCase() === 'el propio aprendiz';

    // R3: Gestación y semana de gestación (CHECK: semana_gestacion IS NULL OR en_gestacion = TRUE)
    const enGestacion = toNullableBool(salud.gestacion);
    let semanaGestacion: number | null = null;
    if (enGestacion === true && salud.semanaGestacion) {
      const parsedSemana = toInt(salud.semanaGestacion, 0);
      semanaGestacion = parsedSemana >= 1 && parsedSemana <= 42 ? parsedSemana : null;
    }

    // R4: Dosis (CHECK: dosis IS NULL OR dosis BETWEEN 0 AND 4)
    let dosis: number | null = null;
    if (formativo.dosis != null && String(formativo.dosis).trim() !== '') {
      const parsedDosis = toInt(formativo.dosis, -1);
      dosis = parsedDosis >= 0 && parsedDosis <= 4 ? parsedDosis : null;
    }

    // --- TRANSACCIÓN ATÓMICA ($transaction) ---
    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. Upsert Aprendiz (Datos Básicos)
        const fechaNac = new Date(basica.fechaNac);
        const aprendiz = await tx.aprendiz.upsert({
          where: { numeroDocumento: dto.numero_documento },
          update: {
            nombreCompleto: basica.nombre.trim(),
            tipoDocumentoId,
            fechaNacimiento: fechaNac,
            sexoId,
            seReconoceLgbtiq: toBool(basica.lgbtiq),
            orientacionSexualId: orientacionId,
            estadoCivilId,
            correoPersonal: basica.correoPersonal.trim().toLowerCase(),
            correoInstitucional: basica.correoInst ? basica.correoInst.trim().toLowerCase() : null,
            telefono: basica.telefono ? basica.telefono.trim() : null,
            contactoEmergenciaNombre: basica.acudiente ? basica.acudiente.trim() : null,
            contactoEmergenciaTelefono: basica.telAcudiente ? basica.telAcudiente.trim() : null,
            contactoEmergenciaParentescoId: parentescoAcudienteId,
          },
          create: {
            usuario: dto.numero_documento,
            numeroDocumento: dto.numero_documento,
            nombreCompleto: basica.nombre.trim(),
            tipoDocumentoId,
            fechaNacimiento: fechaNac,
            sexoId,
            seReconoceLgbtiq: toBool(basica.lgbtiq),
            orientacionSexualId: orientacionId,
            estadoCivilId,
            correoPersonal: basica.correoPersonal.trim().toLowerCase(),
            correoInstitucional: basica.correoInst ? basica.correoInst.trim().toLowerCase() : null,
            telefono: basica.telefono ? basica.telefono.trim() : null,
            contactoEmergenciaNombre: basica.acudiente ? basica.acudiente.trim() : null,
            contactoEmergenciaTelefono: basica.telAcudiente ? basica.telAcudiente.trim() : null,
            contactoEmergenciaParentescoId: parentescoAcudienteId,
          },
        });

        // 2. Cálculo de versión: MAX(version) + 1 por aprendiz
        const versionAgg = await tx.caracterizacion.aggregate({
          where: { aprendizId: aprendiz.id },
          _max: { version: true },
        });
        const nuevaVersion = (versionAgg._max.version ?? 0) + 1;

        // 3. Generación del Radicado Oficial con secuencia radicado_seq
        const fechaCaract = dto.fecha ? new Date(dto.fecha) : new Date();
        const anio = fechaCaract.getFullYear();
        let radicado: string;
        try {
          const seq = await tx.$queryRaw<{ nextval: bigint }[]>`SELECT nextval('radicado_seq') AS nextval`;
          radicado = `RAD-SENA-${anio}-${String(Number(seq[0].nextval)).padStart(6, '0')}`;
        } catch {
          const count = await tx.caracterizacion.count();
          radicado = `RAD-SENA-${anio}-${String(count + 1).padStart(6, '0')}`;
        }

        // 4. Creación de Caracterización Cabecera (estado completa)
        const caracterizacion = await tx.caracterizacion.create({
          data: {
            aprendizId: aprendiz.id,
            fecha: fechaCaract,
            version: nuevaVersion,
            estado: 'completa',
            radicado,
          },
        });

        // 5. Localización Geográfica (1:1)
        await tx.localizacion.create({
          data: {
            aprendizId: aprendiz.id,
            caracterizacionId: caracterizacion.id,
            direccion: basica.direccion.trim(),
            ciudadId,
            estratoId,
          },
        });

        // 6. Salud (1:1)
        await tx.salud.create({
          data: {
            aprendizId: aprendiz.id,
            caracterizacionId: caracterizacion.id,
            afiliadoSalud: true,
            epsId,
            regimenSaludId,
            sisbenEstadoId,
            grupoSisbenId,
            discapacidadCertificada: toBool(salud.tieneDiscapacidad),
            presentaDiscapacidad: toBool(salud.tieneDiscapacidad),
            tipoDiscapacidadId,
            enfermedadOtra: toBool(salud.enfermedadCronica)
              ? salud.descripcionEnfermedad || 'Enfermedad crónica reportada'
              : null,
            requiereMedicamento: toBool(salud.tomaMedicamentos),
          },
        });

        // 7. Salud Sexual y Reproductiva (1:1)
        await tx.saludSexualReproductiva.create({
          data: {
            aprendizId: aprendiz.id,
            caracterizacionId: caracterizacion.id,
            enGestacion,
            semanaGestacion,
            enLactancia: toNullableBool(salud.lactancia),
            cabezaFamilia: toBool(salud.madrePadreCabezaFamilia),
            numHijos: toInt(salud.hijosACargo, 0),
            numPersonasHogar: Math.max(
              1,
              toInt(socioeconomica.totalPersonasHogar || salud.totalPersonasHogar, 1),
            ),
            metodoAnticonceptivoId,
          },
        });

        // 8. Situación Económica (1:1)
        await tx.situacionEconomica.create({
          data: {
            aprendizId: aprendiz.id,
            caracterizacionId: caracterizacion.id,
            sustentoPrincipalId,
            jefeHogar: esPropioAprendiz,
            sostieneHogar: esPropioAprendiz,
            personasACargo: toInt(socioeconomica.personasACargo, 0),
            rangoIngresosId,
            fuenteIngresosId,
            grupoEtnicoId,
          },
        });

        // 9. Perfil Ocupacional (1:1)
        await tx.perfilOcupacional.create({
          data: {
            aprendizId: aprendiz.id,
            caracterizacionId: caracterizacion.id,
            nivelFormacionPrevioId,
            formacionPreviaSena: toBool(formativo.formacionPreviaSena),
            motivacionId,
            trabajaActualmente: toBool(socioeconomica.trabajaActualmente),
          },
        });

        // 10. Covid-19 (1:1)
        await tx.covid19.create({
          data: {
            aprendizId: aprendiz.id,
            caracterizacionId: caracterizacion.id,
            vacunado: toBool(formativo.vacunado),
            vacunaId: vacunaCovidId,
            dosis,
            esquemaCompleto: toBool(formativo.esquemaCompleto),
          },
        });

        // 11. Apoyo del Estado (Multivalor)
        if (apoyoEstadoId) {
          await tx.apoyoEstado.create({
            data: {
              aprendizId: aprendiz.id,
              caracterizacionId: caracterizacion.id,
              tipoApoyoId: apoyoEstadoId,
              detalleOtra: socioeconomica.apoyosEstatales?.includes('Otro')
                ? socioeconomica.apoyosEstatales
                : null,
            },
          });
        }

        // 12. Aceptación de Política (Habeas Data)
        await tx.aceptacionPolitica.create({
          data: {
            aprendizId: aprendiz.id,
            aceptado: true,
            textoVersion: 'v2026-01',
          },
        });

        return {
          aprendiz_id: aprendiz.id,
          caracterizacion_id: caracterizacion.id,
          version: caracterizacion.version,
          estado: caracterizacion.estado,
          radicado: caracterizacion.radicado,
          fecha: fechaCaract.toISOString().split('T')[0],
        };
      });
    } catch (error: any) {
      this.logger.error(`Error en transacción de caracterización: ${error.message}`, error.stack);
      if (error instanceof ForbiddenException) throw error;
      throw new InternalServerErrorException(
        `Error al guardar la caracterización en base de datos: ${error.message}`,
      );
    }
  }

  /**
   * Obtiene la caracterización activa/última del aprendiz autenticado con todas sus tablas satélite.
   */
  async obtenerMiCaracterizacion(user: JwtPayload) {
    const aprendiz = await this.prisma.aprendiz.findFirst({
      where: {
        OR: [
          { id: user.sub },
          { numeroDocumento: user.numeroDocumento || '' },
          { usuario: user.numeroDocumento || '' },
        ],
      },
      include: {
        tipoDocumento: true,
        sexo: true,
        orientacionSexual: true,
        estadoCivil: true,
        contactoEmergenciaParentesco: true,
      },
    });

    if (!aprendiz) {
      throw new NotFoundException('No se encontró el registro del aprendiz');
    }

    const caracterizacion = await this.prisma.caracterizacion.findFirst({
      where: { aprendizId: aprendiz.id },
      orderBy: { version: 'desc' },
      include: {
        aprendiz: {
          include: {
            tipoDocumento: true,
            sexo: true,
            orientacionSexual: true,
            estadoCivil: true,
            contactoEmergenciaParentesco: true,
          },
        },
        localizaciones: {
          include: { ciudad: true, estrato: true, barrio: true, zona: true },
        },
        saludes: {
          include: {
            eps: true,
            regimenSalud: true,
            sisbenEstado: true,
            grupoSisben: true,
            tipoDiscapacidad: true,
          },
        },
        saludesSexuales: {
          include: { metodoAnticonceptivo: true },
        },
        situaciones: {
          include: {
            sustentoPrincipal: true,
            rangoIngresos: true,
            fuenteIngresos: true,
            grupoEtnico: true,
          },
        },
        covids19: {
          include: { vacuna: true },
        },
        perfiles: {
          include: { nivelFormacionPrevio: true, motivacion: true },
        },
        apoyos: {
          include: { tipoApoyo: true },
        },
      },
    });

    return {
      aprendiz: caracterizacion?.aprendiz || aprendiz,
      caracterizacion: caracterizacion || null,
      estado: caracterizacion ? caracterizacion.estado : 'pendiente',
    };
  }

  /**
   * Obtiene el detalle completo de una caracterización por su ID único (para funcionarios/admin).
   */
  async obtenerPorId(id: string) {
    const caracterizacion = await this.prisma.caracterizacion.findUnique({
      where: { id },
      include: {
        aprendiz: {
          include: {
            tipoDocumento: true,
            sexo: true,
            orientacionSexual: true,
            estadoCivil: true,
            contactoEmergenciaParentesco: true,
          },
        },
        localizaciones: {
          include: { ciudad: true, estrato: true, barrio: true, zona: true },
        },
        saludes: {
          include: {
            eps: true,
            regimenSalud: true,
            sisbenEstado: true,
            grupoSisben: true,
            tipoDiscapacidad: true,
          },
        },
        saludesSexuales: {
          include: { metodoAnticonceptivo: true },
        },
        situaciones: {
          include: {
            sustentoPrincipal: true,
            rangoIngresos: true,
            fuenteIngresos: true,
            grupoEtnico: true,
          },
        },
        covids19: {
          include: { vacuna: true },
        },
        perfiles: {
          include: { nivelFormacionPrevio: true, motivacion: true },
        },
        apoyos: {
          include: { tipoApoyo: true },
        },
      },
    });

    if (!caracterizacion) {
      throw new NotFoundException(`Caracterización con ID '${id}' no encontrada`);
    }

    return caracterizacion;
  }
}
