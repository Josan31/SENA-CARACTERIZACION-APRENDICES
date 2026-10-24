import { PreguntaFormulario, RespuestaModuloFormulario } from "@/types/formularios";

/**
 * Catálogo maestro de preguntas por defecto para los 4 módulos de caracterización
 */
export const PREGUNTAS_INICIALES: Record<string, PreguntaFormulario[]> = {
  basica: [
    // Sección: Datos Personales
    {
      id: "nombre",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Nombres y Apellidos Completos",
      tipo: "text",
      placeholder: "Ej: Valentina Gómez Mejía",
      requerido: true,
      orden: 1,
      activo: true,
    },
    {
      id: "tipoDoc",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Tipo de Documento",
      tipo: "select",
      opciones: [
        "CC - Cédula de Ciudadanía",
        "TI - Tarjeta de Identidad",
        "CE - Cédula de Extranjería",
        "PPT - Permiso por Protección Temporal",
      ],
      requerido: true,
      orden: 2,
      activo: true,
    },
    {
      id: "numDoc",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Número de Documento",
      tipo: "text",
      placeholder: "Ej: 1025889741",
      requerido: true,
      orden: 3,
      activo: true,
    },
    {
      id: "fechaNac",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Fecha de Nacimiento",
      tipo: "date",
      requerido: true,
      orden: 4,
      activo: true,
    },
    {
      id: "edad",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Edad",
      tipo: "number",
      placeholder: "Ej: 19",
      requerido: true,
      orden: 5,
      activo: true,
    },
    {
      id: "sexo",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Sexo Biológico",
      tipo: "select",
      opciones: ["Hombre", "Mujer", "Intersexual"],
      requerido: true,
      orden: 6,
      activo: true,
    },
    {
      id: "lgbtiq",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "¿Se reconoce como parte de la comunidad LGBTIQ+?",
      tipo: "select",
      opciones: ["No", "Sí"],
      requerido: true,
      orden: 7,
      activo: true,
    },
    {
      id: "orientacion",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Orientación Sexual",
      tipo: "select",
      opciones: [
        "Heterosexual",
        "Homosexual",
        "Bisexual",
        "Pansexual",
        "Prefiero no responder",
      ],
      requerido: false,
      orden: 8,
      activo: true,
    },
    {
      id: "estadoCivil",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Estado Civil",
      tipo: "select",
      opciones: [
        "Soltero(a)",
        "Casado(a)",
        "Unión Libre",
        "Separado(a) / Divorciado(a)",
        "Viudo(a)",
      ],
      requerido: true,
      orden: 9,
      activo: true,
    },
    {
      id: "correoPersonal",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Correo Electrónico Personal",
      tipo: "text",
      placeholder: "nombre@gmail.com",
      requerido: true,
      orden: 10,
      activo: true,
    },
    {
      id: "correoInst",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Correo Institucional SENA",
      tipo: "text",
      placeholder: "vgomez@soy.sena.edu.co",
      requerido: true,
      orden: 11,
      activo: true,
    },
    {
      id: "telefono",
      moduloId: "basica",
      seccion: "Datos Personales",
      label: "Teléfono Móvil",
      tipo: "text",
      placeholder: "Ej: 3105559874",
      requerido: true,
      orden: 12,
      activo: true,
    },

    // Sección: Contacto de Emergencia
    {
      id: "acudiente",
      moduloId: "basica",
      seccion: "Contacto de Emergencia y Acudiente",
      label: "Nombre Completo del Acudiente / Contacto",
      tipo: "text",
      placeholder: "Ej: María Carmen Mejía",
      requerido: true,
      orden: 13,
      activo: true,
    },
    {
      id: "telAcudiente",
      moduloId: "basica",
      seccion: "Contacto de Emergencia y Acudiente",
      label: "Teléfono del Acudiente",
      tipo: "text",
      placeholder: "Ej: 3124448899",
      requerido: true,
      orden: 14,
      activo: true,
    },
    {
      id: "parentesco",
      moduloId: "basica",
      seccion: "Contacto de Emergencia y Acudiente",
      label: "Parentesco / Relación",
      tipo: "select",
      opciones: [
        "Madre",
        "Padre",
        "Hermano(a)",
        "Cónyuge / Pareja",
        "Tío(a)",
        "Abuelo(a)",
        "Otro",
      ],
      requerido: true,
      orden: 15,
      activo: true,
    },

    // Sección: Localización y Vivienda
    {
      id: "direccion",
      moduloId: "basica",
      seccion: "Localización y Vivienda",
      label: "Dirección de Residencia",
      tipo: "text",
      placeholder: "Ej: Calle 45 # 12-30",
      requerido: true,
      orden: 16,
      activo: true,
    },
    {
      id: "municipio",
      moduloId: "basica",
      seccion: "Localización y Vivienda",
      label: "Municipio / Ciudad",
      tipo: "text",
      placeholder: "Ej: Pereira, Risaralda",
      requerido: true,
      orden: 17,
      activo: true,
    },
    {
      id: "estrato",
      moduloId: "basica",
      seccion: "Localización y Vivienda",
      label: "Estrato Socioeconómico",
      tipo: "select",
      opciones: [
        "Estrato 1",
        "Estrato 2",
        "Estrato 3",
        "Estrato 4",
        "Estrato 5",
        "Estrato 6",
        "Sin Estrato / Rural",
      ],
      requerido: true,
      orden: 18,
      activo: true,
    },
  ],

  salud: [
    // Sección: Afiliación y Seguridad Social
    {
      id: "eps",
      moduloId: "salud",
      seccion: "Afiliación y Seguridad Social",
      label: "Entidad Promotora de Salud (EPS)",
      tipo: "select",
      opciones: [
        "Nueva EPS",
        "Sanitas",
        "Sura",
        "Salud Total",
        "Famisanar",
        "Coosalud",
        "Compensar",
        "Mutual Ser",
        "Asmet Salud",
        "Capital Salud",
        "Savia Salud",
        "Otra",
      ],
      requerido: true,
      orden: 1,
      activo: true,
    },
    {
      id: "regimenSalud",
      moduloId: "salud",
      seccion: "Afiliación y Seguridad Social",
      label: "Régimen de Afiliación en Salud",
      tipo: "select",
      opciones: [
        "Contributivo (Cotizante)",
        "Contributivo (Beneficiario)",
        "Subsidiado",
        "Especial o Excepción",
        "No asegurado",
      ],
      requerido: true,
      orden: 2,
      activo: true,
    },
    {
      id: "sisben",
      moduloId: "salud",
      seccion: "Afiliación y Seguridad Social",
      label: "¿Cuenta con encuesta Sisbén IV?",
      tipo: "select",
      opciones: ["Sí", "No", "En trámite"],
      requerido: true,
      orden: 3,
      activo: true,
    },
    {
      id: "grupoSisben",
      moduloId: "salud",
      seccion: "Afiliación y Seguridad Social",
      label: "Grupo Sisbén",
      tipo: "select",
      opciones: [
        "Grupo A (Pobreza extrema)",
        "Grupo B (Pobreza moderada)",
        "Grupo C (Vulnerable)",
        "Grupo D (No pobre / No vulnerable)",
        "No aplica",
      ],
      requerido: false,
      orden: 4,
      activo: true,
    },

    // Sección: Condición Física y Discapacidad
    {
      id: "tieneDiscapacidad",
      moduloId: "salud",
      seccion: "Condición Física y Discapacidad",
      label: "¿Presenta alguna discapacidad certificada?",
      tipo: "select",
      opciones: ["No", "Sí"],
      requerido: true,
      orden: 5,
      activo: true,
    },
    {
      id: "tipoDiscapacidad",
      moduloId: "salud",
      seccion: "Condición Física y Discapacidad",
      label: "Tipo de Discapacidad",
      tipo: "select",
      opciones: [
        "Visual",
        "Auditiva",
        "Física / Motriz",
        "Intelectual",
        "Psicosocial",
        "Múltiple",
        "Ninguna",
      ],
      requerido: false,
      orden: 6,
      activo: true,
    },

    // Sección: Antecedentes Médicos
    {
      id: "enfermedadCronica",
      moduloId: "salud",
      seccion: "Antecedentes Médicos",
      label: "¿Padece alguna enfermedad crónica o diagnóstico permanente?",
      tipo: "select",
      opciones: ["No", "Sí"],
      requerido: true,
      orden: 7,
      activo: true,
    },
    {
      id: "descripcionEnfermedad",
      moduloId: "salud",
      seccion: "Antecedentes Médicos",
      label: "Descripción o Diagnóstico Médico",
      tipo: "textarea",
      placeholder: "Especifique el diagnóstico médico...",
      requerido: false,
      orden: 8,
      activo: true,
    },
    {
      id: "tomaMedicamentos",
      moduloId: "salud",
      seccion: "Antecedentes Médicos",
      label: "¿Consume medicamentos formulados de forma continua?",
      tipo: "select",
      opciones: ["No", "Sí"],
      requerido: true,
      orden: 9,
      activo: true,
    },

    // Sección: Salud Sexual y Reproductiva
    {
      id: "gestacion",
      moduloId: "salud",
      seccion: "Salud Sexual y Reproductiva",
      label: "¿Se encuentra actualmente en estado de gestación/embarazo?",
      tipo: "select",
      opciones: ["No", "Sí", "No aplica"],
      requerido: true,
      orden: 10,
      activo: true,
    },
    {
      id: "lactancia",
      moduloId: "salud",
      seccion: "Salud Sexual y Reproductiva",
      label: "¿Se encuentra en período de lactancia materna?",
      tipo: "select",
      opciones: ["No", "Sí", "No aplica"],
      requerido: true,
      orden: 11,
      activo: true,
    },
    {
      id: "madrePadreCabezaFamilia",
      moduloId: "salud",
      seccion: "Salud Sexual y Reproductiva",
      label: "¿Es madre o padre cabeza de familia?",
      tipo: "select",
      opciones: ["No", "Sí"],
      requerido: true,
      orden: 12,
      activo: true,
    },
    {
      id: "hijosACargo",
      moduloId: "salud",
      seccion: "Salud Sexual y Reproductiva",
      label: "Número de hijos biológicos o adoptivos a cargo",
      tipo: "number",
      placeholder: "0",
      requerido: true,
      orden: 13,
      activo: true,
    },
    {
      id: "utilizaMetodoPlanificacion",
      moduloId: "salud",
      seccion: "Salud Sexual y Reproductiva",
      label: "¿Utiliza actualmente algún método de planificación familiar?",
      tipo: "select",
      opciones: ["Sí", "No", "Prefiero no responder"],
      requerido: true,
      orden: 14,
      activo: true,
    },
  ],

  socioeconomica: [
    // Sección: Jefatura y Composición Familiar
    {
      id: "jefaturaHogar",
      moduloId: "socioeconomica",
      seccion: "Jefatura y Composición Familiar",
      label: "Parentesco de quien aporta el mayor sustento económico en su hogar",
      tipo: "select",
      opciones: [
        "El propio aprendiz",
        "Madre",
        "Padre",
        "Ambos padres",
        "Cónyuge / Pareja",
        "Abuelo(a)",
        "Otro familiar",
      ],
      requerido: true,
      orden: 1,
      activo: true,
    },
    {
      id: "personasACargo",
      moduloId: "socioeconomica",
      seccion: "Jefatura y Composición Familiar",
      label: "Número de personas que dependen económicamente de usted",
      tipo: "number",
      placeholder: "0",
      requerido: true,
      orden: 2,
      activo: true,
    },
    {
      id: "totalPersonasHogar",
      moduloId: "socioeconomica",
      seccion: "Jefatura y Composición Familiar",
      label: "Total de personas que habitan en la misma vivienda",
      tipo: "number",
      placeholder: "Ej: 4",
      requerido: true,
      orden: 3,
      activo: true,
    },

    // Sección: Ingresos y Empleo
    {
      id: "rangoIngresosMensuales",
      moduloId: "socioeconomica",
      seccion: "Ingresos y Empleo",
      label: "Rango de ingresos totales del núcleo familiar mensual",
      tipo: "select",
      opciones: [
        "Menos de 1 SMMLV",
        "Entre 1 y 2 SMMLV",
        "Entre 2 y 3 SMMLV",
        "Más de 3 SMMLV",
      ],
      requerido: true,
      orden: 4,
      activo: true,
    },
    {
      id: "fuenteIngresos",
      moduloId: "socioeconomica",
      seccion: "Ingresos y Empleo",
      label: "Fuente principal de ingresos del hogar",
      tipo: "select",
      opciones: [
        "Salario fijo / Empleo formal",
        "Trabajo independiente / Informal",
        "Pensión / Jubilación",
        "Remesas del exterior",
        "Subsidios del gobierno",
        "Ayuda de familiares",
      ],
      requerido: true,
      orden: 5,
      activo: true,
    },
    {
      id: "trabajaActualmente",
      moduloId: "socioeconomica",
      seccion: "Ingresos y Empleo",
      label: "¿Usted labora actualmente de manera remunerada?",
      tipo: "select",
      opciones: [
        "No",
        "Sí (Tiempo completo)",
        "Sí (Medio tiempo)",
        "Sí (Ocasional / Fines de semana)",
      ],
      requerido: true,
      orden: 6,
      activo: true,
    },

    // Sección: Focalización y Apoyos Estatales
    {
      id: "grupoEtnico",
      moduloId: "socioeconomica",
      seccion: "Focalización y Apoyos Estatales",
      label: "Pertenencia a grupo étnico o comunidad especial",
      tipo: "select",
      opciones: [
        "Ninguno / No se reconoce",
        "Afrocolombiano / Negro / Mulato",
        "Indígena",
        "Raizal del Archipiélago",
        "Palenquero de San Basilio",
        "Rrom / Gitano",
      ],
      requerido: true,
      orden: 7,
      activo: true,
    },
    {
      id: "apoyosEstatales",
      moduloId: "socioeconomica",
      seccion: "Focalización y Apoyos Estatales",
      label: "¿Recibe actualmente algún programa de apoyo o subsidio del Estado?",
      tipo: "select",
      opciones: [
        "Ninguno",
        "Renta Ciudadana / Familias en Acción",
        "Jóvenes en Paz",
        "Colombia Mayor",
        "Subsidio de Transporte SENA",
        "Apoyo de Sostenimiento FIC",
        "Otro subsidio público",
      ],
      requerido: true,
      orden: 8,
      activo: true,
    },
  ],

  formativo: [
    // Sección: Trayectoria Educativa
    {
      id: "nivelEducativoPrevio",
      moduloId: "formativo",
      seccion: "Trayectoria Educativa",
      label: "Máximo nivel educativo alcanzado antes de ingresar a este programa",
      tipo: "select",
      opciones: [
        "Bachiller Académico",
        "Bachiller Técnico",
        "Técnico Laboral / Ocupacional",
        "Tecnólogo",
        "Universitario Incompleto",
        "Universitario Graduado",
      ],
      requerido: true,
      orden: 1,
      activo: true,
    },
    {
      id: "formacionPreviaSena",
      moduloId: "formativo",
      seccion: "Trayectoria Educativa",
      label: "¿Ha realizado y culminado previamente otro curso o programa en el SENA?",
      tipo: "select",
      opciones: [
        "No",
        "Sí (Curso corto complementario)",
        "Sí (Programa técnico titulado)",
        "Sí (Programa tecnólogo)",
      ],
      requerido: true,
      orden: 2,
      activo: true,
    },

    // Sección: Motivación y Proyección
    {
      id: "motivacionIngreso",
      moduloId: "formativo",
      seccion: "Motivación y Proyección",
      label: "Motivación principal para elegir este programa de formación",
      tipo: "select",
      opciones: [
        "Inserción y oportunidad laboral inmediata",
        "Vocación y gusto por la disciplina",
        "Continuar con estudios universitarios",
        "Emprender negocio propio",
        "Recomendación de familiares",
      ],
      requerido: true,
      orden: 3,
      activo: true,
    },
    {
      id: "expectativaLaboral",
      moduloId: "formativo",
      seccion: "Motivación y Proyección",
      label: "Expectativa al culminar la etapa productiva",
      tipo: "select",
      opciones: [
        "Vincularme como empleado formal",
        "Crear mi propia empresa / Emprendimiento",
        "Trabajar como contratista independiente",
        "Seguir formándome académicamente",
      ],
      requerido: true,
      orden: 4,
      activo: true,
    },
    {
      id: "manejoHerramientasDigitales",
      moduloId: "formativo",
      seccion: "Motivación y Proyección",
      label: "Autoevaluación en manejo de herramientas informáticas y ofimática",
      tipo: "select",
      opciones: [
        "Básico (Navegación web y correo)",
        "Intermedio (Word, Excel y plataformas virtuales)",
        "Avanzado (Bases de datos, software especializado o programación)",
      ],
      requerido: true,
      orden: 5,
      activo: true,
    },

    // Sección: Esquema de Vacunación COVID-19
    {
      id: "vacunado",
      moduloId: "formativo",
      seccion: "Esquema de Vacunación COVID-19",
      label: "¿Cuenta con esquema de vacunación contra COVID-19?",
      tipo: "select",
      opciones: ["Sí", "No"],
      requerido: true,
      orden: 6,
      activo: true,
    },
    {
      id: "biologico",
      moduloId: "formativo",
      seccion: "Esquema de Vacunación COVID-19",
      label: "Biológico o vacuna principal recibida",
      tipo: "select",
      opciones: [
        "Pfizer / BioNTech",
        "Moderna",
        "AstraZeneca",
        "Sinovac / CoronaVac",
        "Janssen (Johnson & Johnson)",
        "Otra",
        "No aplica / No vacunado",
      ],
      requerido: false,
      orden: 7,
      activo: true,
    },
    {
      id: "dosis",
      moduloId: "formativo",
      seccion: "Esquema de Vacunación COVID-19",
      label: "Número de dosis aplicadas (incluyendo refuerzos)",
      tipo: "number",
      placeholder: "Ej: 2",
      requerido: true,
      orden: 8,
      activo: true,
    },
    {
      id: "esquemaCompleto",
      moduloId: "formativo",
      seccion: "Esquema de Vacunación COVID-19",
      label: "¿Considera su esquema de vacunación completo?",
      tipo: "select",
      opciones: ["Sí", "No"],
      requerido: true,
      orden: 9,
      activo: true,
    },
  ],
};

const STORAGE_KEY_PREFIX = "sena_preguntas_modulo_";
const RESPUESTAS_KEY_PREFIX = "sena_respuestas_modulo_";

/**
 * Obtener las preguntas de un módulo (sincronizadas entre Admin y Aprendiz)
 */
export function getPreguntasModulo(moduloId: string): PreguntaFormulario[] {
  if (typeof window === "undefined") {
    return PREGUNTAS_INICIALES[moduloId] || [];
  }

  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${moduloId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.sort((a, b) => a.orden - b.orden);
      }
    }
  } catch (err) {
    console.error("Error al leer preguntas de localStorage:", err);
  }

  // Si no hay personalizadas, inicializar con las preguntas por defecto
  const porDefecto = PREGUNTAS_INICIALES[moduloId] || [];
  if (porDefecto.length > 0) {
    try {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}${moduloId}`,
        JSON.stringify(porDefecto)
      );
    } catch {
      // Ignorar quota errors
    }
  }
  return porDefecto;
}

/**
 * Guardar la lista de preguntas de un módulo y sincronizar con backend
 */
export async function savePreguntasModulo(
  moduloId: string,
  preguntas: PreguntaFormulario[]
): Promise<boolean> {
  const ordenadas = preguntas.map((p, idx) => ({
    ...p,
    orden: idx + 1,
  }));

  // 1. Persistencia local inmediata para respuesta instantánea
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}${moduloId}`,
        JSON.stringify(ordenadas)
      );
      // Disparar evento para que cualquier vista abierta de Aprendiz o Admin se actualice
      window.dispatchEvent(
        new CustomEvent("sena_preguntas_actualizadas", {
          detail: { moduloId, preguntas: ordenadas },
        })
      );
    } catch (err) {
      console.error("Error al guardar preguntas en localStorage:", err);
    }
  }

  // 2. Persistencia en Backend (API Route)
  try {
    const res = await fetch("/api/formularios/preguntas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduloId, preguntas: ordenadas }),
    });
    return res.ok;
  } catch (err) {
    console.warn("Backend no disponible temporalmente, guardado en cliente:", err);
    return true;
  }
}

/**
 * Añadir una nueva pregunta a un módulo
 */
export async function addPreguntaModulo(
  moduloId: string,
  pregunta: Omit<PreguntaFormulario, "id" | "orden" | "moduloId">
): Promise<PreguntaFormulario> {
  const preguntas = getPreguntasModulo(moduloId);
  const nueva: PreguntaFormulario = {
    ...pregunta,
    id: `pregunta_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    moduloId,
    orden: preguntas.length + 1,
    activo: true,
    esPersonalizada: true,
  };

  const actualizadas = [...preguntas, nueva];
  await savePreguntasModulo(moduloId, actualizadas);
  return nueva;
}

/**
 * Modificar una pregunta existente
 */
export async function updatePreguntaModulo(
  moduloId: string,
  preguntaId: string,
  cambios: Partial<PreguntaFormulario>
): Promise<boolean> {
  const preguntas = getPreguntasModulo(moduloId);
  const actualizadas = preguntas.map((p) =>
    p.id === preguntaId ? { ...p, ...cambios } : p
  );
  return await savePreguntasModulo(moduloId, actualizadas);
}

/**
 * Eliminar / Quitar una pregunta de un módulo
 */
export async function deletePreguntaModulo(
  moduloId: string,
  preguntaId: string
): Promise<boolean> {
  const preguntas = getPreguntasModulo(moduloId);
  const filtradas = preguntas.filter((p) => p.id !== preguntaId);
  return await savePreguntasModulo(moduloId, filtradas);
}

/**
 * Alternar estado activo / inactivo de una pregunta
 */
export async function toggleActivoPregunta(
  moduloId: string,
  preguntaId: string
): Promise<boolean> {
  const preguntas = getPreguntasModulo(moduloId);
  const actualizadas = preguntas.map((p) =>
    p.id === preguntaId ? { ...p, activo: !p.activo } : p
  );
  return await savePreguntasModulo(moduloId, actualizadas);
}

/**
 * Reordenar una pregunta hacia arriba o abajo
 */
export async function reordenarPregunta(
  moduloId: string,
  preguntaId: string,
  direccion: "up" | "down"
): Promise<boolean> {
  const preguntas = [...getPreguntasModulo(moduloId)];
  const idx = preguntas.findIndex((p) => p.id === preguntaId);
  if (idx === -1) return false;

  const targetIdx = direccion === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= preguntas.length) return false;

  // Intercambiar
  const temp = preguntas[idx];
  preguntas[idx] = preguntas[targetIdx];
  preguntas[targetIdx] = temp;

  return await savePreguntasModulo(moduloId, preguntas);
}

/**
 * Guardar respuestas de un aprendiz para un módulo y sincronizar con backend
 */
export async function saveRespuestasModulo(
  moduloId: string,
  respuestas: Record<string, any>,
  aprendizDoc?: string
): Promise<boolean> {
  const data: RespuestaModuloFormulario = {
    moduloId,
    respuestas,
    fechaActualizacion: new Date().toISOString(),
    aprendizDoc: aprendizDoc || "aprendiz_default",
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        `${RESPUESTAS_KEY_PREFIX}${moduloId}`,
        JSON.stringify(data)
      );
    } catch (err) {
      console.error("Error al guardar respuestas en localStorage:", err);
    }
  }

  try {
    const res = await fetch("/api/formularios/respuestas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (err) {
    console.warn("Backend no disponible temporalmente, respuestas guardadas localmente:", err);
    return true;
  }
}

/**
 * Obtener las respuestas previamente guardadas de un módulo
 */
export function getRespuestasModulo(moduloId: string): Record<string, any> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(`${RESPUESTAS_KEY_PREFIX}${moduloId}`);
    if (raw) {
      const parsed: RespuestaModuloFormulario = JSON.parse(raw);
      return parsed.respuestas || {};
    }
  } catch (err) {
    console.error("Error al leer respuestas:", err);
  }
  return {};
}
