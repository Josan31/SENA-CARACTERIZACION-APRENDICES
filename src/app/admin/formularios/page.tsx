"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Pencil,
  Plus,
  FileText,
  Send,
  Check,
  Save,
} from "lucide-react";
import { BackButton } from "@/components/admin/BackButton";

import FormularioBasica from "@/components/formularios/FormularioBasica";
import FormularioSalud from "@/components/formularios/FormularioSalud";
import FormularioSocioeconomica from "@/components/formularios/FormularioSocioeconomica";
import FormularioFormativo from "@/components/formularios/FormularioFormativo";
import FormularioConsentimiento from "@/components/formularios/FormularioConsentimiento";
import FormularioRecaracterizacion from "@/components/formularios/FormularioRecaracterizacion";
import FormularioWizardCompleto from "@/components/formularios/FormularioWizardCompleto";
import FormQuestionsManager from "@/components/admin/FormQuestionsManager";

/* ──────────────────────────────────────────────────────────────────────────
   ILUSTRACIONES VECTORIALES SVG EXACTAS AL MOCKUP DEL ADMINISTRADOR
────────────────────────────────────────────────────────────────────────── */

/** Icono Tarjeta 1: Información Básica y Localización */
function AdminBasicaIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f5] p-1.5">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#d7f3ee" opacity="0.7" />
        {/* Avatar cuerpo */}
        <path
          d="M18 64C18 53.5 25.5 46 36 46H38C48.5 46 56 53.5 56 64"
          fill="#00785a"
        />
        {/* Cuello */}
        <path d="M33 42H41V47H33V42Z" fill="#ffcfa8" />
        {/* Cabeza */}
        <circle cx="37" cy="33" r="11.5" fill="#ffdcb8" />
        {/* Cabello estilizado */}
        <path
          d="M26 31C26 24.5 30.8 19.5 37 19.5C43.2 19.5 48 24.5 48 31C48 33 46.5 34 44.5 34C43 34 42 32.5 40 31.5C38 30.5 35 30.5 33 31.5C31 32.5 30 34 28.5 34C26.5 34 26 33 26 31Z"
          fill="#004e26"
        />
        {/* Pin verde */}
        <g transform="translate(18, 4)">
          <path
            d="M36 17C36 10.37 30.63 5 24 5C17.37 5 12 10.37 12 17C12 25.5 24 37 24 37C24 37 36 25.5 36 17Z"
            fill="#00a85a"
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <circle cx="24" cy="17" r="4.2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

/** Icono Tarjeta 2: Salud y Condición Física */
function AdminSaludIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f5] p-1.5">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#d7f3ee" opacity="0.7" />
        {/* Corazón verde */}
        <path
          d="M34 19C28.48 19 24 23.48 24 29C24 38 34 47.5 34 47.5C34 47.5 44 38 44 29C44 23.48 39.52 19 34 19Z"
          fill="#00a85a"
          transform="scale(1.18) translate(-6, -4)"
        />
        {/* Línea pulso blanco */}
        <path
          d="M26 30H30L32.5 25L35.5 34L38.5 27L40.5 31H44"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Vendaje / Jeringa */}
        <g transform="rotate(-30 46 50)">
          <rect
            x="32"
            y="48"
            width="32"
            height="11"
            rx="5.5"
            fill="#a7e6cf"
            stroke="#008f4c"
            strokeWidth="1.6"
          />
          <circle cx="43" cy="53.5" r="1.3" fill="#00785a" />
          <circle cx="48" cy="53.5" r="1.3" fill="#00785a" />
          <circle cx="53" cy="53.5" r="1.3" fill="#00785a" />
        </g>
      </svg>
    </div>
  );
}

/** Icono Tarjeta 3: Situación Socioeconómica */
function AdminSocioeconomicaIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f5] p-1.5">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#d7f3ee" opacity="0.7" />
        {/* Persona 1 */}
        <circle cx="28" cy="27" r="7.5" fill="#00875a" />
        <path
          d="M17 56C17 47 22.5 41 28.5 41C34.5 41 40 47 40 56"
          fill="#00875a"
        />
        {/* Persona 2 */}
        <circle cx="43" cy="24" r="8" fill="#00a85a" />
        <path
          d="M33 56C33 46 38.5 39 45 39C51.5 39 57 46 57 56"
          fill="#00a85a"
        />
        {/* Moneda $ */}
        <g transform="translate(40, 40)">
          <circle
            cx="14"
            cy="14"
            r="12.5"
            fill="#fdc300"
            stroke="#b45309"
            strokeWidth="1.6"
          />
          <text
            x="14"
            y="19"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#78350f"
            fontFamily="sans-serif"
          >
            $
          </text>
        </g>
      </svg>
    </div>
  );
}

/** Icono Tarjeta 4: Perfil Formativo y Vacunación COVID-19 */
function AdminFormativoIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f5] p-1.5">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#d7f3ee" opacity="0.7" />
        {/* Birrete */}
        <g transform="translate(6, 6)">
          <polygon points="32,14 56,25 32,36 8,25" fill="#005a40" />
          <path
            d="M18 29.5V38C18 43 24 46 32 46C40 46 46 43 46 38V29.5"
            fill="#003d2b"
          />
          <path
            d="M32 25L52 34V46"
            stroke="#fdc300"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="52" cy="47" r="2.5" fill="#fdc300" />
        </g>
        {/* Jeringa */}
        <g transform="rotate(-40 45 52)">
          <line
            x1="22"
            y1="52"
            x2="14"
            y2="52"
            stroke="#94a3b8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect
            x="22"
            y="47"
            width="25"
            height="10"
            rx="2"
            fill="#ffffff"
            stroke="#00875a"
            strokeWidth="1.8"
          />
          <rect x="24" y="49" width="15" height="6" rx="1" fill="#00c853" />
          <rect x="47" y="50" width="8" height="4" fill="#00875a" />
          <line
            x1="55"
            y1="46"
            x2="55"
            y2="58"
            stroke="#00875a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

/** Ilustración de "Crear Nuevo Formulario" */
function CrearFormularioIllustration() {
  return (
    <div className="relative w-full h-44 sm:h-48 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#e8f7f3] via-[#f0fbf7] to-white">
      {/* Ruido de fondo sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/login-images/bg-noise-login.png" alt="" className="w-full h-full object-cover" />
      </div>
      {/* Ilustración */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/admin-images/crear-nuevo-formulario-ilustracion.png"
        alt="Ilustración crear formulario"
        className="relative z-10 w-full h-full object-contain drop-shadow-md"
      />
    </div>
  );
}
/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL: GESTIÓN DE FORMULARIOS ADMIN (MOCKUP EXACTO)
────────────────────────────────────────────────────────────────────────── */

type ActiveEditForm =
  | "basica"
  | "salud"
  | "socioeconomica"
  | "formativo"
  | "consentimiento"
  | "recaracterizacion"
  | "wizard"
  | null;

const FORM_TITLES: Record<string, string> = {
  basica: "Módulo 1: Información Básica y Localización",
  salud: "Módulo 2: Salud y Condición Física",
  socioeconomica: "Módulo 3: Situación Socioeconómica",
  formativo: "Módulo 4: Perfil Formativo y Vacunación COVID-19",
  consentimiento: "Consentimiento Informado y Habeas Data",
  recaracterizacion: "Módulo de Recaracterización Semestral",
  wizard: "Asistente Wizard Guiado (Pasos 1 al 10)",
};

interface FormModule {
  id: ActiveEditForm;
  title: string;
  subtitle: string;
  icon: React.ComponentType;
}

const MODULES: FormModule[] = [
  {
    id: "basica",
    title: "Información Básica y Localización",
    subtitle: "Actualiza tus datos personales y de ubicación.",
    icon: AdminBasicaIcon,
  },
  {
    id: "salud",
    title: "Salud y Condición Física",
    subtitle: "Registra tu estado de salud y condiciones físicas.",
    icon: AdminSaludIcon,
  },
  {
    id: "socioeconomica",
    title: "Situación Socioeconómica",
    subtitle: "Informa sobre tu contexto socioeconómico.",
    icon: AdminSocioeconomicaIcon,
  },
  {
    id: "formativo",
    title: "Perfil Formativo y Vacunación COVID-19",
    subtitle: "Actualiza tu perfil de formación y estado de vacunación.",
    icon: AdminFormativoIcon,
  },
];

function AdminFormulariosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialForm = searchParams.get("form") as ActiveEditForm;

  const validForms: ActiveEditForm[] = [
    "basica",
    "salud",
    "socioeconomica",
    "formativo",
    "consentimiento",
    "recaracterizacion",
    "wizard",
  ];

  const [selectedForm, setSelectedForm] = useState<ActiveEditForm>(
    initialForm && validForms.includes(initialForm) ? initialForm : null
  );

  const [newFormName, setNewFormName] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleCreateNewForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormName.trim()) {
      setNotification("Por favor ingresa un nombre para el nuevo formulario.");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setNotification(`Formulario "${newFormName}" creado y registrado en la base de datos.`);
    setNewFormName("");
    setTimeout(() => setNotification(null), 4000);
  };

  // ════════════════════════════════════════════════════════════════════════
  // MODO EDICIÓN: Si el administrador hace clic en [ ✏️ Editar → ]
  // ════════════════════════════════════════════════════════════════════════
  if (selectedForm !== null) {
    const activeModule = MODULES.find((m) => m.id === selectedForm);
    const formTitle = activeModule?.title || FORM_TITLES[selectedForm] || selectedForm;
    const formSubtitle = activeModule?.subtitle || "Gestión de preguntas y sincronización de caracterización.";

    // Módulos con gestor dinámico de preguntas (añadir, modificar, quitar, sincronizar)
    if (["basica", "salud", "socioeconomica", "formativo"].includes(selectedForm)) {
      return (
        <div className="flex-1 w-full p-4 sm:p-6 md:p-8 font-primary">
          <FormQuestionsManager
            moduloId={selectedForm}
            tituloModulo={formTitle}
            subtituloModulo={formSubtitle}
            onVolver={() => setSelectedForm(null)}
          />
        </div>
      );
    }

    // Otros módulos estándar
    return (
      <div className="flex-1 w-full bg-[#edf5f7] p-4 sm:p-6 md:p-8 font-primary">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <BackButton label="Volver a Gestión de Formularios" />
              <span className="text-xs font-bold text-[#00304d]">Volver a Gestión de Formularios</span>
            </div>

            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#008f4c] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Visualizando: {formTitle}
            </span>
          </div>
          <main className="rounded-3xl bg-white p-4 sm:p-8 shadow-sm border border-slate-200">
            {selectedForm === "consentimiento" && <FormularioConsentimiento />}
            {selectedForm === "recaracterizacion" && <FormularioRecaracterizacion />}
            {selectedForm === "wizard" && <FormularioWizardCompleto />}
          </main>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // VISTA PRINCIPAL: MOCKUP EXACTO DE GESTIÓN DE FORMULARIOS ADMIN
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className="flex-1 w-full p-4 sm:p-6 md:p-8 font-primary selection:bg-emerald-100 selection:text-emerald-900">
      {/* Notificación flotante */}
      {notification && (
        <div className="fixed top-6 right-8 z-50 flex items-center gap-2.5 rounded-2xl bg-[#00875a] px-5 py-3 text-xs font-bold text-white shadow-xl animate-in slide-in-from-top-3">
          <Check size={16} strokeWidth={3} />
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* ── ENCABEZADO SUPERIOR: Botón Volver + Título + Logo SENA ── */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Botón Circular de Retorno */}
            <BackButton href="/admin" label="Volver al inicio" />

            {/* Título y Subtítulo de Gestión */}
            <div className="space-y-0.5 pt-0.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00304d] tracking-tight">
                Gestión de Formularios
              </h1>
              <p className="text-xs sm:text-sm text-[#0077b6] font-medium">
                Accede a los formularios disponibles para tu proceso de formación.
              </p>
            </div>
          </div>

          {/* Logotipo SENA Superior Derecho con Línea Verde */}
          <div className="flex flex-col items-end text-right select-none self-end sm:self-auto">
            <span className="text-xl sm:text-2xl font-black text-[#008f4c] tracking-tight leading-none mb-1">
              SENA
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#007038] leading-tight">
              Tecnología
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#007038] leading-tight">
              e innovación
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#007038] leading-tight pb-1">
              para un mejor país
            </span>
            <div className="w-full h-[3px] bg-[#008f4c] rounded-full" />
          </div>
        </header>

        {/* ── CUERPO EN 2 COLUMNAS: 4 TARJETAS A LA IZQUIERDA Y CREAR NUEVO A LA DERECHA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          {/* ══════════════════════════════════════════════════════════════════
              COLUMNA IZQUIERDA (7/12): 4 TARJETAS DE MÓDULOS
          ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-4">
            {MODULES.map((module) => {
              const IconComponent = module.icon;

              return (
                <article
                  key={module.id}
                  className="group relative flex items-center justify-between gap-4 rounded-3xl bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Triángulo verde institucional superior izquierdo (#39b54a) */}
                  <div
                    className="absolute top-0 left-0 w-7 h-7 pointer-events-none"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 0 100%)",
                      backgroundColor: "#39b54a",
                    }}
                    aria-hidden="true"
                  />

                  {/* Icono Ilustrado + Título + Subtítulo */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <IconComponent />

                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-bold text-[#00304d] leading-snug">
                        {module.title}
                      </h2>
                      <p className="text-xs font-semibold text-[#0284c7] mt-1 line-clamp-1">
                        {module.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Botón Verde [ ✏️ Editar → ] */}
                  <button
                    type="button"
                    onClick={() => setSelectedForm(module.id)}
                    className="flex shrink-0 items-center gap-2 rounded-full bg-[#00875a] hover:bg-[#00734c] text-white py-2 px-5 text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Pencil size={13} strokeWidth={2.5} />
                    <span>Editar</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </button>
                </article>
              );
            })}
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              COLUMNA DERECHA (5/12): CREAR NUEVO FORMULARIO
          ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between space-y-5">
              {/* Ilustración de estudiante frente a formulario */}
              <CrearFormularioIllustration />

              {/* Título de Sección con Icono + */}
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00a85a] text-white shadow-xs">
                    <Plus size={18} strokeWidth={3} />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#00304d]">
                    Crear Nuevo Formulario
                  </h2>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed pl-9">
                  Asignar nombre al nuevo formulario y comienza el proceso de creación.
                </p>
              </div>

              {/* Formulario de Entrada */}
              <form onSubmit={handleCreateNewForm} className="space-y-4 pt-1">
                {/* Campo de texto con icono de documento */}
                <div className="flex items-center gap-3 rounded-2xl border border-sky-200/90 bg-[#f7fbfd] px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                  <FileText size={18} className="text-[#0284c7] shrink-0" />
                  <input
                    type="text"
                    value={newFormName}
                    onChange={(e) => setNewFormName(e.target.value)}
                    placeholder="Nombre del formulario"
                    className="flex-1 bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none"
                  />
                </div>

                {/* Botón Aceptar → */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00785a] to-[#009668] hover:from-[#00684d] hover:to-[#00865c] text-white py-3 px-6 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send size={14} className="rotate-0" />
                  <span>Aceptar</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminFormulariosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#008f4c] border-t-transparent" />
        </div>
      }
    >
      <AdminFormulariosContent />
    </Suspense>
  );
}
