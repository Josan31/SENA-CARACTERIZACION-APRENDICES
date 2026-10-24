"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Check,
  CheckCircle2,
  Copy,
  Edit2,
  Eye,
  EyeOff,
  FileQuestion,
  Layers,
  ListPlus,
  Plus,
  Save,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { PreguntaFormulario, TipoPregunta } from "@/types/formularios";
import {
  getPreguntasModulo,
  savePreguntasModulo,
  addPreguntaModulo,
  updatePreguntaModulo,
  deletePreguntaModulo,
  toggleActivoPregunta,
  reordenarPregunta,
} from "@/lib/formulariosStore";
import DynamicFormRenderer from "@/components/formularios/DynamicFormRenderer";

interface GestorPreguntasAdminProps {
  moduloId: string;
  tituloModulo: string;
  subtituloModulo: string;
  onVolver: () => void;
}

export default function GestorPreguntasAdmin({
  moduloId,
  tituloModulo,
  subtituloModulo,
  onVolver,
}: GestorPreguntasAdminProps) {
  const [preguntas, setPreguntas] = useState<PreguntaFormulario[]>([]);
  const [tabActiva, setTabActiva] = useState<"editor" | "preview">("editor");
  const [notificacion, setNotificacion] = useState<string | null>(null);
  const [guardandoBackend, setGuardandoBackend] = useState(false);

  // Estados del modal de agregar / editar pregunta
  const [modalAbierto, setModalAbierto] = useState(false);
  const [preguntaEnEdicion, setPreguntaEnEdicion] = useState<PreguntaFormulario | null>(null);

  // Campos del modal
  const [labelForm, setLabelForm] = useState("");
  const [seccionForm, setSeccionForm] = useState("");
  const [tipoForm, setTipoForm] = useState<TipoPregunta>("text");
  const [placeholderForm, setPlaceholderForm] = useState("");
  const [requeridoForm, setRequeridoForm] = useState(true);
  const [opcionesForm, setOpcionesForm] = useState<string[]>(["Opción 1", "Opción 2"]);
  const [nuevaOpcionInput, setNuevaOpcionInput] = useState("");

  const cargarPreguntas = () => {
    const list = getPreguntasModulo(moduloId);
    setPreguntas(list);
  };

  useEffect(() => {
    cargarPreguntas();

    const handleActualizacion = (e: any) => {
      if (!e.detail || e.detail.moduloId === moduloId) {
        cargarPreguntas();
      }
    };

    window.addEventListener("sena_preguntas_actualizadas", handleActualizacion);
    return () => {
      window.removeEventListener("sena_preguntas_actualizadas", handleActualizacion);
    };
  }, [moduloId]);

  const mostrarAviso = (msg: string) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(null), 3500);
  };

  // Obtener lista única de secciones existentes
  const seccionesExistentes = Array.from(
    new Set(preguntas.map((p) => p.seccion).filter(Boolean))
  );

  // Abrir modal para añadir
  const abrirModalNueva = () => {
    setPreguntaEnEdicion(null);
    setLabelForm("");
    setSeccionForm(seccionesExistentes[0] || "General");
    setTipoForm("text");
    setPlaceholderForm("");
    setRequeridoForm(true);
    setOpcionesForm(["Opción 1", "Opción 2"]);
    setNuevaOpcionInput("");
    setModalAbierto(true);
  };

  // Abrir modal para editar
  const abrirModalEditar = (p: PreguntaFormulario) => {
    setPreguntaEnEdicion(p);
    setLabelForm(p.label);
    setSeccionForm(p.seccion || "General");
    setTipoForm(p.tipo);
    setPlaceholderForm(p.placeholder || "");
    setRequeridoForm(p.requerido);
    setOpcionesForm(p.opciones ? [...p.opciones] : ["Opción 1", "Opción 2"]);
    setNuevaOpcionInput("");
    setModalAbierto(true);
  };

  // Guardar en modal (crear o actualizar)
  const handleGuardarPreguntaModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labelForm.trim()) {
      mostrarAviso("El enunciado de la pregunta es obligatorio.");
      return;
    }

    const opcionesFinales =
      tipoForm === "select" || tipoForm === "radio"
        ? opcionesForm.filter((o) => o.trim().length > 0)
        : undefined;

    if (preguntaEnEdicion) {
      // Modificar
      await updatePreguntaModulo(moduloId, preguntaEnEdicion.id, {
        label: labelForm.trim(),
        seccion: seccionForm.trim() || "General",
        tipo: tipoForm,
        placeholder: placeholderForm.trim(),
        requerido: requeridoForm,
        opciones: opcionesFinales,
      });
      mostrarAviso(`Pregunta "${labelForm}" modificada con éxito.`);
    } else {
      // Crear nueva
      await addPreguntaModulo(moduloId, {
        label: labelForm.trim(),
        seccion: seccionForm.trim() || "General",
        tipo: tipoForm,
        placeholder: placeholderForm.trim(),
        requerido: requeridoForm,
        opciones: opcionesFinales,
        activo: true,
      });
      mostrarAviso(`Nueva pregunta "${labelForm}" añadida.`);
    }

    setModalAbierto(false);
    cargarPreguntas();
  };

  // Quitar / Eliminar pregunta
  const handleEliminarPregunta = async (p: PreguntaFormulario) => {
    if (confirm(`¿Estás seguro de eliminar la pregunta "${p.label}"?`)) {
      await deletePreguntaModulo(moduloId, p.id);
      mostrarAviso(`Pregunta "${p.label}" eliminada del formulario.`);
      cargarPreguntas();
    }
  };

  // Alternar activo / inactivo
  const handleToggleActivo = async (p: PreguntaFormulario) => {
    await toggleActivoPregunta(moduloId, p.id);
    mostrarAviso(
      p.activo
        ? `Pregunta oculta a los aprendices.`
        : `Pregunta reactivada para los aprendices.`
    );
    cargarPreguntas();
  };

  // Reordenar
  const handleReordenar = async (p: PreguntaFormulario, direccion: "up" | "down") => {
    await reordenarPregunta(moduloId, p.id, direccion);
    cargarPreguntas();
  };

  // Guardado manual explícito en el Backend
  const handleGuardarBackend = async () => {
    setGuardandoBackend(true);
    const ok = await savePreguntasModulo(moduloId, preguntas);
    setGuardandoBackend(false);
    if (ok) {
      mostrarAviso("Formulario y preguntas sincronizadas con éxito en el backend.");
    } else {
      mostrarAviso("Guardado en local. No fue posible contactar el servidor remoto.");
    }
  };

  // Manejo de opciones dinámicas en el modal
  const handleAgregarOpcion = () => {
    if (nuevaOpcionInput.trim()) {
      setOpcionesForm([...opcionesForm, nuevaOpcionInput.trim()]);
      setNuevaOpcionInput("");
    }
  };

  const handleEliminarOpcion = (idx: number) => {
    setOpcionesForm(opcionesForm.filter((_, i) => i !== idx));
  };

  // Agrupar preguntas por sección para visualización
  const seccionesMap = preguntas.reduce((acc, p) => {
    const sec = p.seccion || "General";
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(p);
    return acc;
  }, {} as Record<string, PreguntaFormulario[]>);

  const nombresSecciones = Object.keys(seccionesMap);
  const totalActivas = preguntas.filter((p) => p.activo !== false).length;
  const totalPersonalizadas = preguntas.filter((p) => p.esPersonalizada).length;

  return (
    <div className="relative w-full max-w-6xl mx-auto font-primary text-slate-800 space-y-6">
      {/* Notificación Flotante */}
      {notificacion && (
        <div className="fixed top-6 right-8 z-50 flex items-center gap-2.5 rounded-2xl bg-[#00875a] px-5 py-3 text-xs font-bold text-white shadow-xl animate-in slide-in-from-top-3">
          <Check size={16} strokeWidth={3} />
          <span>{notificacion}</span>
        </div>
      )}

      {/* ── BARRA SUPERIOR DE ACCIONES DEL ADMINISTRADOR ── */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-xs border border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onVolver}
            className="flex items-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 px-4 py-2.5 text-xs font-bold text-[#00304d] transition-all cursor-pointer"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Volver al Catálogo</span>
          </button>

          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#008f4c] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Gestor de Preguntas del Formulario
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#00304d] mt-1 leading-tight">
              {tituloModulo}
            </h1>
          </div>
        </div>

        {/* Pestañas de Modo (Editor vs Vista Previa) */}
        <div className="flex items-center gap-2 self-stretch lg:self-auto justify-between lg:justify-end">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setTabActiva("editor")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tabActiva === "editor"
                  ? "bg-white text-[#00304d] shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Edit2 size={13} />
              <span>Configurar Preguntas ({preguntas.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setTabActiva("preview")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tabActiva === "preview"
                  ? "bg-white text-[#008f4c] shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Sparkles size={13} />
              <span>Vista Previa Aprendiz</span>
            </button>
          </div>

          <button
            type="button"
            onClick={abrirModalNueva}
            className="flex items-center gap-1.5 rounded-full bg-[#00875a] hover:bg-[#00734c] text-white px-4 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          >
            <Plus size={15} strokeWidth={2.8} />
            <span>Añadir Pregunta</span>
          </button>
        </div>
      </div>

      {/* ── MODO 1: CONFIGURAR PREGUNTAS ── */}
      {tabActiva === "editor" && (
        <div className="space-y-6">
          {/* Tarjeta de métricas y sincronización */}
          <div className="rounded-3xl bg-gradient-to-r from-[#00304d] to-[#004e26] p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                <CheckCircle2 size={15} />
                <span>Sincronización en Tiempo Real con el Aprendiz</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                Total: <strong>{preguntas.length} preguntas</strong> ({totalActivas} activas, {totalPersonalizadas} añadidas por administradores).
              </p>
            </div>

            <button
              type="button"
              onClick={handleGuardarBackend}
              disabled={guardandoBackend}
              className="flex items-center gap-2 rounded-full bg-white text-[#00304d] hover:bg-emerald-50 px-5 py-2.5 text-xs font-bold shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Save size={14} className="text-[#008f4c]" />
              <span>{guardandoBackend ? "Guardando en Backend..." : "Guardar en Backend"}</span>
            </button>
          </div>

          {/* Lista de Secciones y Preguntas */}
          {nombresSecciones.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center border border-slate-200 space-y-3">
              <FileQuestion size={40} className="mx-auto text-slate-300" />
              <h3 className="text-base font-bold text-slate-700">No hay preguntas configuradas</h3>
              <p className="text-xs text-slate-500">
                Presiona el botón verde superior <strong>"Añadir Pregunta"</strong> para agregar la primera.
              </p>
            </div>
          ) : (
            nombresSecciones.map((secNombre) => {
              const preguntasSeccion = seccionesMap[secNombre];

              return (
                <div
                  key={secNombre}
                  className="rounded-3xl bg-white p-5 sm:p-6 shadow-xs border border-slate-200 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-[#008f4c]">
                        <Layers size={14} />
                      </div>
                      <h2 className="text-sm font-black text-[#00304d] uppercase tracking-wide">
                        {secNombre}
                      </h2>
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {preguntasSeccion.length}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        abrirModalNueva();
                        setSeccionForm(secNombre);
                      }}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#008f4c] hover:text-[#007038] cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Añadir a esta sección</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {preguntasSeccion.map((p, idx) => (
                      <div
                        key={p.id}
                        className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all ${
                          p.activo === false
                            ? "bg-slate-50/70 border-dashed border-slate-300 opacity-60"
                            : "bg-[#fcfdfd] border-slate-200 hover:border-emerald-300 hover:shadow-xs"
                        }`}
                      >
                        {/* Enunciado e información de la pregunta */}
                        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-extrabold text-slate-500">
                            {p.orden}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xs sm:text-sm font-bold text-[#00304d] leading-snug">
                                {p.label}
                              </h3>
                              {p.requerido ? (
                                <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                  Obligatoria
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                  Opcional
                                </span>
                              )}
                              {p.esPersonalizada && (
                                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                  Personalizada
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                              <span className="capitalize font-medium text-slate-500">
                                Tipo: {p.tipo}
                              </span>
                              {p.opciones && p.opciones.length > 0 && (
                                <span>• {p.opciones.length} opciones</span>
                              )}
                              {p.placeholder && (
                                <span className="italic truncate max-w-xs">
                                  • Ayuda: "{p.placeholder}"
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 pt-1 sm:pt-0">
                          {/* Reordenar arriba / abajo */}
                          <button
                            type="button"
                            onClick={() => handleReordenar(p, "up")}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Mover arriba"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReordenar(p, "down")}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Mover abajo"
                          >
                            <ArrowDown size={14} />
                          </button>

                          {/* Activar / Ocultar */}
                          <button
                            type="button"
                            onClick={() => handleToggleActivo(p)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              p.activo === false
                                ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                            title={p.activo === false ? "Activar pregunta" : "Ocultar pregunta"}
                          >
                            {p.activo === false ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>

                          {/* Editar */}
                          <button
                            type="button"
                            onClick={() => abrirModalEditar(p)}
                            className="flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00304d] px-3 py-1.5 text-xs font-bold transition-all cursor-pointer"
                          >
                            <Edit2 size={12} />
                            <span>Editar</span>
                          </button>

                          {/* Eliminar */}
                          <button
                            type="button"
                            onClick={() => handleEliminarPregunta(p)}
                            className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Eliminar pregunta"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── MODO 2: VISTA PREVIA APRENDIZ ── */}
      {tabActiva === "preview" && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs font-semibold text-amber-900 flex items-center justify-between">
            <span>
              ℹ️ Estás visualizando el formulario en tiempo real exactamente como lo responde el aprendiz.
            </span>
            <button
              type="button"
              onClick={() => setTabActiva("editor")}
              className="text-amber-800 underline font-bold cursor-pointer"
            >
              Volver a editar preguntas
            </button>
          </div>

          <DynamicFormRenderer
            moduloId={moduloId}
            tituloModulo={tituloModulo}
            subtituloModulo={subtituloModulo}
            esVistaPrevia={true}
            linkVolver=""
          />
        </div>
      )}

      {/* ── MODAL: AÑADIR O EDITAR PREGUNTA ── */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#008f4c]">
                  {preguntaEnEdicion ? "Modificar Pregunta" : "Añadir Nueva Pregunta"}
                </span>
                <h3 className="text-base font-extrabold text-[#00304d]">
                  {preguntaEnEdicion ? "Editar detalles del campo" : "Configurar campo del formulario"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Formulario del Modal */}
            <form onSubmit={handleGuardarPreguntaModal} className="space-y-4">
              {/* Enunciado */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Enunciado o Título de la Pregunta <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={labelForm}
                  onChange={(e) => setLabelForm(e.target.value)}
                  placeholder="Ej: ¿Cuenta con equipo de cómputo propio en casa?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/20"
                />
              </div>

              {/* Sección / Categoría */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Sección o Grupo del Formulario
                </label>
                <input
                  type="text"
                  list="secciones-list"
                  value={seccionForm}
                  onChange={(e) => setSeccionForm(e.target.value)}
                  placeholder="Ej: Conectividad y Tecnología"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/20"
                />
                <datalist id="secciones-list">
                  {seccionesExistentes.map((s, i) => (
                    <option key={i} value={s} />
                  ))}
                </datalist>
                <p className="text-[10px] text-slate-400">
                  Puedes seleccionar una existente o escribir un nombre nuevo para crear otra sección.
                </p>
              </div>

              {/* Tipo de Campo y Requerido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tipo de Entrada</label>
                  <select
                    value={tipoForm}
                    onChange={(e) => setTipoForm(e.target.value as TipoPregunta)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#008f4c] cursor-pointer"
                  >
                    <option value="text">Texto Corto</option>
                    <option value="textarea">Texto Largo / Párrafo</option>
                    <option value="number">Número</option>
                    <option value="select">Selección Desplegable</option>
                    <option value="radio">Selección con Opciones (Radio)</option>
                    <option value="checkbox">Casilla de Verificación (Sí/No)</option>
                    <option value="date">Fecha</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Obligatoriedad</label>
                  <div className="flex items-center gap-2 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={requeridoForm}
                        onChange={(e) => setRequeridoForm(e.target.checked)}
                        className="h-4 w-4 rounded accent-[#008f4c]"
                      />
                      <span>¿Respuesta Obligatoria?</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Texto de Ayuda / Placeholder */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Texto de Ayuda / Placeholder</label>
                <input
                  type="text"
                  value={placeholderForm}
                  onChange={(e) => setPlaceholderForm(e.target.value)}
                  placeholder="Ej: Ingrese su respuesta..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#008f4c]"
                />
              </div>

              {/* Configuración de Opciones (Si es select o radio) */}
              {(tipoForm === "select" || tipoForm === "radio") && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700">
                    Opciones de Respuesta ({opcionesForm.length})
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nuevaOpcionInput}
                      onChange={(e) => setNuevaOpcionInput(e.target.value)}
                      placeholder="Nueva opción..."
                      className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#008f4c]"
                    />
                    <button
                      type="button"
                      onClick={handleAgregarOpcion}
                      className="rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-2 text-xs font-bold cursor-pointer"
                    >
                      Añadir
                    </button>
                  </div>

                  <div className="max-h-36 overflow-y-auto space-y-1.5 pt-1">
                    {opcionesForm.map((op, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700"
                      >
                        <span className="truncate">{op}</span>
                        <button
                          type="button"
                          onClick={() => handleEliminarOpcion(idx)}
                          className="text-rose-500 hover:text-rose-700 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botones del Modal */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-full bg-[#00875a] hover:bg-[#00734c] px-6 py-2 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
                >
                  <Save size={13} />
                  <span>{preguntaEnEdicion ? "Guardar Modificaciones" : "Añadir Pregunta"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
