/**
 * SEED SCRUM-52 Fase 2 — SOLO DATOS FICTICIOS (nunca datos reales de aprendices).
 *
 * Ejecución (la aplica el responsable de BD; nunca contra bases remotas por script):
 *   cd backend && npx prisma migrate dev          # 1) aplica las 2 migraciones
 *   cd backend && npx tsx prisma/seed.ts          # 2) siembra catálogos y demos
 *
 * Contenido:
 *   1. Catálogos tomados de las `opciones` del gestor actual
 *      (src/data/formularios_preguntas.json) con categorías snake_case,
 *      más los catálogos que el schema exige y que hoy no tienen preguntas.
 *   2. 6 aprendices ficticios con ficha, formación, caracterización (v1),
 *      satélites 1:1 ligados a caracterizacion_id y aceptación de política.
 *   3. 2 usuarios SENA ficticios (password SOLO como hash bcrypt).
 * La pregunta de prueba del gestor (esPersonalizada, "Aberlardo o cepeda")
 * se DESCARTA: no tiene datos en el seed (decisión 4 del responsable BD).
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // bcrypt ^6.0.0 declarado en backend/package.json
import type { PrismaClient as TxClient } from '@prisma/client';

const prisma = new PrismaClient();

// -----------------------------------------------------------------------------
// 1. CATÁLOGOS (categorías snake_case; valores = texto EXACTO de las opciones
//    del JSON del gestor cuando existen; el resto son inventados pero plausibles)
// -----------------------------------------------------------------------------
type GrupoCatalogo = { categoria: string; valores: string[] };

const CATALOGOS: GrupoCatalogo[] = [
  // --- Módulo basica (texto exacto del gestor) ---
  { categoria: 'tipo_documento', valores: ['CC - Cédula de Ciudadanía', 'TI - Tarjeta de Identidad', 'CE - Cédula de Extranjería', 'PPT - Permiso por Protección Temporal'] },
  { categoria: 'sexo', valores: ['Hombre', 'Mujer', 'Intersexual'] },
  { categoria: 'orientacion_sexual', valores: ['Heterosexual', 'Homosexual', 'Bisexual', 'Pansexual', 'Prefiero no responder'] },
  { categoria: 'estado_civil', valores: ['Soltero(a)', 'Casado(a)', 'Unión Libre', 'Separado(a) / Divorciado(a)', 'Viudo(a)'] },
  { categoria: 'parentesco_acudiente', valores: ['Madre', 'Padre', 'Hermano(a)', 'Cónyuge / Pareja', 'Tío(a)', 'Abuelo(a)', 'Otro'] },
  // --- localizacion (estrato exacto; ciudad obligatoria y razonable; el resto es pendiente del front y se inventó) ---
  { categoria: 'estrato', valores: ['Estrato 1', 'Estrato 2', 'Estrato 3', 'Estrato 4', 'Estrato 5', 'Estrato 6', 'Sin Estrato / Rural'] },
  { categoria: 'ciudad', valores: ['Palmira', 'Pereira', 'Cali', 'Bogotá', 'Medellín', 'Manizales', 'Cartago', 'Buenaventura', 'Tuluá', 'Fusagasugá'] },
  { categoria: 'barrio', valores: ['La Granjita', 'Belén', 'Los Alpes', 'Comuneros', 'Tres de Mayo', 'El Manzano', 'Villa Colombia', 'El Vergel'] }, // fictional
  { categoria: 'zona', valores: ['Urbana', 'Rural'] },
  { categoria: 'tenencia_vivienda', valores: ['Propia', 'Arrendada', 'De familiar', 'Otro'] },
  { categoria: 'medio_transporte', valores: ['Bus / Busetón', 'Motocicleta', 'Bicicleta', 'Caminando', 'Vehículo propio'] },
  // --- Módulo salud ---
  { categoria: 'eps', valores: ['Nueva EPS', 'Sanitas', 'Sura', 'Salud Total', 'Famisanar', 'Coosalud', 'Compensar', 'Mutual Ser', 'Asmet Salud', 'Capital Salud', 'Savia Salud', 'Otra'] },
  { categoria: 'regimen_salud', valores: ['Contributivo (Cotizante)', 'Contributivo (Beneficiario)', 'Subsidiado', 'Especial o Excepción', 'No asegurado'] },
  { categoria: 'sisben_estado', valores: ['Sí', 'No', 'En trámite'] }, // decisión P2
  { categoria: 'grupo_sisben', valores: ['Grupo A (Pobreza extrema)', 'Grupo B (Pobreza moderada)', 'Grupo C (Vulnerable)', 'Grupo D (No pobre / No vulnerable)', 'No aplica'] },
  { categoria: 'tipo_discapacidad', valores: ['Visual', 'Auditiva', 'Física / Motriz', 'Intelectual', 'Psicosocial', 'Múltiple', 'Ninguna'] },
  // --- Salud sexual: métodos (la pregunta "¿cuál?" es condicional del gestor, no implementada) ---
  { categoria: 'metodo_anticonceptivo', valores: ['Hormonal oral', 'Implante subdérmico', 'DIU', 'Preservativo', 'Esterilización', 'Otro'] },
  // --- Módulo socioeconomica ---
  { categoria: 'sustento_principal', valores: ['El propio aprendiz', 'Madre', 'Padre', 'Ambos padres', 'Cónyuge / Pareja', 'Abuelo(a)', 'Otro familiar'] },
  { categoria: 'rango_ingresos', valores: ['Menos de 1 SMMLV', 'Entre 1 y 2 SMMLV', 'Entre 2 y 3 SMMLV', 'Más de 3 SMMLV'] },
  { categoria: 'fuente_ingresos', valores: ['Salario fijo / Empleo formal', 'Trabajo independiente / Informal', 'Pensión / Jubilación', 'Remesas del exterior', 'Subsidios del gobierno', 'Ayuda de familiares'] },
  { categoria: 'grupo_etnico', valores: ['Ninguno / No se reconoce', 'Afrocolombiano / Negro / Mulato', 'Indígena', 'Raizal del Archipiélago', 'Palenquero de San Basilio', 'Rrom / Gitano'] },
  { categoria: 'apoyo_estado', valores: ['Ninguno', 'Renta Ciudadana / Familias en Acción', 'Jóvenes en Paz', 'Colombia Mayor', 'Subsidio de Transporte SENA', 'Apoyo de Sostenimiento FIC', 'Otro subsidio público'] },
  // --- Módulo formativo ---
  { categoria: 'nivel_formacion_previo', valores: ['Bachiller Académico', 'Bachiller Técnico', 'Técnico Laboral / Ocupacional', 'Tecnólogo', 'Universitario Incompleto', 'Universitario Graduado'] },
  { categoria: 'motivacion', valores: ['Inserción y oportunidad laboral inmediata', 'Vocación y gusto por la disciplina', 'Continuar con estudios universitarios', 'Emprender negocio propio', 'Recomendación de familiares'] },
  { categoria: 'vacuna_covid', valores: ['Pfizer / BioNTech', 'Moderna', 'AstraZeneca', 'Sinovac / CoronaVac', 'Janssen (Johnson & Johnson)', 'Otra', 'No aplica / No vacunado'] },
  // --- Catálogos SIN pregunta en el gestor hoy (inventados) ---
  { categoria: 'parentesco', valores: ['Madre', 'Padre', 'Hermano(a)', 'Hijo(a)', 'Abuelo(a)', 'Cónyuge / Pareja', 'Otro familiar', 'No hay más convivientes'] },
  { categoria: 'servicio_publico', valores: ['Agua', 'Energía', 'Gas', 'Internet', 'Alcantarillado'] },
  { categoria: 'poblacion', valores: ['Desplazado', 'Víctima del conflicto', 'Campesino', 'Migrante retornado', 'Ninguna'] },
  { categoria: 'situacion_hogar', valores: ['Desempleo en el hogar', 'Violencia intrafamiliar', 'Consumo de sustancias en el hogar', 'Enfermedad de un familiar', 'Falta de vivienda'] },
  { categoria: 'problematica_sector', valores: ['Inseguridad', 'Vías en mal estado', 'Inundaciones', 'Ruido', 'Contaminación', 'Agua potable deficiente'] },
  // --- Fichas (matrícula/Sofía Plus; ficticias) ---
  { categoria: 'programa', valores: ['Análisis y Desarrollo de Software', 'Técnico en Cocina', 'Logística Empresarial', 'Contabilidad y Finanzas'] },
  { categoria: 'jornada', valores: ['Diurna', 'Nocturna', 'Mixta', 'Fin de semana'] },
  { categoria: 'modalidad', valores: ['Presencial', 'Virtual'] },
  { categoria: 'nivel_formacion', valores: ['Técnico', 'Tecnólogo'] },
];

async function asegurarCatalogos(): Promise<Map<string, string>> {
  const mapa = new Map<string, string>();
  for (const { categoria, valores } of CATALOGOS) {
    for (let i = 0; i < valores.length; i++) {
      const valor = valores[i];
      const clave = `${categoria}:${valor}`;
      const existente = await prisma.catalogo.findFirst({ where: { categoria, valor } });
      const fila =
        existente ??
        (await prisma.catalogo.create({ data: { categoria, valor, orden: i + 1, activo: true } }));
      mapa.set(clave, fila.id);
    }
  }
  return mapa;
}

const cat = (mapa: Map<string, string>, categoria: string, valor: string): string => {
  const id = mapa.get(`${categoria}:${valor}`);
  if (!id) throw new Error(`Catálogo no encontrado: ${categoria} / ${valor}`);
  return id;
};

// -----------------------------------------------------------------------------
// 2. UTILIDADES
// -----------------------------------------------------------------------------
/** Hash bcrypt (lo declarado por el backend). NUNCA texto plano en Usuario.password. */
function hashPassword(plain: string): string {
  return bcrypt.hashSync(plain, 10);
}

/** RAD-SENA-AAAA-NNNNNN con la secuencia creada en la migración checks_y_rls. */
async function siguienteRadicado(tx: { $queryRaw: PrismaClient['$queryRaw']; caracterizacion: PrismaClient['caracterizacion'] }): Promise<string> {
  const anio = new Date().getFullYear();
  try {
    const res = await tx.$queryRaw<{ nextval: bigint }[]>`SELECT nextval('radicado_seq') AS nextval`;
    return `RAD-SENA-${anio}-${String(Number(res[0].nextval)).padStart(6, '0')}`;
  } catch {
    // Fallback si la migración checks_y_rls aún no corre (solo dev)
    const n = await tx.caracterizacion.count();
    return `RAD-SENA-${anio}-${String(n + 1).padStart(6, '0')}`;
  }
}

// -----------------------------------------------------------------------------
// 3. APRENDICES FICTICIOS (6)
// -----------------------------------------------------------------------------
type AprendizDemo = {
  documento: string;
  nombre: string;
  fechaNac: string;
  ciudad: string;
  direccion: string;
  estrato: string;
  sexo: string;
  lgbtiq: boolean;
  orientacion?: string;
  estadoCivil: string;
  correoPersonal: string;
  correoInst: string;
  telefono: string;
  acudiente: string;
  telAcudiente: string;
  parentescoAcudiente: string;
  ficha: string;
  programa: string;
  jornada: string;
  modalidad: string;
  nivelFormacion: string;
  // salud
  eps: string;
  regimenSalud: string;
  sisbenEstado: 'Sí' | 'No' | 'En trámite';
  grupoSisben?: string;
  discapacidad: boolean;
  tipoDiscapacidad?: string;
  // salud sexual (NULL = no aplica, solo condicionales)
  enGestacion: boolean | null;
  semanaGestacion?: number | null;
  enLactancia: boolean | null;
  anticonceptivo?: string;
  hijos: number;
  personasHogar: number;
  // covid
  vacunado: boolean;
  vacuna?: string;
  dosis?: number;
  esquemaCompleto: boolean;
  // economía
  sustento: string;
  personasACargo: number;
  rangoIngresos: string;
  fuenteIngresos: string;
  grupoEtnico: string;
  apoyo?: string;
  // perfil
  nivelPrevio: string;
  previaSena: boolean;
  motivacion: string;
  trabaja: boolean;
  lugarTrabajo?: string;
  estadoCaracterizacion: 'completa' | 'en_curso';
};

const APRENDICES_DEMO: AprendizDemo[] = [
  {
    documento: '109989001', nombre: 'Aprendiz Uno Demo', fechaNac: '2004-03-12', ciudad: 'Palmira',
    direccion: 'Calle ficticia 1 #2-03', estrato: 'Estrato 2', sexo: 'Mujer', lgbtiq: false,
    estadoCivil: 'Soltero(a)', correoPersonal: 'demo1.ficticio@ejemplo.com', correoInst: 'demo1@soy.sena.edu.co',
    telefono: '3001110001', acudiente: 'Acudiente Uno Demo', telAcudiente: '3001111001', parentescoAcudiente: 'Madre',
    ficha: '2807891', programa: 'Análisis y Desarrollo de Software', jornada: 'Diurna', modalidad: 'Presencial', nivelFormacion: 'Tecnólogo',
    eps: 'Nueva EPS', regimenSalud: 'Contributivo (Cotizante)', sisbenEstado: 'Sí', grupoSisben: 'Grupo B (Pobreza moderada)',
    discapacidad: false, enGestacion: false, enLactancia: false, hijos: 0, personasHogar: 4,
    vacunado: true, vacuna: 'Sinovac / CoronaVac', dosis: 2, esquemaCompleto: true,
    sustento: 'Madre', personasACargo: 0, rangoIngresos: 'Entre 1 y 2 SMMLV', fuenteIngresos: 'Salario fijo / Empleo formal',
    grupoEtnico: 'Ninguno / No se reconoce', nivelPrevio: 'Bachiller Académico', previaSena: false,
    motivacion: 'Vocación y gusto por la disciplina', trabaja: false, estadoCaracterizacion: 'completa',
  },
  {
    documento: '109989002', nombre: 'Aprendiz Dos Demo', fechaNac: '2002-11-02', ciudad: 'Pereira',
    direccion: 'Carrera ficticia 4 #5-06', estrato: 'Estrato 3', sexo: 'Hombre', lgbtiq: false,
    estadoCivil: 'Unión Libre', correoPersonal: 'demo2.ficticio@ejemplo.com', correoInst: 'demo2@soy.sena.edu.co',
    telefono: '3001110002', acudiente: 'Acudiente Dos Demo', telAcudiente: '3001111002', parentescoAcudiente: 'Cónyuge / Pareja',
    ficha: '2807892', programa: 'Logística Empresarial', jornada: 'Nocturna', modalidad: 'Presencial', nivelFormacion: 'Técnico',
    eps: 'Sura', regimenSalud: 'Subsidiado', sisbenEstado: 'Sí', grupoSisben: 'Grupo C (Vulnerable)',
    discapacidad: true, tipoDiscapacidad: 'Auditiva',
    enGestacion: null, enLactancia: null, hijos: 0, personasHogar: 3,
    vacunado: true, vacuna: 'Pfizer / BioNTech', dosis: 3, esquemaCompleto: true,
    sustento: 'El propio aprendiz', personasACargo: 1, rangoIngresos: 'Entre 1 y 2 SMMLV', fuenteIngresos: 'Trabajo independiente / Informal',
    grupoEtnico: 'Afrocolombiano / Negro / Mulato', apoyo: 'Subsidio de Transporte SENA',
    nivelPrevio: 'Técnico Laboral / Ocupacional', previaSena: true,
    motivacion: 'Inserción y oportunidad laboral inmediata', trabaja: true, lugarTrabajo: 'Bodega ficticia, horario diurno',
    estadoCaracterizacion: 'completa',
  },
  {
    documento: '109989003', nombre: 'Aprendiz Tres Demo', fechaNac: '2005-06-25', ciudad: 'Cali',
    direccion: 'Avenida ficticia 7 #8-09', estrato: 'Estrato 1', sexo: 'Mujer', lgbtiq: true, orientacion: 'Bisexual',
    estadoCivil: 'Soltero(a)', correoPersonal: 'demo3.ficticio@ejemplo.com', correoInst: 'demo3@soy.sena.edu.co',
    telefono: '3001110003', acudiente: 'Acudiente Tres Demo', telAcudiente: '3001111003', parentescoAcudiente: 'Padre',
    ficha: '2807891', programa: 'Análisis y Desarrollo de Software', jornada: 'Diurna', modalidad: 'Presencial', nivelFormacion: 'Tecnólogo',
    eps: 'Famisanar', regimenSalud: 'Subsidiado', sisbenEstado: 'Sí', grupoSisben: 'Grupo A (Pobreza extrema)', discapacidad: false,
    enGestacion: true, semanaGestacion: 24, enLactancia: false, anticonceptivo: 'Hormonal oral', hijos: 1, personasHogar: 5,
    vacunado: true, vacuna: 'Moderna', dosis: 2, esquemaCompleto: false,
    sustento: 'Ambos padres', personasACargo: 0, rangoIngresos: 'Menos de 1 SMMLV', fuenteIngresos: 'Subsidios del gobierno',
    grupoEtnico: 'Ninguno / No se reconoce', nivelPrevio: 'Bachiller Técnico', previaSena: false,
    motivacion: 'Continuar con estudios universitarios', trabaja: false, estadoCaracterizacion: 'completa',
  },
  {
    documento: '109989004', nombre: 'Aprendiz Cuatro Demo', fechaNac: '2003-01-30', ciudad: 'Bogotá',
    direccion: 'Calle ficticia 11 #12-13', estrato: 'Estrato 4', sexo: 'Intersexual', lgbtiq: true, orientacion: 'Heterosexual',
    estadoCivil: 'Casado(a)', correoPersonal: 'demo4.ficticio@ejemplo.com', correoInst: 'demo4@soy.sena.edu.co',
    telefono: '3001110004', acudiente: 'Acudiente Cuatro Demo', telAcudiente: '3001111004', parentescoAcudiente: 'Hermano(a)',
    ficha: '2807893', programa: 'Contabilidad y Finanzas', jornada: 'Mixta', modalidad: 'Virtual', nivelFormacion: 'Tecnólogo',
    eps: 'Coosalud', regimenSalud: 'Especial o Excepción', sisbenEstado: 'No', discapacidad: true, tipoDiscapacidad: 'Física / Motriz',
    enGestacion: null, enLactancia: null, hijos: 2, personasHogar: 4,
    vacunado: true, vacuna: 'AstraZeneca', dosis: 2, esquemaCompleto: true,
    sustento: 'Cónyuge / Pareja', personasACargo: 2, rangoIngresos: 'Más de 3 SMMLV', fuenteIngresos: 'Remesas del exterior',
    grupoEtnico: 'Rrom / Gitano',
    nivelPrevio: 'Universitario Incompleto', previaSena: false,
    motivacion: 'Emprender negocio propio', trabaja: true, lugarTrabajo: 'Taller propio ficticio, fines de semana',
    estadoCaracterizacion: 'completa',
  },
  {
    documento: '109989005', nombre: 'Aprendiz Cinco Demo', fechaNac: '2001-09-15', ciudad: 'Manizales',
    direccion: 'Calle ficticia 21 #22-23', estrato: 'Estrato 2', sexo: 'Mujer', lgbtiq: false,
    estadoCivil: 'Separado(a) / Divorciado(a)', correoPersonal: 'demo5.ficticio@ejemplo.com', correoInst: 'demo5@soy.sena.edu.co',
    telefono: '3001110005', acudiente: 'Acudiente Cinco Demo', telAcudiente: '3001111005', parentescoAcudiente: 'Abuelo(a)',
    ficha: '2807892', programa: 'Logística Empresarial', jornada: 'Nocturna', modalidad: 'Presencial', nivelFormacion: 'Técnico',
    eps: 'Mutual Ser', regimenSalud: 'Subsidiado', sisbenEstado: 'Sí', grupoSisben: 'Grupo B (Pobreza moderada)', discapacidad: false,
    enGestacion: false, enLactancia: true, anticonceptivo: 'DIU', hijos: 1, personasHogar: 3,
    vacunado: false, esquemaCompleto: false,
    sustento: 'Abuelo(a)', personasACargo: 1, rangoIngresos: 'Entre 1 y 2 SMMLV', fuenteIngresos: 'Ayuda de familiares',
    grupoEtnico: 'Indígena', apoyo: 'Renta Ciudadana / Familias en Acción',
    nivelPrevio: 'Bachiller Académico', previaSena: true,
    motivacion: 'Recomendación de familiares', trabaja: false, estadoCaracterizacion: 'completa',
  },
  {
    documento: '109989006', nombre: 'Aprendiz Seis Demo', fechaNac: '2004-07-07', ciudad: 'Fusagasugá',
    direccion: 'Calle ficticia 31 #32-33', estrato: 'Estrato 1', sexo: 'Hombre', lgbtiq: false,
    estadoCivil: 'Soltero(a)', correoPersonal: 'demo6.ficticio@ejemplo.com', correoInst: 'demo6@soy.sena.edu.co',
    telefono: '3001110006', acudiente: 'Acudiente Seis Demo', telAcudiente: '3001111006', parentescoAcudiente: 'Tío(a)',
    ficha: '2807893', programa: 'Contabilidad y Finanzas', jornada: 'Diurna', modalidad: 'Presencial', nivelFormacion: 'Tecnólogo',
    eps: 'Compensar', regimenSalud: 'No asegurado', sisbenEstado: 'En trámite', discapacidad: false,
    enGestacion: null, enLactancia: null, hijos: 0, personasHogar: 2,
    vacunado: true, vacuna: 'Janssen (Johnson & Johnson)', dosis: 1, esquemaCompleto: true,
    sustento: 'El propio aprendiz', personasACargo: 0, rangoIngresos: 'Entre 2 y 3 SMMLV', fuenteIngresos: 'Pensión / Jubilación',
    grupoEtnico: 'Ninguno / No se reconoce',
    nivelPrevio: 'Bachiller Técnico', previaSena: false,
    motivacion: 'Emprender negocio propio', trabaja: true, lugarTrabajo: 'Transportadora ficticia, medio tiempo',
    estadoCaracterizacion: 'en_curso',
  },
];

async function crearAprendizDemo(
  tx: Omit<TxClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>,
  mapa: Map<string, string>,
  a: AprendizDemo,
): Promise<void> {
  // Ficha (proviene de matrícula; ficticia)
  let fichaFila = await tx.ficha.findUnique({ where: { numeroFicha: a.ficha } });
  if (!fichaFila) {
    fichaFila = await tx.ficha.create({
      data: {
        numeroFicha: a.ficha,
        programaId: cat(mapa, 'programa', a.programa),
        jornadaId: cat(mapa, 'jornada', a.jornada),
        modalidadId: cat(mapa, 'modalidad', a.modalidad),
        nivelFormacionId: cat(mapa, 'nivel_formacion', a.nivelFormacion),
        instructorResponsable: 'Instructor Demo (ficticio)',
      },
    });
  }

  // Aprendiz (edad NO se guarda: se calcula desde fecha_nacimiento)
  const aprendiz = await tx.aprendiz.upsert({
    where: { numeroDocumento: a.documento },
    update: {},
    create: {
      usuario: a.documento, // mismo documento (convención del schema)
      nombreCompleto: a.nombre,
      tipoDocumentoId: cat(mapa, 'tipo_documento', a.documento.startsWith('108') ? 'TI - Tarjeta de Identidad' : 'CC - Cédula de Ciudadanía'),
      numeroDocumento: a.documento,
      fechaNacimiento: new Date(a.fechaNac),
      sexoId: cat(mapa, 'sexo', a.sexo),
      seReconoceLgbtiq: a.lgbtiq,
      orientacionSexualId: a.orientacion ? cat(mapa, 'orientacion_sexual', a.orientacion) : null,
      estadoCivilId: cat(mapa, 'estado_civil', a.estadoCivil),
      correoPersonal: a.correoPersonal,
      correoInstitucional: a.correoInst,
      telefono: a.telefono,
      contactoEmergenciaNombre: a.acudiente,
      contactoEmergenciaTelefono: a.telAcudiente,
      contactoEmergenciaParentescoId: cat(mapa, 'parentesco_acudiente', a.parentescoAcudiente),
    },
  });

  // Caracterización v1 para este aprendiz
  const fechaCaracterizacion = new Date(new Date().toISOString().slice(0, 10));
  const caracterizacion = await tx.caracterizacion.create({
    data: {
      aprendizId: aprendiz.id,
      fecha: fechaCaracterizacion,
      version: 1,
      estado: a.estadoCaracterizacion,
    },
  });

  // El radicado se asigna cuando la caracterización pasa a 'completa' (decisión 6)
  if (a.estadoCaracterizacion === 'completa') {
    await tx.caracterizacion.update({
      where: { id: caracterizacion.id },
      data: { radicado: await siguienteRadicado(tx) },
    });
  }

  await tx.aceptacionPolitica.create({
    data: {
      aprendizId: aprendiz.id,
      aceptado: true,
      fechaAceptacion: new Date(),
      textoVersion: 'v2026-01', // decisión P1 (provisional hasta que se publique el texto oficial)
    },
  });

  // Formación (snapshot de la matrícula por caracterización)
  await tx.formacion.create({
    data: {
      aprendizId: aprendiz.id,
      caracterizacionId: caracterizacion.id,
      fichaId: fichaFila.id,
    },
  });

  // Satélites 1:1 ligados a la caracterización
  await tx.localizacion.create({
    data: {
      aprendizId: aprendiz.id,
      caracterizacionId: caracterizacion.id,
      direccion: a.direccion,
      ciudadId: cat(mapa, 'ciudad', a.ciudad),
      barrioId: null,                 // pendiente del front (nullable aprobado)
      estratoId: cat(mapa, 'estrato', a.estrato),
      zonaId: null,                   // pendiente del front
      tenenciaViviendaId: null,       // pendiente del front
      medioTransporteId: null,        // pendiente del front
    },
  });

  await tx.salud.create({
    data: {
      aprendizId: aprendiz.id,
      caracterizacionId: caracterizacion.id,
      afiliadoSalud: a.regimenSalud !== 'No asegurado',
      epsId: cat(mapa, 'eps', a.eps),
      regimenSaludId: cat(mapa, 'regimen_salud', a.regimenSalud),
      sisbenEstadoId: cat(mapa, 'sisben_estado', a.sisbenEstado), // decisión P2
      grupoSisbenId: a.grupoSisben ? cat(mapa, 'grupo_sisben', a.grupoSisben) : null,
      trastornoMental: false,
      psicoterapia: false,
      discapacidadCertificada: a.discapacidad,
      presentaDiscapacidad: a.discapacidad,
      tipoDiscapacidadId: a.tipoDiscapacidad ? cat(mapa, 'tipo_discapacidad', a.tipoDiscapacidad) : null,
      alergia: false,
      consumeSustancias: false,
      medicamentoPermanente: false,
    },
  });

  await tx.saludSexualReproductiva.create({
    data: {
      aprendizId: aprendiz.id,
      caracterizacionId: caracterizacion.id,
      enGestacion: a.enGestacion,                    // null = no aplica (condicional)
      semanaGestacion: a.semanaGestacion ?? null,    // CHECK: solo con en_gestacion = true
      enLactancia: a.enLactancia,                    // null = no aplica (condicional)
      cabezaFamilia: a.hijos > 0,
      numHijos: a.hijos,
      numPersonasHogar: a.personasHogar,
      metodoAnticonceptivoId: a.anticonceptivo ? cat(mapa, 'metodo_anticonceptivo', a.anticonceptivo) : null,
      anticonceptivoDetalle: null,
      deseaAsesoria: false,
    },
  });

  await tx.covid19.create({
    data: {
      aprendizId: aprendiz.id,
      caracterizacionId: caracterizacion.id,
      vacunado: a.vacunado,
      vacunaId: a.vacuna ? cat(mapa, 'vacuna_covid', a.vacuna) : null,
      dosis: a.dosis ?? null,                // CHECK 0..4
      esquemaCompleto: a.esquemaCompleto,
    },
  });

  // Banderas jefe_hogar / sostiene_hogar derivadas del sustento (decisión 4)
  const aportaElAprendiz = a.sustento === 'El propio aprendiz';
  await tx.situacionEconomica.create({
    data: {
      aprendizId: aprendiz.id,
      caracterizacionId: caracterizacion.id,
      jefeHogar: aportaElAprendiz,
      sostieneHogar: aportaElAprendiz,
      sustentoPrincipalId: cat(mapa, 'sustento_principal', a.sustento),
      personasACargo: a.personasACargo,
      rangoIngresosId: cat(mapa, 'rango_ingresos', a.rangoIngresos),
      fuenteIngresosId: cat(mapa, 'fuente_ingresos', a.fuenteIngresos),
      grupoEtnicoId: cat(mapa, 'grupo_etnico', a.grupoEtnico),
    },
  });

  await tx.perfilOcupacional.create({
    data: {
      aprendizId: aprendiz.id,
      caracterizacionId: caracterizacion.id,
      nivelFormacionPrevioId: cat(mapa, 'nivel_formacion_previo', a.nivelPrevio),
      formacionPreviaSena: a.previaSena,
      motivacionId: cat(mapa, 'motivacion', a.motivacion),
      trabajaActualmente: a.trabaja,
      lugarHorarioTrabajo: a.lugarTrabajo ?? null,
    },
  });

  // Ejemplo multivalor con caracterizacion_id: un apoyo con detalle si aplica
  if (a.apoyo) {
    const esOtro = a.apoyo === 'Otro subsidio público';
    await tx.apoyoEstado.create({
      data: {
        aprendizId: aprendiz.id,
        caracterizacionId: caracterizacion.id,
        tipoApoyoId: cat(mapa, 'apoyo_estado', a.apoyo),
        detalleOtra: esOtro ? 'Detalle ficticio de otro subsidio' : null,
      },
    });
  }
}

async function main() {
  console.log('>> Seed SCRUM-52 (datos exclusivamente ficticios)');

  const mapa = await asegurarCatalogos();
  console.log(`>> Catálogos listos: ${mapa.size} valores`);

  // Usuarios SENA ficticios (password solo como hash)
  await prisma.usuario.upsert({
    where: { correo: 'admin.demo@ejemplo.com' },
    update: {},
    create: {
      nombre: 'Admin Demo (ficticio)',
      correo: 'admin.demo@ejemplo.com',
      password: hashPassword('demo-no-produccion'),
      rol: 'admin',
    },
  });
  await prisma.usuario.upsert({
    where: { correo: 'lider.demo@ejemplo.com' },
    update: {},
    create: {
      nombre: 'Líder Bienestar Demo (ficticio)',
      correo: 'lider.demo@ejemplo.com',
      password: hashPassword('demo-no-produccion'),
      rol: 'lider_bienestar',
    },
  });

  for (const a of APRENDICES_DEMO) {
    await prisma.$transaction(async (tx) => {
      // Idempotencia simple: si el aprendiz ya tiene caracterización, se omite
      const previo = await tx.aprendiz.findUnique({
        where: { numeroDocumento: a.documento },
        include: { caracterizaciones: { select: { id: true }, take: 1 } },
      });
      if (previo && previo.caracterizaciones.length > 0) {
        console.log(`>> Omitido (ya sembrado): ${a.nombre} (${a.documento})`);
        return;
      }
      await crearAprendizDemo(tx, mapa, a);
      console.log(`>> Aprendiz demo creado: ${a.nombre} (${a.documento})`);
    }, { maxWait: 10000, timeout: 60000 }); // Supabase remoto: el default de 5 s expira con P2028
  }

  const conteo = {
    catalogos: await prisma.catalogo.count(),
    aprendices: await prisma.aprendiz.count(),
    caracterizaciones: await prisma.caracterizacion.count(),
    fichas: await prisma.ficha.count(),
    usuarios: await prisma.usuario.count(),
  };
  console.log('>> Seed terminado:', conteo);
}

main()
  .catch((e) => {
    console.error('>> Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
