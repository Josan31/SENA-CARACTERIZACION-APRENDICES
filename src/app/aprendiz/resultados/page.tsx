// ======================================================
// 1. CONFIGURACIÓN DEL COMPONENTE
// ======================================================

"use client";


// ======================================================
// 2. IMPORTACIÓN DE LIBRERÍAS Y COMPONENTES
// ======================================================

// Importación de React y sus herramientas.
import React, { useState, useEffect } from "react";

// Link permite navegar entre páginas de Next.js
import Link from "next/link";

// Importación de iconos de la biblioteca lucide-react.
import {
  FileCheck2,
  CheckCircle2,
  Download,
  Calendar,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Printer,
  Sparkles,
  Activity,
  HeartPulse,
  Syringe,
  PieChart as PieChartIcon,
  TrendingUp,
  FileText,
  Check,
  Clock,
  Shield,
} from "lucide-react";

// Importación del componente que muestra el comprobante
// oficial de diligenciamiento del aprendiz.
import Formulario10Finalizado from "@/components/formularios/Formulario10Finalizado";


// ======================================================
// 3. COMPONENTE PRINCIPAL: PÁGINA DE RESULTADOS
// ======================================================

// Se declara y exporta el componente principal de la página.
export default function AprendizResultadosPage() {

  // return devuelve el contenido JSX que React
  // debe representar en la interfaz del usuario.
  return (

    // ==================================================
    // 4. CONTENEDOR PRINCIPAL DE LA PÁGINA
    // ==================================================

    // Agrupa todos los elementos de la página.
    <div className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full font-primary">


      {/* ==================================================
          5. BOTÓN CIRCULAR DE RETORNO
          ================================================== */}

      {/* Permite regresar al apartado de formularios
          mediante un enlace de navegación de Next.js. */}
      <div>
        <Link
          // Dirección de la página a la que regresará el usuario.
          href="/aprendiz/formularios"

          // Estilos visuales del botón:
          // tamaño circular, fondo blanco, borde, sombra
          // y efectos al pasar el cursor.
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#00304d] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer hover:-translate-x-0.5"

          // Texto descriptivo del enlace.
          title="Volver a Formularios"
        >

          {/* Icono de flecha hacia la izquierda.
              Se utiliza ArrowRight girado 180 grados. */}
          <ArrowRight
            className="rotate-180"
            size={20}
            strokeWidth={2.6}
          />

        </Link>
      </div>


      {/* ==================================================
          6. ENCABEZADO PRINCIPAL DE LA PÁGINA
          ================================================== */}

      {/* Presenta el título, la descripción y el acceso
          para regresar a la actualización de los datos. */}
      <header className="rounded-2xl bg-gradient-to-r from-[#00304d] via-[#004e7c] to-[#0077b6] p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Contenedor del título y la descripción. */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-sky-100 backdrop-blur-xs mb-2">

            <Sparkles size={12} />

            Certificación Oficial de Caracterización
          </span>


          {/* Título principal de la página. */}
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Mis Resultados y Radicado
          </h1>


          {/* Descripción que explica el propósito de la página. */}
          <p className="text-xs md:text-sm text-sky-100/90 mt-1">
            Consulta y descarga tu constancia oficial de diligenciamiento requerida por Bienestar al Aprendiz.
          </p>

        </div>


        {/* Enlace para regresar al apartado de formularios
            y acceder a la vista identificada como wizard. */}
        <Link
          href="/aprendiz/formularios?tab=wizard"

          // Estilos del botón de actualización:
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#00304d] shadow-lg hover:bg-slate-50 transition-all hover:scale-105 shrink-0"
        >

          <RefreshCw size={14} />

          <span>Actualizar Datos</span>

        </Link>

      </header>


      {/* ==================================================
          7. PANEL DE ANÁLISIS Y ESTADÍSTICAS
          ================================================== */}
      {/* Contenedor que agrupa las tarjetas de resultados.*/}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {/* ==============================================
            7.1. TARJETA: RESUMEN DIAGNÓSTICO DE SALUD
            ============================================== */}

        {/* Contenedor principal de la tarjeta de salud. Incluye el título, el gráfico, las leyendas
            y un mensaje informativo. */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">

          {/* Agrupa el encabezado y la información gráfica. */}
          <div>

            {/* Encabezado de la tarjeta. */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">

              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">

                {/* Icono relacionado con la salud física. */}
                <HeartPulse
                  className="text-[#0077b6]"
                  size={18}
                />

                Resumen Diagnóstico de Salud (Física)

              </h3>
            </div>


            {/* Distribución del gráfico circular y sus leyendas. En pantallas pequeñas se organiza en una columna
                y en pantallas mayores utiliza dos columnas. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-2">


              {/* ------------------------------------------
                  7.1.1. GRÁFICO CIRCULAR SIMULADO
                  ------------------------------------------ */}

              {/* Contenedor que centra el gráfico circular. */}
              <div className="relative flex items-center justify-center p-4">

                {/* Círculo construido mediante CSS.Los diferentes colores de sus bordes
                    generan una representación visual similar a un gráfico de dona. */}
                <div className="w-28 h-28 rounded-full border-8 border-slate-100 border-t-[#0077b6] border-r-emerald-500 border-b-amber-400 flex items-center justify-center shadow-inner">

                  {/* Contenido central del gráfico. */}
                  <div className="text-center">

                    {/* Icono que representa la actividad física. */}
                    <Activity
                      className="mx-auto text-[#00304d] mb-0.5"
                      size={20}
                    />

                    {/* Texto central del gráfico. */}
                    <span className="text-[10px] font-bold text-slate-600">
                      Salud
                    </span>

                  </div>
                </div>
              </div>


              {/* ------------------------------------------
                  7.1.2. LEYENDAS Y PORCENTAJES
                  ------------------------------------------ */}

              {/* Contiene las categorías y los porcentajes
                  representados junto al gráfico. */}
              <div className="space-y-2.5 text-xs">


                {/* Primera categoría: condición óptima. */}
                <div className="flex items-center justify-between">

                  <span className="flex items-center gap-1.5 text-slate-600">

                    {/* Indicador circular de color verde. */}
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>

                    Condición Óptima

                  </span>

                  {/* Porcentaje establecido directamente en el código. */}
                  <span className="font-bold text-slate-700">
                    65%
                  </span>

                </div>


                {/* Segunda categoría: seguimiento menor. */}
                <div className="flex items-center justify-between">

                  <span className="flex items-center gap-1.5 text-slate-600">

                    {/* Indicador circular de color azul. */}
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0077b6] inline-block"></span>

                    Requiere Seguimiento Menor

                  </span>

                  <span className="font-bold text-slate-700">
                    20%
                  </span>

                </div>


                {/* Tercera categoría: bajo monitoreo. */}
                <div className="flex items-center justify-between">

                  <span className="flex items-center gap-1.5 text-slate-600">

                    {/* Indicador circular de color amarillo. */}
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>

                    Bajo Monitoreo

                  </span>

                  <span className="font-bold text-slate-700">
                    15%
                  </span>

                </div>

              </div>
            </div>
          </div>


          {/* ----------------------------------------------
              7.1.3. MENSAJE INFORMATIVO DE SALUD
              ---------------------------------------------- */}

          {/* Recuadro inferior que presenta una conclusión visual sobre el estado general del perfil. */}
          <div className="mt-4 pt-3 border-t border-slate-100 bg-sky-50/60 rounded-xl p-3 flex items-center gap-2 text-xs text-[#00304d]">

            {/* Icono de protección y verificación. */}
            <ShieldCheck
              size={16}
              className="text-[#0077b6] shrink-0"
            />

            <span>
              Tu perfil general está saludable y cumple con los estándares institucionales.
            </span>

          </div>

        </div>


        {/* ==============================================
            7.2. TARJETA: ESQUEMA DE VACUNACIÓN
            ============================================== */}

        {/* Contenedor principal de la tarjeta de vacunación. Presenta diferentes categorías mediante barras
            que representan porcentajes de cumplimiento. */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">

          <div>

            {/* Encabezado de la tarjeta. */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">

              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">

                {/* Icono que representa la vacunación. */}
                <Syringe
                  className="text-emerald-600"
                  size={18}
                />

                Esquema de Vacunación e Inmunización

              </h3>
            </div>


            {/* Contenedor de las categorías de vacunación.
                Establece separación vertical entre cada una. */}
            <div className="space-y-3.5 my-2 text-xs">


              {/* ------------------------------------------
                  7.2.1. VACUNACIÓN COVID-19
                  ------------------------------------------ */}

              <div>

                {/* Nombre de la vacuna y porcentaje. */}
                <div className="flex justify-between font-medium text-slate-700 mb-1">

                  <span>COVID-19 (3 Dosis)</span>

                  {/* Porcentaje e icono de cumplimiento. */}
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    100%
                  </span>

                </div>

                {/* Fondo de la barra de progreso. */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">

                  {/* Barra verde que ocupa el 100 % del ancho. */}
                  <div className="bg-emerald-500 h-full rounded-full w-full"></div>

                </div>
              </div>


              {/* ------------------------------------------
                  7.2.2. VACUNACIÓN TÉTANOS
                  ------------------------------------------ */}

              <div>

                <div className="flex justify-between font-medium text-slate-700 mb-1">

                  <span>Tétanos (Dosis Completa)</span>

                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    100%
                  </span>

                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">

                  {/* Barra de progreso completa. */}
                  <div className="bg-emerald-500 h-full rounded-full w-full"></div>

                </div>
              </div>


              {/* ------------------------------------------
                  7.2.3. VACUNACIÓN INFLUENZA
                  ------------------------------------------ */}

              <div>

                <div className="flex justify-between font-medium text-slate-700 mb-1">

                  <span>Influenza</span>

                  <span className="text-slate-600 font-bold">
                    70%
                  </span>

                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">

                  {/* Barra azul que representa un avance del 70 %. */}
                  <div className="bg-[#0077b6] h-full rounded-full w-[70%]"></div>

                </div>
              </div>


              {/* ------------------------------------------
                  7.2.4. OTRAS VACUNAS
                  ------------------------------------------ */}

              <div>

                <div className="flex justify-between font-medium text-slate-700 mb-1">

                  <span>Otras (ej. VPH)</span>

                  <span className="text-slate-600 font-bold">
                    40%
                  </span>

                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">

                  {/* Barra amarilla que representa un avance del 40 %. */}
                  <div className="bg-amber-400 h-full rounded-full w-[40%]"></div>

                </div>
              </div>

            </div>
          </div>


          {/* ----------------------------------------------
              7.2.5. ESTADO GENERAL DE VACUNACIÓN
              ---------------------------------------------- */}

          {/* Presenta el estado informativo del esquema de vacunación en la parte inferior. */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">

            <span>Esquema verificado por sanidad</span>

            <span className="font-semibold text-emerald-600">
              Al día
            </span>

          </div>

        </div>


        {/* ==============================================
            7.3. TARJETA: PERFIL SOCIOECONÓMICO
            ============================================== */}

        {/* Presenta indicadores relacionados con la situación socioeconómica y la cobertura del aprendiz. */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">

          <div>

            {/* Encabezado de la tarjeta. */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">

              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">

                {/* Icono que representa tendencias o indicadores. */}
                <TrendingUp
                  className="text-[#0077b6]"
                  size={18}
                />

                Perfil Socioeconómico y Cobertura

              </h3>
            </div>


            {/* Distribuye los indicadores y el recuadro de beneficios. */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">


              {/* ------------------------------------------
                  7.3.1. INDICADORES SOCIOECONÓMICOS
                  ------------------------------------------ */}

              {/* Lista de indicadores y sus clasificaciones. */}
              <div className="space-y-2 text-[11px] w-full sm:w-1/2">

                {/* Indicador de estabilidad laboral. */}
                <div className="flex justify-between text-slate-600">
                  <span>Estabilidad Laboral</span>
                  <span className="font-bold text-slate-800">Alto</span>
                </div>

                {/* Indicador de apoyo familiar. */}
                <div className="flex justify-between text-slate-600">
                  <span>Apoyo Familiar</span>
                  <span className="font-bold text-slate-800">Óptimo</span>
                </div>

                {/* Indicador del nivel de ingresos. */}
                <div className="flex justify-between text-slate-600">
                  <span>Nivel de Ingresos</span>
                  <span className="font-bold text-slate-800">Medio</span>
                </div>

                {/* Indicador de cercanía al transporte. */}
                <div className="flex justify-between text-slate-600">
                  <span>Cercanía Transporte</span>
                  <span className="font-bold text-slate-800">Favorable</span>
                </div>

                {/* Indicador de conexión a internet. */}
                <div className="flex justify-between text-slate-600">
                  <span>Conexión Internet</span>
                  <span className="font-bold text-slate-800">Estable</span>
                </div>
              </div>


              {/* ------------------------------------------
                  7.3.2. RECUADRO DE BENEFICIOS
                  ------------------------------------------ */}

              {/* Destaca visualmente el mensaje relacionado
                  con los posibles beneficios institucionales. */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center sm:w-1/2">

                {/* Icono de verificación. */}
                <CheckCircle2
                  className="mx-auto text-emerald-600 mb-2"
                  size={28}
                />

                {/* Título del recuadro. */}
                <h4 className="text-xs font-bold text-emerald-900 mb-1">
                  Apto para Beneficios
                </h4>

                {/* Descripción del mensaje. */}
                <p className="text-[11px] text-emerald-700 leading-tight">
                  Cumples con el perfil para apoyos de transporte y bienestar institucional.
                </p>

              </div>

            </div>
          </div>
        </div>
        {/* ==============================================
            7.4. TARJETA: HISTORIAL DE RECARACTERIZACIÓN
            ============================================== */}

        {/* Presenta las actualizaciones anteriores y la
            próxima fecha prevista para actualizar los datos. */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">

          <div>

            {/* Encabezado de la tarjeta. */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">

              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">

                {/* Icono que representa un documento o historial. */}
                <FileText
                  className="text-[#0077b6]"
                  size={18}
                />

                Historial y Cumplimiento Recaracterización

              </h3>
            </div>


            {/* ------------------------------------------
                7.4.1. HISTORIAL DE ACTUALIZACIONES
                ------------------------------------------ */}

            {/* Grid de tres columnas que representa
                las diferentes etapas de recaracterización. */}
            <div className="grid grid-cols-3 gap-2 my-4 text-center">


              {/* ----------------------------------------
                  PRIMER REGISTRO: MARZO DE 2026
                  ---------------------------------------- */}

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">

                {/* Indicador visual de actualización completada. */}
                <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">

                  <Check
                    size={14}
                    strokeWidth={3}
                  />

                </div>

                {/* Fecha del registro. */}
                <span className="block text-[10px] font-bold text-slate-500">
                  Mar 2026
                </span>

                {/* Descripción de la actualización. */}
                <span className="block text-[11px] font-semibold text-slate-800 mt-0.5">
                  Datos Actualizados
                </span>

                {/* Porcentaje de cumplimiento. */}
                <span className="text-[10px] text-emerald-600 font-bold">
                  (100%)
                </span>

              </div>


              {/* ----------------------------------------
                  SEGUNDO REGISTRO: SEPTIEMBRE DE 2026
                  ---------------------------------------- */}

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">

                {/* Indicador visual de actualización completada. */}
                <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">

                  <Check
                    size={14}
                    strokeWidth={3}
                  />

                </div>

                <span className="block text-[10px] font-bold text-slate-500">
                  Set 2026
                </span>

                <span className="block text-[11px] font-semibold text-slate-800 mt-0.5">
                  Datos Actualizados
                </span>

                <span className="text-[10px] text-emerald-600 font-bold">
                  (100%)
                </span>

              </div>


              {/* ----------------------------------------
                  TERCER REGISTRO: MARZO DE 2027
                  ---------------------------------------- */}

              {/* Representa una actualización futura
                  que todavía aparece como pendiente. */}
              <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3">

                {/* Indicador visual de actividad pendiente. */}
                <div className="w-7 h-7 mx-auto rounded-full bg-sky-100 text-[#0077b6] flex items-center justify-center mb-1.5">

                  <Clock
                    size={14}
                    strokeWidth={2.5}
                  />

                </div>

                <span className="block text-[10px] font-bold text-sky-700">
                  Mar 2027
                </span>

                <span className="block text-[11px] font-semibold text-slate-800 mt-0.5">
                  Próxima Actualización
                </span>

                <span className="text-[10px] text-sky-600 font-bold">
                  Pendiente
                </span>

              </div>

            </div>
          </div>


          {/* ----------------------------------------------
              7.4.2. MENSAJE DE CONFIDENCIALIDAD
              ---------------------------------------------- */}

          {/* Mensaje informativo sobre la confidencialidad
              y protección de los datos del aprendiz. */}
          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 justify-center">

            {/* Icono de escudo. */}
            <Shield size={13} />

            <span>
              Tus datos son confidenciales y protegidos por normatividad institucional.
            </span>

          </div>

        </div>

      </section>


      {/* ==================================================
          8. COMPROBANTE OFICIAL DE DILIGENCIAMIENTO
          ================================================== */}

      {/* Contenedor que presenta el comprobante oficial
          al final de la página. */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 sm:p-6">

        {/* Se reutiliza el componente Formulario10Finalizado,
            importado al principio del archivo.

            Se le envía la propiedad "radicado", que contiene
            el número de identificación del comprobante. */}
        <Formulario10Finalizado
          radicado="RAD-SENA-2026-789412"
        />

      </main>

    </div>
  );
}
