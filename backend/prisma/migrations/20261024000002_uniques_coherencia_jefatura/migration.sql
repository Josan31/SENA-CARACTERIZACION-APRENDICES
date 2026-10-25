-- ============================================================
-- Migración 3 (SCRUM-52): restricciones de integridad aprobadas
-- ============================================================

-- UNIQUE catálogo: evita duplicar opciones por categoría (soporte del seed
-- y de la traducción texto -> id del contrato)
CREATE UNIQUE INDEX "catalogos_categoria_valor_key" ON "catalogos"("categoria", "valor");

-- UNIQUE versión por aprendiz: una sola caracterización por número de versión
CREATE UNIQUE INDEX "caracterizaciones_aprendiz_id_version_key" ON "caracterizaciones"("aprendiz_id", "version");

-- ------------------------------------------------------------
-- Coherencia de jefatura: jefe_hogar y sostiene_hogar son banderas
-- derivadas de sustento_principal_id; deben ser TRUE exactamente cuando
-- el sustento principal es 'El propio aprendiz'.
-- Un CHECK no puede consultar otra tabla (limitación de PostgreSQL),
-- por lo que la garantía se implementa con TRIGGER.
-- NOTA: el valor del catálogo va grabado aquí; si Bienestar renombra la
-- opción 'El propio aprendiz', actualizar esta función.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_se_bandera_coherente() RETURNS trigger AS $$
DECLARE
  es_propio boolean;
BEGIN
  SELECT (valor = 'El propio aprendiz') INTO es_propio
  FROM catalogos WHERE id = NEW.sustento_principal_id;

  IF (NEW.jefe_hogar <> es_propio) OR (NEW.sostiene_hogar <> es_propio) THEN
    RAISE EXCEPTION 'jefe_hogar y sostiene_hogar deben ser % cuando el sustento principal es el aprendiz (sustento_principal_id %)', es_propio, NEW.sustento_principal_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_se_bandera_coherente
  BEFORE INSERT OR UPDATE ON situacion_economica
  FOR EACH ROW EXECUTE FUNCTION fn_se_bandera_coherente();
