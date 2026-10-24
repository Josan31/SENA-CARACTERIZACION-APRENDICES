/**
 * Tipos TypeScript para el Sistema de Caracterización de Aprendices SENA
 * Mapeo integral acorde al modelo de datos (Prisma / PostgreSQL)
 */

export interface AprendizDatosBasicos {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  edad: number;
  sexo: string;
  orientacionSexual?: string;
  identidadLgbtiq?: boolean;
  estadoCivil: string;
  correoPersonal: string;
  correoInstitucional: string;
  telefono: string;
}

export interface ContactoEmergencia {
  nombreAcudiente: string;
  telefonoAcudiente: string;
  parentesco: string;
  correoAcudiente?: string;
}

export interface LocalizacionVivienda {
  departamento: string;
  municipio: string;
  direccion: string;
  barrio: string;
  estrato: number;
  tipoVivienda: string;
  zona: "Urbana" | "Rural";
  serviciosPublicos: {
    agua: boolean;
    energia: boolean;
    gas: boolean;
    internet: boolean;
    alcantarillado: boolean;
  };
}

export interface DatosFormacion {
  programa: string;
  ficha: string;
  jornada: string;
  modalidad: string;
  centroFormacion: string;
  regional: string;
  nivelFormacion: string;
  tipoOferta: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface SaludCondicionFisica {
  eps: string;
  regimenSalud: string;
  sisben: string;
  grupoSisben: string;
  tieneDiscapacidad: boolean;
  tipoDiscapacidad?: string;
  enfermedadCronica: boolean;
  descripcionEnfermedad?: string;
  tomaMedicamentos: boolean;
}

export interface SaludSexualReproductiva {
  gestacion: boolean;
  semanasGestacion?: number;
  lactancia: boolean;
  madrePadreCabezaFamilia: boolean;
  hijosACargo: number;
  utilizaMetodoPlanificacion: boolean;
  metodoPlanificacion?: string;
}

export interface VacunacionCovid {
  vacunado: boolean;
  biologico?: string;
  dosis: number;
  esquemaCompleto: boolean;
  tuvoInfeccion: boolean;
  fechaUltimaInfeccion?: string;
}

export interface SituacionSocioeconomica {
  jefaturaHogar: string;
  personasACargo: number;
  totalPersonasHogar: number;
  rangoIngresosMensuales: string;
  fuenteIngresos: string;
  trabajaActualmente: boolean;
  tipoTrabajo?: string;
  grupoEtnico: string;
  apoyosEstatales: string[];
}

export interface PerfilOcupacional {
  nivelEducativoPrevio: string;
  formacionPreviaSena: boolean;
  motivacionIngreso: string;
  expectativaLaboral: string;
  areaInteresDesempeno: string;
  manejoHerramientasDigitales: boolean;
}

export interface SolicitudAsesoriaDirecta {
  tipoAsesoria: string;
  profesionalPreferido: string;
  modalidadAtencion: "Presencial" | "Virtual Teams";
  jornadaDisponibilidad: string;
  motivoConsulta: string;
  telefonoContacto: string;
  correoContacto: string;
  atencionPrioritaria: boolean;
  atencionPrevia: boolean;
}

export interface RecaracterizacionDatos {
  radicadoAnterior: string;
  version: string;
  cambioResidencia: boolean;
  nuevaDireccion?: string;
  nuevoBarrio?: string;
  nuevoEstrato?: number;
  cambioEps: boolean;
  nuevaEps?: string;
  cambioLaboral: boolean;
  nuevaSituacionLaboral?: string;
  nuevosIngresos?: string;
  solicitaApoyoFic: boolean;
}

export interface CaracterizacionCompleta {
  id?: string;
  radicado?: string;
  fechaRadicado?: string;
  aprendiz: AprendizDatosBasicos;
  emergencia: ContactoEmergencia;
  localizacion: LocalizacionVivienda;
  formacion: DatosFormacion;
  salud: SaludCondicionFisica;
  saludSexual: SaludSexualReproductiva;
  covid: VacunacionCovid;
  socioeconomica: SituacionSocioeconomica;
  ocupacional: PerfilOcupacional;
  declaracionVeracidad: boolean;
  autorizacionHabeasData: boolean;
  observaciones?: string;
  estado: "Pendiente" | "Completo" | "Recaracterizado";
}

export type TipoPregunta =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export interface PreguntaFormulario {
  id: string;
  moduloId: "basica" | "salud" | "socioeconomica" | "formativo" | string;
  seccion: string;
  label: string;
  tipo: TipoPregunta;
  placeholder?: string;
  opciones?: string[];
  requerido: boolean;
  orden: number;
  activo: boolean;
  esPersonalizada?: boolean;
}

export interface RespuestaModuloFormulario {
  moduloId: string;
  respuestas: Record<string, any>;
  fechaActualizacion: string;
  aprendizDoc?: string;
}
