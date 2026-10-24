# ANÁLISIS BD — SCRUM-52 (Fase 1)

**Fecha:** 2026-10-24 · **Rama:** `feature/bd-scrum-52` · **Estado:** solo análisis, nada modificado.
Fuentes: `backend/prisma/schema.prisma` (repo), `schema.propuesto.prisma` (adjunto, solo referencia), `migracion_checks_y_rls.sql` (adjunto), `src/data/formularios_preguntas.json`, `src/data/formularios_respuestas.json`, `src/types/formularios.ts`, `src/lib/formulariosStore.ts`, `src/app/api/formularios/{preguntas,respuestas}/route.ts`, `backend/src/database/*`, módulos NestJS (vacíos), componentes del wizard.

---

## 1. Diferencias: schema del repo vs propuesta adjunta

Comparación modelo por modelo: la propuesta es estructuralmente igual al repo salvo 4 cambios (declarados en su cabecera) y la relación nueva `AuditoriaAcceso` con `onDelete: SetNull`.

| # | Tema | Repo | Propuesta | Consecuencia |
|---|------|------|-----------|--------------|
| 1 | `ContactoEmergencia` | Existe la tabla `contactos_emergencia` (1:N desde aprendiz) **y además** existen los campos `contacto_emergencia_nombre/telefono` dentro de `Aprendiz` (doble vía para el mismo dato) | Tabla eliminada; quedan solo los 2 campos en `Aprendiz`, nullable | Corrige la doble vía. El form marca acudiente como requerido pero la BD los deja nullable → quedará pendiente confirmar con Edwin si vuelven NOT NULL |
| 2 | Ids UUID | `@default(uuid())` en los 22 modelos → los genera el cliente Prisma | `@default(dbgenerated("gen_random_uuid()"))` → `DEFAULT` en la BD | Con DB-generated, el id existe incluso al insertar por SQL directo (seed, cargues masivos, triggers). `gen_random_uuid()` es core de PG ≥ 13 y no es exclusivo de Supabase. **Ventaja propuesta** |
| 3 | `directUrl` | No existe | `datasource db { directUrl = env("DIRECT_URL") }` | Con Supabase es prácticamente obligatorio: `migrate`/`validate` deben ir por conexión directa (puerto 5432) y no por el pooler. Fuera de Supabase la variable puede apuntar a la misma URL, sin código extra |
| 4 | `auditoria_accesos` | No existe | Nuevo modelo `AuditoriaAcceso` + CHECK `accion` + índices (`usuario_id`, `aprendiz_id`, `fecha`) | La pedimos; ver §4.3. No es exclusiva de Supabase |
| 5 | `onDelete` | Todos los satélites de `Aprendiz`: `Cascade`; `Ficha`↔`Formacion`: Restrict implícito | Igual en los existentes; en `AuditoriaAcceso`: `SetNull` (usuario_id y aprendiz_id) | Coherente: borrar un funcionario/aprendiz no borra su auditoría |
| 6 | Campos nullable | — | Sin cambios de nulabilidad salvo lo heredado del punto 1 (los 2 campos de contacto siguen nullable en ambas versiones) | Sin afectación |
| 7 | Resto de modelos (Catalogo, Ficha, Enfermedad, Salud, SSR, Covid, Económica, Perfil, Caracterizacion, Egresado, Usuario, RolPermiso…) | — | Idénticos (campos, mapeo, índices) | La propuesta no reordena ni renombra columnas → migración incremental segura |

Conclusión: la propuesta es un superconjunto saneado del repo. Diferencias reales: **quita `ContactoEmergencia`, cambia el formato de defaults, añade `directUrl` y añade `auditoria_accesos`**.

---

## 2. Mapeo pregunta → schema

50 preguntas: `basica` 19, `salud` 14, `socioeconomica` 8, `formativo` 9.
Hoy: todas se guardan como el **texto de la opción o texto libre** en `src/data/formularios_respuestas.json` + `localStorage` (`sena_respuestas_modulo_<moduloId>`), con `fechaActualizacion` ISO y `aprendizDoc`. Ninguna llega a la BD.
Leyenda: **C** = requiere traducción texto→id en `catalogos` (match por `categoria` + `valor`); **SC** = SIN COLUMNA.

### 2.1 `basica` (19)

| id | label (resumen) | tipo | modelo.campo | guarda hoy | observación |
|----|-----------------|------|--------------|-----------|-------------|
| pregunta_1792814426328_qaxw9 | "Aberlardo o cepeda" | select | SC (prueba) | texto | `esPersonalizada: true`; ver §2.6 |
| nombre | Nombres y Apellidos Completos | text | `aprendices.nombre_completo` | texto | El schema no separa nombres/apellidos |
| tipoDoc | Tipo de Documento | select C | `aprendices.tipo_documento_id` → cat. `tipo_documento` | texto opción | 4 opciones; confirmar subconjunto catálogo |
| numDoc | Número de Documento | text | `aprendices.numero_documento` (+ `usuario` = mismo valor) | texto | Base del vínculo con el aprendiz real; §2.6 |
| fechaNac | Fecha de Nacimiento | date | `aprendices.fecha_nacimiento` (@db.Date) | string ISO | Convertir a fecha; recalcular edad |
| edad | Edad | number | **SC** | texto "1" | Caso 2 confirmado: calcular desde `fecha_nacimiento` |
| sexo | Sexo Biológico | select C | `aprendices.sexo_id` → cat. `sexo` | texto opción | Opciones masculino/femenino/intersexual deben existir en seed |
| lgbtiq | ¿Se reconoce LGBTIQ+? | select | `aprendices.se_reconoce_lgbtiq` (Boolean) | "Sí"/"No" | Traducir texto→boolean; habilita `orientacion_sexual_id` |
| orientacion | Orientación Sexual | select C | `aprendices.orientacion_sexual_id` (nullable) | texto opción | Nullable OK; "Prefiero no responder" = NULL |
| estadoCivil | Estado Civil | select C | `aprendices.estado_civil_id` → cat. `estado_civil` | texto opción | — |
| correoPersonal | Correo Personal | text | `aprendices.correo_personal` | texto | Sin validación de formato en la BD; el CHECK/validación iría en migración o en app |
| correoInst | Correo Institucional | text | `aprendices.correo_institucional` (nullable) | texto | Form lo pide requerido; BD nullable → definir (¿CHECK `~ 'soy\.sena\.edu\.co'`?) |
| telefono | Teléfono Móvil | text | `aprendices.telefono` (nullable) | texto | Igual que arriba |
| acudiente | Nombre Acudiente/Contacto | text | `aprendices.contacto_emergencia_nombre` (schema repo: o `contactos_emergencia.nombre`) | texto | Doble vía en repo si no se adopta la propuesta |
| telAcudiente | Teléfono del Acudiente | text | `aprendices.contacto_emergencia_telefono` (o `contactos_emergencia.telefono`) | texto | Ídem |
| parentesco | Parentesco del acudiente | select C | **SC** | texto opción | Caso 1 **CONFIRMADO**: `parentescos_hogar` es de convivientes del hogar, no del acudiente. Falta `contacto_emergencia_parentesco_id` → cat. `parentesco_acudiente` |
| direccion | Dirección de Residencia | text | `localizacion.direccion` | texto | — |
| municipio | Municipio/Ciudad | **text libre** | **Parcial**: `localizacion.ciudad_id` (catálogo) existe, pero la pregunta no usa catálogo | texto "PALMIRA" | Caso 3 confirmado: hoy nadie llenaría `ciudad_id`; además `barrio_id` es NOT NULL SIN PREGUNTA → el INSERT a `localizacion` fallaría (ver §2.6.3) |
| estrato | Estrato Socioeconómico | select C | `localizacion.estrato_id` → cat. `estrato` | texto opción | |

### 2.2 `salud` (14)

| id | label (resumen) | tipo | modelo.campo | guarda hoy | observación |
|----|-----------------|------|--------------|-----------|-------------|
| eps | EPS | select C | `salud.eps_id` → cat. `eps` | texto opción | Opción "Otra" sin campo detalle (`eps_otra` no existe) |
| regimenSalud | Régimen de afiliación | select C | **SC** | texto opción | Columna ausente; propuesta: `regimen_salud_id` o texto |
| sisben | ¿Cuenta con Sisbén IV? | select | `salud.sisben` (Boolean) | texto | **Pérdida de dato**: opciones Sí/No/En trámite no caben en Boolean. Migrar a `sisben_estado_id` (catálogo) o reusar `grupoSisben` |
| grupoSisben | Grupo Sisbén | select C | **SC** | texto opción | Sin columna; cat. `grupo_sisben` |
| tieneDiscapacidad | ¿Discapacidad certificada? | select | `salud.discapacidad_certificada` **o** `presenta_discapacidad` | Sí/No | Duplicidad: 2 booleans para 1 pregunta → decidir cuál (¿certificada vs reportada?) |
| tipoDiscapacidad | Tipo de Discapacidad | select C | **SC** (`discapacidad_detalle` es texto libre, no catálogo) | texto opción | Decidir: columna texto o cat. `tipo_discapacidad` |
| enfermedadCronica | ¿Enfermedad crónica? | select | `salud.enfermedad_id` (FK, implícito Sí/No por NULL) | Sí/No | La respuesta real (nombre del diagnóstico) viene en `descripcionEnfermedad` |
| descripcionEnfermedad | Descripción/Diagnóstico | textarea | `salud.enfermedad_otra` (VarChar 150) | texto | Tabla `enfermedades` (CIE-10) queda **SIN PREGUNTA**; hoy no hay búsqueda/picker de enfermedad |
| tomaMedicamentos | ¿Medicamentos continuos? | select | `salud.requiere_medicamento` **o** `medicamento_permanente` | Sí/No | Ambos campos se superponen; `medicamento_permanente_nombre` queda SIN PREGUNTA |
| gestacion | ¿En gestación? | select | `salud_sexual_reproductiva.en_gestacion` (Boolean) | No/Sí/No aplica | "No aplica" no cabe en Boolean → NULL como "No aplica"? Decidir semántica |
| lactancia | ¿En lactancia? | select | `salud_sexual_reproductiva.en_lactancia` (Boolean) | No/Sí/No aplica | Ídem |
| madrePadreCabezaFamilia | ¿Cabeza de familia? | select | `salud_sexual_reproductiva.cabeza_familia` | Sí/No | Solapa con `situacion_economica.jefe_hogar` (§2.3 fila 1): unificar |
| hijosACargo | Nº hijos a cargo | number | `salud_sexual_reproductiva.num_hijos` | número | OK (CHECK ≥ 0 ya previsto) |
| utilizaMetodoPlanificacion | ¿Usa planificación? | select | `salud_sexual_reproductiva.metodo_anticonceptivo_id` (implícito) | Sí/No/Prefiero no | Falta la pregunta condicional **"¿cuál?"** que llenaría `metodo_anticonceptivo_id` y `anticonceptivo_detalle` (ambas SIN PREGUNTA). También `desea_asesoria` SIN PREGUNTA |

### 2.3 `socioeconomica` (8)

| id | label (resumen) | tipo | modelo.campo | guarda hoy | observación |
|----|-----------------|------|--------------|-----------|-------------|
| jefaturaHogar | ¿Quién aporta el mayor sustento? | select C | **SC** | texto opción | `situacion_economica.jefe_hogar` es Boolean ("yo jefe/no"); la pregunta pide parentesco del aportante → `jefe_hogar_parentesco_id` nueva, o redefinir |
| personasACargo | Nº dependientes económicos | number | **SC** | número | Solo existe `cabeza_familia` (boolean) y `num_personas_hogar` (total vivienda) |
| totalPersonasHogar | Total personas en vivienda | number | `salud_sexual_reproductiva.num_personas_hogar` | número | Funciona, pero un módulo socioeconómico escribe en la tabla de salud sexual → smell estructural |
| rangoIngresosMensuales | Rango ingresos mes | select C | `situacion_economica.rango_ingresos_id` → cat. `rango_ingresos` | texto opción | — |
| fuenteIngresos | Fuente principal ingresos | select C | **SC** | texto opción | `sostiene_hogar` (Boolean) queda SIN PREGUNTA; se podría mapear "fuente" a catálogo `fuente_ingresos` |
| trabajaActualmente | ¿Labora remunerado? | select | `perfil_ocupacional.trabaja_actualmente` (Boolean) | No/Sí(T/MP/Oc) | Pérdida del tipo de jornada; `lugar_horario_trabajo` SIN PREGUNTA |
| grupoEtnico | Grupo étnico | select C | `situacion_economica.grupo_etnico_id` → cat. `grupo_etnico` | texto opción | Solapa con `poblaciones_reconocidas` (ver R3): no duplicar "Afrocolombiano" en ambos lados |
| apoyosEstatales | ¿Recibe subsidios? | select C | `apoyos_estado` (tabla multivalor) | texto único | Formulario de opción simple pero la tabla admite N; `apoyos_estado.detalle_otra` queda SIN PREGUNTA; opción "Otro subsidio público" → detalle |

### 2.4 `formativo` (9)

| id | label (resumen) | tipo | modelo.campo | guarda hoy | observación |
|----|-----------------|------|--------------|-----------|-------------|
| nivelEducativoPrevio | Nivel educativo anterior | select C | `perfil_ocupacional.nivel_formacion_previo_id` → cat. `nivel_formacion_previo` | texto opción | — |
| formacionPreviaSena | ¿Cursó antes en SENA? | select | `perfil_ocupacional.formacion_previa_sena` (Boolean) | No/Sí(...) | Pérdida del tipo de programa previo |
| motivacionIngreso | Motivación principal | select C | `perfil_ocupacional.motivacion_id` → cat. `motivacion` | texto opción | — |
| expectativaLaboral | Expectativa post-etapa productiva | select C | **SC** | texto opción | Sin columna en `perfil_ocupacional` |
| manejoHerramientasDigitales | Manejo ofimática | select C | **SC** | texto opción | En `types` está como Boolean (erróneo: son 3 niveles) |
| vacunado | ¿Esquema COVID? | select | `covid19.vacunado` (Boolean) | Sí/No | OK |
| biologico | Vacuna principal | select C | `covid19.vacuna_id` (nullable) → cat. `vacuna_covid` | texto opción | "No aplica/No vacunado" → `vacuna_id` NULL; "Otra" → falta detalle (`vacuna_otra`) |
| dosis | Nº dosis | number | `covid19.dosis` (nullable) | número | CHECK 0..4 ya previsto en SQL adjunto |
| esquemaCompleto | ¿Esquema completo? | select | **SC** | Sí/No | Columna ausente en `covid19` |

### 2.5 Resumen consolidado

- **SC (sin columna exacta) en 13 de 50:** pregunta personalizada de prueba, `edad`, `parentesco` (acudiente), `municipio` (sin catálogo), `regimenSalud`, `grupoSisben`, `tipoDiscapacidad`, `expectativaLaboral`, `manejoHerramientasDigitales`, `esquemaCompleto`, `jefaturaHogar` (quién aporta), `personasACargo`, `fuenteIngresos`. Además 3 mapeadas con pérdida (sisben/trabaja/formacionPrevia).
- **SIN PREGUNTA (columnas/tablas que ninguna pregunta llena):**

| Zona | Elemento |
|------|----------|
| `localizacion` | `barrio_id`, `zona_id`, `tenencia_vivienda_id`, `medio_transporte_id` — **los 4 NOT NULL → bloquean el primer INSERT de `localizacion`** |
| `servicios_publicos` | Tabla entera sin preguntas en el gestor (el types `LocalizacionVivienda` las declara pero el wizard no las pide) |
| `fichas` + `formacion` | `numero_ficha`, `programa_id`, `jornada_id`, `modalidad_id`, `nivel_formacion_id`, `instructor_responsable` — vienen de matrícula/Sofía Plus, no del wizard |
| `salud` | `trastorno_mental(+detalle)`, `psicoterapia`, `alergia(+detalle)`, `consume_sustancias`, `medicamento_permanente(_nombre)`, `enfermedad_id` (catálogo CIE-10 sin picker) |
| `salud_sexual_reproductiva` | `semana_gestacion`, `metodo_anticonceptivo_id`, `anticonceptivo_detalle`, `desea_asesoria` |
| `parentescos_hogar` | Tabla completa (convivientes) sin preguntas |
| `situacion_economica` | `sostiene_hogar`, `jefe_hogar` (solapa) |
| `poblaciones_reconocidas` | Tabla completa |
| `perfil_ocupacional` | `lugar_horario_trabajo` |
| `aceptacion_politica` | Sin pregunta persistida: el wizard termina en `FormularioConfirmacionEnvio`, que mantiene `veracidadAceptada`/`habeasDataAceptado` **en estado del componente** y nunca las envía |
| Otras | `egresados`, `usuarios`, `roles_permisos` fluyen por procesos administrativos, no por el wizard |

### 2.6 Verificación de los 7 casos detectados

1. **`parentesco` del acudiente → CONFIRMADO SIN COLUMNA.** `parentescos_hogar` es multivalor de convivientes. Propuesta: `aprendices.contacto_emergencia_parentesco_id` (cat. `parentesco_acudiente`) — mismo diseño que los demás campos del contacto.
2. **`edad` → CONFIRMADO calcularla.** No hay columna; el JSON la trae como texto ("1"). Resolver en formulario (readonly) y recomputarla en backend; si algún informe la necesita como dato, físico en `caracterizaciones` sería su lugar.
3. **`municipio` vs `ciudad_id`/`barrio_id` → CONFIRMADO conflicto.** La pregunta es texto libre ("PALMIRA"); `localizacion.ciudad_id` es catálogo y la traducción requiere match exacto; `barrio_id` es NOT NULL sin pregunta que lo alimente. Si se migrara hoy, el INSERT a `localizacion` fallaría. Opciones: (a) hacer barrio/zona/tenencia/transporte nullable y dejar los catálogos al seed; o (b) selección con catálogo desde el formulario.
4. **Texto de opción vs id → CONFIRMADO.** `respuestas.sexo`, `respuestas.estrato`… guardan el string literal. Traducción propuesta: el backend recibe texto y resuelve el id en `catalogos` por match exacto de `(categoria, valor)`; el equipo del form debe congelar los textos de opciones. Si no existe la opción, decisión: rechazar (más estricto) vs insertar provisional (desorden en informes). Ver recomendación §3.
5. **Sin multiselección ni condicionales → CONFIRMADO.** El JSON usa solo `text`/`textarea`/`number`/`select`/`date` (los tipos `radio`/`checkbox` existen en `TipoPregunta` pero sin uso). El schema sí tiene **6 tablas multivalor** (servicios_publicos, parentescos_hogar, poblaciones_reconocidas, apoyos_estado, situaciones_hogar, problematicas_sector) y **varios campos `*_detalle` / `*_otra`** sin preguntas que los llenen. El campo `apoyosEstatales: string[]` en types evidencia intención de multivalor no implementada.
6. **`aprendizDoc: "aprendiz_default"` → placeholder literal.** La ruta API filtra por ese campo pero no lo valida contra nada. Vinculación real: `aprendices.numero_documento` único (y `usuario`, que al seed inicia con el mismo doc). Recomendación: el contrato de datos debe traer `numero_documento` real; mientras el login sea mock (`src/lib/users.ts`), el backend rechaza `aprendiz_default` en producción y en dev acepta un aprendiz semilla.
7. **`esPersonalizada: true` → hoy 1 pregunta de prueba.** El schema NO tiene dónde guardarlas: en la opción C cabría una tabla `preguntas_personalizadas` (+ `respuestas_personalizadas`), o JSONB sobre `caracterizaciones`. Ver §3.

Nota para Fase 2: el seed usará exclusivamente 5–10 aprendices ficticios; nunca datos reales de aprendices.

---

## 3. Arquitectura del gestor dinámico (comparación, sin implementar)

| Criterio | A. Esquema fijo; gestor edita opciones/orden/`activo` | B. Todo dinámico (formularios/preguntas/opciones/respuestas genéricas) | C. Mixto |
|----------|------------------------------------------------------|------------------------------------------------------------------------|----------|
| Qué toca la BD | `catalogos` + `activo` | 4-5 tablas nuevas (def_pregunta, def_opcion, respuesta) + motor de lectura | Tablas fijas (las del schema) + `preguntas_personalizadas` + `respuestas_personalizadas` |
| Tablero e informe consolidado | SQL directo, agregaciones y ranking fáciles | Agregaciones por EAV: `jsonb`-pivot / GROUP BY dinámico; cada informe nuevo = código ad-hoc, frágil | SQL directo para núcleo + UNION con dinámicas para lo personalizado |
| Auditoría e informe SIN datos individuales | Factible con RLS + vistas agregadas | Factible pero el EAV dificulta cifrar/RLS por módulo sensible | RLS por tabla + RBAC ya existente; dinámicas aislables |
| Datos sensibles (salud, SSR, sustancias, LGTBI, ingresos) | Cada dato con tabla/columna → RLS por módulo y guard NestJS limpio | "Salud" sería solo un id de pregunta → difícil de blindar por rol | Ídem A para el núcleo sensible |
| Flexibilidad (preguntas personalizadas nuevas) | Cero: requiere migración por cada pregunta | Máxima | Alta en el ámbito no núcleo |
| Migración de datos existentes (JSON) | Traza 1:1 con el schema (conseguir seed para el núcleo) | Requiere cargar 50 preguntas + opciones y 1 respuesta de prueba | Requiere definir el **corte**: qué pasa a tablas fijas vs dinámicas |
| Esfuerzo FASE 2 | Bajo (schema actual + catálogos + contrato) | Alto (modelo EAV, consultas dinámicas, validación por tipo, backend de diseños) | Medio (~2× A: 2 tablas nuevas + resolución en el servicio de caracterización) |
| Riesgos | Las 13 preguntas "SC" quedan sin hogar → o se agregan columnas o el gestor queda impotente | Explosión de diseños, datos duplicados, informe regional difícil de servir | Requiere gobernanza: solo Bienestar define qué es "núcleo" |

**Recomendación: opción C (mixto).** Lo que alimenta el tablero, el informe regional consolidado y los datos sensibles vive en tablas fijas (SQL estructural, RLS por módulo, índices, CHECK); el gestor cubre tres necesidades: (i) administra opciones de catálogo (`catalogos.activo/orden`), (ii) administra preguntas personalizadas/sin columna en tablas genéricas, (iii) mantiene el núcleo atado a columnas. La opción A no cubre las 13 preguntas SC sin 13 columnas nuevas; la B invierte demasiado y degrada los agregados institucionales.

Criterio de corte: "núcleo" = todo lo que hoy tiene columna (37 de 50) + lo institucional (consentimiento, radicado, ficha). Personalizadas y multivalor sin columna (expectativa laboral, herramientas digitales, grupo sisbén, régimen de salud, fuente ingresos, tipo discapacidad, parentesco del acudiente, "¿cuál?" de planificación…) → dinámicas hasta que se apruebe subir a columna.

**NO se implementa en esta fase.** Queda pendiente aprobación por escrito.

---

## 4. Evaluación de faltantes

### 4.1 Radicado único y secuencial en `caracterizaciones`
Hoy `"RAD-SENA-2026-789412"` está quemado en ≥5 componentes (wizard, confirmación, comprobante, recaracterización, resultados). Evaluación: **SÍ aplica y es blocker funcional** (el comprobante es el artefacto institucional).
Propuesta portable (no exclusiva de Supabase): columna `caracterizaciones.radicado` (VarChar(24) UNIQUE NOT NULL) con `CREATE SEQUENCE radicado_seq`; el número lo compone `RAD-SENA-<año>-<NNNNNN>` con `nextval` en la transacción del servicio, o un trigger PostgreSQL. La secuencia es estándar de PostgreSQL. Formato sugerido: `RAD-SENA-AAAA-NNNNNN` con ceros a la izquierda.

### 4.2 Versión del texto aceptado en `aceptacion_politica`
Hoy la tabla solo trae `aceptado` + `fecha_aceptacion`. Evaluación: **SÍ aplica** — habeas data exige poder decir *qué texto aceptó y cuándo*. Propuesta: `texto_version VarChar(20)` (ej. `v2026-01`), opcional `url_texto` o `hash_texto` (SHA-256 del texto servido). Decide Legal/Bienestar el catálogo de versiones.

### 4.3 Tabla `auditoria_accesos`
Evaluación: **SÍ aplica**. Datos sensibles (salud mental, SSR, sustancias, LGTBI, ingresos) = acceso restringido y trazable. La propuesta ya trae el modelo + CHECK `accion` + índices. Nota: para que sea verdad de verdad, el servicio NestJS deberá escribir en ella en cada lectura/escritura de módulos sensibles (fuera de alcance BD, pero la tabla debe existir pronto para el RLS y el contrato).

### 4.4 Índices y estados de la caracterización
Faltantes detectados vs SQL adjunto (que ya trae CHECKs de estado, rol, semanas gestación, dosis, nivel de acceso). Propuestas concretas:
- `caracterizaciones (aprendiz_id, version) UNIQUE` — evita dos caracterizaciones con el mismo número de versión para el mismo aprendiz.
- `catalogos (categoria, valor) UNIQUE` — blindará el seed contra duplicados por recarga.
- `aceptacion_politica (aprendiz_id, fecha_aceptacion)` índice compuesto; `localizacion.aprendiz_id` ya viene.
- `formacion (aprendiz_id, ficha_id) UNIQUE` — no duplicar matrícula.
- Estados: mantener `en_curso | completa | pendiente_actualizar` en CHECK (ya está en el SQL adjunto). Decisión: ¿agregar `recaracterizada` para distinguir de "nueva"? El types `CaracterizacionCompleta` usa `"Pendiente" | "Completo" | "Recaracterizado"` → hay que unificar casing/semántica en el contrato.

### 4.5 Hallazgo estructural crítico (no listado por el usuario)
**Las tablas satélite (`salud`, `localizacion`, `situacion_economica`, …) cuelgan de `aprendices` pero NO tienen `caracterizacion_id`.** Con una cabecera "versionada" es imposible reconstruir el estado histórico: la recaracterización cada 6 meses sobrescribiría la fila actual y perdería la anterior. Decisión estructural para FASE 2 (una de):
- (a) añadir `caracterizacion_id` a las tablas satélite (cambia 12 FKs; mantiene historial fiel);
- (b) aceptar solo "estado actual" por aprendiz y simplificar la cabecera;
- (c) snapshots a tablas genéricas/JSONB al cerrar cada versión (frágil para reportes).
Nota: esta decisión bloquea tanto la migración inicial como el seed de pruebas.

---

## 5. Riesgos y preguntas abiertas

| # | Riesgo / pregunta | Impacto | Destinatario |
|---|-------------------|---------|--------------|
| R1 | 4 FKs de `localizacion` NOT NULL sin preguntas (`barrio`, `zona`, `tenencia`, `medio_transporte`) → el primer guardado de caracterización fallará | Blocker técnico del primer INSERT | Formulario/BD |
| R2 | Duplicaciones de significado (`discapacidad_certificada` vs `presenta_discapacidad`, `requiere_medicamento` vs `medicamento_permanente`, `cabeza_familia` vs `jefe_hogar`, `sisben` Boolean vs 3 estados) | Inconsistencia de datos; el mismo concepto vive en 2 zonas → veredicto del informe dependiente de la fila elegida | Bienestar + BD |
| R3 | "Afrocolombiano" vive en `grupo_etnico` y `poblaciones_reconocidas`; el informe podría contar la población dos veces | Reporte erróneo de focalización | Bienestar + BD |
| R4 | "No aplica" / "Sí (Tiempo completo)" / "Prefiero no responder" no caben en Boolean | Pérdida o sesgo de dato si se fuerza a false/true | BD (decisión semántica) |
| R5 | `catalogos` se nutre de `opciones` del JSON → si Bienestar renombra una opción en el gestor, los registros previos apuntan a texto distinto; idempotencia del seed depende de match exacto de texto | Contrato: versión por `texto` exacto o por `catalogo.id` desde el front (mejor: enviar id) | Contrato de datos |
| R6 | Sin `caracterizacion_id` en satélites → "historia de versiones" no existe (ver §4.5) | Bloquea recaracterización | Arquitectura |
| R7 | `aprendizDoc = aprendiz_default`: sin login real ni vínculo con `aprendices`; ¿rechazar o crear aprendiz provisional? | Integridad de datos | Front/Backend (auth) + BD |
| R8 | Consentimiento (veracidad/habeas data) queda en estado del componente; `aceptacion_politica` sigue vacía y la versión del texto no existe | Riesgo legal (habeas data). Pregunta a Bienestar: ¿el consentimiento se persiste hoy? | Bienestar + Front |
| R9 | `correo_institucional`/`telefono` nullable en BD pero requeridos en formulario; dominio `soy.sena.edu.co` sin CHECK | Datos basura como el JSON de ejemplo ("sdgherjerj") | BD (CHECKs) vs UX |
| R10 | El SQL adjunto activa RLS en las 23 tablas pero no define políticas: funciona solo si el backend usa el rol propietario (bypass) | Seguridad de datos sensibles depende de la cadena de conexión | Backend + SQL adjunto |
| R11 | El JSON guarda fecha de nacimiento como string ("2026-10-23"); `@db.Date` lo maneja bien | Bajo | Contrato de datos (tipos) |
| R12 | Secuencia del radicado: tras una restauración de BD los contadores podrían desalinearse con radicados emitidos | Bajo (dev) | BD / Backend |

---

## 6. Decisiones requeridas del responsable BD antes de FASE 2

1. Adoptar la **propuesta adjunta** (quitar `ContactoEmergencia`, ids `dbgenerated`, `directUrl`, `auditoria_accesos`). *(Sí/No)*
2. Arquitectura del gestor: **opción C mixta** (recomendada). *(A/B/C)*
3. ¿Agregar `caracterizacion_id` a las tablas satélite **ahora** (sí / no: solo estado actual)? — decisión bloqueante para la migración inicial.
4. Completar columnas faltantes: la lista corta (13 SC) — ¿qué entra como columna fija y qué queda como pregunta personalizada dinámica?
5. `municipio/barrio`: ¿nullable en BD o catálogo obligatorio llenado por front? *(afecta migración de checks)*
6. Radicado: aprobar formato y secuencia (`RAD-SENA-AAAA-NNNNNN` sugerido).
7. Semántica "No aplica" en booleanos: NULL o valor de catálogo.

**Con FASE 2 aprobada:** se obtienen (i) schema actualizado, (ii) `docs/CONTRATO_DATOS.md` (qué JSON envía el front y cómo mapea por tabla en una transacción), (iii) migración inicial (--create-only) + migración de CHECKs/RLS (revisando nombres de tablas contra el adjunto), (iv) `prisma/seed.ts` con catálogos desde las `opciones` del JSON + 5–10 aprendices ficticios.

— Fin documento FASE 1 —
