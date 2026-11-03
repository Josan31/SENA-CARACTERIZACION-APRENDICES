import { getPreguntasModulo, getRespuestasModulo } from './formulariosStore';

export type EstadoModulo = 'completado' | 'en_curso' | 'pendiente';

export interface ProgresoModuloDetalle {
  moduloId: string;
  nombre: string;
  estado: EstadoModulo;
  respondidasObligatorias: number;
  totalObligatorias: number;
  porcentaje: number;
}

export interface ProgresoGeneral {
  porcentajeGlobal: number;
  modulos: Record<string, ProgresoModuloDetalle>;
  totalModulosCompletados: number;
  todosModulosCompletados: boolean;
  caracterizacionVigente: boolean;
  radicado: string | null;
  fechaRadicado: string | null;
}

// Preguntas requeridas por cada una de las tarjetas principales
export const PREGUNTAS_REQUERIDAS_TARJETAS: Record<string, { storeModulo: string; campos: string[] }> = {
  basica: {
    storeModulo: 'basica',
    campos: [
      'nombre',
      'tipoDoc',
      'numDoc',
      'fechaNac',
      'sexo',
      'estadoCivil',
      'correoPersonal',
      'telefono',
      'acudiente',
      'telAcudiente',
      'parentesco',
      'direccion',
      'municipio',
      'estrato',
    ],
  },
  salud_fisica: {
    storeModulo: 'salud',
    campos: [
      'eps',
      'regimenSalud',
      'sisben',
      'tieneDiscapacidad',
      'enfermedadCronica',
      'tomaMedicamentos',
    ],
  },
  salud_sexual: {
    storeModulo: 'salud',
    campos: [
      'gestacion',
      'lactancia',
      'madrePadreCabezaFamilia',
      'hijosACargo',
      'utilizaMetodoPlanificacion',
    ],
  },
  socioeconomica: {
    storeModulo: 'socioeconomica',
    campos: [
      'jefaturaHogar',
      'personasACargo',
      'totalPersonasHogar',
      'rangoIngresosMensuales',
      'fuenteIngresos',
      'trabajaActualmente',
      'grupoEtnico',
      'apoyosEstatales',
    ],
  },
  formativo: {
    storeModulo: 'formativo',
    campos: [
      'nivelEducativoPrevio',
      'formacionPreviaSena',
      'motivacionIngreso',
      'vacunado',
    ],
  },
};

/**
 * Calcula en tiempo real el avance de diligenciamiento a partir de las respuestas almacenadas
 * y el estado de la caracterización en backend.
 */
export function calcularProgresoFormularios(
  caracterizacionBackend?: any
): ProgresoGeneral {
  // Si en el backend ya está radicada la caracterización, todos los módulos registrados están al 100%
  const esRadicada =
    caracterizacionBackend?.caracterizacion?.estado === 'RADICADA' ||
    caracterizacionBackend?.caracterizacion?.radicado != null;

  const radicado = caracterizacionBackend?.caracterizacion?.radicado || null;
  const fechaRadicado = caracterizacionBackend?.caracterizacion?.fechaCreacion || null;

  const respuestasBasica = getRespuestasModulo('basica');
  const respuestasSalud = getRespuestasModulo('salud');
  const respuestasSocio = getRespuestasModulo('socioeconomica');
  const respuestasFormativo = getRespuestasModulo('formativo');

  const respuestasPorStore: Record<string, Record<string, any>> = {
    basica: respuestasBasica,
    salud: respuestasSalud,
    socioeconomica: respuestasSocio,
    formativo: respuestasFormativo,
  };

  const nombresTarjetas: Record<string, string> = {
    basica: 'Información Básica y Localización',
    salud_fisica: 'Salud y Condición Física',
    salud_sexual: 'Salud Sexual y Reproductiva',
    socioeconomica: 'Situación Socioeconómica',
    formativo: 'Perfil Formativo y Vacunación COVID-19',
  };

  const modulosResult: Record<string, ProgresoModuloDetalle> = {};
  let sumaObligatoriasRespondidas = 0;
  let sumaObligatoriasTotal = 0;
  let modulosCompletadosCount = 0;

  for (const [cardKey, config] of Object.entries(PREGUNTAS_REQUERIDAS_TARJETAS)) {
    const respuestasStore = respuestasPorStore[config.storeModulo] || {};
    const totalCampos = config.campos.length;

    let respondidas = 0;
    for (const campo of config.campos) {
      const val = respuestasStore[campo];
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        respondidas++;
      }
    }

    // Si ya está radicada en backend, forzamos mínimo completado
    if (esRadicada) {
      respondidas = totalCampos;
    }

    const porcentaje = totalCampos > 0 ? Math.round((respondidas / totalCampos) * 100) : 0;
    let estado: EstadoModulo = 'pendiente';
    if (respondidas >= totalCampos) {
      estado = 'completado';
      modulosCompletadosCount++;
    } else if (respondidas > 0) {
      estado = 'en_curso';
    }

    modulosResult[cardKey] = {
      moduloId: cardKey,
      nombre: nombresTarjetas[cardKey] || cardKey,
      estado,
      respondidasObligatorias: respondidas,
      totalObligatorias: totalCampos,
      porcentaje,
    };

    sumaObligatoriasRespondidas += respondidas;
    sumaObligatoriasTotal += totalCampos;
  }

  const porcentajeGlobal =
    esRadicada
      ? 100
      : sumaObligatoriasTotal > 0
      ? Math.round((sumaObligatoriasRespondidas / sumaObligatoriasTotal) * 100)
      : 0;

  return {
    porcentajeGlobal,
    modulos: modulosResult,
    totalModulosCompletados: modulosCompletadosCount,
    todosModulosCompletados: modulosCompletadosCount === Object.keys(PREGUNTAS_REQUERIDAS_TARJETAS).length,
    caracterizacionVigente: esRadicada,
    radicado,
    fechaRadicado,
  };
}
