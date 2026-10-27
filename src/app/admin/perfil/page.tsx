
"use client";

import React from "react";
import {
  ArrowLeft,
  Camera,
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  Pencil,
  ContactRound,
  ShieldCheck,
  CircleUserRound,
} from "lucide-react";

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-3 border-b border-[#edf5f3] py-3 last:border-b-0 sm:grid-cols-[36px_minmax(0,1fr)] sm:gap-4">
      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-[#e8f6ef] text-[#087d4b]">
        {icon}
      </span>
      <div className="grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-[minmax(120px,0.8fr)_minmax(0,1.2fr)] sm:gap-4">
        <span className="text-xs font-medium text-slate-500 sm:text-sm">
          {label}
        </span>
        <span className="break-words text-sm font-semibold text-[#21465b]">
          {value}
        </span>
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#087d4b] text-white">
        {icon}
      </span>
      <h2 className="text-sm font-extrabold text-[#174d4b] sm:text-base">
        {title}
      </h2>
    </div>
  );
}

function DecorativeEdit() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#b8ead4] bg-white px-3 py-1.5 text-xs font-bold text-[#087d4b]">
      <Pencil size={12} />
      Editar
    </span>
  );
}

function AdminAvatar({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-[#a8e8c9] via-[#6dd4a7] to-[#149c6b] shadow-sm ${
        large ? "h-24 w-24 sm:h-28 sm:w-28" : "h-16 w-16"
      }`}
      aria-label="Avatar de ejemplo"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="49" fill="#69d6a6" />
        <path
          d="M13 100c2-21 15-31 37-31s35 10 37 31H13Z"
          fill="#07875b"
        />
        <path
          d="M38 62h24v16c-6 8-18 8-24 0V62Z"
          fill="#f3b982"
        />
        <ellipse cx="50" cy="43" rx="23" ry="27" fill="#ffc996" />
        <path
          d="M27 43c-3-20 8-32 24-32 17 0 27 12 23 31-5-3-9-9-10-16-8 8-21 11-36 10l-1 7Z"
          fill="#073b46"
        />
        <path
          d="M29 45c-4-3-6 0-4 7 1 4 3 6 6 5l-2-12Zm42 0c4-3 6 0 4 7-1 4-3 6-6 5l2-12Z"
          fill="#ffc996"
        />
        <path
          d="M35 77c5 5 10 7 15 7s10-2 15-7l15 7 7 16H13l7-16 15-7Z"
          fill="#087d4b"
        />
      </svg>

      {large && (
        <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#087d4b] text-white">
          <Camera size={13} />
        </span>
      )}
    </div>
  );
}

export default function PerfilAdministradorPage() {
  return (
    <main className="min-h-screen bg-[#eaf7f6] p-3 text-slate-700 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-white/80 bg-white/75 shadow-[0_12px_45px_rgba(20,100,100,0.08)]">
        <div className="flex items-center justify-between border-b border-[#e3f1ef] px-4 py-3 sm:px-7">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#087d4b] shadow-sm ring-1 ring-[#d9efea]">
            <ArrowLeft size={18} />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5d9c8c]">
            Portal administrativo
          </span>
        </div>

        <div className="p-4 sm:p-7 lg:p-8">
          <section className="grid gap-5 border-b border-[#e4f1ef] pb-6 md:grid-cols-[minmax(0,1fr)_300px] md:items-center">
            <div className="flex min-w-0 items-center gap-4 sm:gap-6">
              <AdminAvatar large />
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#169565] sm:text-xs">
                  Mi cuenta
                </p>
                <h1 className="text-xl font-black tracking-tight text-[#174d4b] sm:text-2xl lg:text-3xl">
                  Nombre del administrador
                </h1>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Perfil de usuario administrativo
                </p>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#d8f4e7] px-3 py-1.5 text-xs font-bold text-[#087d4b]">
                  <ShieldCheck size={15} />
                  Cuenta administrativa
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#d8f1e9] bg-gradient-to-r from-[#e8f8f3] to-[#f1fbf8] p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#087d4b] shadow-sm">
                <CircleUserRound size={24} />
              </span>
              <div>
                <p className="text-sm font-bold leading-snug text-[#367d70]">
                  Administra y mantén actualizados tus datos personales.
                </p>
                <p className="mt-1 text-xs font-semibold text-[#5d9c8c]">
                  Información de tu cuenta
                </p>
              </div>
            </div>
          </section>

          <nav
            aria-label="Secciones del perfil administrativo"
            className="flex gap-1 overflow-x-auto border-b border-[#e4f1ef] py-2"
          >
            {[
              {
                title: "Información personal",
                icon: <UserRound size={16} />,
                active: true,
              },
              {
                title: "Información de contacto",
                icon: <Mail size={16} />,
                active: false,
              },
            ].map((tab) => (
              <div
                key={tab.title}
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-xs font-bold sm:px-4 sm:text-sm ${
                  tab.active
                    ? "border-[#087d4b] text-[#087d4b]"
                    : "border-transparent text-slate-500"
                }`}
              >
                {tab.icon}
                {tab.title}
              </div>
            ))}
          </nav>

          <div className="grid gap-4 pt-5 lg:grid-cols-2 lg:gap-5">
            <div className="space-y-4">
              <section className="rounded-2xl border border-[#e0f1ee] bg-white/90 p-4 shadow-[0_3px_12px_rgba(30,110,100,0.04)] sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <SectionHeader
                    icon={<Camera size={16} />}
                    title="Foto de perfil"
                  />
                  <DecorativeEdit />
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <AdminAvatar large />
                  <div className="w-full flex-1">
                    <div className="rounded-xl bg-[#eaf8f4] px-4 py-3 text-xs leading-relaxed text-[#52877c]">
                      <span className="mb-1 flex items-center gap-2 font-bold text-[#087d4b]">
                        <ShieldCheck size={14} />
                        Imagen de cuenta
                      </span>
                      Esta imagen se utiliza para identificar tu perfil dentro de la plataforma.
                    </div>

                    <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#8bdcb9] px-4 py-2 text-xs font-bold text-[#087d4b]">
                      <Camera size={14} />
                      Cambiar foto
                    </span>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-[#e0f1ee] bg-white/90 p-4 shadow-[0_3px_12px_rgba(30,110,100,0.04)] sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <SectionHeader
                    icon={<UserRound size={16} />}
                    title="Información personal"
                  />
                  <DecorativeEdit />
                </div>

                <InfoRow
                  icon={<UserRound size={16} />}
                  label="Nombre completo"
                  value="Nombre y apellidos"
                />
                <InfoRow
                  icon={<FileText size={16} />}
                  label="Tipo de documento"
                  value="Tipo de documento"
                />
                <InfoRow
                  icon={<FileText size={16} />}
                  label="Número de documento"
                  value="••••••••••"
                />
                <InfoRow
                  icon={<CalendarDays size={16} />}
                  label="Fecha de nacimiento"
                  value="DD/MM/AAAA"
                />
              </section>
            </div>

            <div className="space-y-4">
              <section className="rounded-2xl border border-[#e0f1ee] bg-white/90 p-4 shadow-[0_3px_12px_rgba(30,110,100,0.04)] sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <SectionHeader
                    icon={<ContactRound size={16} />}
                    title="Información de contacto"
                  />
                  <DecorativeEdit />
                </div>

                <InfoRow
                  icon={<Mail size={16} />}
                  label="Correo electrónico"
                  value="correo@institucion.edu.co"
                />
                <InfoRow
                  icon={<Phone size={16} />}
                  label="Teléfono"
                  value="Número de contacto"
                />
                <InfoRow
                  icon={<MapPin size={16} />}
                  label="Dirección de residencia"
                  value="Ciudad, departamento"
                />
              </section>
            </div>
          </div>


        </div>
      </div>
    </main>
  );
}
