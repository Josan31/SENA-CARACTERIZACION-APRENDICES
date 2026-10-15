"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  BarChart2,
  Settings,
  User,
  ChevronRight,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/aprendiz", label: "Inicio", icon: Home },
  { href: "/aprendiz/formularios", label: "Formulario", icon: FileText },
  { href: "/aprendiz/resultados", label: "Resultados", icon: BarChart2 },
  { href: "/admin", label: "Administración", icon: Settings },
] as const;

export default function SidebarAprendiz() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/aprendiz") return pathname === "/aprendiz";
    return pathname.startsWith(href);
  }

  function handleLogout() {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("sena_user");
      } catch {
        // ignore
      }
      window.location.href = "/login";
    }
  }

  return (
    <aside className="relative flex h-full w-60 shrink-0 flex-col justify-between overflow-hidden bg-[#004e26] text-white font-primary shadow-2xl select-none">
      {/* ── Brand Header Institucional SENA ── */}
      <div>
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
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
            <span className="text-[11px] font-medium text-white/90">Más</span>
            <span className="text-xs font-black tracking-wide text-white uppercase">
              personas
            </span>
            <span className="text-[10px] font-medium text-[#fdc300] mt-0.5">Más</span>
            <span className="text-[11px] font-black tracking-wide text-[#fdc300] uppercase">
              oportunidades
            </span>
          </div>
        </div>

        {/* ── Menú de Navegación ── */}
        <nav className="px-4 py-4 space-y-2" aria-label="Menú del Aprendiz">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs transition-all ${
                  active
                    ? "bg-[#c8eada] text-[#004e28] font-black shadow-sm"
                    : "text-white/90 hover:bg-white/10 font-bold"
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.6 : 2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Sección Inferior con Ribbons y Perfil ── */}
      <div className="relative pt-12 pb-6 px-4">
        {/* Cintas/Ribbons institucionales diagonales en esquina inferior izquierda */}
        <div
          className="absolute left-0 bottom-0 w-36 h-36 pointer-events-none overflow-hidden opacity-90 z-0"
          aria-hidden="true"
        >
          {/* Cinta Amarilla */}
          <div
            className="absolute -bottom-8 -left-8 w-32 h-16 bg-[#fdc300] -rotate-45 transform origin-bottom-left"
          />
          {/* Cinta Azul Marina */}
          <div
            className="absolute -bottom-10 left-6 w-36 h-12 bg-[#00304d] -rotate-45 transform origin-bottom-left"
          />
        </div>

        {/* Botón de Perfil en Cápsula */}
        <div className="relative z-10 space-y-2">
          <Link
            href="/aprendiz/perfil"
            className="flex items-center justify-between rounded-full bg-[#00381a]/90 hover:bg-[#00381a] border border-white/10 px-3.5 py-2.5 transition-all group shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#004e26]">
                <User size={15} strokeWidth={2.4} />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">
                Perfil
              </span>
            </div>
            <ChevronRight
              size={15}
              className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all"
            />
          </Link>

          {/* Botón sutil de Cerrar Sesión */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-center text-[10px] font-bold text-emerald-200/60 hover:text-white transition-colors cursor-pointer py-1"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
