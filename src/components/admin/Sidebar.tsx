"use client";

import {
    ArrowRight,
    BarChart2,
    FileText,
    Home,
    LogOut,
    Settings,
    User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin",               label: "Inicio",         icon: Home      },
  { href: "/admin/formularios",   label: "Formularios",    icon: FileText  },
  { href: "/admin/resultados",    label: "Resultados",     icon: BarChart2 },
  { href: "/admin/administracion",label: "Administración", icon: Settings  },
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  function handleLogout() {
    if (typeof window !== "undefined") {
      try { localStorage.removeItem("sena_user"); } catch { /* ignore */ }
      window.location.href = "/login";
    }
  }

  return (
    <aside className="relative flex h-full w-60 shrink-0 flex-col justify-between overflow-hidden bg-sena-green-dark text-white font-primary shadow-2xl select-none">

      {/* ── Brand Header ── */}
      <div>
        <div className="flex items-center gap-3 px-6 pt-6 pb-5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            <Image
              src="/sena-logo-blanco.png"
              alt="Logotipo SENA"
              width={42}
              height={42}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest">Más</span>
            <span className="text-xs font-black tracking-wide text-white uppercase">Personas</span>
            <span className="text-[10px] font-medium text-sena-yellow uppercase tracking-widest mt-0.5">Más</span>
            <span className="text-[11px] font-black tracking-wide text-sena-yellow uppercase">Oportunidades</span>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 h-px bg-white/10 mb-3" />

        {/* ── Navigation ── */}
        <nav className="px-3 py-1 space-y-1" aria-label="Menú del Administrador">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                  ${active
                    ? "bg-white text-sena-green-dark shadow-md"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {/* Left accent bar for active item */}
                <span
                  className={`h-5 w-1 rounded-full transition-all ${
                    active ? "bg-sena-green" : "bg-transparent"
                  }`}
                />
                <Icon
                  size={17}
                  strokeWidth={active ? 2.8 : 2}
                  className={active ? "text-sena-green" : "text-white/70 group-hover:text-white transition-colors"}
                />
                <span className={active ? "font-black" : ""}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom Section ── */}
      <div className="relative pt-8 pb-5 px-3">

        {/* Institutional ribbon decoration — bottom-left corner */}
        <div
          className="absolute left-0 bottom-0 w-36 h-36 pointer-events-none overflow-hidden opacity-80 z-0"
          aria-hidden="true"
        >
          <div className="absolute -bottom-8 -left-8 w-32 h-16 bg-sena-yellow -rotate-45 origin-bottom-left" />
          <div className="absolute -bottom-10 left-6 w-36 h-12 bg-sena-navy -rotate-45 origin-bottom-left" />
        </div>

        <div className="relative z-10 space-y-2">
          {/* Profile pill */}
          <Link
            href="/admin/perfil"
            className="flex items-center justify-between rounded-full bg-black/20 hover:bg-black/30 border border-white/10 px-3.5 py-2.5 transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sena-green-dark">
                <User size={14} strokeWidth={2.4} />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">Perfil</span>
            </div>
            <ArrowRight
              size={14}
              className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all"
            />
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          >
            <LogOut size={11} strokeWidth={2.5} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
