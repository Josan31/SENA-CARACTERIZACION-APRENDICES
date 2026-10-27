"use client";

import React from "react";
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Clock3,
  FileText,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Sprout,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3 py-2 sm:grid-cols-[24px_minmax(0,1fr)] sm:gap-4">
      <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8f6ef] text-[#087d4b]">
        {icon}
      </span>
      <div className="grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-[minmax(115px,0.85fr)_minmax(0,1.4fr)] sm:gap-4">
        <span className="text-xs font-medium text-slate-500 sm:text-sm">{label}</span>
        <span className="break-words text-sm font-semibold text-[#21465b]">{value}</span>
      </div>
    </div>
  );
}

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
};

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#087d4b] text-white">
        {icon}
      </span>
      <h2 className="text-sm font-extrabold text-[#174d4b] sm:text-base">{title}</h2>
    </div>
  );
}

function EditLabel() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b8ead4] bg-white px-3 py-1.5 text-xs font-bold text-[#087d4b]">
      <Pencil size={12} />
      Editar
    </span>
  );
}

function ProfileAvatar({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-[#a8e8c9] via-[#6dd4a7] to-[#149c6b] shadow-sm ${
        large ? "h-24 w-24 sm:h-28 sm:w-28" : "h-16 w-16"
      }`}
      aria-label="Avatar de perfil de ejemplo"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="49" fill="#69d6a6" />
        <path d="M13 100c2-21 15-31 37-31s35 10 37 31H13Z" fill="#07875b" />
        <path d="M38 62h24v16c-6 8-18 8-24 0V62Z" fill="#f3b982" />
        <ellipse cx="50" cy="43" rx="23" ry="27" fill="#ffc996" />
        <path d="M27 43c-3-20 8-32 24-32 17 0 27 12 23 31-5-3-9-9-10-16-8 8-21 11-36 10l-1 7Z" fill="#073b46" />
        <path d="M29 45c-4-3-6 0-4 7 1 4 3 6 6 5l-2-12Zm42 0c4-3 6 0 4 7-1 4-3 6-6 5l2-12Z" fill="#ffc996" />
        <path d="M35 77c5 5 10 7 15 7s10-2 15-7l15 7 7 16H13l7-16 15-7Z" fill="#087d4b" />
      </svg>
      {large && (
        <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#087d4b] text-white">
          <Camera size={13} />
        </span>
      )}
    </div>
  );
}

export default function PerfilAprendizPage() {
  const tabs = [
    { title: "Información personal", icon: <UserRound size={16} />, active: true },
    { title: "Información de contacto", icon: <Mail size={16} />, active: false },
    { title: "Formación académica", icon: <GraduationCap size={17} />, active: false },
    { title: "Otros", icon: <Star size={16} />, active: false },
  ];

  return (
    <main className="min-h-screen bg-[#f3faf7] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[#dcefe7] bg-white px-3 py-2 text-xs font-bold text-[#174d4b] shadow-sm"
          >
            <ArrowLeft size={15} />
            Volver
          </button>

          <span className="inline-flex items-center rounded-full border border-[#dcefe7] bg-[#edf9f3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087d4b]">
            Perfil del aprendiz
          </span>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#dcefe7] bg-white shadow-[0_12px_30px_rgba(12,73,59,0.08)]">
          <header className="border-b border-[#edf4f1] bg-gradient-to-r from-[#e8f8f3] to-white px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <ProfileAvatar large />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a9a85]">
                    Aprendiz
                  </p>
                  <h1 className="mt-1 text-xl font-black text-[#174d4b] sm:text-2xl">
                    Ana Sofía López Ramírez
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#4a7f6d]">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dcefe7] bg-white px-2.5 py-1">
                      <GraduationCap size={13} />
                      Tecnología en análisis y desarrollo de software
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dcefe7] bg-white px-2.5 py-1">
                      <BookOpen size={13} />
                      Ficha 2458967
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#087d4b] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#066d42]"
              >
                <Pencil size={14} />
                Editar perfil
              </button>
            </div>
          </header>

          <div className="px-4 py-5 sm:px-6">
            <div className="mb-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[#d8f1e9] bg-gradient-to-r from-[#e8f8f3] to-[#f1fbf8] p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#087d4b] shadow-sm">
                  <Sprout size={25} />
                </span>
                <div>
                  <p className="text-sm font-bold leading-snug text-[#367d70]">
                    “El conocimiento es la llave para un mejor futuro”
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#5d9c8c]">SENA</p>
                </div>
              </div>
            </div>

            <nav
              aria-label="Secciones del perfil"
              className="flex gap-1 overflow-x-auto border-b border-[#e4f1ef] py-2"
            >
              {tabs.map((tab) => (
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
                    <SectionHeader icon={<Camera size={16} />} title="Foto de perfil" />
                    <EditLabel />
                  </div>
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <ProfileAvatar large />
                    <div className="w-full flex-1">
                      <div className="rounded-xl bg-[#eaf8f4] px-4 py-3 text-xs leading-relaxed text-[#52877c]">
                        <span className="mb-1 flex items-center gap-2 font-bold text-[#087d4b]">
                          <ShieldCheck size={14} />
                          Foto de perfil
                        </span>
                        La imagen de perfil se mostrará en tu cuenta del aprendiz.
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
                    <SectionHeader icon={<UserRound size={16} />} title="Información personal" />
                    <EditLabel />
                  </div>
                  <div className="divide-y divide-[#edf5f3]">
                    <InfoRow
                      icon={<FileText size={15} />}
                      label="Tipo de documento"
                      value="Documento de identidad"
                    />
                    <InfoRow
                      icon={<FileText size={15} />}
                      label="Número de documento"
                      value="••••••••••"
                    />
                    <InfoRow
                      icon={<CalendarDays size={15} />}
                      label="Fecha de nacimiento"
                      value="DD/MM/AAAA"
                    />
                    <InfoRow icon={<Clock3 size={15} />} label="Edad" value="—" />
                    <InfoRow icon={<UsersRound size={15} />} label="Sexo" value="—" />
                    <InfoRow icon={<Heart size={15} />} label="Estado civil" value="—" />
                  </div>
                </section>
              </div>

              <div className="space-y-4">
                <section className="rounded-2xl border border-[#e0f1ee] bg-white/90 p-4 shadow-[0_3px_12px_rgba(30,110,100,0.04)] sm:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <SectionHeader icon={<Phone size={16} />} title="Información de contacto" />
                    <EditLabel />
                  </div>
                  <div className="divide-y divide-[#edf5f3]">
                    <InfoRow
                      icon={<Mail size={15} />}
                      label="Correo electrónico"
                      value="correo@ejemplo.com"
                    />
                    <InfoRow
                      icon={<Phone size={15} />}
                      label="Teléfono"
                      value="Número de contacto"
                    />
                    <InfoRow
                      icon={<MapPin size={15} />}
                      label="Dirección de residencia"
                      value="Ciudad, departamento"
                    />
                  </div>
                </section>

                <section className="rounded-2xl border border-[#e0f1ee] bg-white/90 p-4 shadow-[0_3px_12px_rgba(30,110,100,0.04)] sm:p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <SectionHeader icon={<GraduationCap size={16} />} title="Formación académica" />
                    <EditLabel />
                  </div>
                  <div className="divide-y divide-[#edf5f3]">
                    <InfoRow
                      icon={<BookOpen size={15} />}
                      label="Programa de formación"
                      value="Nombre del programa"
                    />
                    <InfoRow
                      icon={<FileText size={15} />}
                      label="Número de ficha"
                      value="Número de ficha"
                    />
                    <InfoRow
                      icon={<CalendarDays size={15} />}
                      label="Jornada"
                      value="Jornada de formación"
                    />
                    <InfoRow
                      icon={<BriefcaseBusiness size={15} />}
                      label="Modalidad"
                      value="Modalidad de formación"
                    />
                  </div>
                </section>

                <section className="rounded-2xl border border-[#e0f1ee] bg-white/90 p-4 shadow-[0_3px_12px_rgba(30,110,100,0.04)] sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <SectionHeader icon={<span className="text-lg leading-none">+</span>} title="Información adicional" />
                    <EditLabel />
                  </div>
                  <p className="pl-10 pt-2 text-xs leading-relaxed text-slate-500">
                    Aquí se podrá mostrar información adicional del perfil.
                  </p>
                </section>
              </div>
            </div>


          </div>
        </div>
      </div>
    </main>
  );
}
