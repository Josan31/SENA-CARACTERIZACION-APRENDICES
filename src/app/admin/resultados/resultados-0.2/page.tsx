
"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  FileArchive,
  FileImage,
  FileText,
  GraduationCap,
  HeartPulse,
  IdCard,
  Info,
  Mail,
  Phone,
  UserRound,
  UsersRound,
  Droplets,
  ClipboardCheck,
} from "lucide-react";

import { useState, type ElementType } from "react";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────
   1. TYPES
   Definición de los tipos de datos utilizados para controlar
   los formatos de exportación y las secciones del reporte.
───────────────────────────────────────────────────────── */

type ExportFormat = "pdf" | "zip" | "svg";

type ReportSection = {
  id: string;
  label: string;
};

/* ─────────────────────────────────────────────────────────
   2. DATA
   Información de ejemplo del aprendiz, formularios disponibles,
   formatos de descarga y contenidos que puede incluir el reporte.
───────────────────────────────────────────────────────── */

// Información personal y de contacto del aprendiz.
const APPRENTICE = {
  name: "Ana María López Vargas",
  documentType: "Cédula de Ciudadanía",
  documentNumber: "1234567890",
  email: "a.lopez.vargas@email.com",
  phone: "+57 310 123 4567",
  bloodType: "O+",
  age: 23,
};

// Formularios disponibles para consultar.
const FORM_CARDS = [
  {
    id: "salud",
    title: "Formulario de Salud y Estado Físico",
    description:
      "Consulta y administra tu formulario de salud y condición física.",
    icon: HeartPulse,
    color: "text-emerald-700",
    background: "bg-emerald-50",
  },
  {
    id: "socioeconomico",
    title: "Formulario de Condición Socioeconómica",
    description:
      "Revisa y actualiza la información de tu condición socioeconómica.",
    icon: UsersRound,
    color: "text-cyan-700",
    background: "bg-cyan-50",
  },
];

// Opciones de formatos disponibles para generar los reportes.
const EXPORT_FORMATS: {
  id: ExportFormat;
  title: string;
  subtitle: string;
  description: string;
  icon: ElementType;
}[] = [
  {
    id: "pdf",
    title: "Reporte Ejecutivo (PDF)",
    subtitle: "PDF",
    description: "Resumen completo con gráficos y análisis de tu rendimiento.",
    icon: FileText,
  },
  {
    id: "zip",
    title: "Gráficos Individuales (ZIP de PNG)",
    subtitle: "ZIP",
    description: "Todas las gráficas en alta resolución.",
    icon: FileArchive,
  },
  {
    id: "svg",
    title: "Gráficos Vectoriales (SVG)",
    subtitle: "SVG",
    description: "Editables, para impresión o diseño.",
    icon: FileImage,
  },
];

// Contenidos que el aprendiz puede seleccionar para incluir en el reporte.
const REPORT_SECTIONS: ReportSection[] = [
  {
    id: "salud",
    label: "Salud y Condición Física",
  },
  {
    id: "socioeconomico",
    label: "Situación Socioeconómica",
  },
  {
    id: "formativo",
    label: "Perfil Formativo y Vacunación",
  },
];

/* ─────────────────────────────────────────────────────────
   3. REUSABLE COMPONENTS
   Componentes reutilizables encargados de mostrar la información
   del aprendiz y las tarjetas de acceso a sus formularios.
───────────────────────────────────────────────────────── */

// Muestra un dato del aprendiz acompañado de su respectivo icono.
function ApprenticeInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Icon size={14} className="shrink-0 text-[#008b83]" strokeWidth={2.5} />
      <p className="min-w-0 truncate text-[11px] font-medium text-slate-600">
        <span className="font-bold text-[#07536a]">{label}:</span> {value}
      </p>
    </div>
  );
}

// Construye las tarjetas de los formularios con su información,
// iconografía y botón para acceder al detalle.
function FormCard({
  title,
  description,
  icon: Icon,
  color,
  background,
  onClick,
}: {
  title: string;
  description: string;
  icon: ElementType;
  color: string;
  background: string;
  onClick: () => void;
}) {
  return (
    <article className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#dceff0] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${background}`}
      >
        <Icon size={25} className={color} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold leading-snug text-[#003653]">
          {title}
        </h3>

        <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#008e83] to-[#087c76] px-3 py-2 text-[10px] font-bold text-white transition-all hover:brightness-110"
      >
        Ver Detalle
        <ArrowRight size={12} />
      </button>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
   4. MAIN PAGE
   Componente principal que organiza toda la interfaz de
   administración y consulta de resultados del aprendiz.
───────────────────────────────────────────────────────── */

export default function Resultados02Page() {

  // Permite controlar la navegación entre las páginas del proyecto.
  const router = useRouter();

  /* ─────────────────────────────────────────────────────────
     4.1. STATES
     Estados utilizados para controlar el formato seleccionado,
     los contenidos del reporte y los mensajes informativos.
  ───────────────────────────────────────────────────────── */

  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("pdf");

  // Inicialmente todos los contenidos del reporte aparecen seleccionados.
  const [selectedSections, setSelectedSections] = useState<string[]>(
    REPORT_SECTIONS.map((section) => section.id),
  );

  // Almacena los mensajes que se muestran al usuario.
  const [notice, setNotice] = useState("");

  /* ─────────────────────────────────────────────────────────
     4.2. HANDLERS
     Funciones encargadas de gestionar las interacciones
     principales de la página.
  ───────────────────────────────────────────────────────── */

  // Activa o desactiva una sección del contenido del reporte.
  const toggleSection = (id: string) => {
    setSelectedSections((previous) =>
      previous.includes(id)
        ? previous.filter((section) => section !== id)
        : [...previous, id],
    );

    setNotice("");
  };

  // Muestra un mensaje provisional al intentar acceder al detalle
  // de un formulario que todavía no tiene una ruta conectada.
  const handleFormDetail = (form: string) => {
    setNotice(
      `El acceso al detalle del formulario ${form} está pendiente de conectar con su respectiva página.`,
    );
  };

  // Comprueba que exista al menos una sección seleccionada
  // y muestra el estado actual de la generación del reporte.
  const handleGenerateReport = () => {
    if (selectedSections.length === 0) {
      setNotice("Selecciona al menos un contenido para generar el reporte.");
      return;
    }

    setNotice(
      "La interfaz está preparada. Para generar y descargar el archivo es necesario conectar el servicio de reportes.",
    );
  };

  /* ─────────────────────────────────────────────────────────
     5. PAGE STRUCTURE
     Distribución general de los elementos visuales de la página.
  ───────────────────────────────────────────────────────── */

  return (
    <main className="min-h-full bg-[#edf6f7] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5">

        {/* ─────────────────────────────────
            5.1. HEADER
            Encabezado principal con botón de regreso,
            título, descripción e identidad institucional SENA.
        ───────────────────────────────── */}

        <header className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Regresar"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#07536a] shadow-sm transition-all hover:bg-[#e1f5f2] hover:shadow-md"
            >
              <ArrowLeft size={21} strokeWidth={2.5} />
            </button>

            <div className="min-w-0">
              <h1 className="text-xl font-black tracking-tight text-[#003653] sm:text-2xl lg:text-3xl">
                Administración de Resultados
              </h1>

              <p className="mt-1 text-xs font-medium text-[#008bd2] sm:text-sm">
                Gestiona y consulta los resultados de los estudiantes del
                programa.
              </p>
            </div>
          </div>

          {/* Identidad visual y lema institucional del SENA. */}
          <div className="hidden shrink-0 text-right sm:block">
            <h2 className="text-2xl font-black leading-none text-[#009b63]">
              SENA
            </h2>
            <p className="mt-1 text-[10px] font-bold leading-tight text-[#087b58]">
              Tecnología
              <br />
              e innovación
              <br />
              para un mejor país
            </p>
            <div className="ml-auto mt-1 h-1 w-16 rounded-full bg-[#009b63]" />
          </div>
        </header>

        {/* ─────────────────────────────────
            5.2. APPRENTICE INFORMATION
            Tarjeta con la información personal y de contacto
            del aprendiz seleccionado.
        ───────────────────────────────── */}

        <section className="relative overflow-hidden rounded-2xl border border-[#d9eff0] bg-white p-4 shadow-sm">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#e0f6ed] to-transparent" />

          <div className="relative grid grid-cols-1 items-center gap-4 md:grid-cols-[auto_1fr_1fr]">

            {/* Avatar representativo del aprendiz. */}
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#d5f3e8] bg-[#e5f7f1]">
                <UserRound
                  size={39}
                  strokeWidth={1.5}
                  className="text-[#087b68]"
                />
              </div>

              {/* Nombre visible en dispositivos pequeños. */}
              <div className="min-w-0 md:hidden">
                <h2 className="text-sm font-extrabold text-[#003653]">
                  {APPRENTICE.name}
                </h2>
                <p className="text-[10px] text-slate-500">
                  Información del aprendiz
                </p>
              </div>
            </div>

            {/* Información de identificación personal. */}
            <div className="space-y-2">
              <h2 className="hidden text-sm font-extrabold text-[#003653] md:block">
                {APPRENTICE.name}
              </h2>

              <ApprenticeInfo
                icon={IdCard}
                label="Tipo de documento"
                value={APPRENTICE.documentType}
              />

              <ApprenticeInfo
                icon={ClipboardList}
                label="N° de documento"
                value={APPRENTICE.documentNumber}
              />
            </div>

            {/* Información de contacto y datos adicionales. */}
            <div className="space-y-2">
              <ApprenticeInfo
                icon={Mail}
                label="Correo electrónico"
                value={APPRENTICE.email}
              />

              <ApprenticeInfo
                icon={Phone}
                label="Teléfono"
                value={APPRENTICE.phone}
              />

              <ApprenticeInfo
                icon={Droplets}
                label="Tipo de sangre"
                value={APPRENTICE.bloodType}
              />

              <ApprenticeInfo
                icon={CalendarDays}
                label="Edad"
                value={`${APPRENTICE.age} años`}
              />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────
            5.3. COMPLETED FORMS TITLE
            Encabezado que identifica los formularios
            realizados por el aprendiz.
        ───────────────────────────────── */}

        <div className="flex items-center gap-2 pt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dff3ec] text-[#008e83]">
            <ClipboardCheck size={19} strokeWidth={2.2} />
          </div>

          <div>
            <h2 className="text-base font-extrabold text-[#003653]">
              Formularios realizados por el aprendiz
            </h2>

            <p className="text-xs text-slate-500">
              Consulta los formularios que el aprendiz ha completado durante su
              proceso de formación.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────
            5.4. FORMS
            Listado de formularios disponibles. Las tarjetas
            se generan dinámicamente utilizando FORM_CARDS.
        ───────────────────────────────── */}

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {FORM_CARDS.map((form) => (
            <FormCard
              key={form.id}
              title={form.title}
              description={form.description}
              icon={form.icon}
              color={form.color}
              background={form.background}
              onClick={() => handleFormDetail(form.title)}
            />
          ))}
        </section>

        {/* ─────────────────────────────────
            5.5. REPORT GENERATION
            Panel principal donde se seleccionan los formatos
            y contenidos que tendrá el reporte del aprendiz.
        ───────────────────────────────── */}

        <section className="rounded-2xl border border-[#dceff0] bg-white p-4 shadow-sm sm:p-5">

          {/* Título y descripción del apartado de resultados. */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e4f5f1] text-[#008c80]">
              <ClipboardList size={23} strokeWidth={2} />
            </div>

            <div>
              <h2 className="text-base font-extrabold text-[#003653] sm:text-lg">
                Resultados
              </h2>

              <p className="text-xs text-slate-500">
                Selecciona el tipo de documento o contenido que deseas
                consultar.
              </p>
            </div>
          </div>

          {/* ───────────────────────────────
              5.6. EXPORT FORMATS
              Presenta las opciones de exportación disponibles:
              PDF, ZIP y SVG. Permite seleccionar un único formato.
          ─────────────────────────────── */}

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {EXPORT_FORMATS.map((format) => {
              const selected = selectedFormat === format.id;
              const Icon = format.icon;

              return (
                <button
                  key={format.id}
                  type="button"
                  onClick={() => {
                    setSelectedFormat(format.id);
                    setNotice("");
                  }}
                  aria-pressed={selected}
                  className={`relative flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                    selected
                      ? "border-[#009b78] bg-[#e9f8f2] shadow-sm"
                      : "border-[#e1ebf2] bg-white hover:border-[#72c9b3] hover:bg-[#f6fcfa]"
                  }`}
                >

                  {/* Icono representativo del formato seleccionado. */}
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-[#e5f5f0] to-[#cdebe1] text-[#075e66]">
                    <Icon size={25} strokeWidth={1.8} />
                    <span className="text-[8px] font-black">
                      {format.subtitle}
                    </span>
                  </div>

                  {/* Nombre y descripción del formato. */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-extrabold leading-snug text-[#003653]">
                      {format.title}
                    </h3>

                    <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
                      {format.description}
                    </p>
                  </div>

                  {/* Indicador visual de la opción seleccionada. */}
                  <div
                    className={`absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full border ${
                      selected
                        ? "border-[#009b78] bg-[#009b78] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {selected && <Check size={10} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ───────────────────────────────
              5.7. REPORT CONTENT
              Permite seleccionar los apartados de información
              que se incluirán en el reporte generado.
          ─────────────────────────────── */}

          <div className="mt-5 rounded-xl border border-[#dceff0] bg-[#f5fbfa] p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#008e83] text-white">
                <Check size={16} strokeWidth={3} />
              </div>

              <h3 className="text-sm font-extrabold text-[#003653]">
                Paso 2: Seleccionar Contenido del Reporte
              </h3>
            </div>

            {/* Opciones de contenido con selección individual. */}
            <div className="ml-9 flex flex-col gap-2">
              {REPORT_SECTIONS.map((section) => {
                const checked = selectedSections.includes(section.id);

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    aria-pressed={checked}
                    className="flex w-fit items-center gap-2 text-left text-xs font-medium text-slate-600 transition-colors hover:text-[#008e83]"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        checked
                          ? "bg-[#009b83] text-white"
                          : "border border-slate-300 bg-white"
                      }`}
                    >
                      {checked && <Check size={11} strokeWidth={3} />}
                    </span>

                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ───────────────────────────────
              5.8. NOTIFICATIONS
              Muestra mensajes informativos o advertencias
              relacionadas con las acciones del usuario.
          ─────────────────────────────── */}

          {notice && (
            <div
              role="status"
              className="mt-4 flex items-start gap-2 rounded-xl border border-[#ccebe4] bg-[#effaf6] p-3 text-xs font-medium text-[#087b68]"
            >
              <Info size={16} className="mt-0.5 shrink-0" />
              <p>{notice}</p>
            </div>
          )}

          {/* ───────────────────────────────
              5.9. DOWNLOAD BUTTON
              Ejecuta la validación de los contenidos seleccionados
              e informa sobre el estado de generación del reporte.
          ─────────────────────────────── */}

          <button
            type="button"
            onClick={handleGenerateReport}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#008d83] to-[#087c75] px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:brightness-105 active:translate-y-0"
          >
            <Download size={19} strokeWidth={2.5} />
            Generar y Descargar Reporte
            <ArrowRight size={17} strokeWidth={2.5} />
          </button>
        </section>
      </div>
    </main>
  );
}
