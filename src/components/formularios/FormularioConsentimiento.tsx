"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";

export default function FormularioConsentimiento({
  onContinue,
}: {
  onContinue?: () => void;
}) {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleNext = () => {
    if (!accepted) return;
    if (onContinue) {
      onContinue();
    } else {
      router.push("/admin/formularios/basica");
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 md:p-6 font-primary text-slate-800">
      {/* Triángulo decorativo institucional amarillo */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-[#fdc300] pointer-events-none z-10"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      {/* Encabezado */}
      <header className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/formularios"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sena-navy shadow-sm border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-x-0.5"
            title="Volver"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sena-green">
              Paso Previo Requerido
            </span>
            <h1 className="text-xl md:text-2xl font-black text-sena-navy tracking-tight leading-tight">
              Consentimiento Informado y Tratamiento de Datos
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Antes de continuar, por favor lee y acepta los términos del consentimiento legal.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-lg font-black text-sena-green leading-none">
            SENA
          </span>
          <span className="text-[8px] font-semibold text-sena-navy leading-tight mt-1">
            Ley 1581 de 2012
          </span>
        </div>
      </header>

      {/* Tarjeta Principal */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
        {/* Cabecera interna con icono verde */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sena-green to-sena-green-dark text-white shadow-md shadow-sena-green/20">
            <ShieldCheck size={24} strokeWidth={2.2} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sena-green">
              Consentimiento
            </span>
            <h2 className="text-base md:text-lg font-bold text-sena-navy">
              Autorización para el Proceso de Caracterización
            </h2>
            <p className="text-xs text-slate-500">
              Garantizamos la confidencialidad, reserva y protección de toda la información suministrada.
            </p>
          </div>
        </div>

        {/* Layout en 2 columnas: Izquierda puntos explicativos, Derecha Ilustración e info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Columna Izquierda: Explicación de los 4 aspectos legales */}
          <div className="lg:col-span-7 rounded-2xl border border-sky-100 bg-[#f7fbfd] p-5 space-y-4">
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              El <strong>Servicio Nacional de Aprendizaje (SENA)</strong> te invita a participar en el proceso de caracterización, mediante el cual recopilamos información básica, académica, de salud y socioeconómica con el fin de conocer mejor a nuestra comunidad educativa, focalizar apoyos de sostenimiento y mejorar nuestros servicios de bienestar.
            </p>

            <div className="space-y-3.5 pt-2">
              {/* Punto 1: Qué se solicita */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sena-green-dark">
                  <User size={18} strokeWidth={2.4} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-sena-navy">
                    ¿Qué información se solicita?
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Solo se te pedirá información básica como nombre, documento de identidad, residencia, datos de contacto, condición de salud, dinámica familiar y perfil ocupacional.
                  </p>
                </div>
              </div>

              {/* Punto 2: Para qué se usa */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sena-green-dark">
                  <ShieldCheck size={18} strokeWidth={2.4} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-sena-navy">
                    ¿Para qué se usa?
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Esta información será utilizada únicamente con fines institucionales y estadísticos para mejorar la calidad de los programas, servicios de salud estudiantil y asignación de apoyos.
                  </p>
                </div>
              </div>

              {/* Punto 3: Cómo se protege */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sena-green-dark">
                  <Lock size={18} strokeWidth={2.4} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-sena-navy">
                    ¿Cómo se protege?
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Tus datos personales y sensibles estarán protegidos y tratados estrictamente bajo los mandatos de la <strong>Ley 1581 de 2012</strong> y la política de tratamiento de datos personales del SENA.
                  </p>
                </div>
              </div>

              {/* Punto 4: Libertad de participar */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sena-green-dark">
                  <Clock size={18} strokeWidth={2.4} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-sena-navy">
                    ¿Tienes la libertad de participar?
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Tu participación es voluntaria y segura. Puedes pausar o retomar el diligenciamiento en cualquier momento sin repercusión en tu proceso formativo académico.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Ilustración y Tarjeta de Compromiso */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-[#eaf8f3] to-white flex items-center justify-center p-2 border border-slate-100">
              <Image
                src="/admin-images/consent-illustration.jpg"
                alt="Ilustración Consentimiento SENA"
                fill
                className="object-contain p-1"
                priority
              />
            </div>

            {/* Banner verde inferior */}
            <div className="rounded-2xl bg-[#e2f7ee] border border-[#c6eedc] p-4 flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00785a] text-white shadow-xs">
                <Shield size={18} strokeWidth={2.2} />
              </div>
              <p className="text-xs font-bold text-[#004d38] leading-snug">
                Tu información es importante para nosotros, y la tratamos con responsabilidad y compromiso.
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox y Botón de Aceptación */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-slate-300 text-sena-green focus:ring-sena-green"
            />
            <div className="text-xs">
              <span className="font-bold text-sena-navy block">
                He leído y acepto el consentimiento informado. *
              </span>
              <span className="text-slate-500 text-[11px]">
                Al marcar esta casilla, confirmas que comprendes la información aquí expuesta y autorizas expresamente el tratamiento de tus datos para el sistema de caracterización SENA.
              </span>
            </div>
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/formularios"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancelar
            </Link>

            <button
              type="button"
              disabled={!accepted}
              onClick={handleNext}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-7 py-2.5 text-xs font-bold text-white shadow-md shadow-sena-green/25 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span>CONTINUAR</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
