"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser, getInitials } from "@/hooks/useCurrentUser";
import { useSidebar } from "./SidebarContext";

const NAV_SECTIONS = [
  {
    heading: "Menú principal",
    items: [
      { href: "/admin", label: "Inicio", icon: "lucide:home" },
    ],
  },
  {
    heading: "Caracterización",
    items: [
      { href: "/admin/formularios", label: "Formularios", icon: "lucide:file-text" },
      { href: "/admin/resultados", label: "Resultados", icon: "lucide:bar-chart-2" },
    ],
  },
  {
    heading: "Gestión",
    items: [
      { href: "/admin/administracion", label: "Administración", icon: "lucide:settings" },
    ],
  },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const user = useCurrentUser();
  const { collapsed } = useSidebar();

  const displayName  = user?.nombre  ?? "Usuario SENA";
  const displayEmail = user?.correo   ?? "";
  const initials     = getInitials(displayName);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={`
        relative flex h-full shrink-0 flex-col justify-between overflow-hidden
        text-white font-primary shadow-2xl select-none
        transition-[width] duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-60"}
      `}
      style={{ backgroundColor: "#095f35" }}
    >
      {/* ── Brand Header ── */}
      <div>
        <div
          className={`
            flex h-[73px] items-center border-b border-white/20
            transition-all duration-300
            ${collapsed ? "justify-center px-0" : "gap-3 px-5"}
          `}
        >
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
          {/* Text fades out when collapsed */}
          <div
            className={`
              flex flex-col leading-tight overflow-hidden
              transition-all duration-300
              ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
            `}
          >
            <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest whitespace-nowrap">
              Más
            </span>
            <span className="text-xs font-black tracking-wide text-white uppercase whitespace-nowrap">
              Personas
            </span>
            <span className="text-[10px] font-medium text-sena-yellow uppercase tracking-widest mt-0.5 whitespace-nowrap">
              Más
            </span>
            <span className="text-[11px] font-black tracking-wide text-sena-yellow uppercase whitespace-nowrap">
              Oportunidades
            </span>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav
          className={`pt-3 pb-1 space-y-4 ${collapsed ? "px-2" : "px-3.5"} transition-all duration-300`}
          aria-label="Menú del Administrador"
        >
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading}>
              {/* Section label — hidden when collapsed */}
              {!collapsed && (
                <p className="mb-1.5 px-3.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45 select-none">
                  {section.heading}
                </p>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`
                        group relative flex items-center rounded-xl text-sm transition-all duration-200
                        ${collapsed ? "justify-center px-0 py-3" : "gap-3 px-3.5 py-3"}
                        ${
                          active
                            ? "bg-white text-emerald-700 font-bold shadow-md"
                            : "text-white/90 font-medium hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <Icon
                        icon={item.icon}
                        width="18"
                        height="18"
                        className={
                          active
                            ? "text-emerald-600 shrink-0"
                            : "text-white/80 group-hover:text-white transition-colors shrink-0"
                        }
                      />

                      {/* Label fades out when collapsed */}
                      <span
                        className={`
                          whitespace-nowrap tracking-wide overflow-hidden
                          transition-all duration-300
                          ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
                        `}
                      >
                        {item.label}
                      </span>

                      {active && !collapsed && (
                        <div className="absolute right-3.5 flex items-center justify-center">
                          <span className="absolute h-3 w-3 rounded-full bg-emerald-500/30 animate-ping" />
                          <span className="relative h-2 w-2 rounded-full bg-emerald-600" />
                        </div>
                      )}

                      {/* Active dot centered when collapsed */}
                      {active && collapsed && (
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-white/80" />
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
      <div className={`relative pt-12 pb-5 ${collapsed ? "px-2" : "px-3.5"} transition-all duration-300`}>
        {/* Institutional diagonal ribbons */}
        <div
          className="absolute inset-x-0 bottom-20 h-16 pointer-events-none overflow-hidden opacity-95 z-0"
          aria-hidden="true"
        >
          <div className="absolute -left-6 -bottom-6 w-[120%] h-6 bg-sena-yellow rotate-[28deg] origin-bottom-left shadow-sm" />
          <div className="absolute -left-6 -bottom-10 w-[120%] h-6 bg-sena-navy rotate-[28deg] origin-bottom-left shadow-sm" />
        </div>

        <div className="relative z-10">
          {collapsed ? (
            /* Collapsed: just the initials circle */
            <Link
              href="/admin/perfil"
              title={displayName}
              className="flex items-center justify-center rounded-2xl bg-white hover:bg-gray-50 p-2 transition-all shadow-md"
              aria-label="Ver perfil"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-black shadow-sm"
                style={{ backgroundColor: "#095f35" }}
              >
                {initials}
              </div>
            </Link>
          ) : (
            /* Expanded: full profile pill */
            <Link
              href="/admin/perfil"
              className="flex items-center justify-between rounded-2xl bg-white hover:bg-gray-50 border border-white px-3.5 py-3 transition-all group shadow-md"
              aria-label="Ver perfil"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-black shadow-sm"
                  style={{ backgroundColor: "#095f35" }}
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
              <Icon
                icon="lucide:arrow-right"
                width="14"
                height="14"
                className="text-emerald-600/50 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-1"
              />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
