-- ============================================================
-- Migración de CHECKs + secuencia del radicado + RLS
-- (lo que Prisma no puede expresar en el schema)
-- SCRUM-52 Fase 2 — revisada contra los nombres reales de tablas y columnas.
-- Regla: NULL = "No aplica" solo en preguntas condicionales
-- (gestación, semana de gestación, lactancia, método anticonceptivo).
--
-- IMPORTANTE: las migraciones se generan con --create-only y las aplica el
-- responsable de BD. Esta SQL se pega dentro del migration.sql de
-- 20261024000001_checks_y_rls y luego se aplica con `npx prisma migrate dev`.
-- ============================================================

-- ------------------------------------------------------------
-- PORTABILIDAD: gen_random_uuid() es core desde PG 13; si el
-- servidor del SENA usa una versión anterior, pgcrypto lo provee.
-- No es exclusivo de Supabase.
-- ------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ------------------------------------------------------------
-- SECUENCIA DEL RADICADO (formato provisional RAD-SENA-AAAA-NNNNNN,
-- pendiente de confirmar con Edwin si el SENA tiene un formato oficial)
-- El número lo compone el servicio al pasar la caracterización a 'completa':
--   'RAD-SENA-' || to_char(CURRENT_DATE, 'YYYY') || '-' || lpad(nextval('radicado_seq')::text, 6, '0')
-- ------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS radicado_seq;

-- ------------------------------------------------------------
-- CHECK: validaciones a nivel de base de datos
-- ------------------------------------------------------------
ALTER TABLE salud_sexual_reproductiva
    ADD CONSTRAINT chk_ssr_semana_gestacion
        CHECK (semana_gestacion IS NULL OR semana_gestacion BETWEEN 1 AND 42),
    ADD CONSTRAINT chk_ssr_num_hijos
        CHECK (num_hijos >= 0),
    ADD CONSTRAINT chk_ssr_num_personas_hogar
        CHECK (num_personas_hogar >= 1),
    -- Coherencia aprobada: la semana de gestación solo existe si en_gestacion = true
    ADD CONSTRAINT chk_ssr_semana_con_gestacion
        CHECK (semana_gestacion IS NULL OR en_gestacion = TRUE);

ALTER TABLE covid19
    ADD CONSTRAINT chk_covid19_dosis
        CHECK (dosis IS NULL OR dosis BETWEEN 0 AND 4);

ALTER TABLE caracterizaciones
    ADD CONSTRAINT chk_caracterizaciones_estado
        CHECK (estado IN ('en_curso', 'completa', 'pendiente_actualizar')),
    ADD CONSTRAINT chk_caracterizaciones_radicado
        CHECK (radicado IS NULL OR radicado ~ '^RAD-SENA-[0-9]{4}-[0-9]{6}$');

ALTER TABLE usuarios
    ADD CONSTRAINT chk_usuarios_rol
        CHECK (rol IN ('lider_bienestar', 'direccion_regional', 'coordinacion', 'calidad', 'admin'));

ALTER TABLE roles_permisos
    ADD CONSTRAINT chk_roles_permisos_nivel
        CHECK (nivel_acceso IN ('lectura', 'escritura', 'ninguno'));

ALTER TABLE auditoria_accesos
    ADD CONSTRAINT chk_auditoria_accion
        CHECK (accion IN ('consultar', 'crear', 'modificar', 'eliminar', 'exportar'));

-- ------------------------------------------------------------
-- RLS (Row Level Security)
-- Con RLS activo y SIN políticas, la API pública de Supabase no puede
-- leer ni escribir nada. El backend (Prisma) se conecta con el rol
-- propietario, que NO pasa por RLS: los permisos por módulo se aplican
-- en NestJS (guards), no aquí.
-- Si el backend deja de usar el rol propietario (ej. servidor del SENA),
-- definir políticas por rol aquí o deshabilitar RLS.
-- ------------------------------------------------------------
ALTER TABLE catalogos                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE fichas                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE enfermedades              ENABLE ROW LEVEL SECURITY;
ALTER TABLE aprendices                ENABLE ROW LEVEL SECURITY;
ALTER TABLE aceptacion_politica       ENABLE ROW LEVEL SECURITY;
ALTER TABLE localizacion              ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios_publicos        ENABLE ROW LEVEL SECURITY;
ALTER TABLE formacion                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE salud                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE salud_sexual_reproductiva ENABLE ROW LEVEL SECURITY;
ALTER TABLE parentescos_hogar         ENABLE ROW LEVEL SECURITY;
ALTER TABLE covid19                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE situacion_economica       ENABLE ROW LEVEL SECURITY;
ALTER TABLE poblaciones_reconocidas   ENABLE ROW LEVEL SECURITY;
ALTER TABLE apoyos_estado             ENABLE ROW LEVEL SECURITY;
ALTER TABLE situaciones_hogar         ENABLE ROW LEVEL SECURITY;
ALTER TABLE problematicas_sector      ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfil_ocupacional        ENABLE ROW LEVEL SECURITY;
ALTER TABLE caracterizaciones         ENABLE ROW LEVEL SECURITY;
ALTER TABLE egresados                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles_permisos            ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria_accesos         ENABLE ROW LEVEL SECURITY;
