"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  UserCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useCurrentUser, getInitials } from "@/hooks/useCurrentUser";

/* ─────────────────────────────────────────────────────────
   Gradient initials avatar
───────────────────────────────────────────────────────── */
function InitialsAvatar({
  initials,
  size = "lg",
}: {
  initials: string;
  size?: "sm" | "lg";
}) {
  const dim =
    size === "lg"
      ? "h-20 w-20 text-3xl rounded-2xl"
      : "h-9 w-9 text-sm rounded-xl";
  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-sena-green to-emerald-600 text-white font-black shadow-md ${dim}`}
    >
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */
export default function TopNavAprendiz() {
  const user = useCurrentUser();

  const nombre  = user?.nombre ?? "Aprendiz SENA";
  const correo  = user?.correo ?? "—";
  const initials = getInitials(nombre);

  function handleLogout() {
    if (typeof window !== "undefined") {
      try { localStorage.removeItem("sena_user"); } catch { /* ignore */ }
      window.location.href = "/login";
    }
  }

  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 px-8 backdrop-blur-md shadow-sm font-primary">
      <div className="flex h-[72px] items-center justify-between gap-6">

        {/* ── Left: page label ── */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-black uppercase tracking-wider text-sena-green">
            CARACTERIZA
          </span>
          <span className="text-xs text-gray-300 font-light">|</span>
          <span className="text-xs font-semibold text-gray-500 truncate">
            Portal del Aprendiz
          </span>
        </div>

        {/* ── Right: controls + user ── */}
        <div className="flex items-center gap-4 shrink-0">

          {/* Notification bell */}
          <Tooltip>
            <TooltipTrigger
              type="button"
              aria-label="Notificaciones"
              className="relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-sena-green hover:bg-sena-light hover:text-sena-green shadow-xs"
            >
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-sena-green ring-2 ring-white" />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-sena-navy text-white text-xs font-medium">
              Notificaciones
            </TooltipContent>
          </Tooltip>

          {/* Settings */}
          <Tooltip>
            <TooltipTrigger
              type="button"
              aria-label="Configuración"
              className="relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-sena-green hover:bg-sena-light hover:text-sena-green shadow-xs"
            >
              <Settings size={18} />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-sena-navy text-white text-xs font-medium">
              Configuración
            </TooltipContent>
          </Tooltip>

          <div className="h-8 w-px bg-gray-200" />

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-3 cursor-pointer group rounded-xl border border-gray-200 bg-white pl-2 pr-4 py-1.5 shadow-xs transition-all hover:border-sena-green hover:bg-sena-light outline-none focus-visible:ring-2 focus-visible:ring-sena-green/40"
              aria-label="Menú de usuario"
            >
              <InitialsAvatar initials={initials} size="sm" />
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-sm font-bold text-sena-navy group-hover:text-sena-green transition-colors">
                  {nombre}
                </p>
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                  Aprendiz
                </p>
              </div>
              <ChevronDown
                size={16}
                className="text-gray-400 group-hover:text-sena-green transition-colors hidden sm:block ml-1"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-2xl border border-gray-100 shadow-xl p-1.5 font-primary"
              sideOffset={8}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-3 py-2">
                  <p className="text-sm font-bold text-sena-navy">{nombre}</p>
                  <p className="text-xs font-medium text-gray-400 mt-0.5">{correo}</p>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-gray-100 my-1" />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => { window.location.href = "/aprendiz/perfil"; }}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-sena-navy cursor-pointer transition-colors"
                >
                  <User size={16} className="text-sena-green" />
                  <span>Ver Perfil</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => { window.location.href = "/aprendiz/perfil"; }}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-sena-navy cursor-pointer transition-colors"
                >
                  <UserCircle size={16} className="text-gray-400" />
                  <span>Mi cuenta</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-gray-100 my-1" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 cursor-pointer transition-colors"
              >
                <LogOut size={16} />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
