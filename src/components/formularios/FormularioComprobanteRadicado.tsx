"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  Home,
  Info,
  Lock,
  Printer,
  ShieldCheck,
} from "lucide-react";

export interface FormularioComprobanteRadicadoProps {
  radicado?: string;
  nombreAprendiz?: string;
  documento?: string;
  programa?: string;
  ficha?: string;
  centro?: string;
  fechaRadicado?: string;
  vigenciaHasta?: string;
}

export default function FormularioComprobanteRadicado({
  radicado = "RAD-SENA-2026-789412",
  nombreAprendiz = "Valentina Gómez Mejía",
  documento = "C.C. 1061789456",
  programa = "Tecnólogo en Programación de Software",
  ficha = "234567",
  centro = "Centro de Teleinformática y Producción Industrial - Regional Cauca",
  fechaRadicado = "14 de Octubre de 2026, 18:30:15",
  vigenciaHasta = "14 de Abril de 2027 (6 meses)",
}: FormularioComprobanteRadicadoProps) {
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 md:p-6 font-primary text-slate-800">
      {/* Triángulo decorativo superior */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-[#fdc300] pointer-events-none z-10"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      {/* ── Encabezado con Stepper completado (10/10) ── */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/aprendiz/formularios"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sena-navy shadow-sm border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-x-0.5"
            title="Volver a Formularios"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sena-green">
              Caracterización de Aprendices
            </span>
            <h1 className="text-xl md:text-2xl font-black text-sena-navy tracking-tight leading-tight">
              Registro Radicado con Éxito
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Tu información ha sido almacenada de forma segura en los servidores del SENA.
            </p>
          </div>
        </div>

        {/* Stepper horizontal: Todos los 10 pasos completados en verde */}
        <div className="flex items-center gap-1 overflow-x-auto py-2">
          {[
            "Básicos",
            "Emergencia",
            "Ubicación",
            "Formación",
            "Salud",
            "Sexual",
            "COVID-19",
            "Socioeconómica",
            "Ocupacional",
            "Confirmación",
          ].map((label, idx) => (
            <div key={idx} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold bg-sena-green text-white shadow-xs">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-[8px] font-semibold mt-1 hidden sm:block text-center max-w-[48px] truncate text-sena-green">
                  {label}
                </span>
              </div>
              {idx < 9 && (
                <div className="w-3 md:w-5 h-[2px] bg-sena-green mx-0.5" />
              )}
            </div>
          ))}
        </div>

        {/* Logo SENA */}
        <div className="hidden xl:flex flex-col items-end pl-4 border-l border-slate-200">
          <span className="text-lg font-black text-sena-green leading-none">
            SENA
          </span>
          <span className="text-[8px] font-semibold text-sena-navy text-right leading-tight mt-1">
            Tecnología e innovación<br />para un mejor país
          </span>
          <div className="h-0.5 w-8 bg-sena-green mt-1 rounded-full" />
        </div>
      </header>

      {/* ── Tarjeta Principal del Radicado ── */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6 text-center">
        {/* Hero de Éxito */}
        <div className="flex flex-col items-center max-w-xl mx-auto space-y-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sena-green to-[#007796] text-white shadow-lg shadow-sena-green/30">
            <CheckCircle2 size={38} strokeWidth={2.4} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-sena-navy tracking-tight">
            ¡Caracterización Completada con Éxito!
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Gracias, <strong>{nombreAprendiz}</strong>. Tu información ha sido validada y registrada oficialmente en el Sistema de Caracterización de Aprendices SENA para la vigencia académica actual.
          </p>
        </div>

        {/* Ficha Oficial de Radicación */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-[#f7fbfd] p-5 md:p-6 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0077b6]">
              <FileText size={16} />
              <span>Comprobante Oficial de Radicación</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-extrabold text-sena-green-dark border border-emerald-300">
              <Check size={12} strokeWidth={3} />
              100% COMPLETADO (VIGENTE)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Número de Radicado
              </span>
              <span className="text-xs font-extrabold text-sena-navy font-mono">
                {radicado}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Fecha y Hora de Radicación
              </span>
              <span className="text-xs font-bold text-slate-700">
                {fechaRadicado}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Documento de Identidad
              </span>
              <span className="text-xs font-bold text-slate-700">
                {documento}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Programa de Formación
              </span>
              <span className="text-xs font-bold text-slate-700 truncate block">
                {programa}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Número de Ficha
              </span>
              <span className="text-xs font-bold text-slate-700">
                {ficha}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Centro de Formación
              </span>
              <span className="text-xs font-bold text-slate-700 truncate block">
                {centro}
              </span>
            </div>
          </div>
        </div>

        {/* Banner de Vigencia y Recaracterización Semestral */}
        <div className="max-w-2xl mx-auto rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-center gap-3 text-left">
          <Info size={20} className="text-sena-green shrink-0" />
          <p className="text-[11px] text-emerald-900 leading-snug">
            <strong>Vigencia de la caracterización:</strong> Esta encuesta tiene una vigencia legal de 6 meses ({vigenciaHasta}). Cumplido este periodo, el sistema te solicitará una recaracterización periódica ágil para actualizar cambios de residencia o salud.
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#007796] to-sena-green px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-sena-green/25 hover:opacity-95 transition-all w-full sm:w-auto cursor-pointer"
          >
            <Download size={14} />
            <span>Descargar Comprobante PDF</span>
          </button>

          <Link
            href="/aprendiz/formularios"
            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all w-full sm:w-auto"
          >
            <Home size={14} />
            <span>Volver a Formularios</span>
          </Link>
        </div>

        {/* Footer de Seguridad */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] font-semibold text-[#0077b6]">
          <Lock size={14} />
          <span>Firma digital y sellado criptográfico SENA aplicado. Folio verificado en base de datos.</span>
        </div>
      </main>
    </div>
  );
}
