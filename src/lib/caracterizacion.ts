import { apiClient } from './api-client';

export interface CaracterizacionGuardadaResponse {
  aprendiz_id: string;
  caracterizacion_id: string;
  version: number;
  estado: string;
  radicado: string;
  fecha: string;
}

export interface CatalogoItem {
  id: string;
  categoria: string;
  valor: string;
  orden?: number;
}

export interface CaracterizacionDetalle {
  id: string;
  aprendizId: string;
  radicado: string | null;
  fecha: string;
  version: number;
  estado: string;
  createdAt: string;
  updatedAt: string;
  aprendiz: {
    id: string;
    nombreCompleto: string;
    numeroDocumento: string;
    fechaNacimiento: string;
    seReconoceLgbtiq: boolean;
    correoPersonal: string;
    correoInstitucional: string | null;
    telefono: string | null;
    contactoEmergenciaNombre: string | null;
    contactoEmergenciaTelefono: string | null;
    tipoDocumento?: CatalogoItem;
    sexo?: CatalogoItem;
    orientacionSexual?: CatalogoItem | null;
    estadoCivil?: CatalogoItem;
    contactoEmergenciaParentesco?: CatalogoItem | null;
  };
  localizaciones: Array<{
    direccion: string;
    ciudad?: CatalogoItem;
    estrato?: CatalogoItem;
    barrio?: CatalogoItem | null;
    zona?: CatalogoItem | null;
  }>;
  saludes: Array<{
    afiliadoSalud: boolean;
    discapacidadCertificada: boolean;
    presentaDiscapacidad: boolean;
    requiereMedicamento: boolean;
    enfermedadOtra: string | null;
    eps?: CatalogoItem;
    regimenSalud?: CatalogoItem;
    sisbenEstado?: CatalogoItem;
    grupoSisben?: CatalogoItem | null;
    tipoDiscapacidad?: CatalogoItem | null;
  }>;
  saludesSexuales: Array<{
    enGestacion: boolean | null;
    semanaGestacion: number | null;
    enLactancia: boolean | null;
    cabezaFamilia: boolean;
    numHijos: number;
    numPersonasHogar: number;
    metodoAnticonceptivo?: CatalogoItem | null;
  }>;
  situaciones: Array<{
    jefeHogar: boolean;
    sostieneHogar: boolean;
    personasACargo: number;
    sustentoPrincipal?: CatalogoItem;
    rangoIngresos?: CatalogoItem;
    fuenteIngresos?: CatalogoItem;
    grupoEtnico?: CatalogoItem;
  }>;
  covids19: Array<{
    vacunado: boolean;
    dosis: number | null;
    esquemaCompleto: boolean;
    vacuna?: CatalogoItem | null;
  }>;
  perfiles: Array<{
    formacionPreviaSena: boolean;
    trabajaActualmente: boolean;
    nivelFormacionPrevio?: CatalogoItem;
    motivacion?: CatalogoItem;
  }>;
  apoyos: Array<{
    detalleOtra: string | null;
    tipoApoyo?: CatalogoItem;
  }>;
}

export interface MiCaracterizacionResponse {
  aprendiz: CaracterizacionDetalle['aprendiz'];
  caracterizacion: CaracterizacionDetalle | null;
  estado: 'completa' | 'pendiente' | 'en_curso';
}

/**
 * Consulta la caracterización activa/última del aprendiz autenticado.
 */
export async function obtenerMiCaracterizacion(): Promise<MiCaracterizacionResponse> {
  return apiClient.get<MiCaracterizacionResponse>('/caracterizaciones/mi-caracterizacion');
}

/**
 * Empaqueta y guarda la caracterización completa de un aprendiz a través de la API transaccional.
 */
export async function guardarCaracterizacionCompleta(
  respuestasModulos: {
    basica: Record<string, any>;
    salud: Record<string, any>;
    socioeconomica: Record<string, any>;
    formativo: Record<string, any>;
  },
  user: {
    numeroDocumento: string;
    nombre: string;
    tipoDocumento?: string;
  }
): Promise<CaracterizacionGuardadaResponse> {
  const { basica, salud, socioeconomica, formativo } = respuestasModulos;

  // Normalizar campos básicos del contrato
  const moduloBasica = {
    ...basica,
    nombre: basica.nombre || user.nombre,
    tipoDoc: basica.tipoDoc || user.tipoDocumento || 'CC - Cédula de Ciudadanía',
    numDoc: user.numeroDocumento,
  };

  const payload = {
    numero_documento: user.numeroDocumento,
    fecha: new Date().toISOString().split('T')[0],
    modulos: {
      basica: moduloBasica,
      salud: { ...salud },
      socioeconomica: { ...socioeconomica },
      formativo: { ...formativo },
    },
  };

  return apiClient.post<CaracterizacionGuardadaResponse>('/caracterizaciones', payload);
}
