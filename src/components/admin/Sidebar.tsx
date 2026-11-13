"use client";

// Icon de Iconify para los íconos de navegación. usePathname detecta la ruta activa.
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

// Estructura de secciones y enlaces de la barra lateral
const NAV_SECTIONS = [
  {
    heading: "Menú principal",
    items: [{ href: "/admin", label: "Inicio", icon: "lucide:home" }],
  },
  {
    heading: "Caracterización",
    items: [
      { href: "/admin/formularios",   label: "Formularios", icon: "lucide:file-text"  },
      { href: "/admin/resultados",    label: "Resultados",  icon: "lucide:bar-chart-2" },
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

  // Marca el ítem activo: inicio solo coincide exacto, el resto por prefijo
  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    // Barra lateral fija con color verde institucional SENA
    <aside
      className="relative flex h-full w-60 shrink-0 flex-col justify-between overflow-hidden text-white font-primary shadow-2xl select-none"
      style={{ backgroundColor: "#095f35" }}
    >
      <div>
        {/* Encabezado con logotipo y lema institucional */}
        <div className="flex h-[73px] items-center gap-3 px-5 border-b border-white/20">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            <Image src="/sena-logo-blanco.png" alt="Logotipo SENA" width={42} height={42} className="object-contain" priority />
          </div>
          <div className="flex flex-col leading-tight overflow-hidden">
            <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest whitespace-nowrap">Más</span>
            <span className="text-xs font-black tracking-wide text-white uppercase whitespace-nowrap">Personas</span>
            <span className="text-[10px] font-medium text-sena-yellow uppercase tracking-widest mt-0.5 whitespace-nowrap">Más</span>
            <span className="text-[11px] font-black tracking-wide text-sena-yellow uppercase whitespace-nowrap">Oportunidades</span>
          </div>
        </div>

        {/* Menú de navegación agrupado por secciones */}
        <nav className="pt-3 pb-1 px-3.5 space-y-4" aria-label="Menú del Administrador">
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading}>
              <p className="mb-1.5 px-3.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45 select-none">
                {section.heading}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm transition-all duration-200 ${
                        active
                          ? "bg-[#cdf1d9] text-emerald-950 font-bold shadow-sm"
                          : "text-white/90 font-medium hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {/* Indicador lateral del ítem activo */}
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1.5 rounded-r-full bg-[#095f35]" />
                      )}
                      <Icon
                        icon={item.icon}
                        width="18"
                        height="18"
                        className={active ? "text-[#095f35] shrink-0" : "text-white/80 group-hover:text-white transition-colors shrink-0"}
                      />
                      <span className="whitespace-nowrap tracking-wide overflow-hidden">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Pie con cintas decorativas institucionales y enlace al perfil */}
      <div className="relative pt-12 pb-5 px-3.5">
        {/* Cintas diagonales amarilla y azul marino como decoración institucional */}
        <div className="absolute inset-x-0 bottom-20 h-16 pointer-events-none overflow-hidden opacity-95 z-0" aria-hidden="true">
          <div className="absolute -left-6 -bottom-6 w-[120%] h-6 bg-sena-yellow rotate-[28deg] origin-bottom-left shadow-sm" />
          <div className="absolute -left-6 -bottom-10 w-[120%] h-6 bg-sena-navy rotate-[28deg] origin-bottom-left shadow-sm" />
        </div>

        {/* Botón de perfil del usuario */}
        <div className="relative z-10">
          <Link
            href="/admin/perfil"
            className="flex items-center justify-between rounded-2xl border border-white/40 bg-transparent hover:bg-white/10 px-3.5 py-2.5 transition-all group"
            aria-label="Perfil"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm shrink-0">
                <Icon icon="lucide:user" width="16" height="16" className="text-[#095f35]" />
              </div>
              <span className="text-xs font-bold tracking-wide text-white truncate">Perfil</span>
            </div>
            <Icon icon="lucide:chevron-right" width="14" height="14" className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
