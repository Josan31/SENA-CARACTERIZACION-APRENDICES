-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "catalogos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "categoria" VARCHAR(50) NOT NULL,
    "valor" VARCHAR(150) NOT NULL,
    "orden" INTEGER DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "catalogos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fichas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "numero_ficha" VARCHAR(20) NOT NULL,
    "programa_id" UUID NOT NULL,
    "jornada_id" UUID NOT NULL,
    "modalidad_id" UUID NOT NULL,
    "nivel_formacion_id" UUID NOT NULL,
    "instructor_responsable" VARCHAR(150),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fichas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enfermedades" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(150) NOT NULL,
    "codigo_cie10" VARCHAR(10),

    CONSTRAINT "enfermedades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aprendices" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario" VARCHAR(20) NOT NULL,
    "nombre_completo" VARCHAR(150) NOT NULL,
    "tipo_documento_id" UUID NOT NULL,
    "numero_documento" VARCHAR(20) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "sexo_id" UUID NOT NULL,
    "se_reconoce_lgbtiq" BOOLEAN NOT NULL DEFAULT false,
    "orientacion_sexual_id" UUID,
    "estado_civil_id" UUID NOT NULL,
    "correo_personal" VARCHAR(100) NOT NULL,
    "correo_institucional" VARCHAR(100),
    "telefono" VARCHAR(15),
    "contacto_emergencia_nombre" VARCHAR(150),
    "contacto_emergencia_telefono" VARCHAR(15),
    "contacto_emergencia_parentesco_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aprendices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aceptacion_politica" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "aceptado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_aceptacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "texto_version" VARCHAR(20),

    CONSTRAINT "aceptacion_politica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "localizacion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "direccion" VARCHAR(200) NOT NULL,
    "ciudad_id" UUID NOT NULL,
    "barrio_id" UUID,
    "estrato_id" UUID NOT NULL,
    "zona_id" UUID,
    "tenencia_vivienda_id" UUID,
    "medio_transporte_id" UUID,

    CONSTRAINT "localizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicios_publicos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "servicio_id" UUID NOT NULL,
    "tiene_servicio" BOOLEAN NOT NULL,

    CONSTRAINT "servicios_publicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formacion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "ficha_id" UUID NOT NULL,

    CONSTRAINT "formacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salud" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "afiliado_salud" BOOLEAN NOT NULL,
    "eps_id" UUID NOT NULL,
    "regimen_salud_id" UUID NOT NULL,
    "sisben_estado_id" UUID NOT NULL,
    "grupo_sisben_id" UUID,
    "enfermedad_id" UUID,
    "enfermedad_otra" VARCHAR(150),
    "trastorno_mental" BOOLEAN NOT NULL DEFAULT false,
    "trastorno_detalle" VARCHAR(150),
    "psicoterapia" BOOLEAN NOT NULL DEFAULT false,
    "requiere_medicamento" BOOLEAN NOT NULL DEFAULT false,
    "medicamento_detalle" VARCHAR(150),
    "discapacidad_certificada" BOOLEAN NOT NULL DEFAULT false,
    "presenta_discapacidad" BOOLEAN NOT NULL DEFAULT false,
    "tipo_discapacidad_id" UUID,
    "discapacidad_detalle" VARCHAR(150),
    "alergia" BOOLEAN NOT NULL DEFAULT false,
    "alergia_detalle" VARCHAR(150),
    "consume_sustancias" BOOLEAN NOT NULL DEFAULT false,
    "medicamento_permanente" BOOLEAN NOT NULL DEFAULT false,
    "medicamento_permanente_nombre" VARCHAR(150),

    CONSTRAINT "salud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salud_sexual_reproductiva" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "en_gestacion" BOOLEAN,
    "semana_gestacion" INTEGER,
    "en_lactancia" BOOLEAN,
    "cabeza_familia" BOOLEAN NOT NULL DEFAULT false,
    "num_hijos" INTEGER NOT NULL DEFAULT 0,
    "num_personas_hogar" INTEGER NOT NULL DEFAULT 1,
    "metodo_anticonceptivo_id" UUID,
    "anticonceptivo_detalle" VARCHAR(150),
    "desea_asesoria" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "salud_sexual_reproductiva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parentescos_hogar" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "parentesco_id" UUID NOT NULL,

    CONSTRAINT "parentescos_hogar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "covid19" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "vacunado" BOOLEAN NOT NULL,
    "vacuna_id" UUID,
    "dosis" INTEGER,
    "esquema_completo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "covid19_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "situacion_economica" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "jefe_hogar" BOOLEAN NOT NULL,
    "sostiene_hogar" BOOLEAN NOT NULL,
    "sustento_principal_id" UUID NOT NULL,
    "personas_a_cargo" INTEGER NOT NULL DEFAULT 0,
    "rango_ingresos_id" UUID NOT NULL,
    "fuente_ingresos_id" UUID NOT NULL,
    "grupo_etnico_id" UUID NOT NULL,

    CONSTRAINT "situacion_economica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poblaciones_reconocidas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "poblacion_id" UUID NOT NULL,

    CONSTRAINT "poblaciones_reconocidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apoyos_estado" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "tipo_apoyo_id" UUID NOT NULL,
    "detalle_otra" VARCHAR(150),

    CONSTRAINT "apoyos_estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "situaciones_hogar" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "situacion_id" UUID NOT NULL,

    CONSTRAINT "situaciones_hogar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problematicas_sector" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "problematica_id" UUID NOT NULL,

    CONSTRAINT "problematicas_sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil_ocupacional" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "caracterizacion_id" UUID NOT NULL,
    "nivel_formacion_previo_id" UUID NOT NULL,
    "formacion_previa_sena" BOOLEAN NOT NULL,
    "motivacion_id" UUID NOT NULL,
    "trabaja_actualmente" BOOLEAN NOT NULL,
    "lugar_horario_trabajo" VARCHAR(150),

    CONSTRAINT "perfil_ocupacional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caracterizaciones" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "radicado" VARCHAR(24),
    "fecha" DATE NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "estado" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "caracterizaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "egresados" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aprendiz_id" UUID NOT NULL,
    "fecha_egreso" DATE,
    "estado" VARCHAR(20),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "egresados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(150) NOT NULL,
    "correo" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(30) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles_permisos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rol" VARCHAR(30) NOT NULL,
    "modulo" VARCHAR(50) NOT NULL,
    "nivel_acceso" VARCHAR(20) NOT NULL,

    CONSTRAINT "roles_permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_accesos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID,
    "aprendiz_id" UUID,
    "accion" VARCHAR(20) NOT NULL,
    "tabla" VARCHAR(50) NOT NULL,
    "detalle" VARCHAR(255),
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_accesos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "catalogos_categoria_idx" ON "catalogos"("categoria");

-- CreateIndex
CREATE INDEX "catalogos_activo_idx" ON "catalogos"("activo");

-- CreateIndex

-- CreateIndex
CREATE UNIQUE INDEX "fichas_numero_ficha_key" ON "fichas"("numero_ficha");

-- CreateIndex
CREATE INDEX "fichas_numero_ficha_idx" ON "fichas"("numero_ficha");

-- CreateIndex
CREATE UNIQUE INDEX "aprendices_usuario_key" ON "aprendices"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "aprendices_numero_documento_key" ON "aprendices"("numero_documento");

-- CreateIndex
CREATE INDEX "aprendices_numero_documento_idx" ON "aprendices"("numero_documento");

-- CreateIndex
CREATE INDEX "aprendices_usuario_idx" ON "aprendices"("usuario");

-- CreateIndex
CREATE INDEX "aceptacion_politica_aprendiz_id_idx" ON "aceptacion_politica"("aprendiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "localizacion_caracterizacion_id_key" ON "localizacion"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "localizacion_aprendiz_id_idx" ON "localizacion"("aprendiz_id");

-- CreateIndex
CREATE INDEX "servicios_publicos_aprendiz_id_idx" ON "servicios_publicos"("aprendiz_id");

-- CreateIndex
CREATE INDEX "servicios_publicos_caracterizacion_id_idx" ON "servicios_publicos"("caracterizacion_id");

-- CreateIndex
CREATE UNIQUE INDEX "formacion_caracterizacion_id_key" ON "formacion"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "formacion_aprendiz_id_idx" ON "formacion"("aprendiz_id");

-- CreateIndex
CREATE INDEX "formacion_ficha_id_idx" ON "formacion"("ficha_id");

-- CreateIndex
CREATE UNIQUE INDEX "salud_caracterizacion_id_key" ON "salud"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "salud_aprendiz_id_idx" ON "salud"("aprendiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "salud_sexual_reproductiva_caracterizacion_id_key" ON "salud_sexual_reproductiva"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "salud_sexual_reproductiva_aprendiz_id_idx" ON "salud_sexual_reproductiva"("aprendiz_id");

-- CreateIndex
CREATE INDEX "parentescos_hogar_aprendiz_id_idx" ON "parentescos_hogar"("aprendiz_id");

-- CreateIndex
CREATE INDEX "parentescos_hogar_caracterizacion_id_idx" ON "parentescos_hogar"("caracterizacion_id");

-- CreateIndex
CREATE UNIQUE INDEX "covid19_caracterizacion_id_key" ON "covid19"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "covid19_aprendiz_id_idx" ON "covid19"("aprendiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "situacion_economica_caracterizacion_id_key" ON "situacion_economica"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "situacion_economica_aprendiz_id_idx" ON "situacion_economica"("aprendiz_id");

-- CreateIndex
CREATE INDEX "poblaciones_reconocidas_aprendiz_id_idx" ON "poblaciones_reconocidas"("aprendiz_id");

-- CreateIndex
CREATE INDEX "poblaciones_reconocidas_caracterizacion_id_idx" ON "poblaciones_reconocidas"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "apoyos_estado_aprendiz_id_idx" ON "apoyos_estado"("aprendiz_id");

-- CreateIndex
CREATE INDEX "apoyos_estado_caracterizacion_id_idx" ON "apoyos_estado"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "situaciones_hogar_aprendiz_id_idx" ON "situaciones_hogar"("aprendiz_id");

-- CreateIndex
CREATE INDEX "situaciones_hogar_caracterizacion_id_idx" ON "situaciones_hogar"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "problematicas_sector_aprendiz_id_idx" ON "problematicas_sector"("aprendiz_id");

-- CreateIndex
CREATE INDEX "problematicas_sector_caracterizacion_id_idx" ON "problematicas_sector"("caracterizacion_id");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_ocupacional_caracterizacion_id_key" ON "perfil_ocupacional"("caracterizacion_id");

-- CreateIndex
CREATE INDEX "perfil_ocupacional_aprendiz_id_idx" ON "perfil_ocupacional"("aprendiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "caracterizaciones_radicado_key" ON "caracterizaciones"("radicado");

-- CreateIndex
CREATE INDEX "caracterizaciones_aprendiz_id_idx" ON "caracterizaciones"("aprendiz_id");

-- CreateIndex
CREATE INDEX "caracterizaciones_estado_idx" ON "caracterizaciones"("estado");

-- CreateIndex

-- CreateIndex
CREATE INDEX "egresados_aprendiz_id_idx" ON "egresados"("aprendiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE INDEX "usuarios_correo_idx" ON "usuarios"("correo");

-- CreateIndex
CREATE INDEX "usuarios_rol_idx" ON "usuarios"("rol");

-- CreateIndex
CREATE UNIQUE INDEX "roles_permisos_rol_modulo_key" ON "roles_permisos"("rol", "modulo");

-- CreateIndex
CREATE INDEX "auditoria_accesos_usuario_id_idx" ON "auditoria_accesos"("usuario_id");

-- CreateIndex
CREATE INDEX "auditoria_accesos_aprendiz_id_idx" ON "auditoria_accesos"("aprendiz_id");

-- CreateIndex
CREATE INDEX "auditoria_accesos_fecha_idx" ON "auditoria_accesos"("fecha");

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_programa_id_fkey" FOREIGN KEY ("programa_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_modalidad_id_fkey" FOREIGN KEY ("modalidad_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_nivel_formacion_id_fkey" FOREIGN KEY ("nivel_formacion_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprendices" ADD CONSTRAINT "aprendices_tipo_documento_id_fkey" FOREIGN KEY ("tipo_documento_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprendices" ADD CONSTRAINT "aprendices_sexo_id_fkey" FOREIGN KEY ("sexo_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprendices" ADD CONSTRAINT "aprendices_orientacion_sexual_id_fkey" FOREIGN KEY ("orientacion_sexual_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprendices" ADD CONSTRAINT "aprendices_estado_civil_id_fkey" FOREIGN KEY ("estado_civil_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprendices" ADD CONSTRAINT "aprendices_contacto_emergencia_parentesco_id_fkey" FOREIGN KEY ("contacto_emergencia_parentesco_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aceptacion_politica" ADD CONSTRAINT "aceptacion_politica_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_ciudad_id_fkey" FOREIGN KEY ("ciudad_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_barrio_id_fkey" FOREIGN KEY ("barrio_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_estrato_id_fkey" FOREIGN KEY ("estrato_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_zona_id_fkey" FOREIGN KEY ("zona_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_tenencia_vivienda_id_fkey" FOREIGN KEY ("tenencia_vivienda_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacion" ADD CONSTRAINT "localizacion_medio_transporte_id_fkey" FOREIGN KEY ("medio_transporte_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicios_publicos" ADD CONSTRAINT "servicios_publicos_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicios_publicos" ADD CONSTRAINT "servicios_publicos_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicios_publicos" ADD CONSTRAINT "servicios_publicos_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formacion" ADD CONSTRAINT "formacion_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formacion" ADD CONSTRAINT "formacion_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formacion" ADD CONSTRAINT "formacion_ficha_id_fkey" FOREIGN KEY ("ficha_id") REFERENCES "fichas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud" ADD CONSTRAINT "salud_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud" ADD CONSTRAINT "salud_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud" ADD CONSTRAINT "salud_eps_id_fkey" FOREIGN KEY ("eps_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud" ADD CONSTRAINT "salud_regimen_salud_id_fkey" FOREIGN KEY ("regimen_salud_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud" ADD CONSTRAINT "salud_sisben_estado_id_fkey" FOREIGN KEY ("sisben_estado_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud" ADD CONSTRAINT "salud_grupo_sisben_id_fkey" FOREIGN KEY ("grupo_sisben_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud" ADD CONSTRAINT "salud_tipo_discapacidad_id_fkey" FOREIGN KEY ("tipo_discapacidad_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud" ADD CONSTRAINT "salud_enfermedad_id_fkey" FOREIGN KEY ("enfermedad_id") REFERENCES "enfermedades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud_sexual_reproductiva" ADD CONSTRAINT "salud_sexual_reproductiva_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud_sexual_reproductiva" ADD CONSTRAINT "salud_sexual_reproductiva_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salud_sexual_reproductiva" ADD CONSTRAINT "salud_sexual_reproductiva_metodo_anticonceptivo_id_fkey" FOREIGN KEY ("metodo_anticonceptivo_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parentescos_hogar" ADD CONSTRAINT "parentescos_hogar_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parentescos_hogar" ADD CONSTRAINT "parentescos_hogar_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parentescos_hogar" ADD CONSTRAINT "parentescos_hogar_parentesco_id_fkey" FOREIGN KEY ("parentesco_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "covid19" ADD CONSTRAINT "covid19_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "covid19" ADD CONSTRAINT "covid19_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "covid19" ADD CONSTRAINT "covid19_vacuna_id_fkey" FOREIGN KEY ("vacuna_id") REFERENCES "catalogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situacion_economica" ADD CONSTRAINT "situacion_economica_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situacion_economica" ADD CONSTRAINT "situacion_economica_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situacion_economica" ADD CONSTRAINT "situacion_economica_sustento_principal_id_fkey" FOREIGN KEY ("sustento_principal_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situacion_economica" ADD CONSTRAINT "situacion_economica_rango_ingresos_id_fkey" FOREIGN KEY ("rango_ingresos_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situacion_economica" ADD CONSTRAINT "situacion_economica_fuente_ingresos_id_fkey" FOREIGN KEY ("fuente_ingresos_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situacion_economica" ADD CONSTRAINT "situacion_economica_grupo_etnico_id_fkey" FOREIGN KEY ("grupo_etnico_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poblaciones_reconocidas" ADD CONSTRAINT "poblaciones_reconocidas_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poblaciones_reconocidas" ADD CONSTRAINT "poblaciones_reconocidas_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poblaciones_reconocidas" ADD CONSTRAINT "poblaciones_reconocidas_poblacion_id_fkey" FOREIGN KEY ("poblacion_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apoyos_estado" ADD CONSTRAINT "apoyos_estado_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apoyos_estado" ADD CONSTRAINT "apoyos_estado_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apoyos_estado" ADD CONSTRAINT "apoyos_estado_tipo_apoyo_id_fkey" FOREIGN KEY ("tipo_apoyo_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situaciones_hogar" ADD CONSTRAINT "situaciones_hogar_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situaciones_hogar" ADD CONSTRAINT "situaciones_hogar_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "situaciones_hogar" ADD CONSTRAINT "situaciones_hogar_situacion_id_fkey" FOREIGN KEY ("situacion_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problematicas_sector" ADD CONSTRAINT "problematicas_sector_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problematicas_sector" ADD CONSTRAINT "problematicas_sector_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problematicas_sector" ADD CONSTRAINT "problematicas_sector_problematica_id_fkey" FOREIGN KEY ("problematica_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_ocupacional" ADD CONSTRAINT "perfil_ocupacional_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_ocupacional" ADD CONSTRAINT "perfil_ocupacional_caracterizacion_id_fkey" FOREIGN KEY ("caracterizacion_id") REFERENCES "caracterizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_ocupacional" ADD CONSTRAINT "perfil_ocupacional_nivel_formacion_previo_id_fkey" FOREIGN KEY ("nivel_formacion_previo_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_ocupacional" ADD CONSTRAINT "perfil_ocupacional_motivacion_id_fkey" FOREIGN KEY ("motivacion_id") REFERENCES "catalogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caracterizaciones" ADD CONSTRAINT "caracterizaciones_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "egresados" ADD CONSTRAINT "egresados_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria_accesos" ADD CONSTRAINT "auditoria_accesos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria_accesos" ADD CONSTRAINT "auditoria_accesos_aprendiz_id_fkey" FOREIGN KEY ("aprendiz_id") REFERENCES "aprendices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

