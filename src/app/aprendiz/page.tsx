"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  CheckCircle2,
} from "lucide-react";
import { obtenerMiCaracterizacion, MiCaracterizacionResponse } from "@/lib/caracterizacion";

export default function AprendizInicioPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [caracterizacionData, setCaracterizacionData] = useState<MiCaracterizacionResponse | null>(null);

  useEffect(() => {
    async function verificarEstado() {
      try {
        const res = await obtenerMiCaracterizacion();
        setCaracterizacionData(res);
      } catch (err) {
        // Si no hay sesión o falla conexión, continúa flujo normal
      }
    }
    verificarEstado();
  }, []);

  const handleContinue = () => {
    if (!accepted) return;
    router.push("/aprendiz/formularios");
  };

  const caracterizacion = caracterizacionData?.caracterizacion;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-8 font-primary bg-gradient-to-br from-[#ebf7f4] via-[#def2eb] to-[#d4ede4]">
      {/* ── Contenedor Central ── */}
      <div className="w-full max-w-5xl space-y-4 my-auto">
        {/* Barra superior con Volver y Banner de Vigencia si ya existe */}
        <div className="flex items-center justify-between">
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

        {/* Banner Informativo si el aprendiz ya cuenta con radicado */}
        {caracterizacion?.radicado && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 p-4 shadow-sm text-[#00304d] animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#008f4c] text-white shadow-xs">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#008f4c] tracking-wider">
                  Caracterización Vigente en Servidores SENA
                </p>
                <p className="text-xs sm:text-sm font-bold text-sena-navy">
                  Ya cuentas con un radicado activo:{" "}
                  <span className="font-mono text-emerald-800 font-extrabold bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    {caracterizacion.radicado}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <Link
                href="/aprendiz/resultados"
                className="flex-1 sm:flex-none text-center rounded-full bg-[#008f4c] hover:bg-[#00743e] text-white px-5 py-2 text-xs font-bold shadow-xs transition-all hover:scale-105"
              >
                Ver Mi Comprobante
              </Link>
            </div>
          </div>
        )}

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
                Antes de continuar, por favor lee y acepta el siguiente consentimiento para la recolección y tratamiento de datos.
              </p>
            </div>
          </div>

          {/* Cuerpo en 2 Columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Columna Izquierda: Información y Puntos Clave */}
            <div className="lg:col-span-7 rounded-2xl bg-[#f0f9fc] border border-[#d5edf6] p-5 md:p-6 space-y-4 flex flex-col justify-between">
              <p className="text-xs text-[#00304d] font-medium leading-relaxed">
                El <strong>Servicio Nacional de Aprendizaje (SENA)</strong> te invita a participar en el proceso de caracterización, mediante el cual recopilamos información básica con el fin de conocer mejor a nuestra comunidad educativa y focalizar los servicios de bienestar.
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
                      Solo se te pedirá información básica como nombre, documento de identidad, fecha de nacimiento, estado de salud, situación socioeconómica y perfil formativo.
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
                      Esta información será utilizada únicamente con fines institucionales y de bienestar, para mejorar la calidad de los apoyos de sostenimiento, salud y formación.
                    </p>
                  </div>
                </div>

                {/* 3. Confidencialidad */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7f3ea] text-[#00785a]">
                    <Lock size={18} strokeWidth={2.4} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#00304d]">
                      Confidencialidad de tus datos
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Tus respuestas están protegidas conforme a la Ley Estatutaria 1581 de 2012 (Habeas Data) y serán tratadas de manera estrictamente confidencial.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#c6e6f0]/70 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5 text-[#008f4c]">
                  <Clock size={13} />
                  Tiempo estimado: 5-8 min
                </span>
                <span>4 módulos cortos</span>
              </div>
            </div>

            {/* Columna Derecha: Ilustración */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#e8f8f3] via-[#d6f2e8] to-[#c7ece0] p-6 flex flex-col items-center justify-center text-center space-y-4 border border-[#bce8d7]">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-md">
                <Image
                  src="/hero-illustration.svg"
                  alt="Ilustración Consentimiento SENA"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/90 border border-[#a2ddc4] px-4 py-2.5 shadow-xs">
                <div className="text-[#008f4c] shrink-0">
                  <Shield size={18} strokeWidth={2.2} />
                </div>
                <p className="text-xs font-bold text-[#004d38] leading-snug">
                  Tu información es confidencial y segura en los servidores oficiales del SENA.
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
                  Al marcar esta casilla, confirmas que comprendes la información y autorizas el tratamiento de tus datos para el proceso de caracterización.
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
              <span>{caracterizacion?.radicado ? "ACTUALIZAR CARACTERIZACIÓN" : "CONTINUAR"}</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
