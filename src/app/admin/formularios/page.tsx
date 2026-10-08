import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  HeartPulse,
  Banknote,
  GraduationCap,
  Pencil,
  ArrowRight,
  Send,
  FileText,
} from "lucide-react";
import DashboardHeader from "@/components/admin/DashboardHeader";

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const FORMS = [
  {
    id: "basica",
    title: "Información Básica y Localización",
    description: "Actualiza tus datos personales y de ubicación.",
    href: "/admin/formularios/basica",
    icon: MapPin,
  },
  {
    id: "salud",
    title: "Salud y Condición Física",
    description: "Registra tu estado de salud y condiciones físicas.",
    href: "/admin/formularios/salud",
    icon: HeartPulse,
  },
  {
    id: "socioeconomica",
    title: "Situación Socioeconómica",
    description: "Informa sobre tu contexto socioeconómico.",
    href: "/admin/formularios/socioeconomica",
    icon: Banknote,
  },
  {
    id: "formativo",
    title: "Perfil Formativo y Vacunación COVID-19",
    description: "Actualiza tu perfil de formación y estado de vacunación.",
    href: "/admin/formularios/formativo",
    icon: GraduationCap,
  },
] as const;

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

function FormRow({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}) {
  return (
    <article className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Left accent triangle + icon */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#e8f8f0] to-[#c8eedd]">
        {/* Diagonal corner accent */}
        <span
          className="absolute left-0 top-0 h-5 w-5 bg-gradient-to-br from-sena-green to-sena-green-dark"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          aria-hidden="true"
        />
        <Icon size={22} className="relative text-sena-green-dark" strokeWidth={2} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-sena-navy">{title}</h3>
        <p className="mt-0.5 text-xs font-medium text-gray-500">{description}</p>
      </div>

      {/* Edit CTA */}
      <Link
        href={href}
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-4 py-2 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-90"
      >
        <Pencil size={13} strokeWidth={2.5} aria-hidden="true" />
        <span>Editar</span>
        <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default function FormulariosPage() {
  return (
    <>
      <DashboardHeader />

      <div className="flex flex-1 gap-6 p-8 flex-col">
        {/* ── Page Header ── */}
        <div>
          <h1 className="text-2xl font-black text-sena-navy tracking-tight">
            Gestión de Formularios
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Accede a los formularios disponibles para tu proceso de formación.
          </p>
        </div>

        <div className="flex gap-6">

        {/* ── Left: form list ── */}
        <section
          aria-label="Lista de formularios"
          className="flex flex-1 flex-col gap-4"
        >
          {FORMS.map((f) => (
            <FormRow key={f.id} {...f} />
          ))}
        </section>

        {/* ── Right: create new form panel ── */}
        <aside className="hidden w-72 shrink-0 xl:flex xl:flex-col gap-5">
          {/* Illustration placeholder */}
          <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#e8f8f0] to-[#c8eedd]">
            <Image
              src="/images/formularios-illustration.png"
              alt="Ilustración gestión de formularios"
              fill
              className="object-contain object-center p-4"
              sizes="288px"
            />
          </div>

          {/* Create form card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sena-green to-sena-green-dark">
                <span className="text-white text-base font-extrabold leading-none">+</span>
              </span>
              <h2 className="text-base font-extrabold text-sena-navy">
                Crear Nuevo Formulario
              </h2>
            </div>
            <p className="text-xs font-medium text-gray-500 mb-5 leading-relaxed">
              Asignar nombre al nuevo formulario y comienza el proceso de creación.
            </p>

            {/* Name input */}
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-sena-light px-3.5 py-2.5 focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20 transition-all mb-3">
              <FileText size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Nombre del formulario"
                className="flex-1 bg-transparent text-sm font-medium text-sena-black placeholder:text-gray-400 outline-none"
              />
            </div>

            {/* Accept button */}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              <span>Aceptar</span>
              <Send size={14} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}
