"use client";

// Íconos de lucide para acciones y campos del modal de perfil
import {
  ChevronDown,
  GraduationCap,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  UserCircle,
} from "lucide-react";

// Componentes de shadcn/ui para el menú desplegable del usuario
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Componentes de shadcn/ui para el modal flotante de perfil
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
// useCurrentUser lee la sesión activa. getInitials extrae las iniciales del nombre.
import { useCurrentUser, getInitials } from "@/hooks/useCurrentUser";
import { clearSession } from "@/lib/auth";
import { CalendarDays } from "lucide-react";

// Convierte el rol interno a su etiqueta legible en español
function formatRole(rol: string): string {
  const map: Record<string, string> = {
    admin: "Administrador",
    lider_bienestar: "Líder de Bienestar",
    aprendiz: "Aprendiz",
  };
  return map[rol] ?? rol;
}

// Fila de dato individual usada dentro del modal de perfil
function ProfileRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sena-green/10 text-sena-green">
        <Icon size={15} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-sm font-medium text-sena-navy leading-snug truncate">{value}</p>
      </div>
    </div>
  );
}

// Avatar con iniciales del usuario sobre fondo degradado verde
function InitialsAvatar({ initials, size = "lg" }: { initials: string; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "h-20 w-20 text-3xl rounded-2xl" : "h-9 w-9 text-sm rounded-xl";
  return (
    <div className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-sena-green to-emerald-600 text-white font-black shadow-md ${dim}`}>
      {initials}
    </div>
  );
}

// Contenido completo del modal de perfil del administrador
function ProfileModal({ nombre, correo, rol, centro, initials }: {
  nombre: string; correo: string; rol: string; centro: string; initials: string;
}) {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="relative">
          <InitialsAvatar initials={initials} size="lg" />
          <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-sena-green ring-2 ring-white flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-sena-navy leading-tight">{nombre}</h3>
          <Badge variant="secondary" className="mt-1 bg-sena-green/10 text-sena-green border-0 font-semibold text-xs">
            <Sparkles size={11} className="mr-1" />
            {rol}
          </Badge>
        </div>
      </div>

      <Separator className="bg-gray-100" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileRow icon={Mail} label="Correo" value={correo} />
        <ProfileRow icon={Phone} label="Teléfono" value="+57 (602) 824 7654" />
        <ProfileRow icon={MapPin} label="Sede" value="Popayán, Cauca - Colombia" />
        <ProfileRow icon={GraduationCap} label="Dependencia" value="Bienestar al Aprendiz" />
        <ProfileRow icon={UserCircle} label="Cargo" value="Coordinador de Bienestar" />
        <ProfileRow icon={Settings} label="Centro" value={centro || "Centro de Teleinformática y Producción Industrial"} />
      </div>

      <Separator className="bg-gray-100" />

      {/* Estadísticas rápidas del panel */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-gray-50 px-2 py-3 text-center">
        {[
          { label: "Aprendices", value: "250" },
          { label: "Módulos", value: "10" },
          { label: "Cobertura", value: "88%" },
        ].map(({ label, value }) => (
          <div key={label} className="px-3">
            <p className="text-base font-extrabold text-sena-navy">{value}</p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tag de fecha dinámica que muestra el día actual en español
function FormattedDate() {
  const now = new Date();
  const label = now.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
  const display = label.charAt(0).toUpperCase() + label.slice(1);
  return (
    <div className="hidden md:flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3.5 py-2 shadow-sm select-none">
      <CalendarDays size={15} className="shrink-0 text-sena-green" strokeWidth={2} />
      <span className="text-xs font-semibold text-sena-navy whitespace-nowrap">{display}</span>
    </div>
  );
}

export default function DashboardHeader() {
  const [profileOpen, setProfileOpen] = useState(false);

  const user = useCurrentUser();
  const nombre   = user?.nombre  ?? "Usuario SENA";
  const correo   = user?.correo  ?? "—";
  const centro   = user?.centro  ?? "";
  const rol      = user ? formatRole(user.rol) : "Administrador";
  const initials = getInitials(nombre);

  return (
    <>
      {/* Barra superior fija con buscador, fecha y menú de usuario */}
      <header className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 px-8 backdrop-blur-md shadow-sm font-primary">
        <div className="flex h-[72px] items-center justify-between gap-6">

          {/* Buscador global */}
          <div className="flex items-center flex-1 max-w-md">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 shadow-sm focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20 focus-within:bg-white transition-all">
              <Search size={16} className="shrink-0 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar por módulo, formulario o aprendiz..."
                className="flex-1 bg-transparent text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none"
                aria-label="Buscador global"
              />
            </div>
          </div>

          {/* Tag de fecha + separador + menú de usuario */}
          <div className="flex items-center gap-4 shrink-0">
            <FormattedDate />
            <div className="h-8 w-px bg-gray-200" />

            {/* Dropdown con opciones de perfil y cierre de sesión */}
            <DropdownMenu>
              <DropdownMenuTrigger
                id="btn-user-menu"
                className="flex items-center gap-3 cursor-pointer group rounded-xl border border-gray-200 bg-white pl-2 pr-4 py-1.5 shadow-xs transition-all hover:border-sena-green hover:bg-sena-light outline-none focus-visible:ring-2 focus-visible:ring-sena-green/40"
                aria-label="Menú de usuario"
              >
                <InitialsAvatar initials={initials} size="sm" />
                <div className="hidden sm:block text-left leading-tight">
                  <p className="text-sm font-bold text-sena-navy group-hover:text-sena-green transition-colors">{nombre}</p>
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{rol}</p>
                </div>
                <ChevronDown size={16} className="text-gray-400 group-hover:text-sena-green transition-colors hidden sm:block ml-1" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 rounded-2xl border border-gray-100 shadow-xl p-1.5 font-primary" sideOffset={8}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="text-sm font-bold text-sena-navy">{nombre}</p>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">{correo}</p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-gray-100 my-1" />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    id="menu-ver-perfil"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-sena-navy cursor-pointer transition-colors"
                    onSelect={(e) => { e.preventDefault(); setProfileOpen(true); }}
                  >
                    <User size={16} className="text-sena-green" />
                    <span>Ver Perfil</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-gray-100 my-1" />

                <DropdownMenuItem
                  id="menu-cerrar-sesion"
                  onClick={() => { if (typeof window !== "undefined") { clearSession(); window.location.href = "/login"; } }}
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

      {/* Modal flotante con el perfil completo del administrador */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent id="dialog-perfil-usuario" className="max-w-lg rounded-3xl border-0 shadow-2xl p-8 font-primary">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-5 w-1 rounded-full bg-sena-green" />
              <DialogTitle className="text-xl font-extrabold text-sena-navy">Perfil del Administrador</DialogTitle>
            </div>
            <DialogDescription className="text-xs font-medium text-gray-400 ml-3">
              Información personal y de formación registrada en CARACTERIZA.
            </DialogDescription>
          </DialogHeader>
          <ProfileModal nombre={nombre} correo={correo} rol={rol} centro={centro} initials={initials} />
        </DialogContent>
      </Dialog>
    </>
  );
}
