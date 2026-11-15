
"use client";

import {
  ArrowLeft,
  ArrowRight,
  Search,
  Users,
  Eye,
  IdCard,
  ClipboardList,
  GraduationCap,
  UserRound,
  FileText,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   1. DATA
   Información de ejemplo utilizada para mostrar los aprendices.
   Estos datos posteriormente pueden conectarse con la base de datos.
───────────────────────────────────────────────────────── */

const STUDENTS = [
  {
    id: 1,
    name: "Ana María López Vargas",
    identification: "472851",
    avatar: "AM",
    gender: "female",
  },
  {
    id: 2,
    name: "Carlos Arturo Díaz Herrera",
    identification: "472851",
    avatar: "CD",
    gender: "male",
  },
  {
    id: 3,
    name: "Elena Beatriz Torres Gómez",
    identification: "472851",
    avatar: "ET",
    gender: "female",
  },
  {
    id: 4,
    name: "Gabriel Hernán Ruiz Morales",
    identification: "472851",
    avatar: "GR",
    gender: "male",
  },
];

/* ─────────────────────────────────────────────────────────
   2. COMPONENTE: STUDENT CARD
   Representa la tarjeta individual de cada aprendiz.
   Muestra su nombre, identificación y botón para consultar
   sus resultados.
───────────────────────────────────────────────────────── */

function StudentCard({
  name,
  identification,
  avatar,
  gender,
}: {
  name: string;
  identification: string;
  avatar: string;
  gender: string;
}) {
  return (
    <article className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:gap-5 sm:p-5">

      {/* Línea decorativa lateral */}
      <div className="absolute left-0 top-0 h-full w-1.5 rounded-r-full bg-gradient-to-b from-[#36B957] to-[#009768]" />

      {/* Avatar del aprendiz */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#DDF5EC] bg-[#E8F8F0] text-sena-green-dark">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#D8F4E9] to-[#BCEAD8]">
          <UserRound
            size={29}
            strokeWidth={1.8}
            className="text-[#08613D]"
          />
        </div>
      </div>

      {/* Información personal del aprendiz */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-extrabold text-sena-navy sm:text-base">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <IdCard
            size={14}
            className="shrink-0 text-sena-green"
          />

          <p className="text-xs font-medium text-[#0088CC]">
            ID de la Ficha: {identification}
          </p>
        </div>
      </div>

      {/* Botón de acceso a los resultados */}
      <button
        type="button"
        className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#087D80] to-[#00918D] px-3 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:brightness-110 sm:px-5"
      >
        <Eye size={15} strokeWidth={2.5} />

        <span className="hidden sm:inline">
          Ver Resultados
        </span>

        <ArrowRight size={14} strokeWidth={2.5} />
      </button>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
   3. COMPONENTE: INFORMATION BANNER
   Presenta el encabezado informativo del listado de estudiantes.
   Incluye un título, una descripción y una ilustración decorativa.
───────────────────────────────────────────────────────── */

function InformationBanner() {
  return (
    <section className="relative flex min-h-[125px] items-center justify-between overflow-hidden rounded-2xl border border-[#D9F1F4] bg-gradient-to-r from-white via-[#F1FBFC] to-[#E3F6F5] px-5 py-5 shadow-sm sm:px-7">

      {/* Información principal */}
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E3F6F1]">
          <Users
            size={27}
            className="text-sena-green"
            strokeWidth={2.2}
          />
        </div>

        <div>
          <h2 className="text-base font-extrabold text-sena-navy sm:text-lg">
            Listado de Estudiantes
          </h2>

          <p className="mt-1 max-w-xl text-xs font-medium leading-relaxed text-gray-500 sm:text-sm">
            Aquí puedes ver el listado de estudiantes del programa,
            consultar sus resultados y acceder a la información
            detallada de cada uno.
          </p>
        </div>
      </div>

      {/* Ilustración decorativa del apartado */}
      <div className="relative ml-3 hidden h-24 w-40 shrink-0 items-center justify-center sm:flex">

        <div className="absolute h-20 w-32 rounded-full bg-[#D4F3E7]" />

        <div className="relative z-10 flex h-20 w-16 flex-col items-center justify-center rounded-xl border-[3px] border-[#009768] bg-white shadow-md">
          <div className="mb-2 flex h-5 w-5 items-center justify-center rounded bg-[#009768] text-white">
            <span className="text-sm font-bold">+</span>
          </div>

          <div className="mb-1 h-1 w-9 rounded-full bg-[#0088CC]" />
          <div className="mb-1 h-1 w-8 rounded-full bg-[#8DD8BC]" />
          <div className="mb-1 h-1 w-9 rounded-full bg-[#8DD8BC]" />
          <div className="h-1 w-7 rounded-full bg-[#8DD8BC]" />
        </div>

        <div className="absolute bottom-0 right-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#009768] text-white shadow-md">
          <GraduationCap size={34} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   4. PÁGINA PRINCIPAL: RESULTADOS 0.1
   Organiza los componentes anteriores y construye la interfaz.
   Contiene el encabezado, buscador, información del programa,
   listado de aprendices y pie de página.
───────────────────────────────────────────────────────── */

export default function ResultadosPage() {
  return (
    <main className="min-h-full flex-1 bg-[#EAF5F6] p-4 sm:p-6 lg:p-8">

      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6">

        {/* 4.1. ENCABEZADO PRINCIPAL */}
        <header className="flex items-center justify-between gap-4">

          <div className="flex min-w-0 items-center gap-4">

            {/* Botón de regreso */}
            <button
              type="button"
              aria-label="Regresar"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-sena-navy shadow-sm transition-all hover:shadow-md"
            >
              <ArrowLeft size={23} strokeWidth={2.5} />
            </button>

            {/* Título y descripción */}
            <div className="min-w-0">
              <h1 className="text-xl font-black tracking-tight text-sena-navy sm:text-2xl lg:text-3xl">
                Administración de Resultados
              </h1>

              <p className="mt-1 text-xs font-medium text-[#0088CC] sm:text-sm">
                Consulta y gestiona los resultados de los estudiantes del programa.
              </p>
            </div>
          </div>

          {/* Identidad institucional del SENA */}
          <div className="hidden shrink-0 flex-col items-center text-center sm:flex">
            <span className="text-2xl font-black leading-none text-[#009768]">
              SENA
            </span>

            <span className="mt-1 text-[10px] font-bold leading-tight text-sena-green-dark">
              Tecnología
              <br />
              e innovación
              <br />
              para un mejor país
            </span>

            <div className="mt-1 h-1 w-12 rounded-full bg-[#009768]" />
          </div>
        </header>

        {/* 4.2. PANEL INFORMATIVO */}
        <InformationBanner />

        {/* 4.3. BARRA DE BÚSQUEDA */}
        <section>
          <div className="flex items-center gap-3 rounded-full border border-[#D9EDEF] bg-white px-5 py-3 shadow-sm transition-all focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/10">

            <Search
              size={19}
              className="shrink-0 text-[#087D91]"
            />

            <input
              type="text"
              placeholder="Buscar por nombre o número de ficha..."
              aria-label="Buscar estudiante"
              className="w-full bg-transparent text-sm font-medium text-sena-navy outline-none placeholder:text-gray-400"
            />
          </div>
        </section>

        {/* 4.4. INFORMACIÓN DEL PROGRAMA */}
        <section className="overflow-hidden rounded-2xl border border-[#DCEFF0] bg-white shadow-sm">

          {/* Nombre del programa y número de ficha */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#F0FBF8] to-white px-4 py-3 sm:px-5">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DDF5EB]">
                <Users size={19} className="text-sena-green" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xs font-extrabold text-sena-navy sm:text-sm">
                  Estudiantes del Programa: Técnico en Desarrollo de Software
                </h2>
              </div>
            </div>

            {/* Identificación de la ficha */}
            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#D9F7EC] px-3 py-1.5">
              <ClipboardList
                size={13}
                className="text-sena-green"
              />

              <span className="text-[11px] font-bold text-sena-green-dark">
                Ficha: 472851
              </span>
            </div>
          </div>

          {/* 4.5. LISTADO DE APRENDICES */}
          <div className="flex flex-col gap-2.5 bg-[#F7FCFC] p-3 sm:p-4">

            {/* Genera una tarjeta por cada estudiante registrado */}
            {STUDENTS.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                identification={student.identification}
                avatar={student.avatar}
                gender={student.gender}
              />
            ))}

          </div>
        </section>

        {/* 4.6. PIE DE PÁGINA */}
        <footer className="flex items-center justify-center gap-2 py-2 text-center">
          <FileText
            size={14}
            className="text-sena-green"
          />

          <p className="text-[11px] font-medium text-gray-400">
            Sistema de Caracterización de Aprendices · SENA
          </p>
        </footer>

      </div>
    </main>
  );
}
