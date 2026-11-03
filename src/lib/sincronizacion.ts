import { MiCaracterizacionResponse } from './caracterizacion';
import { saveRespuestasModulo, getRespuestasModulo } from './formulariosStore';

/**
 * Normaliza y formatea una fecha ISO a YYYY-MM-DD para inputs HTML de tipo date.
 */
export function formatearFechaInput(fechaIso?: string | null): string | undefined {
  if (!fechaIso) return undefined;
  try {
    const d = new Date(fechaIso);
    if (isNaN(d.getTime())) return undefined;
    return d.toISOString().split('T')[0];
  } catch {
    return undefined;
  }
}

/**
 * Calcula la edad en años a partir de una fecha de nacimiento ISO o YYYY-MM-DD.
 */
export function calcularEdad(fechaIso?: string | null): number | undefined {
  if (!fechaIso) return undefined;
  try {
    const nac = new Date(fechaIso);
    if (isNaN(nac.getTime())) return undefined;
    const diffMs = Date.now() - nac.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  } catch {
    return undefined;
  }
}

/**
 * Normaliza el tipo de documento para coincidir con las opciones del formulario
 */
export function normalizarTipoDoc(val?: string | null): string | undefined {
  if (!val) return undefined;
  const upper = val.toUpperCase().trim();
  if (upper === 'TI' || upper.startsWith('TI -') || upper.includes('IDENTIDAD')) return 'TI - Tarjeta de Identidad';
  if (upper === 'CC' || upper.startsWith('CC -') || upper.includes('CIUDADAN')) return 'CC - Cédula de Ciudadanía';
  if (upper === 'CE' || upper.startsWith('CE -') || upper.includes('EXTRANJER')) return 'CE - Cédula de Extranjería';
  if (upper === 'PPT' || upper.startsWith('PPT -') || upper.includes('PROTECCI')) return 'PPT - Permiso por Protección Temporal';
  return val;
}

/**
 * Normaliza el sexo para coincidir con las opciones: "Hombre" | "Mujer" | "Intersexual"
 */
export function normalizarSexo(val?: string | null): string | undefined {
  if (!val) return undefined;
  const lower = val.toLowerCase().trim();
  if (lower.startsWith('fem') || lower === 'mujer') return 'Mujer';
  if (lower.startsWith('masc') || lower === 'hombre') return 'Hombre';
  if (lower.startsWith('inter')) return 'Intersexual';
  return val;
}

/**
 * Normaliza estrato socioeconómico (ej. "2" -> "Estrato 2")
 */
export function normalizarEstrato(val?: string | null): string | undefined {
  if (!val) return undefined;
  const trim = val.trim();
  if (/^[1-6]$/.test(trim)) return `Estrato ${trim}`;
  return trim;
}

/**
 * Normaliza estado civil
 */
export function normalizarEstadoCivil(val?: string | null): string | undefined {
  if (!val) return undefined;
  const lower = val.toLowerCase().trim();
  if (lower.startsWith('solter')) return 'Soltero(a)';
  if (lower.startsWith('casad')) return 'Casado(a)';
  if (lower.includes('libre')) return 'Unión Libre';
  if (lower.includes('separ') || lower.includes('divorc')) return 'Separado(a) / Divorciado(a)';
  if (lower.startsWith('viud')) return 'Viudo(a)';
  return val;
}

/**
 * Mapea la información anidada retornada por el backend (PostgreSQL) a los
 * identificadores planos utilizados por los formularios de caracterización.
 */
export function mapearDatosBackendAFormularios(data: MiCaracterizacionResponse): {
  basica: Record<string, any>;
  salud: Record<string, any>;
  socioeconomica: Record<string, any>;
  formativo: Record<string, any>;
} {
  // Tomar el aprendiz más completo disponible
  const aprendiz = data.caracterizacion?.aprendiz || data.aprendiz;
  const c = data.caracterizacion;

  const loc = c?.localizaciones?.[0];
  const salud = c?.saludes?.[0];
  const ssr = c?.saludesSexuales?.[0];
  const socio = c?.situaciones?.[0];
  const covid = c?.covids19?.[0];
  const perfil = c?.perfiles?.[0];
  const apoyo = c?.apoyos?.[0];

  // 1. Módulo Básica
  const basica: Record<string, any> = {};
  if (aprendiz) {
    if (aprendiz.nombreCompleto) basica.nombre = aprendiz.nombreCompleto;
    const rawTipoDoc = aprendiz.tipoDocumento?.valor || (aprendiz as any).tipoDoc || (aprendiz as any).tipoDocumento;
    if (rawTipoDoc) {
      basica.tipoDoc = normalizarTipoDoc(typeof rawTipoDoc === 'string' ? rawTipoDoc : rawTipoDoc.valor);
    }
    if (aprendiz.numeroDocumento) basica.numDoc = aprendiz.numeroDocumento;
    if (aprendiz.fechaNacimiento) {
      basica.fechaNac = formatearFechaInput(aprendiz.fechaNacimiento);
      const edadCalc = calcularEdad(aprendiz.fechaNacimiento);
      if (edadCalc !== undefined) basica.edad = edadCalc;
    }
    if (aprendiz.sexo?.valor) basica.sexo = normalizarSexo(aprendiz.sexo.valor);
    if (aprendiz.seReconoceLgbtiq !== undefined && aprendiz.seReconoceLgbtiq !== null) {
      basica.lgbtiq = aprendiz.seReconoceLgbtiq ? "Sí" : "No";
    }
    if (aprendiz.orientacionSexual?.valor) basica.orientacion = aprendiz.orientacionSexual.valor;
    if (aprendiz.estadoCivil?.valor) basica.estadoCivil = normalizarEstadoCivil(aprendiz.estadoCivil.valor);
    if (aprendiz.correoPersonal) basica.correoPersonal = aprendiz.correoPersonal;
    if (aprendiz.correoInstitucional) basica.correoInst = aprendiz.correoInstitucional;
    if (aprendiz.telefono) basica.telefono = aprendiz.telefono;
    if (aprendiz.contactoEmergenciaNombre) basica.acudiente = aprendiz.contactoEmergenciaNombre;
    if (aprendiz.contactoEmergenciaTelefono) basica.telAcudiente = aprendiz.contactoEmergenciaTelefono;
    if (aprendiz.contactoEmergenciaParentesco?.valor) basica.parentesco = aprendiz.contactoEmergenciaParentesco.valor;
  }
  if (loc) {
    if (loc.direccion) basica.direccion = loc.direccion;
    if (loc.ciudad?.valor) basica.municipio = loc.ciudad.valor;
    if (loc.estrato?.valor) basica.estrato = normalizarEstrato(loc.estrato.valor);
  }

  // 2. Módulo Salud (física y sexual)
  const saludModulo: Record<string, any> = {};
  if (salud) {
    if (salud.eps?.valor) saludModulo.eps = salud.eps.valor;
    if (salud.regimenSalud?.valor) saludModulo.regimenSalud = salud.regimenSalud.valor;
    if (salud.sisbenEstado?.valor) saludModulo.sisben = salud.sisbenEstado.valor;
    if (salud.grupoSisben?.valor) saludModulo.grupoSisben = salud.grupoSisben.valor;
    if (salud.presentaDiscapacidad !== undefined && salud.presentaDiscapacidad !== null) {
      saludModulo.tieneDiscapacidad = salud.presentaDiscapacidad ? "Sí" : "No";
    }
    if (salud.tipoDiscapacidad?.valor) saludModulo.tipoDiscapacidad = salud.tipoDiscapacidad.valor;
    saludModulo.enfermedadCronica = salud.enfermedadOtra ? "Sí" : "No";
    if (salud.enfermedadOtra) saludModulo.descripcionEnfermedad = salud.enfermedadOtra;
    if (salud.requiereMedicamento !== undefined && salud.requiereMedicamento !== null) {
      saludModulo.tomaMedicamentos = salud.requiereMedicamento ? "Sí" : "No";
    }
  }
  if (ssr) {
    if (ssr.enGestacion === true) saludModulo.gestacion = "Sí";
    else if (ssr.enGestacion === false) saludModulo.gestacion = "No";
    else saludModulo.gestacion = "No aplica";

    if (ssr.semanaGestacion != null) saludModulo.semanaGestacion = String(ssr.semanaGestacion);

    if (ssr.enLactancia === true) saludModulo.lactancia = "Sí";
    else if (ssr.enLactancia === false) saludModulo.lactancia = "No";
    else saludModulo.lactancia = "No aplica";

    saludModulo.madrePadreCabezaFamilia = ssr.cabezaFamilia ? "Sí" : "No";
    if (ssr.numHijos != null) saludModulo.hijosACargo = String(ssr.numHijos);
    if (ssr.numPersonasHogar != null) saludModulo.totalPersonasHogar = String(ssr.numPersonasHogar);
    if (ssr.metodoAnticonceptivo?.valor) saludModulo.utilizaMetodoPlanificacion = ssr.metodoAnticonceptivo.valor;
  }

  // 3. Módulo Socioeconómica
  const socioeconomica: Record<string, any> = {};
  if (socio) {
    if (socio.sustentoPrincipal?.valor) socioeconomica.jefaturaHogar = socio.sustentoPrincipal.valor;
    if (socio.personasACargo != null) socioeconomica.personasACargo = String(socio.personasACargo);
    if (ssr?.numPersonasHogar != null) socioeconomica.totalPersonasHogar = String(ssr.numPersonasHogar);
    if (socio.rangoIngresos?.valor) socioeconomica.rangoIngresosMensuales = socio.rangoIngresos.valor;
    if (socio.fuenteIngresos?.valor) socioeconomica.fuenteIngresos = socio.fuenteIngresos.valor;
    if (socio.grupoEtnico?.valor) socioeconomica.grupoEtnico = socio.grupoEtnico.valor;
  }
  if (perfil) {
    socioeconomica.trabajaActualmente = perfil.trabajaActualmente ? "Sí (Tiempo completo)" : "No";
  }
  if (apoyo?.tipoApoyo?.valor) {
    socioeconomica.apoyosEstatales = apoyo.tipoApoyo.valor;
  }

  // 4. Módulo Formativo
  const formativo: Record<string, any> = {};
  if (perfil) {
    if (perfil.nivelFormacionPrevio?.valor) formativo.nivelEducativoPrevio = perfil.nivelFormacionPrevio.valor;
    formativo.formacionPreviaSena = perfil.formacionPreviaSena ? "Sí (Programa técnico titulado)" : "No";
    if (perfil.motivacion?.valor) formativo.motivacionIngreso = perfil.motivacion.valor;
  }
  if (covid) {
    formativo.vacunado = covid.vacunado ? "Sí" : "No";
    if (covid.vacuna?.valor) formativo.biologico = covid.vacuna.valor;
    if (covid.dosis != null) formativo.dosis = `${covid.dosis} dosis`;
    formativo.esquemaCompleto = covid.esquemaCompleto ? "Sí" : "No";
  }

  return { basica, salud: saludModulo, socioeconomica, formativo };
}

/**
 * Guarda en el store local (localStorage) las respuestas mapeadas desde el backend,
 * respetando cualquier borrador reciente que el usuario esté editando pero sin
 * permitir que campos vacíos borren campos ya conocidos del backend.
 */
export async function sincronizarRespuestasConStore(data: MiCaracterizacionResponse): Promise<void> {
  const mapeados = mapearDatosBackendAFormularios(data);
  const modulos = ['basica', 'salud', 'socioeconomica', 'formativo'] as const;

  for (const m of modulos) {
    const existentes = getRespuestasModulo(m);
    
    // Filtrar existentes para no sobreescribir con strings vacíos o undefined
    const existentesValidos: Record<string, any> = {};
    for (const [k, v] of Object.entries(existentes)) {
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        if (k === 'tipoDoc') {
          existentesValidos[k] = normalizarTipoDoc(v) || v;
        } else if (k === 'sexo') {
          existentesValidos[k] = normalizarSexo(v) || v;
        } else if (k === 'estrato') {
          existentesValidos[k] = normalizarEstrato(v) || v;
        } else if (k === 'estadoCivil') {
          existentesValidos[k] = normalizarEstadoCivil(v) || v;
        } else {
          existentesValidos[k] = v;
        }
      }
    }

    const fusionados = {
      ...mapeados[m],
      ...existentesValidos,
    };

    await saveRespuestasModulo(m, fusionados, data.aprendiz.numeroDocumento);
  }
}
