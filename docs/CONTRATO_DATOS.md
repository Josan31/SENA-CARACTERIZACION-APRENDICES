# CONTRATO DE DATOS — SCRUM-52 (Fase 2 · parte fija)

**Fecha:** 2026-10-24 · **Rama:** `feature/bd-scrum-52`
Define el JSON que el backend (NestJS) debe recibir para guardar una caracterización y cómo se mapea a tablas dentro de una transacción. El gestor de preguntas (frontend) no se toca: el payload usa los **ids de pregunta del gestor tal cual** (`respuestas` de `src/data/formularios_respuestas.json`).

---

## 1. Formato de entrada (POST de caracterización)

```jsonc
{
  // OBLIGATORIO. Sustituye al placeholder "aprendizDoc": "aprendiz_default" queda prohibido.
  "numero_documento": "1045889741",

  // Opcional: si no viene, el backend usa la fecha del día (solo fecha, @db.Date)
  "fecha": "2026-10-24",

  "modulos": {
    "basica": {
      "nombre": "Valentina Gómez Mejía",
      "tipoDoc": "CC - Cédula de Ciudadanía",
      "fechaNac": "2006-03-14",
      "edad": "19",                       // <- SE IGNORA: se calcula desde fechaNac
      "sexo": "Mujer",
      "lgbtiq": "Sí",
      "orientacion": "Bisexual",          // o "Prefiero no responder" → NULL
      "estadoCivil": "Soltero(a)",
      "correoPersonal": "…",
      "correoInst": "…",                  // o null
      "telefono": "…",                    // o null
      "acudiente": "…",
      "telAcudiente": "…",
      "parentesco": "Madre",
      "direccion": "…",
      "municipio": "Palmira",             // texto → catalogos(ciudad)
      "estrato": "Estrato 2"
    },
    "salud": {
      "eps": "Nueva EPS",
      "regimenSalud": "Subsidiado",
      "sisben": "Sí",                     // "Sí"|"No"|"En trámite" → cat. sisben_estado (P2 aprobado)
      "grupoSisben": "Grupo B (Pobreza moderada)",
      "tieneDiscapacidad": "Sí",
      "tipoDiscapacidad": "Auditiva",     // "Ninguna" → NULL
      "enfermedadCronica": "Sí",          // Sí → requiere descripcionEnfermedad
      "descripcionEnfermedad": "…",       // o null
      "tomaMedicamentos": "No",
      "gestacion": "No aplica",           // "Sí"|"No"|"No aplica" → NULL
      "lactancia": "No aplica",           // mismo caso que gestación
      "madrePadreCabezaFamilia": "Sí",
      "hijosACargo": "2",                 // string numérico hoy; el contrato acepta string|int
      "utilizaMetodoPlanificacion": "No"  // "Sí" sin método se guarda NULL (ver P3)
    },
    "socioeconomica": {
      "jefaturaHogar": "El propio aprendiz",
      "personasACargo": "1",
      "totalPersonasHogar": "4",
      "rangoIngresosMensuales": "Entre 1 y 2 SMMLV",
      "fuenteIngresos": "Salario fijo / Empleo formal",
      "trabajaActualmente": "Sí (Medio tiempo)",
      "grupoEtnico": "Ninguno / No se reconoce",
      "apoyosEstatales": "Subsidio de Transporte SENA"
    },
    "formativo": {
      "nivelEducativoPrevio": "Bachiller Académico",
      "formacionPreviaSena": "Sí (Programa tecnólogo)",
      "motivacionIngreso": "Vocación y gusto por la disciplina",
      "expectativaLaboral": "…",           // NO PERSISTE (tabla dinámica, design pendiente)
      "manejoHerramientasDigitales": "…",  // NO PERSISTE (tabla dinámica, design pendiente)
      "vacunado": "Sí",
      "biologico": "Sinovac / CoronaVac",
      "dosis": "2",
      "esquemaCompleto": "Sí"
    }
  }
}
```

Respuesta del backend (UNA transacción, todo-o-nada):

```jsonc
{
  "aprendiz_id":  "uuid…",
  "caracterizacion_id":  "uuid…",
  "version": 4,
  "estado": "en_curso" | "completa",
  "radicado": "RAD-SENA-2026-000123" | null   // solo cuando estado = 'completa'
}
```

## 2. Reglas de traducción de valores

| Regla | Detalle |
|-------|---------|
| R1 · texto → catálogo | El backend resuelve el id en `catalogos` por match exacto tras **trim + lowercase** (`categoria` = nombre snake_case). Categoría por columna: ver §3. Si el valor no existe → **422** con `{ campo, valor }` y ROLLBACK total (no inventar catálogos ajenos al gestor). |
| R2 · Sí/No → boolean | `lgbtiq`, `tieneDiscapacidad`, `tomaMedicamentos`, `madrePadreCabezaFamilia`, `vacunado`, `esquemaCompleto`, `formacionPreviaSena` → `startsWith("Sí")` (los "Sí (…)" con detalle caen en `true`). |
| R3 · NULL = No aplica | SOLO en condicionales: `gestacion`, `lactancia`, semana de gestación y método anticonceptivo. "No aplica" y "Prefiero no responder" → NULL. El CHECK de BD exige `semana_gestacion IS NULL OR en_gestacion = TRUE`. |
| R4 · números | Los valores numéricos del gestor llegan como string → convertir a `Int`. Vacíos → 0 en contadores (`num_hijos`, `num_personas_hogar`, `personas_a_cargo`) y NULL en la opcional (`dosis`). |
| R5 · edad | `edad` NO se guarda nunca; se calcula desde `fecha_nac` (`@db.Date`). |
| R6 · booleano con detalle | `trabajaActualmente` y `formacionPreviaSena` guardan boolean (`startsWith("Sí")`); el DETALLE ("Tiempo completo", "Programa tecnólogo") no tiene columna hoy → se anota en `auditoria_accesos.detalle` si se quiere conservar (pendiente: columna o tablas dinámicas). |
| R7 · municipio | `municipio` → `catalogos(categoria='ciudad')` con match trim+lowercase. Ciudad no catalogada → 422 `ciudad_no_catalogada` (decisión 5: ciudad obligatoria; barrio/zona/tenencia/transporte van NULL hasta que el front los pregunte). |

## 3. Mapeo módulo → tabla.columna (todo dentro de UNA transacción)

| Pregunta (id del gestor) | tabla.columna | Tipo de traducción |
|--------------------------|---------------|--------------------|
| `nombre` | `aprendices.nombre_completo` | texto |
| `tipoDoc` | `aprendices.tipo_documento_id` | cat. `tipo_documento` |
| `numDoc` | `aprendices.numero_documento` (y `usuario`) | texto unique; **debe coincidir con `numero_documento` raíz** |
| `fechaNac` | `aprendices.fecha_nacimiento` | fecha ISO |
| `edad` | — (no persiste, se calcula) | descartada |
| `sexo` | `aprendices.sexo_id` | cat. `sexo` |
| `lgbtiq` | `aprendices.se_reconoce_lgbtiq` | R2 |
| `orientacion` | `aprendices.orientacion_sexual_id` | cat. `orientacion_sexual`; "Prefiero no responder" → NULL |
| `estadoCivil` | `aprendices.estado_civil_id` | cat. `estado_civil` |
| `correoPersonal` | `aprendices.correo_personal` | texto |
| `correoInst` | `aprendices.correo_institucional` | texto o NULL |
| `telefono` | `aprendices.telefono` | texto o NULL |
| `acudiente`/`telAcudiente`/`parentesco` | `aprendices.contacto_emergencia_nombre/telefono/parentesco_id` | texto / cat. `parentesco_acudiente` |
| `direccion` | `localizacion.direccion` | texto |
| `municipio` | `localizacion.ciudad_id` | cat. `ciudad` (R7) |
| `estrato` | `localizacion.estrato_id` | cat. `estrato` |
| `eps` | `salud.eps_id` | cat. `eps` |
| `regimenSalud` | `salud.regimen_salud_id` | cat. `regimen_salud` |
| `sisben` | `salud.sisben_estado_id` | cat. `sisben_estado` ("Sí" / "No" / "En trámite", decisión P2) |
| `grupoSisben` | `salud.grupo_sisben_id` | cat. `grupo_sisben` |
| `tieneDiscapacidad` | `salud.discapacidad_certificada` + `salud.presenta_discapacidad` | R2 (ambas mismas porque la duplicidad sigue sin resolver → ver P4) |
| `tipoDiscapacidad` | `salud.tipo_discapacidad_id` ("Ninguna" → NULL) | cat. `tipo_discapacidad` |
| `enfermedadCronica` | `salud.enfermedad_id` (deducida) + `salud.enfermedad_otra` | "Sí" + texto → `enfermedad_otra`; `enfermedades` (CIE-10) queda sin picker hoy |
| `tomaMedicamentos` | `salud.requiere_medicamento` | R2 (ver P4) |
| `gestacion`/`lactancia` | `ssr.en_gestacion` / `ssr.en_lactancia` | "Sí"=true, "No"=false, "No aplica"=NULL |
| (gestación Sí) + `semanaGestacion` | `ssr.semana_gestacion` | int 1..42 (CHECK) |
| `madrePadreCabezaFamilia` | `ssr.cabeza_familia` | R2 |
| `hijosACargo` | `ssr.num_hijos` | R4 (CHECK ≥ 0) |
| `totalPersonasHogar` | `ssr.num_personas_hogar` | R4 (CHECK ≥ 1) |
| `utilizaMetodoPlanificacion` | `ssr.metodo_anticonceptivo_id` | "Sí" sin "¿cuál?" → NULL (ver P3); "Prefiero no responder" → NULL |
| `jefaturaHogar` | `se.sustento_principal_id` + banderas `jefe_hogar`/`sostiene_hogar` | cat. `sustento_principal`; banderas = `true` solo cuando el valor es "El propio aprendiz" (decisión 4: reutilización) |
| `personasACargo` | `se.personas_a_cargo` | R4 (nueva columna aprobada) |
| `rangoIngresosMensuales` | `se.rango_ingresos_id` | cat. `rango_ingresos` |
| `fuenteIngresos` | `se.fuente_ingresos_id` | cat. `fuente_ingresos` |
| `trabajaActualmente` | `po.trabaja_actualmente` (+ `po.lugar_horario_trabajo` no pregunta hoy) | R2/R6 |
| `grupoEtnico` | `se.grupo_etnico_id` | cat. `grupo_etnico` |
| `apoyosEstatales` | `apoyos_estado` (1 fila, multivalor listo) | cat. `apoyo_estado`; "Otro subsidio público" → `detalle_otra` |
| `nivelEducativoPrevio` | `po.nivel_formacion_previo_id` | cat. `nivel_formacion_previo` |
| `formacionPreviaSena` | `po.formacion_previa_sena` | R6 |
| `motivacionIngreso` | `po.motivacion_id` | cat. `motivacion` |
| `vacunado`/`biologico`/`dosis`/`esquemaCompleto` | `covid19.vacunado/vacuna_id/dosis/esquema_completo` | R2 / cat. `vacuna_covid` / R4 / R2 |
| `expectativaLaboral`, `manejoHerramientasDigitales` | — sin migración (dinámica, §5) | descartadas en esta fase |
| (prueba `esPersonalizada`) | descartada; no va ni al seed | — |

**No se persisten en esta fase** (vendrán del formulario u otro módulo): `fichas`/`formacion` (matrícula/Sofía Plus), `servicios_publicos`, `parentescos_hogar`, `poblaciones_reconocidas` (solapa con grupo étnico, ver R4 del análisis), `situaciones_hogar`, `problematicas_sector`, `barrio/zona/tenencia/transporte` (nullable, pendiente del front). Campos de `salud` sin preguntas (`trastorno_mental`, `psicoterapia`, `alergia`, `consume_sustancias`…) quedan con sus defaults.

## 4. Transacción de guardado (esqueleto)

```ts
const $resp = await prisma.$transaction(async (tx) => {
  // 1. Aprendiz: UPSERT por numero_documento con los datos 'basica'
  const aprendiz = await tx.aprendiz.upsert({
    where: { numeroDocumento: payload.numero_documento },
    update: { /* campos basica */ },
    create: { /* campos basica, usuario = numero_documento, fecha_nac, contacto… */ },
  });

  // 2. Caracterización: versión = max(version)+1 por aprendiz; estado 'en_curso'
  const v = await tx.caracterizacion.aggregate({
    where: { aprendizId: aprendiz.id }, _max: { version: true },
  });
  const caract = await tx.caracterizacion.create({
    data: { aprendizId: aprendiz.id, fecha: fecha ?? hoy, version: (v._max.version ?? 0) + 1, estado: 'en_curso' },
  });

  // 3. Satélites 1:1 (UNIQUE(caracterizacion_id) en BD): INSERT con ambos ids
  //    (aprendiz_id se conserva y se escribe en la misma transacción que
  //    caracterizacion_id; esa es la manera de garantizar coherencia).
  await tx.localizacion.create({…}); … salud, ssr, covid19, situacion_economica,
  // perfil_ocupacional, formacion (si hay ficha), etc.

  // 4. Satélites 1:N (multivalor): INSERT, con ambos ids también
  await tx.apoyosEstado.create({…}); // etc.

  // 5. Consentimiento: aceptacion_politica.create({ aceptado: true, fechaAceptacion: now, textoVersion: 'v2026-01' })
  //    P1 aprobado: registrar SIEMPRE la versión del texto de política aceptado.

  // 6. Estado y radicado
  //    Toda la versión entra en 'en_curso'; al COMPLETAR se asigna el radicado:
  const seq = await tx.$queryRaw<{ nextval: bigint }[]>`SELECT nextval('radicado_seq') AS nextval`;
  const radicado = `RAD-SENA-${anio}-${String(Number(seq[0].nextval)).padStart(6, '0')}`;
  await tx.caracterizacion.update({
    where: { id: caract.id },
    data: { estado: 'completa', radicado },
  });
  // 'pendiente_actualizar' lo fija Bienestar (proceso administrativo).

  return { caracterizacionId: caract.id, version: caract.version, estado: caract.estado };
});
// Cualquier 422 (opción de catálogo desconocida, CHECK violado) => rollback total.
```

Reglas de estado:
- `en_curso` → guardado por módulos sin radicado (las llamadas reescriben las filas 1:1 de ESTA versión, localizadas por su `caracterizacion_id`).
- `completa` → `radicado` se asigna una sola vez (UNIQUE). La recaracterización crea `version+1` en 'en_curso'.
- `pendiente_actualizar` → proceso administrativo de Bienestar.

## 5. Diseño PROPUESTO, NO implementado: tablas dinámicas

Decisión 2 del responsable: solo la parte fija se migra; esto queda **solo diseñado en el documento** (sin migración).

```
preguntas_personalizadas    -- almacena las preguntas "esPersonalizada" futuras
  id                UUID PK DEFAULT gen_random_uuid()
  modulo_id         VARCHAR(30) NOT NULL        -- 'basica'|'salud'|… |'otro'
  label             VARCHAR(255) NOT NULL
  tipo              VARCHAR(12) NOT NULL        -- CHECK ('text','textarea','number','select','date')
  opciones          JSONB NULL                  -- opciones; NO alimenta tablero ni informe regional
  requerido         BOOLEAN DEFAULT false
  orden             INT
  activo            BOOLEAN DEFAULT true
  creado_por        UUID NULL REFERENCES usuarios(id)  -- auditoría de quién creó la pregunta
  created_at / updated_at
  UNIQUE (modulo_id, label)

respuestas_personalizadas
  id                 UUID PK DEFAULT gen_random_uuid()
  aprendiz_id        UUID NOT NULL REFERENCES aprendices(id) ON DELETE CASCADE
  caracterizacion_id UUID NOT NULL REFERENCES caracterizaciones(id) ON DELETE CASCADE
  pregunta_id        UUID NOT NULL REFERENCES preguntas_personalizadas(id) ON DELETE CASCADE
  valor              TEXT                        -- siempre texto; el front parsea por tipo
  created_at / updated_at
  UNIQUE (caracterizacion_id, pregunta_id)
```
Criterio: solo preguntas que no alimentan estadísticas ni el informe regional (hoy: expectativa laboral y herramientas digitales). El tablero y el informe NUNCA leen de estas tablas.

## 6. Integridad aprobada e implementada (migración 3)

`backend/prisma/migrations/20261024000002_uniques_coherencia_jefatura/migration.sql`:

| Objeto | Definición | Motivo |
|--------|-----------|--------|
| UNIQUE | `catalogos(categoria, valor)` | Impide duplicar opciones por categoría; soporte del seed y de la traducción texto → id (R1) |
| UNIQUE | `caracterizaciones(aprendiz_id, version)` | Una sola versión N por aprendiz (recaracterización periódica) |
| DESCARTADO | ~~`formacion(aprendiz_id, ficha_id)`~~ | Lo vetó el responsable de BD: bloquearía la recaracterización |
| TRIGGER | `trg_se_bandera_coherente` en `situacion_economica` (BEFORE INSERT OR UPDATE) | **Jefatura**: garantiza que `jefe_hogar` y `sostiene_hogar` NO puedan contradecir `sustento_principal_id` — las dos banderas deben ser `TRUE` exactamente cuando el sustento es `'El propio aprendiz'`, y rechaza el INSERT/UPDATE con excepción en caso contrario. Se usa TRIGGER porque un CHECK no puede consultar otra tabla (limitación de PostgreSQL) |
| APROBADO P2 | `salud.sisben_estado_id` → cat. `sisben_estado` (`Sí` / `No` / `En trámite`) | "En trámite" ya no se pierde como ocurría con el Boolean |
| APROBADO P1 | `aceptacion_politica.texto_version VARCHAR(20)` nullable | Registra qué versión de la política aceptó cada aprendiz |

Nota de jefatura: el valor `'El propio aprendiz'` del catálogo `sustento_principal` va grabado dentro de la función. Si Bienestar renombra esa opción del catálogo, se debe actualizar `fn_se_bandera_coherente` (anotado en la propia migración).

## 7. Pendientes por decidir (no bloquean la migración)

| # | Ítem | Situación |
|---|------|-----------|
| P3 | "¿Utiliza método?" + "¿cuál?" | Condición inexistente en el gestor; "Sí" sin "cuál" persiste `metodo_anticonceptivo_id` NULL |
| P4 | Duplicidades: `discapacidad_certificada` vs `presenta_discapacidad`; `requiere_medicamento` vs `medicamento_permanente`; `cabeza_familia` vs `jefe_hogar` | Jefatura ya quedó resuelta (sustento principal + banderas); las otras dos quedan duplicadas hasta que Bienestar defina |
| P5 | `ciudad`/`barrio` catálogo | `ciudad` precargada (10 opciones ficticias); barrio listo pero sin pregunta; ampliar catálogo cuando el front lo pregunte |
| P6 | Ficha/formaciones | Vienen de matrícula; fuera del contrato en esta fase |
| P7 | Estados "Recaracterizado" (types del front usa `"Pendiente"|"Completo"|"Recaracterizado"`) | El CHECK de BD usa snake_case; unificar cuando el front ajuste estados |
