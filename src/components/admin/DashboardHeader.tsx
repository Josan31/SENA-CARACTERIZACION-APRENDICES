"use client";

import {
  Bell,
  Calendar,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
interface DashboardHeaderProps {
  /** Nombre del usuario para el badge superior */
  userName?: string;
  /** Rol o tipo de usuario */
  userRole?: string;
}

/* ─────────────────────────────────────────────────────────
   Profile Detail Row — small helper inside the modal
───────────────────────────────────────────────────────── */
function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sena-green/10 text-sena-green">
        <Icon size={15} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="text-sm font-medium text-sena-navy leading-snug truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Profile Modal Content
───────────────────────────────────────────────────────── */
function ProfileModal({
  userName,
  userRole,
}: {
  userName: string;
  userRole: string;
}) {
  return (
    <div className="space-y-6 pt-2">
      {/* Avatar + name block */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sena-navy to-sena-green text-white text-3xl font-black shadow-lg">
            {userName.charAt(0)}
          </div>
          {/* Online indicator dot */}
          <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-sena-green ring-2 ring-white flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-sena-navy leading-tight">
            {userName} García López
          </h3>
          <Badge
            variant="secondary"
            className="mt-1 bg-sena-green/10 text-sena-green border-0 font-semibold text-xs"
          >
            <Sparkles size={11} className="mr-1" />
            {userRole}
          </Badge>
        </div>
      </div>

      <Separator className="bg-gray-100" />

      {/* Profile details grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileRow icon={Mail} label="Correo" value="valentina@sena.edu.co" />
        <ProfileRow icon={Phone} label="Teléfono" value="+57 300 123 4567" />
        <ProfileRow
          icon={MapPin}
          label="Municipio"
          value="Bogotá D.C., Colombia"
        />
        <ProfileRow
          icon={GraduationCap}
          label="Programa"
          value="Tecnólogo en Programación de Software"
        />
        <ProfileRow icon={UserCircle} label="Ficha" value="234567" />
        <ProfileRow icon={Settings} label="Centro" value="CTA Bogotá" />
      </div>

      <Separator className="bg-gray-100" />

      {/* Stats strip */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-gray-50 px-2 py-3 text-center">
        {[
          { label: "Encuestas", value: "3/6" },
          { label: "Estado", value: "Activo" },
          { label: "Completitud", value: "50%" },
        ].map(({ label, value }) => (
          <div key={label} className="px-3">
            <p className="text-base font-extrabold text-sena-navy">{value}</p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Header Component
───────────────────────────────────────────────────────── */
export default function DashboardHeader({
  userName = "Valentina",
  userRole = "Aprendiz SENA",
}: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 px-8 py-4 backdrop-blur-md shadow-sm font-primary">
        <div className="flex items-center justify-between gap-6">
          {/* ── Left: Global Search ── */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 shadow-sm focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20 focus-within:bg-white transition-all">
              <Search size={16} className="shrink-0 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar por módulo, formulario o aprendiz..."
                className="flex-1 bg-transparent text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none"
                aria-label="Buscador global"
              />
            </div>
          </div>

          {/* ── Right: Controls, User, SENA branding ── */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Date chip */}
            <div className="hidden lg:flex items-center gap-2 rounded-xl bg-gray-50 border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
              <Calendar size={14} className="text-sena-green" />
              <span>
                {new Date().toLocaleDateString("es-CO", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Quick Actions (Notifications, Security, Settings) */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger
                  type="button"
                  id="btn-notifications"
                  aria-label="Notificaciones"
                  className="relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-sena-green hover:bg-sena-light hover:text-sena-green shadow-xs"
                >
                  <Bell size={18} />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-sena-green ring-2 ring-white" />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-sena-navy text-white text-xs font-medium"
                >
                  Notificaciones
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  type="button"
                  id="btn-security"
                  aria-label="Seguridad"
                  className="relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-sena-green hover:bg-sena-light hover:text-sena-green shadow-xs"
                >
                  <ShieldCheck size={18} />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-sena-navy text-white text-xs font-medium"
                >
                  Seguridad
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  type="button"
                  id="btn-settings"
                  aria-label="Configuración"
                  className="relative cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-sena-green hover:bg-sena-light hover:text-sena-green shadow-xs"
                >
                  <Settings size={18} />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-sena-navy text-white text-xs font-medium"
                >
                  Configuración
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Separator */}
            <div className="h-8 w-px bg-gray-200" />

            {/* ── User Avatar + DropdownMenu ── */}
            <DropdownMenu>
              <DropdownMenuTrigger
                id="btn-user-menu"
                className="flex items-center gap-3 cursor-pointer group rounded-xl border border-gray-200 bg-white pl-2 pr-4 py-1.5 shadow-xs transition-all hover:border-sena-green hover:bg-sena-light outline-none focus-visible:ring-2 focus-visible:ring-sena-green/40"
                aria-label="Menú de usuario"
              >
                <Avatar className="h-9 w-9 rounded-xl shadow-sm ring-2 ring-transparent group-hover:ring-sena-green/30 transition-all">
                  <AvatarFallback className="rounded-xl bg-sena-navy text-white font-bold text-sm group-hover:bg-sena-green transition-colors">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left leading-tight">
                  <p className="text-sm font-bold text-sena-navy group-hover:text-sena-green transition-colors">
                    {userName}
                  </p>
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                    {userRole}
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
                {/* User info header in dropdown */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="text-sm font-bold text-sena-navy">
                      {userName} García López
                    </p>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">
                      valentina@sena.edu.co
                    </p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-gray-100 my-1" />

                <DropdownMenuGroup>
                  {/* "Ver Perfil" opens the Dialog */}
                  <DropdownMenuItem
                    id="menu-ver-perfil"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-sena-navy cursor-pointer transition-colors"
                    onSelect={(e) => {
                      e.preventDefault();
                      setProfileOpen(true);
                    }}
                  >
                    <User size={16} className="text-sena-green" />
                    <span>Ver Perfil</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    id="menu-configuracion"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-sena-navy cursor-pointer transition-colors"
                  >
                    <Settings size={16} className="text-gray-400" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-gray-100 my-1" />

                <DropdownMenuItem
                  id="menu-cerrar-sesion"
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

      {/* ── Profile Dialog / Modal ── */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent
          id="dialog-perfil-usuario"
          className="max-w-lg rounded-3xl border-0 shadow-2xl p-8 font-primary"
        >
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-5 w-1 rounded-full bg-sena-green" />
              <DialogTitle className="text-xl font-extrabold text-sena-navy">
                Perfil del Aprendiz
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs font-medium text-gray-400 ml-3">
              Información personal y de formación registrada en CARACTERIZA.
            </DialogDescription>
          </DialogHeader>

          <ProfileModal userName={userName} userRole={userRole} />
        </DialogContent>
      </Dialog>
    </>
  );
}
