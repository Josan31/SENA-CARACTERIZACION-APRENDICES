"use client";

import {
  ArrowRight,
  BarChart2,
  FileText,
  Home,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser, getInitials } from "@/hooks/useCurrentUser";

const NAV_SECTIONS = [
  {
    heading: "Menú principal",
    items: [
      { href: "/admin", label: "Inicio", icon: Home },
    ],
  },
  {
    heading: "Caracterización",
    items: [
      { href: "/admin/formularios", label: "Formularios", icon: FileText },
      { href: "/admin/resultados", label: "Resultados", icon: BarChart2 },
    ],
  },
  {
    heading: "Gestión",
    items: [
      { href: "/admin/administracion", label: "Administración", icon: Settings },
    ],
  },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const user = useCurrentUser();

  const displayName  = user?.nombre  ?? "Usuario SENA";
  const displayEmail = user?.correo   ?? "";
  const initials     = getInitials(displayName);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="relative flex h-full w-60 shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-sena-green to-emerald-600 text-white font-primary shadow-2xl select-none">
      {/* ── Brand Header — height locked to match the top navbar ── */}
      <div>
        <div className="flex h-[73px] items-center gap-3 border-b border-white/20 px-5">
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
            <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest">
              Más
            </span>
            <span className="text-xs font-black tracking-wide text-white uppercase">
              Personas
            </span>
            <span className="text-[10px] font-medium text-sena-yellow uppercase tracking-widest mt-0.5">
              Más
            </span>
            <span className="text-[11px] font-black tracking-wide text-sena-yellow uppercase">
              Oportunidades
            </span>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav
          className="px-3.5 pt-3 pb-1 space-y-4"
          aria-label="Menú del Administrador"
        >
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading}>
              {/* Section label */}
              <p className="mb-1.5 px-3.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45 select-none">
                {section.heading}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        group relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm transition-all duration-200
                        ${
                          active
                            ? "bg-white text-emerald-700 font-bold shadow-md"
                            : "text-white/90 font-medium hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        strokeWidth={active ? 2.5 : 2}
                        className={
                          active
                            ? "text-emerald-600"
                            : "text-white/80 group-hover:text-white transition-colors"
                        }
                      />
                      <span className="tracking-wide">{item.label}</span>

                      {active && (
                        <div className="absolute right-3.5 flex items-center justify-center">
                          <span className="absolute h-3 w-3 rounded-full bg-emerald-500/30 animate-ping" />
                          <span className="relative h-2 w-2 rounded-full bg-emerald-600" />
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* ── Bottom Section ── */}
      <div className="relative pt-12 pb-5 px-3.5">
        {/* Decoración geométrica institucional de esquina a esquina */}
        <div
          className="absolute inset-x-0 bottom-20 h-16 pointer-events-none overflow-hidden opacity-95 z-0"
          aria-hidden="true"
        >
          {/* Franja Amarilla institucional */}
          <div className="absolute -left-6 -bottom-6 w-[120%] h-6 bg-sena-yellow rotate-[28deg] origin-bottom-left shadow-sm" />
          {/* Franja Azul Oscuro institucional */}
          <div className="absolute -left-6 -bottom-10 w-[120%] h-6 bg-sena-navy rotate-[28deg] origin-bottom-left shadow-sm" />
        </div>

        <div className="relative z-10 space-y-2">
          {/* Profile pill */}
          <Link
            href="/admin/perfil"
            className="flex items-center justify-between rounded-2xl bg-white hover:bg-gray-50 border border-white px-3.5 py-3 transition-all group shadow-md"
            aria-label="Ver perfil"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sena-green to-emerald-600 text-white text-xs font-black shadow-sm"
              >
                {initials}
              </div>

              <div className="min-w-0 leading-tight">
                <p className="text-xs font-bold text-emerald-700 truncate max-w-[110px]">
                  {displayName}
                </p>
                <p className="text-[10px] font-medium text-emerald-600/70 truncate max-w-[110px]">
                  {displayEmail || "Ver perfil"}
                </p>
              </div>
            </div>

            <ArrowRight
              size={14}
              className="text-emerald-600/50 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-1"
            />
          </Link>
        </div>
      </div>
    </aside>
  );
}
