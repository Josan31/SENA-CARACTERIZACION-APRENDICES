"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  DollarSign,
  HeartHandshake,
  Home,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

export default function FormularioSocioeconomica() {
  const router = useRouter();

  // Estados socioeconómicos (iniciados vacíos para diligenciamiento limpio)
  const [jefaturaHogar, setJefaturaHogar] = useState("");
  const [totalPersonas, setTotalPersonas] = useState("");
  const [personasTrabajan, setPersonasTrabajan] = useState("");
  const [ingresos, setIngresos] = useState("");
  const [fuenteIngresos, setFuenteIngresos] = useState("");
  const [grupoEtnico, setGrupoEtnico] = useState("");
  const [victimaConflicto, setVictimaConflicto] = useState("");
  const [recibeApoyos, setRecibeApoyos] = useState("");
  const [situacionVivienda, setSituacionVivienda] = useState("");
  const [guardadoExito, setGuardadoExito] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const data = {
        modulo: "socioeconomica",
        jefaturaHogar, totalPersonas, personasTrabajan, ingresos, fuenteIngresos,
        grupoEtnico, victimaConflicto, recibeApoyos, situacionVivienda,
        fechaActualizacion: new Date().toISOString()
      };
      localStorage.setItem("sena_caracterizacion_modulo_socioeconomica", JSON.stringify(data));
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
            href="/admin/formularios?form=salud"
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
              Situación Socioeconómica y Familiar
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Informa sobre tu contexto socioeconómico, composición del hogar y focalización de ayudas.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-sena-navy bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Módulo 3 de 4
          </span>
        </div>
      </header>

      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {guardadoExito && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-4 flex items-center gap-3 text-sena-green-dark animate-in fade-in duration-300">
              <CheckCircle2 size={22} className="shrink-0 text-sena-green" />
              <div>
                <p className="font-bold text-sm">¡Módulo 3: Información Socioeconómica guardado con éxito!</p>
                <p className="text-xs text-emerald-700">Tus datos familiares e ingresos han quedado guardados localmente para la base de datos.</p>
              </div>
            </div>
          )}

          {/* Bloque 1: Hogar y Economía */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <Banknote size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                1. Dinámica Familiar e Ingresos
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Jefatura del Hogar *
                </label>
                <select
                  value={jefaturaHogar}
                  onChange={(e) => setJefaturaHogar(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Madre">Madre</option>
                  <option value="Padre">Padre</option>
                  <option value="Ambos padres">Ambos padres</option>
                  <option value="Yo mismo (a)">Yo mismo (a)</option>
                  <option value="Abuelo (a)">Abuelo (a)</option>
                  <option value="Hermano (a)">Hermano (a)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Total Personas que Residen en el Hogar *
                </label>
                <input
                  type="number"
                  value={totalPersonas}
                  onChange={(e) => setTotalPersonas(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Cuántas personas aportan ingresos? *
                </label>
                <input
                  type="number"
                  value={personasTrabajan}
                  onChange={(e) => setPersonasTrabajan(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Rango Total de Ingresos Familiares *
                </label>
                <select
                  value={ingresos}
                  onChange={(e) => setIngresos(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Menos de 1 SMMLV ($1.750.000 COP)">Menos de 1 SMMLV ($1.750.000 COP)</option>
                  <option value="Entre 1 y 2 SMMLV">Entre 1 y 2 SMMLV</option>
                  <option value="Entre 2 y 3 SMMLV">Entre 2 y 3 SMMLV</option>
                  <option value="Más de 3 SMMLV">Más de 3 SMMLV</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Principal Fuente de Ingresos *
                </label>
                <select
                  value={fuenteIngresos}
                  onChange={(e) => setFuenteIngresos(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Trabajo Informal / Emprendimiento">Trabajo Informal / Emprendimiento</option>
                  <option value="Salario Fijo / Empleo Formal">Salario Fijo / Empleo Formal</option>
                  <option value="Pensión / Renta">Pensión / Renta</option>
                  <option value="Remesas familiares">Remesas familiares</option>
                  <option value="Subsidios del Estado">Subsidios del Estado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Tipo de Tenencia de la Vivienda *
                </label>
                <select
                  value={situacionVivienda}
                  onChange={(e) => setSituacionVivienda(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Arrendada">Arrendada</option>
                  <option value="Propia (Totalmente pagada)">Propia (Totalmente pagada)</option>
                  <option value="Propia (Pagándose con crédito)">Propia (Pagándose con crédito)</option>
                  <option value="Familiar / Prestada">Familiar / Prestada</option>
                  <option value="Posesión sin título">Posesión sin título</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bloque 2: Poblaciones y Apoyos Estatales */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <HeartHandshake size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                2. Pertenencia Étnica y Apoyos del Estado
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Se autorreconoce en algún Grupo Étnico? *
                </label>
                <select
                  value={grupoEtnico}
                  onChange={(e) => setGrupoEtnico(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Ninguno / Mestizo">Ninguno / Mestizo</option>
                  <option value="Afrocolombiano / Negro / Mulato">Afrocolombiano / Negro / Mulato</option>
                  <option value="Indígena">Indígena</option>
                  <option value="Palenquero">Palenquero</option>
                  <option value="Raizal del Archipiélago">Raizal</option>
                  <option value="Rrom / Gitano">Rrom / Gitano</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Es víctima del conflicto armado (RUV)? *
                </label>
                <select
                  value={victimaConflicto}
                  onChange={(e) => setVictimaConflicto(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Sí - Con Registro Único de Víctimas (RUV)">Sí - Con Registro RUV</option>
                  <option value="En proceso de trámite">En proceso de trámite</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Recibe algún subsidio o apoyo estatal? *
                </label>
                <select
                  value={recibeApoyos}
                  onChange={(e) => setRecibeApoyos(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Sí - Renta Joven">Sí - Renta Joven (Jóvenes en Acción)</option>
                  <option value="Sí - Devolución del IVA / Renta Ciudadana">Sí - Renta Ciudadana / IVA</option>
                  <option value="Sí - Apoyo de Transporte / Alimentación SENA">Sí - Apoyo SENA</option>
                  <option value="Ninguno">Ninguno</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botones */}
          <footer className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-sena-green" />
              Información utilizada para priorizar subsidios SENA.
            </span>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/formularios?form=salud"
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Anterior
              </Link>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-6 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity"
              >
                <span>Continuar a Perfil Formativo</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
}
