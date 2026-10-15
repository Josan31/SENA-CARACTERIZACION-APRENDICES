"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Syringe,
  Target,
} from "lucide-react";

export default function FormularioFormativo() {
  const router = useRouter();

  // Educación previa (iniciados vacíos para diligenciamiento limpio)
  const [nivelPrevio, setNivelPrevio] = useState("");
  const [formacionSena, setFormacionSena] = useState("");
  const [motivacion, setMotivacion] = useState("");
  const [areaInteres, setAreaInteres] = useState("");
  const [nivelDeseado, setNivelDeseado] = useState("");
  const [herramientasDigitales, setHerramientasDigitales] = useState("");

  // Ocupación
  const [trabajaActualmente, setTrabajaActualmente] = useState("");
  const [experienciaLaboral, setExperienciaLaboral] = useState("");
  const [expectativa, setExpectativa] = useState("");

  // Vacunación COVID-19
  const [vacunado, setVacunado] = useState("");
  const [biologico, setBiologico] = useState("");
  const [dosis, setDosis] = useState("");
  const [esquemaCompleto, setEsquemaCompleto] = useState("");
  const [infeccionPrevia, setInfeccionPrevia] = useState("");
  const [guardadoExito, setGuardadoExito] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const data = {
        modulo: "formativo",
        nivelPrevio, formacionSena, motivacion, areaInteres, nivelDeseado, herramientasDigitales,
        trabajaActualmente, experienciaLaboral, expectativa,
        vacunado, biologico, dosis, esquemaCompleto, infeccionPrevia,
        fechaActualizacion: new Date().toISOString()
      };
      localStorage.setItem("sena_caracterizacion_modulo_formativo", JSON.stringify(data));
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
            href="/admin/formularios/socioeconomica"
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
              Perfil Formativo, Ocupacional y COVID-19
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Información sobre formación previa, expectativas laborales y esquema de vacunación biológica.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-sena-navy bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Módulo 4 de 4
          </span>
        </div>
      </header>

      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {guardadoExito && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-4 flex items-center gap-3 text-sena-green-dark animate-in fade-in duration-300">
              <CheckCircle2 size={22} className="shrink-0 text-sena-green" />
              <div>
                <p className="font-bold text-sm">¡Módulo 4: Perfil Formativo guardado con éxito!</p>
                <p className="text-xs text-emerald-700">Tus datos académicos y laborales han quedado guardados localmente para la base de datos.</p>
              </div>
            </div>
          )}

          {/* Bloque 1: Perfil Formativo y Ocupacional */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <GraduationCap size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                1. Formación Previa y Expectativas Laborales
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Nivel de formación antes de ingresar al SENA *
                </label>
                <select
                  value={nivelPrevio}
                  onChange={(e) => setNivelPrevio(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Bachiller Académico">Bachiller Académico</option>
                  <option value="Bachiller Técnico">Bachiller Técnico</option>
                  <option value="Técnico Laboral">Técnico Laboral</option>
                  <option value="Tecnólogo">Tecnólogo</option>
                  <option value="Básica Secundaria (Grado 9°)">Básica Secundaria</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Ha realizado formación titulada previa en SENA? *
                </label>
                <select
                  value={formacionSena}
                  onChange={(e) => setFormacionSena(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Trabaja actualmente? *
                </label>
                <select
                  value={trabajaActualmente}
                  onChange={(e) => setTrabajaActualmente(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="No">No - Solo estudio</option>
                  <option value="Sí - Medio tiempo">Sí - Medio tiempo</option>
                  <option value="Sí - Tiempo completo">Sí - Tiempo completo</option>
                  <option value="Ocasional / Fines de semana">Ocasional / Fines de semana</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Qué lo motivó para ingresar al SENA? *
                </label>
                <select
                  value={motivacion}
                  onChange={(e) => setMotivacion(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Oportunidad laboral y crecimiento profesional">Oportunidad laboral y crecimiento profesional</option>
                  <option value="Calidad de la formación SENA">Calidad de la formación SENA</option>
                  <option value="Gratuidad y acceso a beneficios">Gratuidad y acceso a beneficios</option>
                  <option value="Emprender un negocio propio">Emprender un negocio propio</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Maneja herramientas tecnológicas? *
                </label>
                <select
                  value={herramientasDigitales}
                  onChange={(e) => setHerramientasDigitales(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Sí">Sí - Nivel Intermedio / Avanzado</option>
                  <option value="Básico">Básico</option>
                  <option value="No">No / Muy poco</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿En qué área o campo le gustaría desempeñarse profesionalmente? *
                </label>
                <input
                  type="text"
                  value={areaInteres}
                  onChange={(e) => setAreaInteres(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Bloque 2: Vacunación COVID-19 */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <Syringe size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                2. Vacunación COVID-19 y Bioseguridad
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Se encuentra vacunado contra COVID-19? *
                </label>
                <select
                  value={vacunado}
                  onChange={(e) => setVacunado(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Biológico / Farmacéutica *
                </label>
                <select
                  value={biologico}
                  onChange={(e) => setBiologico(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Pfizer / BioNTech">Pfizer / BioNTech</option>
                  <option value="Moderna">Moderna</option>
                  <option value="AstraZeneca">AstraZeneca</option>
                  <option value="Sinovac (CoronaVac)">Sinovac</option>
                  <option value="Janssen (Johnson & Johnson)">Janssen (Unidosis)</option>
                  <option value="No aplica">No aplica</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Número de Dosis Aplicadas *
                </label>
                <select
                  value={dosis}
                  onChange={(e) => setDosis(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="3 Dosis">3 Dosis (Refuerzo)</option>
                  <option value="2 Dosis">2 Dosis (Completo)</option>
                  <option value="1 Dosis">1 Dosis</option>
                  <option value="4 Dosis o más">4 Dosis o más</option>
                  <option value="0">0 Dosis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Esquema Completo? *
                </label>
                <select
                  value={esquemaCompleto}
                  onChange={(e) => setEsquemaCompleto(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botones */}
          <footer className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-sena-green" />
              Último módulo previo a la revisión final.
            </span>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/formularios/socioeconomica"
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Anterior
              </Link>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-6 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity"
              >
                <span>Ir al Paso 10: Confirmación</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
}
