"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FormularioConsentimiento from "@/components/formularios/FormularioConsentimiento";

export default function ConsentimientoPage() {
  return (
    <div className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full font-primary">
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-xs border border-slate-200">
        <Link
          href="/admin/formularios"
          className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-sena-navy transition-all"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span>Volver al Catálogo de Formularios</span>
        </Link>
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Consentimiento Informado y Habeas Data
        </span>
      </div>

      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xs border border-slate-200">
        <FormularioConsentimiento />
      </div>
    </div>
  );
}
