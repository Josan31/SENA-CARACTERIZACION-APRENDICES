"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  HeartPulse,
  Info,
  Lock,
  ShieldCheck,
} from "lucide-react";

export default function FormularioSalud() {
  const router = useRouter();

  // Estados de salud (iniciados vacíos para diligenciamiento limpio)
  const [eps, setEps] = useState("");
  const [regimen, setRegimen] = useState("");
  const [sisben, setSisben] = useState("");
  const [grupoSisben, setGrupoSisben] = useState("");
  const [discapacidad, setDiscapacidad] = useState("");
  const [enfermedadCronica, setEnfermedadCronica] = useState("");
  const [medicamentos, setMedicamentos] = useState("");

  // Salud Sexual y Reproductiva
  const [gestacion, setGestacion] = useState("");
  const [lactancia, setLactancia] = useState("");
  const [cabezaHogar, setCabezaHogar] = useState("");
  const [hijos, setHijos] = useState("");
  const [metodoPlanificacion, setMetodoPlanificacion] = useState("");
  const [guardadoExito, setGuardadoExito] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const data = {
        modulo: "salud",
        eps, regimen, sisben, grupoSisben, discapacidad, enfermedadCronica, medicamentos,
        gestacion, lactancia, cabezaHogar, hijos, metodoPlanificacion,
        fechaActualizacion: new Date().toISOString()
      };
      localStorage.setItem("sena_caracterizacion_modulo_salud", JSON.stringify(data));
      setGuardadoExito(true);
      setTimeout(() => setGuardadoExito(false), 4000);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 md:p-6 font-primary text-slate-800">
      {/* Triángulo decorativo superior */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-[#fdc300] pointer-events-none z-10"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/formularios/basica"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sena-navy shadow-sm border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-x-0.5"
            title="Volver"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sena-green">
              Caracterización de Aprendices
            </span>
            <h1 className="text-xl md:text-2xl font-black text-sena-navy tracking-tight leading-tight">
              Salud y Condición Física
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Registra tu afiliación al sistema de salud, condiciones especiales y salud reproductiva.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-sena-navy bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Módulo 2 de 4
          </span>
        </div>
      </header>

      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {guardadoExito && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-4 flex items-center gap-3 text-sena-green-dark animate-in fade-in duration-300">
              <CheckCircle2 size={22} className="shrink-0 text-sena-green" />
              <div>
                <p className="font-bold text-sm">¡Módulo 2: Salud y Seguridad Social guardado con éxito!</p>
                <p className="text-xs text-emerald-700">Tus datos médicos y de afiliación han quedado guardados localmente para la base de datos.</p>
              </div>
            </div>
          )}

          {/* Bloque 1: Afiliación y Condición Médica */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <HeartPulse size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                1. Seguridad Social y Condición de Salud
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Entidad Promotora de Salud (EPS) *
                </label>
                <input
                  type="text"
                  value={eps}
                  onChange={(e) => setEps(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Régimen de Afiliación *
                </label>
                <select
                  value={regimen}
                  onChange={(e) => setRegimen(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Subsidiado">Subsidiado</option>
                  <option value="Contributivo (Cotizante)">Contributivo (Cotizante)</option>
                  <option value="Contributivo (Beneficiario)">Contributivo (Beneficiario)</option>
                  <option value="Especial (Fuerzas Militares / Magisterio)">Especial</option>
                  <option value="No afiliado">No afiliado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Cuenta con encuesta SISBÉN IV? *
                </label>
                <select
                  value={sisben}
                  onChange={(e) => setSisben(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Grupo o Subgrupo SISBÉN (Ej: A1-A5, B1-B7)
                </label>
                <input
                  type="text"
                  value={grupoSisben}
                  onChange={(e) => setGrupoSisben(e.target.value)}
                  placeholder="Ej: A4"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Presenta alguna Discapacidad Certificada? *
                </label>
                <select
                  value={discapacidad}
                  onChange={(e) => setDiscapacidad(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Física / Movilidad">Física / Movilidad</option>
                  <option value="Visual">Visual</option>
                  <option value="Auditiva">Auditiva</option>
                  <option value="Intelectual / Cognitiva">Intelectual / Cognitiva</option>
                  <option value="Psicosocial / Mental">Psicosocial / Mental</option>
                  <option value="Múltiple">Múltiple</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Padece alguna enfermedad crónica o de base? *
                </label>
                <select
                  value={enfermedadCronica}
                  onChange={(e) => setEnfermedadCronica(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Asma / Respiratoria">Asma / Respiratoria</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Hipertensión">Hipertensión</option>
                  <option value="Epilepsia">Epilepsia</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bloque 2: Salud Sexual y Reproductiva */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <Heart size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                2. Salud Sexual y Reproductiva (Confidencial)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Se encuentra en estado de embarazo / gestación? *
                </label>
                <select
                  value={gestacion}
                  onChange={(e) => setGestacion(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                  <option value="No aplica">No aplica</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Se encuentra en periodo de lactancia materna? *
                </label>
                <select
                  value={lactancia}
                  onChange={(e) => setLactancia(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                  <option value="No aplica">No aplica</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Es padre o madre cabeza de familia? *
                </label>
                <select
                  value={cabezaHogar}
                  onChange={(e) => setCabezaHogar(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Sí - Madre cabeza de familia">Sí - Madre cabeza de familia</option>
                  <option value="Sí - Padre cabeza de familia">Sí - Padre cabeza de familia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Número de hijos biológicos o a cargo *
                </label>
                <input
                  type="number"
                  value={hijos}
                  onChange={(e) => setHijos(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Utiliza algún método de planificación familiar? *
                </label>
                <select
                  value={metodoPlanificacion}
                  onChange={(e) => setMetodoPlanificacion(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Preservativo / De barrera">Preservativo / De barrera</option>
                  <option value="Anticonceptivos orales / Inyectables">Anticonceptivos orales / Inyectables</option>
                  <option value="Implante subdérmico / DIU">Implante subdérmico / DIU</option>
                  <option value="Quirúrgico definitivo (Vasectomía / Ligadura)">Quirúrgico definitivo</option>
                  <option value="Ninguno">Ninguno</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botones */}
          <footer className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Lock size={14} className="text-[#0077b6]" />
              Protegido con secreto profesional de bienestar.
            </span>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/formularios/basica"
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Anterior
              </Link>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-6 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity"
              >
                <span>Continuar a Socioeconómica</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
}
