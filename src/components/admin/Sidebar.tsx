"use client";

import {
  BarChart2,
  ChevronRight,
  ClipboardList,
  Home,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Inicio", icon: Home },
  { href: "/admin/formularios", label: "Formularios", icon: ClipboardList },
  { href: "/admin/resultados", label: "Resultados", icon: BarChart2 },
  { href: "/admin/administracion", label: "Administración", icon: Settings },
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="relative flex h-full w-64 flex-col overflow-hidden bg-gradient-to-b from-[#003d1a] via-[#005d27] to-sena-green-dark text-white font-primary shadow-xl">
      {/* ── Brand mark / Header Sidebar ── */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-2 backdrop-blur-sm shadow-inner">
          <Image
            src="/sena-logo-blanco.png"
            alt="Logotipo SENA"
            width={36}
            height={36}
            className="object-contain drop-shadow"
            priority
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold tracking-wide text-white leading-tight">
            SENA Admin
          </h2>
          <p className="text-[10px] font-medium text-white/70 truncate">
            Gestión de Formularios
          </p>
        </div>
      </div>

      {/* ── Secciones de Navegación ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-3">
            Menú Principal
          </p>
          <nav
            className="flex flex-col gap-1.5"
            aria-label="Navegación principal"
          >
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-white text-sena-navy font-semibold shadow-md shadow-black/10"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <Icon
                    size={19}
                    strokeWidth={active ? 2.2 : 1.8}
                    className={
                      active
                        ? "text-sena-green"
                        : "text-white/70 group-hover:text-white"
                    }
                  />
                  <span>{label}</span>

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sena-green" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Diagonal institutional color accent bar ── */}
      <div className="h-1 w-full flex" aria-hidden="true">
        <div className="flex-1 bg-sena-green" />
        <div className="flex-1 bg-sena-yellow" />
        <div className="flex-1 bg-[#c1272d]" />
      </div>

      {/* ── Profile Footer / User Badge ── */}
      <div className="p-4 bg-black/10 border-t border-white/10">
        <Link
          href="/admin/perfil"
          className="flex items-center gap-3 rounded-xl p-2.5 transition-all hover:bg-white/10 group"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white font-semibold shadow-sm group-hover:bg-white group-hover:text-sena-navy transition-colors">
            <User size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              Usuario Admin
            </p>
            <p className="truncate text-[10px] text-white/60">Ver Perfil</p>
          </div>
          <ChevronRight
            size={16}
            className="text-white/40 group-hover:text-white transition-colors"
          />
        </Link>
      </div>
    </aside>
  );
}
