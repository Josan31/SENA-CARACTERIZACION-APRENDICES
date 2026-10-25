"use client";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HeartPulse,
  Lock,
  Send,
  User,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface FormularioConfirmacionEnvioProps {
  onBack?: () => void;
  onSubmitSuccess?: (radicado: string) => void;
  initialData?: {
    nombre?: string;
    documento?: string;
    correo?: string;
    telefono?: string;
    acudiente?: string;
    programa?: string;
    ficha?: string;
    direccion?: string;
    municipio?: string;
    eps?: string;
    vacunas?: string;
    ingresos?: string;
    apoyos?: string;
  };
}

export default function FormularioConfirmacionEnvio({
  onBack,
  onSubmitSuccess,
  initialData = {},
}: FormularioConfirmacionEnvioProps) {
  const router = useRouter();
  const [veracidadAceptada, setVeracidadAceptada] = useState(true);
  const [habeasDataAceptado, setHabeasDataAceptado] = useState(true);
  const [observaciones, setObservaciones] = useState(
    "Requiero apoyo con beneficio de transporte municipal para asistir a jornada diurna.",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const data = {
    nombre: initialData.nombre || "Valentina Gómez Mejía",
    documento: initialData.documento || "C.C. 1061789456 (19 años)",
    correo: initialData.correo || "valentinagomezmejia@misena.edu.co",
    telefono: initialData.telefono || "3108924411",
    acudiente:
      initialData.acudiente || "María Elena Mejía (Madre - 3108924411)",
    programa:
      initialData.programa ||
      "Tecnólogo en Programación de Software (Ficha 234567)",
    centro: "Centro de Teleinformática y Producción Industrial - CTPI",
    direccion:
      initialData.direccion ||
      "Cra 12 # 45-28 Barrio El Recuerdo, Popayán, Cauca (Estrato 2)",
    eps:
      initialData.eps ||
      "Nueva EPS (Régimen Subsidiado - Sisbén A4) | Sin enfermedades crónicas",
    vacunas:
      initialData.vacunas || "Esquema COVID-19 Completo (3 Dosis Pfizer)",
    ingresos:
      initialData.ingresos ||
      "4 personas en el hogar | Madre cabeza de familia | Menos de 1 SMMLV",
    apoyos: initialData.apoyos || "Renta Joven / Apoyo de Alimentación SENA",
  };

  const isFormValid = veracidadAceptada && habeasDataAceptado;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
    }, 800);
  };

  const handleConfirmModal = () => {
    setShowModal(false);
    if (onSubmitSuccess) {
      onSubmitSuccess("RAD-SENA-2026-789412");
    } else {
      router.push("/aprendiz/resultados");
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 md:p-6 font-primary text-slate-800">
      {/* Triángulo decorativo superior amarillo institucional SENA */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-[#fdc300] pointer-events-none z-10"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      {/* ── Encabezado Superior con Stepper ── */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack ? onBack : () => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sena-navy shadow-sm border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-x-0.5 cursor-pointer"
            title="Volver"
            aria-label="Volver"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sena-green">
              Caracterización de Aprendices
            </span>
            <h1 className="text-xl md:text-2xl font-black text-sena-navy tracking-tight leading-tight">
              Confirmación, Declaración Jurada y Envío
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Verifica cuidadosamente toda la información antes de radicar
              formalmente tu encuesta.
            </p>
          </div>
        </div>

        {/* Stepper horizontal */}
        <div className="flex items-center gap-1 overflow-x-auto py-2">
          {[
            { step: 1, label: "Datos Básicos" },
            { step: 2, label: "Emergencia" },
            { step: 3, label: "Localización" },
            { step: 4, label: "Formación" },
            { step: 5, label: "Salud" },
            { step: 6, label: "Salud Sexual" },
            { step: 7, label: "COVID-19" },
            { step: 8, label: "Socioeconómica" },
            { step: 9, label: "Ocupacional" },
            { step: 10, label: "Confirmación" },
          ].map((s) => {
            const isCompleted = s.step < 10;
            const isActive = s.step === 10;
            return (
              <div key={s.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                      isCompleted
                        ? "bg-sena-green text-white"
                        : isActive
                          ? "bg-[#0077b6] text-white ring-4 ring-[#0077b6]/20 font-extrabold"
                          : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isCompleted ? <Check size={12} strokeWidth={3} /> : s.step}
                  </div>
                  <span
                    className={`text-[8px] font-semibold mt-1 hidden sm:block text-center max-w-[48px] truncate ${
                      isActive ? "text-sena-navy font-bold" : "text-sena-green"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {s.step < 10 && (
                  <div className="w-3 md:w-5 h-[2px] bg-sena-green mx-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Logomarca SENA */}
        <div className="hidden xl:flex flex-col items-end pl-4 border-l border-slate-200">
          <span className="text-lg font-black text-sena-green leading-none">
            SENAQQ
          </span>
          <span className="text-[8px] font-semibold text-sena-navy text-right leading-tight mt-1">
            Tecnología e innovación
            <br />
            para un mejor país
          </span>
          <div className="h-0.5 w-8 bg-sena-green mt-1 rounded-full" />
        </div>
      </header>

      {/* ── Tarjeta Principal de Revisión ── */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 md:p-7 space-y-6">
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sena-green to-sena-green-dark text-white shadow-md shadow-sena-green/20">
            <FileCheck2 size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-bold text-sena-navy">
              Revisión Consolidada de Caracterización
            </h2>
            <p className="text-xs text-slate-500">
              Por favor revisa la exactitud de tus datos en cada sección. Puedes
              volver atrás si necesitas corregir algo.
            </p>
          </div>
        </div>

        {/* Cuadrícula de 4 Bloques Resumidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bloque 1: Datos Personales y Emergencia */}
          <article className="rounded-xl border border-slate-200 bg-[#f7fbfd] p-4 space-y-2 relative hover:border-[#b8dcec] transition-colors">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <span className="flex items-center gap-2 text-xs font-bold text-[#0077b6]">
                <User size={15} />
                1. Datos Personales y Emergencia
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                <Check size={11} strokeWidth={2.5} />
                Completo
              </span>
            </div>
            <div className="text-[11px] space-y-1 text-slate-700">
              <div className="flex justify-between">
                <strong className="text-sena-navy">Aprendiz:</strong>
                <span>{data.nombre}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Documento:</strong>
                <span>{data.documento}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Contacto:</strong>
                <span>
                  {data.correo} | {data.telefono}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Acudiente:</strong>
                <span className="truncate max-w-[200px]">{data.acudiente}</span>
              </div>
            </div>
          </article>

          {/* Bloque 2: Formación y Ubicación */}
          <article className="rounded-xl border border-slate-200 bg-[#f7fbfd] p-4 space-y-2 relative hover:border-[#b8dcec] transition-colors">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <span className="flex items-center gap-2 text-xs font-bold text-[#0077b6]">
                <GraduationCap size={15} />
                2. Formación y Ubicación
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                <Check size={11} strokeWidth={2.5} />
                Completo
              </span>
            </div>
            <div className="text-[11px] space-y-1 text-slate-700">
              <div className="flex justify-between">
                <strong className="text-sena-navy">Programa:</strong>
                <span className="truncate max-w-[220px]">{data.programa}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Centro:</strong>
                <span className="truncate max-w-[220px]">{data.centro}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Residencia:</strong>
                <span className="truncate max-w-[220px]">{data.direccion}</span>
              </div>
            </div>
          </article>

          {/* Bloque 3: Salud y Vacunación */}
          <article className="rounded-xl border border-slate-200 bg-[#f7fbfd] p-4 space-y-2 relative hover:border-[#b8dcec] transition-colors">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <span className="flex items-center gap-2 text-xs font-bold text-[#0077b6]">
                <HeartPulse size={15} />
                3. Salud y Condición Física
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                <Check size={11} strokeWidth={2.5} />
                Completo
              </span>
            </div>
            <div className="text-[11px] space-y-1 text-slate-700">
              <div className="flex justify-between">
                <strong className="text-sena-navy">Seguridad Social:</strong>
                <span className="truncate max-w-[220px]">{data.eps}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Vacunación:</strong>
                <span>{data.vacunas}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Salud Sexual:</strong>
                <span>No en gestación / Sin hijos a cargo</span>
              </div>
            </div>
          </article>

          {/* Bloque 4: Situación Socioeconómica */}
          <article className="rounded-xl border border-slate-200 bg-[#f7fbfd] p-4 space-y-2 relative hover:border-[#b8dcec] transition-colors">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <span className="flex items-center gap-2 text-xs font-bold text-[#0077b6]">
                <Wallet size={15} />
                4. Situación Socioeconómica
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                <Check size={11} strokeWidth={2.5} />
                Completo
              </span>
            </div>
            <div className="text-[11px] space-y-1 text-slate-700">
              <div className="flex justify-between">
                <strong className="text-sena-navy">Hogar:</strong>
                <span className="truncate max-w-[220px]">{data.ingresos}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Apoyos Recibidos:</strong>
                <span className="truncate max-w-[220px]">{data.apoyos}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-sena-navy">Ocupación:</strong>
                <span>Estudiante tiempo completo (No labora)</span>
              </div>
            </div>
          </article>
        </div>

        {/* ── Declaraciones y Habeas Data ── */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={veracidadAceptada}
              onChange={(e) => setVeracidadAceptada(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-emerald-300 text-sena-green focus:ring-sena-green"
            />
            <div className="text-xs">
              <span className="font-bold text-emerald-950 block">
                Declaración de Veracidad de la Información *
              </span>
              <span className="text-emerald-800 text-[11px] leading-relaxed">
                Declaro bajo la gravedad de juramento que todos los datos
                suministrados en los módulos de esta encuesta son fidedignos y
                representan mi situación real.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={habeasDataAceptado}
              onChange={(e) => setHabeasDataAceptado(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-emerald-300 text-sena-green focus:ring-sena-green"
            />
            <div className="text-xs">
              <span className="font-bold text-emerald-950 block">
                Autorización de Tratamiento de Datos Personales (Ley 1581 de
                2012) *
              </span>
              <span className="text-emerald-800 text-[11px] leading-relaxed">
                Autorizo al SENA y a Bienestar al Aprendiz a procesar mis datos
                para la planeación institucional y asignación de beneficios
                socioeconómicos.
              </span>
            </div>
          </label>
        </div>

        {/* Campo de Observaciones */}
        <div>
          <label
            htmlFor="obs"
            className="block text-xs font-bold text-[#0077b6] mb-1.5"
          >
            Observaciones o Solicitudes Especiales (Opcional):
          </label>
          <input
            id="obs"
            type="text"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Escribe alguna observación o solicitud dirigida a Bienestar al Aprendiz..."
            className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
          />
        </div>

        {/* ── Pie de Tarjeta y Botones ── */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#0077b6]">
            <Lock size={15} />
            <span>Datos protegidos con cifrado y seguridad institucional.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onBack ? onBack : () => router.back()}
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-sena-navy hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Anterior</span>
            </button>

            <button
              type="button"
              disabled={!isFormValid || isSubmitting}
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#007796] to-sena-green px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-sena-green/25 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <span>
                {isSubmitting ? "Radicando..." : "Confirmar y Enviar"}
              </span>
              <Send size={14} />
            </button>
          </div>
        </footer>
      </main>

      {/* Modal de Confirmación Exitosa */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-sena-green">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-lg font-black text-sena-navy">
              ¡Caracterización Radicada con Éxito!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tu encuesta ha sido recibida y registrada con el número de
              radicado oficial{" "}
              <strong className="text-sena-green-dark">
                RAD-SENA-2026-789412
              </strong>
              . Puedes descargar tu comprobante a continuación.
            </p>
            <button
              type="button"
              onClick={handleConfirmModal}
              className="w-full rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-4 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity cursor-pointer"
            >
              Ver Comprobante de Radicación
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
