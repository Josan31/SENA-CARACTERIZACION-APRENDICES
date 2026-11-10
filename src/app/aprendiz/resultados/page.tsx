"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Sparkles,
  HeartPulse,
  Syringe,
  TrendingUp,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Check,
  Clock,
  Shield,
  BarChart3,
  Thermometer
} from "lucide-react";

export default function AprendizResultadosPage() {
  return (
    <main className="min-h-screen w-full bg-[#f1f9fc] px-4 py-6 text-[#173b63] sm:px-6 lg:px-10 font-primary">
      <div className="mx-auto w-full max-w-[1500px] space-y-6">

        {/* ==================================================
            ENCABEZADO DE LA PÁGINA (Estilo directo sin fondo blanco)
            ================================================== */}
        <header className="mb-7 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              type="button"
              aria-label="Volver"
              onClick={() => window.history.back()}
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#168c91] shadow-md transition hover:bg-[#e8f8f5] cursor-pointer"
            >
              <ChevronLeft size={25} />
            </button>

            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#00304d] tracking-tight">
                Bienvenido(a), Aprendiz SENA
              </h1>
              <p className="mt-1 text-sm text-[#6285a5]">
                Aqui iria la info del aprendiz y su ficha correspondiente
              </p>
            </div>
          </div>

          {/* Identificación institucional SENA */}
          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-xl font-black leading-none text-[#08713e]">
              SENA
            </p>
            <p className="mt-1 text-[10px] leading-tight text-[#27634c]">
              Tecnología
              <br />
              e innovación
              <br />
              para un mejor país
            </p>
            <div className="ml-auto mt-2 h-1 w-12 bg-[#08713e]" />
          </div>
        </header>

        {/* Barra de Progreso Superior */}
        <div className="bg-[#39A900]/10 rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
            <BarChart3 size={16} className="text-emerald-600" />
            <span>[ DATOS ACTUALIZADOS ]</span>
          </div>
          <div className="w-full sm:w-2/3 flex items-center gap-3">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#00785a] h-full rounded-full w-[65%] transition-all duration-500"></div>
            </div>
            <span className="text-xs font-bold text-slate-700 shrink-0">65% Completado</span>
          </div>
        </div>

        <h3 className="text-2xl font-extrabold tracking-tight text-[#173b63] sm:text-3xl">
              Mis Resultados de Bienestar Y Salud
        </h3>
        <p className="mt-1 text-sm text-[#6285a5]">
          Aqui iria la info del aprendiz y su ficha correspondiente
        </p>

        {/* ==================================================
            SECCIÓN DE TARJETAS DE RESULTADOS
            ================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Tarjeta 1: Resumen Diagnóstico de Salud */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Resumen Diagnóstico de Salud (Física)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-2">

                {/* Columna de Iconos a la izquierda + Gráfico Donut */}
                <div className="flex items-center justify-center gap-3 p-2">
                  <div className="flex flex-col gap-2.5 shrink-0">
                    <div className="p-2 rounded-xl  text-[#00785a]">
                      <HeartPulse size={25} />
                    </div>
                    <div className="p-2 rounded-xl text-[#00785a]">
                      <ShieldCheck size={25} />
                    </div>
                    <div className="p-2 rounded-xl  text-[#00785a] ">
                      <Activity size={25} />
                    </div>
                  </div>

                  {/* Gráfico Donut */}
                  <div className="relative flex items-center justify-center p-2">
                    <div className="w-40 h-40 rounded-full border-[40px] border-slate-100 border-t-[#0077b6] border-r-emerald-500 border-b-amber-400 flex items-center justify-center shadow-inner">
                      <div className="text-center">
                        <HeartPulse className="mx-auto text-[#00785a]" size={30} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Porcentajes y Leyendas */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                      Condición Óptima
                    </span>
                    <span className="font-bold text-slate-700">65%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0077b6] inline-block"></span>
                      Requiere Seguimiento Menor
                    </span>
                    <span className="font-bold text-slate-700">20%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                      Bajo Monitoreo de Bienestar
                    </span>
                    <span className="font-bold text-slate-700">15%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 bg-sky-50/60 rounded-xl p-3 flex items-center gap-2 text-xs text-[#00304d]">
              <ShieldCheck size={16} className="text-[#0077b6] shrink-0" />
              <span>Tu perfil general está saludable y cumple con los estándares institucionales.</span>
            </div>
          </div>

          {/* Tarjeta 2: Esquema de Vacunación e Inmunización */}
<div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
  <div>
    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
        Esquema de Vacunación e Inmunización
      </h3>
    </div>

    {/* Distribución general en cuadrícula: Izquierda la columna de iconos, Derecha las barras */}
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 items-center my-2">

      {/* Columna Vertical de Iconos a la Izquierda */}
      <div className="flex flex-col gap-2.5 shrink-0 justify-center">
        <div className="p-2 rounded-xl text-[#00785a]">
          <Syringe size={40} />
        </div>
        <div className="p-2 rounded-xl text-[#00785a] ">
          <ShieldCheck size={40} />
        </div>
      </div>

      {/* Bloque con las Barras de Progreso a la Derecha */}
      <div className="space-y-3.5 text-xs w-full">
        <div>
          <div className="flex justify-between font-medium text-slate-700 mb-1">
            <span>COVID-19 (3 Dosis)</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 size={13} /> 100%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#00785a] h-full rounded-full w-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between font-medium text-slate-700 mb-1">
            <span>Tétanos (Dosis Completa)</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 size={13} /> 100%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#00785a] h-full rounded-full w-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between font-medium text-slate-700 mb-1">
            <span>Influenza</span>
            <span className="text-slate-600 font-bold">70%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[70%]" ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between font-medium text-slate-700 mb-1">
            <span>Otras (ej. VPH)</span>
            <span className="text-slate-600 font-bold">40%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[40%]"></div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
    <span>Esquema verificado por sanidad</span>
    <span className="font-semibold text-emerald-600">Al día</span>
  </div>
</div>
          {/* Tarjeta 3: Perfil Socioeconómico y Cobertura */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="text-[#0077b6]" size={18} />
                  Perfil Socioeconómico y Cobertura
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-2">
                <div className="relative flex flex-col items-center justify-center p-2">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full text-emerald-500/80 drop-shadow-sm" viewBox="0 0 100 100">
                      <polygon points="50,15 85,35 75,80 25,80 15,35" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                      <polygon points="50,28 72,42 65,70 35,70 28,42" fill="none" stroke="#94a3b8" strokeWidth="1" />
                      <polygon points="50,20 80,38 70,75 30,72 18,40" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
                      <circle cx="50" cy="20" r="3" className="fill-emerald-600" />
                      <circle cx="80" cy="38" r="3" className="fill-emerald-600" />
                      <circle cx="70" cy="75" r="3" className="fill-emerald-600" />
                      <circle cx="30" cy="72" r="3" className="fill-emerald-600" />
                      <circle cx="18" cy="40" r="3" className="fill-emerald-600" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-1">Evaluación Multidimensional</span>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                  <CheckCircle2 className="mx-auto text-emerald-600 mb-2" size={28} />
                  <h4 className="text-xs font-bold text-emerald-900 mb-1">Apto para Beneficios</h4>
                  <p className="text-[11px] text-emerald-700 leading-tight">
                    Cumples con el perfil para apoyos de transporte y bienestar institucional.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 4: Historial y Cumplimiento Recaracterización */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="text-[#0077b6]" size={18} />
                  Historial y Cumplimiento Recaracterización
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 my-4 text-center">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="block text-[10px] font-bold text-slate-500">Mar 2026</span>
                  <span className="block text-[11px] font-semibold text-slate-800 mt-0.5">Datos Actualizados</span>
                  <span className="text-[10px] text-emerald-600 font-bold">(100%)</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="block text-[10px] font-bold text-slate-500">Set 2026</span>
                  <span className="block text-[11px] font-semibold text-slate-800 mt-0.5">Datos Actualizados</span>
                  <span className="text-[10px] text-emerald-600 font-bold">(100%)</span>
                </div>

                <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3">
                  <div className="w-7 h-7 mx-auto rounded-full bg-sky-100 text-[#0077b6] flex items-center justify-center mb-1.5">
                    <Clock size={14} strokeWidth={2.5} />
                  </div>
                  <span className="block text-[10px] font-bold text-sky-700">Mar 2027</span>
                  <span className="block text-[11px] font-semibold text-slate-800 mt-0.5">Próxima Actualización</span>
                  <span className="text-[10px] text-sky-600 font-bold">Pendiente</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 justify-center">
              <Shield size={13} />
              <span>Tus datos son confidenciales y protegidos por normatividad institucional.</span>
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}
