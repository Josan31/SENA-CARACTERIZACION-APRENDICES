"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Search,
  AlignLeft,
  Code2,
  Settings,
  Wrench,
  TrendingUp,
  ChefHat,
  Film,
  DollarSign,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";
import DashboardHeader from "@/components/admin/DashboardHeader";

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const RESULTS = [
  { id: 472851, title: "Técnico en Desarrollo de Software",            icon: Code2      },
  { id: 951360, title: "Tecnólogo en Gestión Empresarial",             icon: Settings   },
  { id: 180394, title: "Técnico en Mantenimiento de Equipos Biomédicos",icon: Wrench    },
  { id: 647219, title: "Técnico en Análisis y Desarrollo de S.I.",     icon: TrendingUp },
  { id: 395617, title: "Técnico en Cocina Nacional e Internacional",   icon: ChefHat   },
  { id: 518032, title: "Tecnólogo en Producción Multimedia",           icon: Film       },
  { id: 837956, title: "Técnico en Contabilidad y Finanzas",           icon: DollarSign },
] as const;

const SUMMARY = {
  total:    7,
  approved: 6,
  ongoing:  1,
};

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

function ResultRow({
  id,
  title,
  icon: Icon,
}: {
  id: number;
  title: string;
  icon: React.ElementType;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Icon badge */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#e8f8f0] to-[#c8eedd]">
        <span
          className="absolute left-0 top-0 h-4 w-4 bg-gradient-to-br from-sena-green to-sena-green-dark"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          aria-hidden="true"
        />
        <Icon size={20} className="relative text-sena-green-dark" strokeWidth={2} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-sena-navy truncate">{title}</h3>
        <p className="text-xs font-medium text-gray-400 mt-0.5">
          Identificación: {id}
        </p>
      </div>

      {/* Detail CTA */}
      <button
        type="button"
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-4 py-2 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-90"
      >
        <span>Ver Detalle</span>
        <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default function ResultadosPage() {
  const [query, setQuery] = useState("");

  const filtered = RESULTS.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      String(r.id).includes(query)
  );

  return (
    <>
      <DashboardHeader
        title="Administración de Resultados"
        subtitle="Consulta y gestiona los resultados de tus programas y fichas de formación."
      />

      <div className="flex flex-1 gap-6 p-8">

        {/* ── Left: search + results list ── */}
        <section aria-label="Lista de resultados" className="flex flex-1 flex-col gap-5 min-w-0">

          {/* Search bar */}
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20 transition-all">
            <Search size={18} className="shrink-0 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar por programa o Identificación..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium text-sena-black placeholder:text-gray-400 outline-none"
              aria-label="Buscar resultados"
            />
          </div>

          {/* Section label */}
          <h2 className="flex items-center gap-2 text-base font-bold text-sena-navy">
            <AlignLeft size={18} className="text-sena-green" strokeWidth={2.5} />
            Lista de Resultados
          </h2>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {filtered.length > 0 ? (
              filtered.map((r) => <ResultRow key={r.id} {...r} />)
            ) : (
              <p className="text-sm font-medium text-gray-400 text-center py-8">
                No se encontraron resultados para &quot;{query}&quot;.
              </p>
            )}
          </div>
        </section>

        {/* ── Right: summary panel ── */}
        <aside className="hidden w-72 shrink-0 xl:flex xl:flex-col gap-5">

          {/* Illustration placeholder */}
          <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#e8f8f0] to-[#c8eedd]">
            <Image
              src="/images/resultados-illustration.png"
              alt="Ilustración administración de resultados"
              fill
              className="object-contain object-center p-4"
              sizes="288px"
            />
          </div>

          {/* Summary card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sena-green to-sena-green-dark">
                <span className="text-white text-base font-extrabold leading-none">+</span>
              </span>
              <h2 className="text-base font-extrabold text-sena-navy">
                Resumen de Resultados
              </h2>
            </div>

            {/* Info note */}
            <div className="flex items-start gap-2 rounded-xl bg-sena-light p-3">
              <Info size={14} className="mt-0.5 shrink-0 text-sena-navy/60" strokeWidth={2} />
              <p className="text-xs font-medium text-sena-navy/70 leading-relaxed">
                Aquí puedes consultar y gestionar todos tus resultados de formación.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-2">
              <SummaryRow
                icon={<AlignLeft size={15} strokeWidth={2} />}
                label="Total de programas"
                value={SUMMARY.total}
                color="text-sena-navy"
              />
              <SummaryRow
                icon={<CheckCircle2 size={15} strokeWidth={2} />}
                label="Aprobados"
                value={SUMMARY.approved}
                color="text-sena-green"
              />
              <SummaryRow
                icon={<XCircle size={15} strokeWidth={2} />}
                label="En curso"
                value={SUMMARY.ongoing}
                color="text-sena-yellow"
              />
            </div>

            {/* Additional info link */}
            <button
              type="button"
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-sena-light px-4 py-3 transition-colors hover:border-sena-green/30 hover:bg-[#e8f8f0]"
            >
              <div className="flex items-start gap-2 text-left">
                <AlignLeft size={14} className="mt-0.5 text-sena-navy/60 shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-xs font-bold text-sena-navy">Información adicional</p>
                  <p className="text-[11px] font-medium text-gray-400 leading-snug mt-0.5">
                    Consulta las fechas, certificados y más detalles de tus resultados.
                  </p>
                </div>
              </div>
              <ChevronRight size={14} className="shrink-0 text-gray-400" />
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ── Helper inside this file only ── */
function SummaryRow({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-sena-light px-4 py-2.5">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-xs font-semibold text-sena-navy">{label}</span>
      </div>
      <span className={`text-sm font-extrabold ${color}`}>{value}</span>
    </div>
  );
}
