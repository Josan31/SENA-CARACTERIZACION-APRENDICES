"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  History,
  Info,
  Lock,
  MapPin,
  RefreshCw,
  Save,
  Send,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";

export default function FormularioRecaracterizacion() {
  const router = useRouter();

  // Datos para diligenciar (iniciados vacíos para diligenciamiento limpio)
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estrato, setEstrato] = useState("");
  const [eps, setEps] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [situacionLaboral, setSituacionLaboral] = useState("");
  const [rangoIngresos, setRangoIngresos] = useState("");
  const [solicitaFic, setSolicitaFic] = useState(false);
  const [cambiosRealizados, setCambiosRealizados] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const payload = {
          tipo: "recaracterizacion_semestral",
          direccion, municipio, estrato, eps, telefono, correo,
          situacionLaboral, rangoIngresos, solicitaFic, cambiosRealizados,
          fechaActualizacion: new Date().toISOString()
        };
        localStorage.setItem("sena_caracterizacion_recaracterizacion", JSON.stringify(payload));
      }
      setIsSubmitting(false);
      setUpdated(true);
    }, 500);
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
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/formularios"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sena-navy shadow-sm border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-x-0.5"
            title="Volver a Formularios"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sena-green">
              Caracterización Periódica de Aprendices
            </span>
            <h1 className="text-xl md:text-2xl font-black text-sena-navy tracking-tight leading-tight">
              Recaracterización Semestral de Datos
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Actualización ágil de residencia, salud y situación socioeconómica para aprendices activos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
            <History size={13} />
            Versión 2.0 (Ciclo 2026-II)
          </span>
          <div className="hidden md:flex flex-col items-end pl-3 border-l border-slate-200">
            <span className="text-lg font-black text-sena-green leading-none">
              SENA
            </span>
            <span className="text-[8px] font-semibold text-sena-navy leading-tight mt-1">
              Bienestar al Aprendiz
            </span>
          </div>
        </div>
      </header>

      {/* Tarjeta Principal */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
        {/* Banner de Aviso de Recaracterización */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong>Recaracterización Obligatoria cada 6 meses:</strong> De acuerdo con el protocolo de Bienestar al Aprendiz SENA, tu caracterización inicial (Radicado <code>RAD-SENA-2026-789412</code>) requiere renovación de datos para mantener activos tus beneficios institucionales y apoyos de sostenimiento.
          </div>
        </div>

        {/* Cabecera interna */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0077b6] to-sena-navy text-white shadow-md">
            <RefreshCw size={20} strokeWidth={2.4} />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-bold text-sena-navy">
              Actualización de Variables Clave del Aprendiz
            </h2>
            <p className="text-xs text-slate-500">
              Hemos precargado tu última información registrada. Modifica únicamente los campos que hayan cambiado.
            </p>
          </div>
        </div>

        {updated ? (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-sena-green">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-sena-navy">
              ¡Recaracterización v2.0 Guardada Exitosamente!
            </h3>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              Los cambios han sido guardados en el histórico de tu expediente bajo el radicado de recaracterización{" "}
              <strong className="text-sena-green-dark">REC-SENA-2026-II-9014</strong>. Tu vigencia ha sido extendida por 6 meses adicionales.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setUpdated(false)}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-sena-navy hover:bg-slate-50"
              >
                Modificar Nuevamente
              </button>
              <Link
                href="/admin/formularios"
                className="rounded-full bg-sena-green px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-sena-green-dark transition-colors"
              >
                Volver al Panel
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Dirección */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Dirección de Residencia Actual *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                    required
                  />
                  <MapPin
                    size={15}
                    className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Municipio */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Municipio y Departamento *
                </label>
                <input
                  type="text"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                  required
                />
              </div>

              {/* Estrato */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Estrato Socioeconómico *
                </label>
                <select
                  value={estrato}
                  onChange={(e) => setEstrato(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                >
                  <option value="1">Estrato 1 (Bajo - Bajo)</option>
                  <option value="2">Estrato 2 (Bajo)</option>
                  <option value="3">Estrato 3 (Medio - Bajo)</option>
                  <option value="4">Estrato 4 (Medio)</option>
                  <option value="5">Estrato 5 (Medio - Alto)</option>
                  <option value="6">Estrato 6 (Alto)</option>
                </select>
              </div>

              {/* EPS */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Afiliación a Salud (EPS / Régimen) *
                </label>
                <input
                  type="text"
                  value={eps}
                  onChange={(e) => setEps(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                  required
                />
              </div>

              {/* Teléfono Celular */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Teléfono Celular de Contacto *
                </label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                  required
                />
              </div>

              {/* Situación Laboral */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Situación Laboral Actual *
                </label>
                <select
                  value={situacionLaboral}
                  onChange={(e) => setSituacionLaboral(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                >
                  <option value="Estudiante tiempo completo (No labora)">
                    Estudiante tiempo completo (No labora)
                  </option>
                  <option value="Empleado(a) dependiente formal">
                    Empleado(a) dependiente formal
                  </option>
                  <option value="Trabajador(a) independiente / Informal">
                    Trabajador(a) independiente / Informal
                  </option>
                  <option value="En etapa práctica / Contrato de aprendizaje">
                    En etapa práctica / Contrato de aprendizaje
                  </option>
                  <option value="Buscando empleo activamente">
                    Buscando empleo activamente
                  </option>
                </select>
              </div>

              {/* Rango de Ingresos */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Rango Total de Ingresos Familiares *
                </label>
                <select
                  value={rangoIngresos}
                  onChange={(e) => setRangoIngresos(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                >
                  <option value="Menos de 1 SMMLV ($1.750.000 COP)">
                    Menos de 1 SMMLV ($1.750.000 COP)
                  </option>
                  <option value="Entre 1 y 2 SMMLV">Entre 1 y 2 SMMLV</option>
                  <option value="Entre 2 y 4 SMMLV">Entre 2 y 4 SMMLV</option>
                  <option value="Más de 4 SMMLV">Más de 4 SMMLV</option>
                </select>
              </div>

              {/* Postulación a Apoyo de Sostenimiento FIC */}
              <div className="flex items-center pt-5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={solicitaFic}
                    onChange={(e) => setSolicitaFic(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-sena-green focus:ring-sena-green"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-sena-navy block">
                      Postularme / Renovar Apoyo de Sostenimiento FIC / Regular
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Cumplo con los requisitos de estrato 1 o 2 y no tengo contrato de aprendizaje vigente.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Resumen de cambios */}
            <div>
              <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                Resumen de Novedades o Motivo de los Cambios *
              </label>
              <textarea
                value={cambiosRealizados}
                onChange={(e) => setCambiosRealizados(e.target.value)}
                rows={2}
                placeholder="Indica qué cambios realizaste en esta recaracterización..."
                className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] p-3 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all resize-none"
                required
              />
            </div>

            {/* Footer */}
            <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#0077b6]">
                <ShieldCheck size={16} />
                <span>Esta recaracterización genera un registro versionado en la tabla <code>caracterizaciones</code>.</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/admin/formularios"
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#007796] to-sena-green px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-sena-green/25 hover:opacity-95 disabled:opacity-50 transition-all"
                >
                  <Save size={14} />
                  <span>{isSubmitting ? "Guardando..." : "Guardar Recaracterización"}</span>
                </button>
              </div>
            </footer>
          </form>
        )}
      </main>
    </div>
  );
}
