
-- SEED DE VOLUMEN PARA PRUEBAS DE TABLERO E INFORME REGIONAL (RF-006)
-- Genera 120 aprendices ficticios con distribución realista
-- Marca TODO con numero_documento/usuario que empiecen por '99900'
--
-- REGLAS:
-- - Idempotente: si ya existen datos con numero_documento LIKE '99900%', no duplicar
-- - Solo se usan IDs de catálogos por (categoria, valor) con subconsultas
-- - Respeta todas las restricciones, trigger de coherencia de jefatura, secuencia radicado_seq
-- - Radicado SOLO en estado 'completa'
-- - Cada tabla satélite con aprendiz_id y caracterizacion_id coherentes
-- - 10 aprendices con 2 versiones (v1 completa, v2 completa o en_curso)


BEGIN;

-- Verificar y limpiar si ya existen datos de prueba (idempotente)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM aprendices WHERE numero_documento LIKE '99900%') THEN
    RAISE NOTICE 'Ya existen aprendices con numero_documento que empiezan por 99900. Eliminando para regenerar...';
    -- Limpiar en orden inverso a las dependencias
    DELETE FROM problematicas_sector WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM situaciones_hogar WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM apoyos_estado WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM poblaciones_reconocidas WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM perfil_ocupacional WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM situacion_economica WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM covid19 WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM parentescos_hogar WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM salud_sexual_reproductiva WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM salud WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM formacion WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM servicios_publicos WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM localizacion WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM aceptacion_politica WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM caracterizaciones WHERE aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');
    DELETE FROM aprendices WHERE numero_documento LIKE '99900%';
    RAISE NOTICE 'Datos anteriores de prueba eliminados.';
  END IF;
END $$;


-- 1. GENERAR 120 APRENDICES FICTICIOS

WITH catalogos_lookup AS (
  SELECT
    (SELECT id FROM catalogos WHERE categoria = 'tipo_documento' AND valor LIKE 'CC%' LIMIT 1) as tipo_cc,
    (SELECT id FROM catalogos WHERE categoria = 'tipo_documento' AND valor LIKE 'TI%' LIMIT 1) as tipo_ti,
    (SELECT id FROM catalogos WHERE categoria = 'sexo' AND valor = 'Hombre' LIMIT 1) as sexo_h,
    (SELECT id FROM catalogos WHERE categoria = 'sexo' AND valor = 'Mujer' LIMIT 1) as sexo_m,
    (SELECT id FROM catalogos WHERE categoria = 'sexo' AND valor = 'Intersexual' LIMIT 1) as sexo_i,
    (SELECT id FROM catalogos WHERE categoria = 'orientacion_sexual' AND valor = 'Heterosexual' LIMIT 1) as ori_het,
    (SELECT id FROM catalogos WHERE categoria = 'orientacion_sexual' AND valor = 'Homosexual' LIMIT 1) as ori_hom,
    (SELECT id FROM catalogos WHERE categoria = 'orientacion_sexual' AND valor = 'Bisexual' LIMIT 1) as ori_bi,
    (SELECT id FROM catalogos WHERE categoria = 'orientacion_sexual' AND valor = 'Pansexual' LIMIT 1) as ori_pan,
    (SELECT id FROM catalogos WHERE categoria = 'estado_civil' AND valor = 'Soltero(a)' LIMIT 1) as ec_soltero,
    (SELECT id FROM catalogos WHERE categoria = 'estado_civil' AND valor = 'Casado(a)' LIMIT 1) as ec_casado,
    (SELECT id FROM catalogos WHERE categoria = 'estado_civil' AND valor = 'Unión Libre' LIMIT 1) as ec_union,
    (SELECT id FROM catalogos WHERE categoria = 'estado_civil' AND valor = 'Separado(a) / Divorciado(a)' LIMIT 1) as ec_separado,
    (SELECT id FROM catalogos WHERE categoria = 'parentesco_acudiente' AND valor = 'Madre' LIMIT 1) as par_madre,
    (SELECT id FROM catalogos WHERE categoria = 'parentesco_acudiente' AND valor = 'Padre' LIMIT 1) as par_padre,
    (SELECT id FROM catalogos WHERE categoria = 'parentesco_acudiente' AND valor = 'Hermano(a)' LIMIT 1) as par_hermano,
    (SELECT id FROM catalogos WHERE categoria = 'parentesco_acudiente' AND valor = 'Tío(a)' LIMIT 1) as par_tio
),
aprendices_base AS (
  SELECT
    '99900' || LPAD((i)::text, 6, '0') as usuario_doc,
    '99900' || LPAD((i)::text, 6, '0') as numero_doc,
    CASE WHEN random() < 0.55 THEN cl.sexo_m ELSE CASE WHEN random() < 0.9 THEN cl.sexo_h ELSE cl.sexo_i END END as sexo_id,
    random() < 0.08 as se_reconoce_lgbtiq,
    CASE
      WHEN random() < 0.08 THEN
        CASE WHEN random() < 0.4 THEN cl.ori_hom WHEN random() < 0.7 THEN cl.ori_bi WHEN random() < 0.9 THEN cl.ori_pan ELSE cl.ori_het END
      ELSE NULL
    END as orientacion_sexual_id,
    CASE WHEN random() < 0.7 THEN cl.ec_soltero WHEN random() < 0.85 THEN cl.ec_union WHEN random() < 0.93 THEN cl.ec_casado ELSE cl.ec_separado END as estado_civil_id,
    cl.tipo_cc as tipo_documento_id,
    'Aprendiz Prueba ' || LPAD((i)::text, 3, '0') as nombre_completo,
    ('200' || LPAD((1 + (i % 6))::text, 1, '0') || '-' || LPAD((1 + (i % 12))::text, 2, '0') || '-' || LPAD((1 + (i % 28))::text, 2, '0'))::date as fecha_nacimiento,
    'aprendiz.prueba.' || LPAD((i)::text, 3, '0') || '@ejemplo.com' as correo_personal,
    'aprendiz.prueba.' || LPAD((i)::text, 3, '0') || '@soy.sena.edu.co' as correo_institucional,
    '300' || LPAD((1000000 + i)::text, 7, '0') as telefono,
    'Acudiente Prueba ' || LPAD((i)::text, 3, '0') as contacto_emergencia_nombre,
    '310' || LPAD((2000000 + i)::text, 7, '0') as contacto_emergencia_telefono,
    CASE WHEN random() < 0.6 THEN cl.par_madre WHEN random() < 0.8 THEN cl.par_padre WHEN random() < 0.9 THEN cl.par_hermano ELSE cl.par_tio END as contacto_emergencia_parentesco_id,
    i,
    random() as rnd1, random() as rnd2, random() as rnd3
  FROM generate_series(1, 120) i, catalogos_lookup cl
),
aprendices_insertados AS (
  INSERT INTO aprendices (
    usuario, nombre_completo, tipo_documento_id, numero_documento, fecha_nacimiento,
    sexo_id, se_reconoce_lgbtiq, orientacion_sexual_id, estado_civil_id,
    correo_personal, correo_institucional, telefono,
    contacto_emergencia_nombre, contacto_emergencia_telefono, contacto_emergencia_parentesco_id,
    created_at, updated_at
  )
  SELECT
    usuario_doc, nombre_completo, tipo_documento_id, numero_doc, fecha_nacimiento,
    sexo_id, se_reconoce_lgbtiq, orientacion_sexual_id, estado_civil_id,
    correo_personal, correo_institucional, telefono,
    contacto_emergencia_nombre, contacto_emergencia_telefono, contacto_emergencia_parentesco_id,
    NOW(), NOW()
  FROM aprendices_base
  RETURNING id, numero_documento, usuario
)
SELECT * FROM aprendices_insertados;

-- 2. ACEPTACIÓN DE POLÍTICA PARA TODOS
INSERT INTO aceptacion_politica (aprendiz_id, aceptado, fecha_aceptacion, texto_version)
SELECT id, true, NOW() - (random() * interval '30 days'), 'v2026-01'
FROM aprendices
WHERE numero_documento LIKE '99900%';

-- 3. GENERAR CARACTERIZACIONES
-- Distribución: ~70% completa (con radicado), ~20% en_curso (sin radicado), ~10% sin ninguna
-- 10 aprendices tendrán 2 versiones
WITH aprendices_sin_caract AS (
  SELECT id, numero_documento, ROW_NUMBER() OVER (ORDER BY numero_documento) as rn
  FROM aprendices
  WHERE numero_documento LIKE '99900%'
    AND NOT EXISTS (SELECT 1 FROM caracterizaciones c WHERE c.aprendiz_id = aprendices.id)
),
otros_aprendices AS (
  SELECT id, rn FROM aprendices_sin_caract
),
caracterizaciones_a_crear AS (
  SELECT
    id as aprendiz_id,
    1 as version,
    CASE
      WHEN rn <= 77 THEN 'completa'      -- ~70% of 110
      WHEN rn <= 99 THEN 'en_curso'      -- ~20% of 110
      ELSE 'sin'                         -- ~10% sin ninguna
    END as estado_plan,
    rn
  FROM otros_aprendices
)
INSERT INTO caracterizaciones (aprendiz_id, radicado, fecha, version, estado, created_at, updated_at)
SELECT
  aprendiz_id,
  CASE WHEN estado_plan = 'completa' THEN ('RAD-SENA-' || EXTRACT(YEAR FROM CURRENT_DATE) || '-' || LPAD(nextval('radicado_seq')::text, 6, '0')) ELSE NULL END,
  CURRENT_DATE - (random() * interval '60 days'),
  version,
  estado_plan,
  NOW(), NOW()
FROM caracterizaciones_a_crear
WHERE estado_plan != 'sin';

-- Crear segunda versión para 10 aprendices (v1 completa + v2 completa/en_curso)
WITH aprendices_con_v1 AS (
  SELECT c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
    AND c.version = 1
  ORDER BY a.numero_documento
  LIMIT 10
)
INSERT INTO caracterizaciones (aprendiz_id, radicado, fecha, version, estado, created_at, updated_at)
SELECT
  aprendiz_id,
  CASE WHEN random() < 0.7 THEN ('RAD-SENA-' || EXTRACT(YEAR FROM CURRENT_DATE) || '-' || LPAD(nextval('radicado_seq')::text, 6, '0')) ELSE NULL END,
  CURRENT_DATE - (random() * interval '30 days'),
  2,
  CASE WHEN random() < 0.7 THEN 'completa' ELSE 'en_curso' END,
  NOW(), NOW()
FROM aprendices_con_v1;

-- 4. FICHAS, FORMACIÓN (1:1 por caracterización)
-- 4 fichas: 2 técnicos y 2 tecnólogos, diurna y nocturna
INSERT INTO fichas (numero_ficha, programa_id, jornada_id, modalidad_id, nivel_formacion_id, instructor_responsable, created_at, updated_at)
SELECT '999FIC01',
       (SELECT id FROM catalogos WHERE categoria = 'programa' AND valor = 'Análisis y Desarrollo de Software'),
       (SELECT id FROM catalogos WHERE categoria = 'jornada' AND valor = 'Diurna'),
       (SELECT id FROM catalogos WHERE categoria = 'modalidad' AND valor = 'Presencial'),
       (SELECT id FROM catalogos WHERE categoria = 'nivel_formacion' AND valor = 'Tecnólogo'),
       'Instructor Prueba (ficticio)', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM fichas WHERE numero_ficha = '999FIC01');

INSERT INTO fichas (numero_ficha, programa_id, jornada_id, modalidad_id, nivel_formacion_id, instructor_responsable, created_at, updated_at)
SELECT '999FIC02',
       (SELECT id FROM catalogos WHERE categoria = 'programa' AND valor = 'Logística Empresarial'),
       (SELECT id FROM catalogos WHERE categoria = 'jornada' AND valor = 'Nocturna'),
       (SELECT id FROM catalogos WHERE categoria = 'modalidad' AND valor = 'Presencial'),
       (SELECT id FROM catalogos WHERE categoria = 'nivel_formacion' AND valor = 'Técnico'),
       'Instructor Prueba (ficticio)', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM fichas WHERE numero_ficha = '999FIC02');

INSERT INTO fichas (numero_ficha, programa_id, jornada_id, modalidad_id, nivel_formacion_id, instructor_responsable, created_at, updated_at)
SELECT '999FIC03',
       (SELECT id FROM catalogos WHERE categoria = 'programa' AND valor = 'Contabilidad y Finanzas'),
       (SELECT id FROM catalogos WHERE categoria = 'jornada' AND valor = 'Diurna'),
       (SELECT id FROM catalogos WHERE categoria = 'modalidad' AND valor = 'Presencial'),
       (SELECT id FROM catalogos WHERE categoria = 'nivel_formacion' AND valor = 'Tecnólogo'),
       'Instructor Prueba (ficticio)', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM fichas WHERE numero_ficha = '999FIC03');

INSERT INTO fichas (numero_ficha, programa_id, jornada_id, modalidad_id, nivel_formacion_id, instructor_responsable, created_at, updated_at)
SELECT '999FIC04',
       (SELECT id FROM catalogos WHERE categoria = 'programa' AND valor = 'Técnico en Cocina'),
       (SELECT id FROM catalogos WHERE categoria = 'jornada' AND valor = 'Nocturna'),
       (SELECT id FROM catalogos WHERE categoria = 'modalidad' AND valor = 'Presencial'),
       (SELECT id FROM catalogos WHERE categoria = 'nivel_formacion' AND valor = 'Técnico'),
       'Instructor Prueba (ficticio)', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM fichas WHERE numero_ficha = '999FIC04');

-- Asignar fichas aleatoriamente a formaciones
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id,
         ROW_NUMBER() OVER (ORDER BY random()) as rn
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
),
fichas_list AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY numero_ficha) as rn FROM fichas WHERE numero_ficha LIKE '999FIC%'
)
INSERT INTO formacion (aprendiz_id, caracterizacion_id, ficha_id)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  (SELECT id FROM fichas_list WHERE rn = ((ca.rn % 4) + 1))
FROM caracterizaciones_con_aprendiz ca;

-- 5. LOCALIZACIÓN (1:1 por caracterización)
-- ~70% Palmira repartido en barrios/comunas, resto otras ciudades
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id,
         random() < 0.7 as es_palmira
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO localizacion (aprendiz_id, caracterizacion_id, direccion, ciudad_id, barrio_id, estrato_id, zona_id, tenencia_vivienda_id, medio_transporte_id)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  'Calle Prueba ' || floor(random()*200)+1 || ' #' || floor(random()*100)+1 || '-' || floor(random()*50)+1,
  CASE
    WHEN ca.es_palmira THEN (SELECT id FROM catalogos WHERE categoria = 'ciudad' AND valor = 'Palmira')
    ELSE (SELECT id FROM catalogos WHERE categoria = 'ciudad' AND random() < 0.5 ORDER BY random() LIMIT 1)
  END,
  CASE
    WHEN ca.es_palmira THEN (SELECT id FROM catalogos WHERE categoria = 'barrio' ORDER BY random() LIMIT 1)
    ELSE NULL
  END,
  (SELECT id FROM catalogos WHERE categoria = 'estrato' ORDER BY random() LIMIT 1),
  NULL, NULL, NULL
FROM caracterizaciones_con_aprendiz ca;

-- 6. SALUD
-- ~10% con discapacidad
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO salud (
  aprendiz_id, caracterizacion_id, afiliado_salud, eps_id, regimen_salud_id,
  sisben_estado_id, grupo_sisben_id, trastorno_mental, psicoterapia,
  discapacidad_certificada, presenta_discapacidad, tipo_discapacidad_id,
  alergia, consume_sustancias, medicamento_permanente, requiere_medicamento
)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  random() < 0.95,
  (SELECT id FROM catalogos WHERE categoria = 'eps' ORDER BY random() LIMIT 1),
  (SELECT id FROM catalogos WHERE categoria = 'regimen_salud' ORDER BY random() LIMIT 1),
  (SELECT id FROM catalogos WHERE categoria = 'sisben_estado' ORDER BY random() LIMIT 1),
  CASE WHEN random() < 0.7 THEN (SELECT id FROM catalogos WHERE categoria = 'grupo_sisben' AND valor != 'No aplica' ORDER BY random() LIMIT 1) ELSE NULL END,
  random() < 0.05,
  random() < 0.03,
  random() < 0.10,
  random() < 0.10,
  CASE WHEN random() < 0.10 THEN (SELECT id FROM catalogos WHERE categoria = 'tipo_discapacidad' AND valor != 'Ninguna' ORDER BY random() LIMIT 1) ELSE NULL END,
  random() < 0.08,
  random() < 0.03,
  random() < 0.05,
  random() < 0.07
FROM caracterizaciones_con_aprendiz ca;

-- 7. SALUD SEXUAL Y REPRODUCTIVA
-- ~6% de las mujeres en gestación (semana coherente)
-- ~12% cabezas de hogar con 1 a 3 hijos
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id,
         (a.sexo_id = (SELECT id FROM catalogos WHERE categoria = 'sexo' AND valor = 'Mujer' LIMIT 1)) as es_mujer,
         random() as r_gestacion
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO salud_sexual_reproductiva (
  aprendiz_id, caracterizacion_id, en_gestacion, semana_gestacion, en_lactancia,
  cabeza_familia, num_hijos, num_personas_hogar, metodo_anticonceptivo_id, desea_asesoria
)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  CASE WHEN ca.es_mujer AND ca.r_gestacion < 0.06 THEN true WHEN ca.es_mujer THEN false ELSE NULL END,
  CASE WHEN ca.es_mujer AND ca.r_gestacion < 0.06 THEN (1 + floor(random()*40))::int ELSE NULL END,
  CASE WHEN ca.es_mujer AND random() < 0.04 THEN true WHEN ca.es_mujer THEN false ELSE NULL END,
  random() < 0.12,
  CASE WHEN random() < 0.12 THEN (1 + floor(random()*3))::int ELSE 0 END,
  (1 + floor(random()*5))::int,
  CASE WHEN ca.es_mujer AND random() < 0.3 THEN (SELECT id FROM catalogos WHERE categoria = 'metodo_anticonceptivo' ORDER BY random() LIMIT 1) ELSE NULL END,
  random() < 0.15
FROM caracterizaciones_con_aprendiz ca;

-- 8. COVID-19 - Vacunación con dosis 0 a 3 coherentes
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO covid19 (aprendiz_id, caracterizacion_id, vacunado, vacuna_id, dosis, esquema_completo)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  random() < 0.85,
  CASE WHEN random() < 0.85 THEN (SELECT id FROM catalogos WHERE categoria = 'vacuna_covid' AND valor != 'No aplica / No vacunado' ORDER BY random() LIMIT 1) ELSE NULL END,
  CASE WHEN random() < 0.85 THEN floor(random()*4)::int ELSE NULL END,
  CASE WHEN random() < 0.70 THEN true ELSE false END
FROM caracterizaciones_con_aprendiz ca;

-- 9. SITUACIÓN ECONÓMICA
-- Con trigger de coherencia: jefe_hogar y sostiene_hogar = true si sustento_principal es 'El propio aprendiz'
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO situacion_economica (
  aprendiz_id, caracterizacion_id, jefe_hogar, sostiene_hogar,
  sustento_principal_id, personas_a_cargo, rango_ingresos_id, fuente_ingresos_id, grupo_etnico_id
)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  false, false,
  (SELECT id FROM catalogos WHERE categoria = 'sustento_principal' ORDER BY random() LIMIT 1),
  floor(random()*4)::int,
  (SELECT id FROM catalogos WHERE categoria = 'rango_ingresos' ORDER BY random() LIMIT 1),
  (SELECT id FROM catalogos WHERE categoria = 'fuente_ingresos' ORDER BY random() LIMIT 1),
  (SELECT id FROM catalogos WHERE categoria = 'grupo_etnico' ORDER BY random() LIMIT 1)
FROM caracterizaciones_con_aprendiz ca;

-- Actualizar para cumplir trigger
UPDATE situacion_economica se
SET jefe_hogar = true, sostiene_hogar = true
WHERE sustento_principal_id = (SELECT id FROM catalogos WHERE categoria = 'sustento_principal' AND valor = 'El propio aprendiz' LIMIT 1)
  AND aprendiz_id IN (SELECT id FROM aprendices WHERE numero_documento LIKE '99900%');

-- 10. TABLAS SATÉLITE MULTIVALOR CON aprendiz_id Y caracterizacion_id COHERENTES

-- PARENTESCOS HOGAR
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO parentescos_hogar (aprendiz_id, caracterizacion_id, parentesco_id)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  (SELECT id FROM catalogos WHERE categoria = 'parentesco' AND valor != 'No hay más convivientes' ORDER BY random() LIMIT 1)
FROM caracterizaciones_con_aprendiz ca
WHERE random() < 0.8;

-- POBLACIONES RECONOCIDAS
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO poblaciones_reconocidas (aprendiz_id, caracterizacion_id, poblacion_id)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  (SELECT id FROM catalogos WHERE categoria = 'poblacion' AND valor != 'Ninguna' ORDER BY random() LIMIT 1)
FROM caracterizaciones_con_aprendiz ca
WHERE random() < 0.15;

-- APOYOS DEL ESTADO
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO apoyos_estado (aprendiz_id, caracterizacion_id, tipo_apoyo_id, detalle_otra)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  (SELECT id FROM catalogos WHERE categoria = 'apoyo_estado' AND valor != 'Ninguno' ORDER BY random() LIMIT 1),
  CASE WHEN random() < 0.1 THEN 'Detalle prueba ficticio' ELSE NULL END
FROM caracterizaciones_con_aprendiz ca
WHERE random() < 0.25;

-- SITUACIONES DEL HOGAR
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO situaciones_hogar (aprendiz_id, caracterizacion_id, situacion_id)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  (SELECT id FROM catalogos WHERE categoria = 'situacion_hogar' ORDER BY random() LIMIT 1)
FROM caracterizaciones_con_aprendiz ca
WHERE random() < 0.12;

-- PROBLEMÁTICAS SECTOR
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO problematicas_sector (aprendiz_id, caracterizacion_id, problematica_id)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  (SELECT id FROM catalogos WHERE categoria = 'problematica_sector' ORDER BY random() LIMIT 1)
FROM caracterizaciones_con_aprendiz ca
WHERE random() < 0.18;

-- SERVICIOS PÚBLICOS
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO servicios_publicos (aprendiz_id, caracterizacion_id, servicio_id, tiene_servicio)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  (SELECT id FROM catalogos WHERE categoria = 'servicio_publico' ORDER BY random() LIMIT 1),
  random() < 0.9
FROM caracterizaciones_con_aprendiz ca
CROSS JOIN generate_series(1, 3);

-- PERFIL OCUPACIONAL
WITH caracterizaciones_con_aprendiz AS (
  SELECT c.id as caracterizacion_id, c.aprendiz_id
  FROM caracterizaciones c
  JOIN aprendices a ON a.id = c.aprendiz_id
  WHERE a.numero_documento LIKE '99900%'
)
INSERT INTO perfil_ocupacional (
  aprendiz_id, caracterizacion_id, nivel_formacion_previo_id,
  formacion_previa_sena, motivacion_id, trabaja_actualmente, lugar_horario_trabajo
)
SELECT
  ca.aprendiz_id,
  ca.caracterizacion_id,
  (SELECT id FROM catalogos WHERE categoria = 'nivel_formacion_previo' ORDER BY random() LIMIT 1),
  random() < 0.25,
  (SELECT id FROM catalogos WHERE categoria = 'motivacion' ORDER BY random() LIMIT 1),
  random() < 0.35,
  CASE WHEN random() < 0.35 THEN 'Lugar de trabajo prueba ficticio' ELSE NULL END
FROM caracterizaciones_con_aprendiz ca;

COMMIT;

-- CONSULTA DE VERIFICACIÓN
SELECT 'aprendices' as tabla, count(*) as total FROM aprendices WHERE numero_documento LIKE '99900%'
UNION ALL
SELECT 'caracterizaciones', count(*) FROM caracterizaciones c JOIN aprendices a ON a.id = c.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'aceptacion_politica', count(*) FROM aceptacion_politica ap JOIN aprendices a ON a.id = ap.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'localizacion', count(*) FROM localizacion l JOIN aprendices a ON a.id = l.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'formacion', count(*) FROM formacion f JOIN aprendices a ON a.id = f.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'salud', count(*) FROM salud s JOIN aprendices a ON a.id = s.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'salud_sexual_reproductiva', count(*) FROM salud_sexual_reproductiva ssr JOIN aprendices a ON a.id = ssr.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'covid19', count(*) FROM covid19 c JOIN aprendices a ON a.id = c.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'situacion_economica', count(*) FROM situacion_economica se JOIN aprendices a ON a.id = se.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'parentescos_hogar', count(*) FROM parentescos_hogar ph JOIN aprendices a ON a.id = ph.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'poblaciones_reconocidas', count(*) FROM poblaciones_reconocidas pr JOIN aprendices a ON a.id = pr.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'apoyos_estado', count(*) FROM apoyos_estado ae JOIN aprendices a ON a.id = ae.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'situaciones_hogar', count(*) FROM situaciones_hogar sh JOIN aprendices a ON a.id = sh.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'problematicas_sector', count(*) FROM problematicas_sector ps JOIN aprendices a ON a.id = ps.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'servicios_publicos', count(*) FROM servicios_publicos sp JOIN aprendices a ON a.id = sp.aprendiz_id WHERE a.numero_documento LIKE '99900%'
UNION ALL
SELECT 'perfil_ocupacional', count(*) FROM perfil_ocupacional po JOIN aprendices a ON a.id = po.aprendiz_id WHERE a.numero_documento LIKE '99900%'
ORDER BY tabla;
