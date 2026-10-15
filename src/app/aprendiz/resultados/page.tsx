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
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-sena-navy shadow-lg hover:bg-slate-50 transition-all hover:scale-105 shrink-0"
        >
          <RefreshCw size={14} />
          <span>Actualizar Datos</span>
        </Link>
      </header>

      {/* Comprobante Oficial Renderizado */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 sm:p-6">
        <Formulario10Finalizado radicado="RAD-SENA-2026-789412" />
      </main>
    </div>
  );
}
