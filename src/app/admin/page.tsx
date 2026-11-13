import { MetricCard } from "@/components/admin/MetricCard";
import { QuickActionCard } from "@/components/admin/QuickActionCard";
import { AdminBanner } from "@/components/admin/AdminBanner";
import { BackButton } from "@/components/admin/BackButton";
import {
  BarChart2,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
  Megaphone,
  User,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

const METRICS = [
  {
    id: "total",
    label: "Usuarios",
    value: 250,
    icon: "lucide:users", // o "solar:users-group-two-rounded-bold"
  },
  {
    id: "unanswered",
    label: "no han respondido encuestas",
    value: 27,
    icon: "lucide:clipboard-x",
  },
  {
    id: "inprogress",
    label: "han respondido 0/3 encuestas",
    value: 110,
    icon: "lucide:clipboard-list",
  },
  {
    id: "completed",
    label: "han respondido 0/6 encuestas",
    value: 50,
    icon: "lucide:clipboard-check",
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
    icon: "lucide:clipboard-edit", // Ícono estilo portapapeles con edición
  },
  {
    id: "results",
    href: "/admin/resultados",
    title: "Ver Resultados",
    description:
      "Consulta tu historial de datos y el estado de tus caracterizaciones completadas.",
    buttonLabel: "Ver Resultados",
    icon: "lucide:file-search", // Ícono estilo reporte y lupa
  },
  {
    id: "profile",
    href: "/admin/perfil",
    title: "Gestionar Perfil",
    description:
      "Actualiza tu información básica, localización y datos de contacto.",
    buttonLabel: "Gestionar Perfil",
    icon: "lucide:user-cog", // Ícono estilo usuario con engranaje
  },
] as const;

export default function AdminHomePage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      {/* ── Header / Saludo ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-start gap-4">
            <BackButton href="/login" label="Cerrar sesión" />
            <div>
              <h1 className="truncate text-2xl md:text-3xl font-black text-sena-navy tracking-tight">
                Bienvenido(a), Valentina
              </h1>
            </div>
          </div>
          <p className="mt-2.5 flex items-center gap-2 text-sm font-medium text-gray-500 pl-[60px]">
            <span className="font-semibold text-sena-green">Rol:</span>
            <span className="truncate">
              Coordinador de Bienestar al Aprendiz · Regional Cauca (CTPI)
            </span>
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          {/* ── Logotipo SENA ── */}
          <div className="flex items-center gap-2 select-none">
            {/* Bloque de texto estilo logo institucional */}
            <div className="text-right leading-none">
              <p className="text-xl font-black text-sena-green tracking-tight">SENA</p>
              <p className="text-[10px] font-semibold text-gray-500 leading-tight max-w-[110px] text-right">
                Tecnología e innovación para un mejor país
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Banner de Gestión Admin ── */}
      <AdminBanner />

      {/* ── Sección de Métricas ── */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="mb-4 flex items-center gap-2 text-lg font-bold text-sena-navy">
          <BarChart2 size={20} className="text-sena-green" strokeWidth={2.5} />
          Información básica
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {METRICS.map((m) => (
            <MetricCard key={m.id} {...m} />
          ))}
        </div>
      </section>

      {/* ── Sección de Accesos Rápidos ── */}
      <section aria-labelledby="actions-heading">
        <h2 id="actions-heading" className="mb-4 flex items-center gap-2 text-lg font-bold text-sena-navy">
          <Zap size={20} className="text-sena-green" strokeWidth={2.5} />
          Accesos rápidos
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard key={action.id} {...action} />
          ))}
        </div>
      </section>
    </div>
  );
}
