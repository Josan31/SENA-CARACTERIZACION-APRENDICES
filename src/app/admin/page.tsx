import DateBadge from "@/components/admin/DateBadge";
import {
    ArrowRight,
    BarChart2,
    ClipboardCheck,
    ClipboardList,
    ClipboardX,
    User,
    UserRound,
    Users,
    Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────
   Data — Unificada bajo la paleta de color SENA
───────────────────────────────────────────────────────── */
const METRICS = [
  {
    id: "total",
    label: "Usuarios",
    value: 250,
    icon: Users,
  },
  {
    id: "unanswered",
    label: "no han respondido encuestas",
    value: 27,
    icon: ClipboardX,
  },
  {
    id: "inprogress",
    label: "han respondido 0/3 encuestas",
    value: 110,
    icon: ClipboardList,
  },
  {
    id: "completed",
    label: "han respondido 0/6 encuestas",
    value: 50,
    icon: ClipboardCheck,
  },
] as const;

const QUICK_ACTIONS = [
  {
    id: "forms",
    href: "/admin/formularios",
    title: "Ir a Formularios",
    description:
      "Accede y completa tus caracterizaciones de salud, socioeconómica, y perfil formativo.",
    buttonLabel: "Ir a Formularios",
    icon: ClipboardList,
  },
  {
    id: "results",
    href: "/admin/resultados",
    title: "Ver Resultados",
    description:
      "Consulta tu historial de datos y el estado de tus caracterizaciones completadas.",
    buttonLabel: "Ver Resultados",
    icon: BarChart2,
  },
  {
    id: "profile",
    href: "/admin/perfil",
    title: "Gestionar Perfil",
    description:
      "Actualiza tu información básica, localización y datos de contacto.",
    buttonLabel: "Gestionar Perfil",
    icon: User,
  },
] as const;

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xs transition-all hover:shadow-md border border-gray-100/80">
      {/* Círculo verde claro suave para el ícono */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sena-green/10 text-sena-green">
        <Icon size={26} strokeWidth={2} />
      </div>

      {/* Contenido derecho */}
      <div className="flex flex-col min-w-0">
        <p className="text-3xl font-extrabold text-sena-navy leading-none">
          {value}
        </p>
        <p className="mt-1 text-xs font-semibold text-sena-navy/70 leading-snug truncate">
          {label}
        </p>
        {/* Pequeño acento verde debajo del texto */}
        <div
          className="mt-2 h-1 w-8 rounded-full bg-sena-green"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

function QuickActionCard({
  href,
  title,
  description,
  buttonLabel,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  buttonLabel: string;
  icon: React.ElementType;
}) {
  return (
    <article className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-xs border border-gray-100/80 transition-all hover:shadow-md">
      {/* ── Pestañita/Detalle verde en la esquina superior izquierda ── */}
      <div
        className="absolute top-0 left-0 h-0 w-0 border-t-[22px] border-t-sena-green border-r-[22px] border-r-transparent"
        aria-hidden="true"
      />

      {/* ── Contenido Superior: Ícono circular + Texto ── */}
      <div className="flex items-start gap-4 mt-1">
        {/* Ícono dentro de círculo verde claro */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sena-green/10 text-sena-green">
          <Icon size={28} strokeWidth={2} />
        </div>

        {/* Título y Descripción */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-sena-navy leading-tight">
            {title}
          </h3>
          <p className="mt-1.5 text-xs font-medium text-sena-navy/65 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* ── Botón Inferior Estilo Cápsula con Gradiente ── */}
      <Link
        href={href}
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#005d27] via-sena-green to-[#00aa44] py-2.5 px-6 text-xs font-bold text-white shadow-xs transition-all hover:opacity-95 hover:shadow-sm"
      >
        <span>{buttonLabel}</span>
        <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
   Sección de Accesos Rápidos para page.tsx
───────────────────────────────────────────────────────── */
export function QuickActionsSection() {
  const QUICK_ACTIONS = [
    {
      id: "forms",
      href: "/admin/formularios",
      title: "Ir a Formularios",
      description:
        "Accede y completa tus caracterizaciones de salud, socioeconómica, y perfil formativo.",
      buttonLabel: "Ir a Formularios",
      icon: ClipboardList,
    },
    {
      id: "results",
      href: "/admin/resultados",
      title: "Ver Resultados",
      description:
        "Consulta tu historial de datos y el estado de tus caracterizaciones completadas.",
      buttonLabel: "Ver Resultados",
      icon: BarChart2,
    },
    {
      id: "profile",
      href: "/admin/perfil",
      title: "Gestionar Perfil",
      description:
        "Actualiza tu información básica, localización y datos de contacto.",
      buttonLabel: "Gestionar Perfil",
      icon: User,
    },
  ] as const;

  return (
    <section aria-labelledby="actions-heading">
      <h2
        id="actions-heading"
        className="mb-4 flex items-center gap-2 text-lg font-bold text-sena-navy"
      >
        <Zap size={20} className="text-sena-green" strokeWidth={2.5} />
        Accesos rápidos
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard key={action.id} {...action} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Page Component
───────────────────────────────────────────────────────── */
export default function AdminHomePage() {
  return (
    <>

      <div className="flex-1 space-y-8 p-8">
        {/* ── Page Header / Welcome Text ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sena-green to-emerald-600 shadow-lg ring-4 ring-sena-green/20">
                <UserRound size={26} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="inline-block text-[10px] font-black uppercase tracking-wider text-sena-green">
                  Panel de Administrador
                </span>
                <h1 className="truncate text-2xl md:text-3xl font-black text-sena-navy tracking-tight">
                  ¡Hola, Carlos Alberto!
                </h1>
              </div>
            </div>
            <p className="mt-2.5 flex items-center gap-2 text-sm font-medium text-gray-500">
              <span className="font-semibold text-sena-green">Rol:</span>
              <span className="truncate">
                Coordinador de Bienestar al Aprendiz · Regional Cauca (CTPI)
              </span>
            </p>
          </div>

          {/* ── Right side widgets ── */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            {/* Date chip */}
            <DateBadge />

            {/* Extra status info */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 px-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sena-green opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sena-green"></span>
              </span>
              Estado de sesión: <span className="text-sena-green font-bold">Administrador Activo</span>
            </div>
          </div>
        </div>

        {/* ── Welcome banner ── */}
        <section
          aria-labelledby="welcome-heading"
          className="relative flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#e8f8f0] via-[#d7f2e5] to-[#c8eedd] p-6 shadow-xs md:p-8"
        >
          {/* EFECTOS DE FONDO / REFLEJOS */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-12 left-1/4 h-64 w-20 rotate-45 bg-gradient-to-b from-white/60 via-white/20 to-transparent blur-sm" />
            <div className="absolute -top-16 left-1/3 h-72 w-8 rotate-45 bg-white/40 blur-xs" />
            <div className="absolute -top-8 left-2/3 h-56 w-12 rotate-45 bg-white/25 blur-sm" />
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/50 blur-2xl" />
            <div className="absolute -bottom-10 left-1/2 h-36 w-60 rounded-full bg-emerald-200/30 blur-xl" />
          </div>

          {/* Bloque Izquierdo: Megáfono + Texto */}
          <div className="relative z-10 flex items-start gap-3 sm:gap-4 max-w-full md:max-w-[62%] lg:max-w-[68%]">
            <div className="relative shrink-0 hidden sm:flex items-center justify-center w-14 h-14 md:w-16 md:h-16 overflow-visible">
              <Image
                src="/admin-images/left-megaphone.png"
                alt="Megáfono"
                width={64}
                height={64}
                priority
                className="object-contain scale-150"
              />
            </div>

            <div>
              <h2
                id="welcome-heading"
                className="text-lg md:text-xl font-extrabold text-sena-navy tracking-tight leading-snug"
              >
                PANEL DE GESTIÓN DE BIENESTAR AL APRENDIZ
              </h2>
              <p className="mt-1.5 text-xs md:text-sm font-medium text-sena-navy/75 leading-relaxed">
                Espacio de supervisión y gestión institucional. Desde este panel
                puedes monitorear el estado de diligenciamiento de los aprendices,
                supervisar las respuestas a los módulos de caracterización y
                configurar la oferta de apoyos de sostenimiento en el SENA.
              </p>
            </div>
          </div>

          {/* Bloque Derecho: Ilustración recortada al borde */}
          <div className="absolute right-0 bottom-0 top-0 hidden md:block w-[38%] max-w-[420px] pointer-events-none overflow-hidden">
            <Image
              src="/admin-images/banner-girl-illustration.png"
              alt="Ilustración bienvenida CARACTERIZA"
              fill
              priority
              className="object-contain object-right-bottom scale-125 translate-y-3 origin-bottom-right"
              sizes="(max-width: 1024px) 350px, 420px"
            />
          </div>
        </section>

        {/* ── Metrics ── */}
        <section aria-labelledby="metrics-heading">
          <h2
            id="metrics-heading"
            className="mb-4 flex items-center gap-2 text-lg font-bold text-sena-navy"
          >
            <BarChart2
              size={20}
              className="text-sena-green"
              strokeWidth={2.5}
            />
            Información básica
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {METRICS.map((m) => (
              <MetricCard key={m.id} {...m} />
            ))}
          </div>
        </section>

        {/* ── Quick actions ── */}
        <section aria-labelledby="actions-heading">
          <h2
            id="actions-heading"
            className="mb-4 flex items-center gap-2 text-lg font-bold text-sena-navy"
          >
            <Zap size={20} className="text-sena-green" strokeWidth={2.5} />
            Accesos rápidos
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {QUICK_ACTIONS.map((a) => (
              <QuickActionCard key={a.id} {...a} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
