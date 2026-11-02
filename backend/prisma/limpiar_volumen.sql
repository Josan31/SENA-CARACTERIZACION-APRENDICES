-- ============================================================
-- LIMPIAR SOLO DATOS GENERADOS CON 99900%
-- ============================================================

BEGIN;

-- Eliminar en orden inverso a las dependencias
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

-- Opcional: eliminar fichas de prueba
DELETE FROM fichas WHERE numero_ficha LIKE '999FIC%';

COMMIT;

-- Verificación
SELECT 'registros_restantes_con_99900' as info, count(*) as total
FROM aprendices
WHERE numero_documento LIKE '99900%';
