"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import Formulario10Finalizado from "@/components/formularios/Formulario10Finalizado";

export default function AprendizResultadosPage() {
  return (
    <div className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full font-primary">
      {/* Botón Circular de Retorno */}
      <div>
        <Link
          href="/aprendiz/formularios"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#00304d] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer hover:-translate-x-0.5"
          title="Volver a Formularios"
        >
          <ArrowRight className="rotate-180" size={20} strokeWidth={2.6} />
        </Link>
      </div>

      {/* Encabezado */}
      <header className="rounded-2xl bg-gradient-to-r from-[#00304d] via-[#004e7c] to-[#0077b6] p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-sky-100 backdrop-blur-xs mb-2">
            <Sparkles size={12} />
            Certificación Oficial de Caracterización
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Mis Resultados y Radicado
          </h1>
          <p className="text-xs md:text-sm text-sky-100/90 mt-1">
            Consulta y descarga tu constancia oficial de diligenciamiento requerida por Bienestar al Aprendiz.
          </p>
        </div>

        <Link
          href="/aprendiz/formularios?tab=wizard"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#00304d] shadow-lg hover:bg-slate-50 transition-all hover:scale-105 shrink-0"
        >
          <RefreshCw size={14} />
          <span>Actualizar Datos</span>
        </Link>
      </header>

      {/* SECCIÓN NUEVA: Panel de Análisis y Estadísticas de Caracterización (Basado en la vista de la app) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Tarjeta 1: Resumen Diagnóstico de Salud */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <HeartPulse className="text-[#0077b6]" size={18} />
                Resumen Diagnóstico de Salud (Física)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-2">
              {/* Gráfico visual simulado (Donut Chart representation) */}
              <div className="relative flex items-center justify-center p-4">
                <div className="w-28 h-28 rounded-full border-8 border-slate-100 border-t-[#0077b6] border-r-emerald-500 border-b-amber-400 flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <Activity className="mx-auto text-[#00304d] mb-0.5" size={20} />
                    <span className="text-[10px] font-bold text-slate-600">Salud</span>
                  </div>
                </div>
              </div>

              {/* Leyendas y porcentajes */}
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
                    Bajo Monitoreo
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
                <Syringe className="text-emerald-600" size={18} />
                Esquema de Vacunación e Inmunización
              </h3>
            </div>

            <div className="space-y-3.5 my-2 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>COVID-19 (3 Dosis)</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> 100%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-full"></div>
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
                  <div className="bg-emerald-500 h-full rounded-full w-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Influenza</span>
                  <span className="text-slate-600 font-bold">70%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0077b6] h-full rounded-full w-[70%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Otras (ej. VPH)</span>
                  <span className="text-slate-600 font-bold">40%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full w-[40%]"></div>
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

            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
              {/* Representación gráfica tipo radar / barras simplificadas */}
              <div className="space-y-2 text-[11px] w-full sm:w-1/2">
                <div className="flex justify-between text-slate-600">
                  <span>Estabilidad Laboral</span>
                  <span className="font-bold text-slate-800">Alto</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Apoyo Familiar</span>
                  <span className="font-bold text-slate-800">Óptimo</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Nivel de Ingresos</span>
                  <span className="font-bold text-slate-800">Medio</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Cercanía Transporte</span>
                  <span className="font-bold text-slate-800">Favorable</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Conexión Internet</span>
                  <span className="font-bold text-slate-800">Estable</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center sm:w-1/2">
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

            {/* Timeline / Pasos de recaracterización */}
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

      {/* Comprobante Oficial Renderizado (Tu componente original) */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 sm:p-6">
        <Formulario10Finalizado radicado="RAD-SENA-2026-789412" />
      </main>
    </div>
  );
}
