"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PreguntaFormulario } from "@/types/formularios";
import {
  getPreguntasModulo,
  getRespuestasModulo,
  saveRespuestasModulo,
} from "@/lib/formulariosStore";

interface DynamicFormRendererProps {
  moduloId: string;
  tituloModulo: string;
  subtituloModulo: string;
  numeroPaso?: string;
  linkVolver?: string;
  linkSiguiente?: string;
  textoBotonSiguiente?: string;
  onSuccess?: () => void;
  esVistaPrevia?: boolean;
}

export default function DynamicFormRenderer({
  moduloId,
  tituloModulo,
  subtituloModulo,
  numeroPaso = "1 de 4",
  linkVolver = "/admin/formularios",
  linkSiguiente,
  textoBotonSiguiente = "Guardar y Continuar",
  onSuccess,
  esVistaPrevia = false,
}: DynamicFormRendererProps) {
  const [preguntas, setPreguntas] = useState<PreguntaFormulario[]>([]);
  const [respuestas, setRespuestas] = useState<Record<string, any>>({});
  const [guardadoExito, setGuardadoExito] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar preguntas y respuestas
  const cargarDatos = () => {
    const list = getPreguntasModulo(moduloId);
    setPreguntas(list.filter((p) => p.activo !== false));
    const guardadas = getRespuestasModulo(moduloId);
    setRespuestas(guardadas);
  };

  useEffect(() => {
    cargarDatos();

    // Sincronización en tiempo real con cambios realizados por el administrador
    const handleActualizacion = (e: any) => {
      if (!e.detail || e.detail.moduloId === moduloId) {
        cargarDatos();
      }
    };

    window.addEventListener("sena_preguntas_actualizadas", handleActualizacion);
    return () => {
      window.removeEventListener("sena_preguntas_actualizadas", handleActualizacion);
    };
  }, [moduloId]);

  const handleChange = (id: string, val: any) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: val,
    }));

    if (errores[id]) {
      setErrores((prev) => {
        const c = { ...prev };
        delete c[id];
        return c;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar requeridos
    const nuevosErrores: Record<string, string> = {};
    for (const p of preguntas) {
      if (p.requerido) {
        const val = respuestas[p.id];
        if (val === undefined || val === null || String(val).trim() === "") {
          nuevosErrores[p.id] = "Este campo es obligatorio";
        }
      }
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      const primerError = Object.keys(nuevosErrores)[0];
      const el = document.getElementById(`field-${primerError}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    await saveRespuestasModulo(moduloId, respuestas);
    setIsSubmitting(false);
    setGuardadoExito(true);

    if (onSuccess) {
      onSuccess();
    }

    setTimeout(() => {
      setGuardadoExito(false);
    }, 4000);
  };

  // Agrupar preguntas por sección
  const seccionesMap = preguntas.reduce((acc, p) => {
    const sec = p.seccion || "Información General";
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(p);
    return acc;
  }, {} as Record<string, PreguntaFormulario[]>);

  const nombresSecciones = Object.keys(seccionesMap);

  return (
    <div className="relative w-full max-w-6xl mx-auto font-primary text-slate-800">
      {/* Triángulo decorativo institucional */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-[#39b54a] pointer-events-none z-10"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      {/* Encabezado */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {linkVolver && (
            <Link
              href={linkVolver}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#00304d] shadow-sm border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-x-0.5"
              title="Volver"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
            </Link>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#008f4c]">
                Caracterización de Aprendices SENA
              </span>
              {esVistaPrevia && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 border border-amber-300">
                  <Sparkles size={11} />
                  Vista Previa
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-black text-[#00304d] tracking-tight leading-tight">
              {tituloModulo}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {subtituloModulo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#00304d] bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            {numeroPaso}
          </span>
        </div>
      </header>

      {/* Alerta de guardado */}
      {guardadoExito && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-300 p-4 flex items-center gap-3 text-emerald-900 animate-in fade-in duration-300 shadow-sm">
          <CheckCircle2 size={24} className="shrink-0 text-emerald-600" />
          <div>
            <p className="font-bold text-sm">
              ¡Módulo guardado y sincronizado con el backend exitosamente!
            </p>
            <p className="text-xs text-emerald-700">
              Tus respuestas han sido recibidas y persistidas de forma segura.
            </p>
          </div>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        {nombresSecciones.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm font-semibold">No hay preguntas activas en este formulario.</p>
            <p className="text-xs mt-1">El administrador puede añadir preguntas desde el panel de gestión.</p>
          </div>
        ) : (
          nombresSecciones.map((nombreSeccion) => {
            const preguntasSeccion = seccionesMap[nombreSeccion];

            return (
              <section key={nombreSeccion} className="space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                  <div className="h-2 w-2 rounded-full bg-[#008f4c]" />
                  <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00304d]">
                    {nombreSeccion}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {preguntasSeccion.map((p) => {
                    const isFullWidth = p.tipo === "textarea";
                    const error = errores[p.id];
                    const valorActual = respuestas[p.id] ?? "";

                    return (
                      <div
                        key={p.id}
                        id={`field-${p.id}`}
                        className={`space-y-1.5 ${isFullWidth ? "md:col-span-2 lg:col-span-3" : ""}`}
                      >
                        <label className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span className="flex items-center gap-1">
                            {p.label}
                            {p.requerido && (
                              <span className="text-rose-500 font-black">*</span>
                            )}
                          </span>
                          {p.esPersonalizada && (
                            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                              Nueva
                            </span>
                          )}
                        </label>

                        {/* RENDER SEGÚN TIPO */}
                        {p.tipo === "text" && (
                          <input
                            type="text"
                            value={valorActual}
                            onChange={(e) => handleChange(p.id, e.target.value)}
                            placeholder={p.placeholder || "Escriba su respuesta..."}
                            className={`w-full rounded-xl border ${
                              error
                                ? "border-rose-400 ring-2 ring-rose-100"
                                : "border-slate-200 focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/20"
                            } bg-slate-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400`}
                          />
                        )}

                        {p.tipo === "number" && (
                          <input
                            type="number"
                            value={valorActual}
                            onChange={(e) => handleChange(p.id, e.target.value)}
                            placeholder={p.placeholder || "0"}
                            className={`w-full rounded-xl border ${
                              error
                                ? "border-rose-400 ring-2 ring-rose-100"
                                : "border-slate-200 focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/20"
                            } bg-slate-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400`}
                          />
                        )}

                        {p.tipo === "date" && (
                          <input
                            type="date"
                            value={valorActual}
                            onChange={(e) => handleChange(p.id, e.target.value)}
                            className={`w-full rounded-xl border ${
                              error
                                ? "border-rose-400 ring-2 ring-rose-100"
                                : "border-slate-200 focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/20"
                            } bg-slate-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all`}
                          />
                        )}

                        {p.tipo === "textarea" && (
                          <textarea
                            rows={3}
                            value={valorActual}
                            onChange={(e) => handleChange(p.id, e.target.value)}
                            placeholder={p.placeholder || "Detalle su respuesta..."}
                            className={`w-full rounded-xl border ${
                              error
                                ? "border-rose-400 ring-2 ring-rose-100"
                                : "border-slate-200 focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/20"
                            } bg-slate-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 resize-none`}
                          />
                        )}

                        {p.tipo === "select" && (
                          <select
                            value={valorActual}
                            onChange={(e) => handleChange(p.id, e.target.value)}
                            className={`w-full rounded-xl border ${
                              error
                                ? "border-rose-400 ring-2 ring-rose-100"
                                : "border-slate-200 focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/20"
                            } bg-slate-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all cursor-pointer`}
                          >
                            <option value="">-- Seleccione una opción --</option>
                            {(p.opciones || []).map((op, oIdx) => (
                              <option key={oIdx} value={op}>
                                {op}
                              </option>
                            ))}
                          </select>
                        )}

                        {p.tipo === "radio" && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {(p.opciones || ["Sí", "No"]).map((op, oIdx) => (
                              <label
                                key={oIdx}
                                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold cursor-pointer transition-all ${
                                  valorActual === op
                                    ? "bg-emerald-50 border-[#008f4c] text-[#008f4c]"
                                    : "bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={p.id}
                                  value={op}
                                  checked={valorActual === op}
                                  onChange={() => handleChange(p.id, op)}
                                  className="accent-[#008f4c]"
                                />
                                <span>{op}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {p.tipo === "checkbox" && (
                          <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={Boolean(valorActual)}
                              onChange={(e) => handleChange(p.id, e.target.checked)}
                              className="h-4 w-4 rounded accent-[#008f4c]"
                            />
                            <span className="text-xs text-slate-700 font-medium">
                              Marcar si aplica
                            </span>
                          </label>
                        )}

                        {error && (
                          <p className="text-[11px] font-semibold text-rose-500">
                            {error}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}

        {/* Botones de acción inferiores */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-[#008f4c]" />
            Respuestas sincronizadas de forma segura con el servidor y backend SENA.
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {linkVolver && (
              <Link
                href={linkVolver}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all text-center"
              >
                Anterior
              </Link>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00875a] to-[#007048] hover:from-[#00734c] hover:to-[#005e3c] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? "Guardando en Backend..." : textoBotonSiguiente}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
