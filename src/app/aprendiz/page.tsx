"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  User,
  ShieldCheck,
  Lock,
  Clock,
  Shield,
} from "lucide-react";

export default function AprendizInicioPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (!accepted) return;
    router.push("/aprendiz/formularios");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-8 font-primary bg-gradient-to-br from-[#ebf7f4] via-[#def2eb] to-[#d4ede4]">
      {/* ── Contenedor Central ── */}
      <div className="w-full max-w-5xl space-y-4 my-auto">
        {/* Botón Circular de Volver (arriba a la izquierda) */}
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#00304d] shadow-xs border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer hover:-translate-x-0.5"
            aria-label="Volver atrás"
            title="Volver"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Tarjeta Principal Blanca Elevada ── */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-xl border border-white/80 space-y-6">
          {/* Cabecera de la Tarjeta */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e6f8f1] text-[#008f4c] border border-emerald-200 shadow-xs">
              <FileText size={26} strokeWidth={2.2} />
            </div>
            <div>
              <span className="block text-[11px] font-black uppercase tracking-wider text-[#008f4c]">
                CONSENTIMIENTO
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00304d] tracking-tight">
                Consentimiento informado
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Antes de continuar, por favor lee y acepta el siguiente consentimiento.
              </p>
            </div>
          </div>

          {/* Cuerpo en 2 Columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Columna Izquierda: Información y Puntos Clave */}
            <div className="lg:col-span-7 rounded-2xl bg-[#f0f9fc] border border-[#d5edf6] p-5 md:p-6 space-y-4 flex flex-col justify-between">
              <p className="text-xs text-[#00304d] font-medium leading-relaxed">
                El <strong>Servicio Nacional de Aprendizaje (SENA)</strong> te invita a participar en el proceso de caracterización, mediante el cual recopilamos información básica con el fin de conocer mejor a nuestra comunidad educativa y mejorar nuestros servicios.
              </p>

              <div className="space-y-3.5 pt-1">
                {/* 1. ¿Qué información se solicita? */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7f3ea] text-[#00785a]">
                    <User size={18} strokeWidth={2.4} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#00304d]">
                      ¿Qué información se solicita?
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Solo se te pedirá información básica como nombre, documento de identidad, fecha de nacimiento, género, entre otros datos necesarios para la caracterización.
                    </p>
                  </div>
                </div>

                {/* 2. ¿Para qué se usa? */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7f3ea] text-[#00785a]">
                    <ShieldCheck size={18} strokeWidth={2.4} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#00304d]">
                      ¿Para qué se usa?
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Esta información será utilizada únicamente con fines institucionales, para mejorar la calidad de los servicios, programas y actividades del SENA.
                    </p>
                  </div>
                </div>

                {/* 3. ¿Cómo se protege? */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7f3ea] text-[#00785a]">
                    <Lock size={18} strokeWidth={2.4} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#00304d]">
                      ¿Cómo se protege?
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Tus datos personales estarán protegidos y serán tratados de acuerdo con la Ley 1581 de 2012 y la política de tratamiento de datos del SENA.
                    </p>
                  </div>
                </div>

                {/* 4. ¿Tienes la libertad de participar? */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7f3ea] text-[#00785a]">
                    <Clock size={18} strokeWidth={2.4} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#00304d]">
                      ¿Tienes la libertad de participar?
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Tu participación es completamente voluntaria. Puedes decidir no continuar en cualquier momento sin ningún tipo de consecuencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Ilustración y Caja de Compromiso */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {/* Imagen Ilustración */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-[#eaf8f3] to-white flex items-center justify-center p-2 border border-slate-100">
                <Image
                  src="/admin-images/consent-illustration.jpg"
                  alt="Ilustración Consentimiento SENA"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>

              {/* Mensaje de Compromiso */}
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

          {/* ── Pie de la Tarjeta: Checkbox y Botón Continuar ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {/* Casilla de Verificación */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 h-5 w-5 rounded border-2 border-slate-300 accent-[#00875a] cursor-pointer"
              />
              <div className="leading-tight">
                <p className="text-xs sm:text-sm font-bold text-[#00304d]">
                  He leído y acepto el consentimiento informado.
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Al marcar esta casilla, confirmas que comprendes la información y autorizas el tratamiento de tus datos.
                </p>
              </div>
            </label>

            {/* Botón Continuar */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={!accepted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#00875a] hover:bg-[#00724b] text-white px-8 py-3.5 text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>CONTINUAR</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
