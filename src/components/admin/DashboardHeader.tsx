"use client";

import { Bell, Calendar, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";

interface DashboardHeaderProps {
  /** Título principal — ej. "Bienvenido(a), Valentina" */
  title: string;
  /** Subtítulo o detalle — ej. "Programa de Formación: Tecnólogo en Programación de Software (Ficha 234567)" */
  subtitle?: string;
  /** Nombre del usuario para el badge superior */
  userName?: string;
  /** Rol o tipo de usuario */
  userRole?: string;
}

export default function DashboardHeader({
  title = "Bienvenido(a), Valentina",
  subtitle = "Tecnólogo en Programación de Software (Ficha 234567)",
  userName = "Valentina",
  userRole = "Aprendiz SENA",
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 px-8 py-4 backdrop-blur-md shadow-sm font-primary">
      <div className="flex items-center justify-between gap-6">
        {/* ── Izquierda: Saludo + Contexto de Formación ── */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-2xl font-black text-sena-navy tracking-tight">
              {title}
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-sena-green/10 px-2.5 py-0.5 text-xs font-semibold text-sena-green">
              <Sparkles size={12} />
              Activa
            </span>
          </div>

          {subtitle && (
            <p className="mt-1 flex items-center gap-2 text-xs font-medium text-gray-500">
              <span className="font-semibold text-sena-green">Programa:</span>
              <span className="truncate">{subtitle}</span>
            </p>
          )}
        </div>

        {/* ── Derecha: Controles, Usuario y Branding SENA ── */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Fecha / Estado Rápido */}
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

          {/* Botón Notificaciones */}
          <button
            type="button"
            aria-label="Notificaciones"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-sena-green hover:bg-sena-light hover:text-sena-green shadow-xs"
          >
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-sena-green ring-2 ring-white" />
          </button>

          {/* Separador */}
          <div className="h-8 w-px bg-gray-200" />

          {/* User Profile Mini Badge */}
          <div className="flex items-center gap-3 cursor-pointer group rounded-xl p-1.5 transition-all hover:bg-gray-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sena-navy text-white font-bold text-sm shadow-sm group-hover:bg-sena-green transition-colors">
              {userName.charAt(0)}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-xs font-bold text-sena-navy group-hover:text-sena-green transition-colors">
                {userName}
              </p>
              <p className="text-[10px] font-medium text-gray-400">
                {userRole}
              </p>
            </div>
            <ChevronDown
              size={14}
              className="text-gray-400 group-hover:text-sena-navy transition-colors hidden sm:block"
            />
          </div>

          {/* Logotipo SENA Oficial / Institucional */}
          <div className="pl-2 flex items-center gap-2 border-l border-gray-200">
            <Image
              src="/sena-logo-verde.png" // Asegúrate de tener el logo institucional verde o la versión oficial
              alt="Logo SENA"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
