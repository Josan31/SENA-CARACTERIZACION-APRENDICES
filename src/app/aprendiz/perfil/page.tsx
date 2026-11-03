"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Loader2,
  AlertCircle,
  Activity,
  Award,
} from "lucide-react";
import { obtenerMiCaracterizacion, MiCaracterizacionResponse } from "@/lib/caracterizacion";
import { getUser } from "@/lib/auth";

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3 py-2.5 sm:grid-cols-[24px_minmax(0,1fr)] sm:gap-4 border-b border-[#edf5f3] last:border-b-0">
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
    <Link
      href="/aprendiz/formularios"
      className="inline-flex items-center gap-1.5 rounded-full border border-[#b8ead4] bg-white px-3 py-1.5 text-xs font-bold text-[#087d4b] hover:bg-emerald-50 transition-all"
    >
      <Pencil size={12} />
      Actualizar
    </Link>
  );
}

function ProfileAvatar({ nombre = "A", large = false }: { nombre?: string; large?: boolean }) {
  const initial = nombre ? nombre.charAt(0).toUpperCase() : "A";
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-[#a8e8c9] via-[#6dd4a7] to-[#149c6b] shadow-sm text-white font-extrabold ${
        large ? "h-24 w-24 sm:h-28 sm:w-28 text-3xl" : "h-16 w-16 text-xl"
      }`}
    >
      <span>{initial}</span>
    </div>
  );
}

export default function PerfilAprendizPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MiCaracterizacionResponse | null>(null);

  useEffect(() => {
    async function cargarPerfil() {
      try {
        setLoading(true);
        const res = await obtenerMiCaracterizacion();
        setData(res);
      } catch (err) {
        console.warn("No se pudo cargar caracterización activa:", err);
      } finally {
        setLoading(false);
      }
    }
    cargarPerfil();
  }, []);

  const user = getUser();
  const aprendiz = data?.aprendiz;
  const caracterizacion = data?.caracterizacion;
  const localizacion = caracterizacion?.localizaciones?.[0];
  const salud = caracterizacion?.saludes?.[0];
  const covid = caracterizacion?.covids19?.[0];
  const socio = caracterizacion?.situaciones?.[0];
  const perfil = caracterizacion?.perfiles?.[0];

  const nombreMostrado = aprendiz?.nombreCompleto || user?.nombre || "Aprendiz SENA";
  const docTipo = aprendiz?.tipoDocumento?.valor || user?.tipoDocumento || "CC";
  const docNum = aprendiz?.numeroDocumento || user?.numeroDocumento || "—";
  const fechaNac = aprendiz?.fechaNacimiento
    ? new Date(aprendiz.fechaNacimiento).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  // Calcular edad
  let edadTexto = "—";
  if (aprendiz?.fechaNacimiento) {
    const diff = Date.now() - new Date(aprendiz.fechaNacimiento).getTime();
    const ageDate = new Date(diff);
    edadTexto = `${Math.abs(ageDate.getUTCFullYear() - 1970)} años`;
  }

  const tabs = [
    { id: "personal", title: "Información personal", icon: <UserRound size={16} /> },
    { id: "contacto", title: "Contacto y residencia", icon: <Mail size={16} /> },
    { id: "formacion", title: "Formación académica", icon: <GraduationCap size={17} /> },
    { id: "salud", title: "Salud y bienestar", icon: <Activity size={16} /> },
  ];

  return (
    <main className="min-h-screen bg-[#f3faf7] px-4 py-6 sm:px-6 lg:px-8 font-primary">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/aprendiz"
            className="inline-flex items-center gap-2 rounded-full border border-[#dcefe7] bg-white px-4 py-2 text-xs font-bold text-[#174d4b] shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft size={15} />
            Volver al inicio
          </Link>

          <span className="inline-flex items-center rounded-full border border-[#dcefe7] bg-[#edf9f3] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087d4b]">
            Perfil del aprendiz
          </span>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#dcefe7] bg-white shadow-[0_12px_30px_rgba(12,73,59,0.08)]">
          <header className="border-b border-[#edf4f1] bg-gradient-to-r from-[#e8f8f3] to-white px-4 py-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <ProfileAvatar nombre={nombreMostrado} large />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5a9a85]">
                      Aprendiz Matriculado
                    </span>
                    {caracterizacion?.radicado && (
                      <span className="rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 px-2.5 py-0.5 text-[10px] font-black">
                        {caracterizacion.radicado}
                      </span>
                    )}
                  </div>
                  <h1 className="mt-1 text-xl font-black text-[#174d4b] sm:text-2xl">
                    {nombreMostrado}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#4a7f6d]">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dcefe7] bg-white px-3 py-1 shadow-xs">
                      <GraduationCap size={13} />
                      {user?.programa || "Análisis y Desarrollo de Software"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dcefe7] bg-white px-3 py-1 shadow-xs">
                      <BookOpen size={13} />
                      Ficha {user?.ficha || "2670142"}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/aprendiz/formularios"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#087d4b] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#066d42] shrink-0"
              >
                <Pencil size={14} />
                Actualizar Caracterización
              </Link>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-8">
            <div className="mb-5">
              <div className="flex items-center gap-3 rounded-2xl border border-[#d8f1e9] bg-gradient-to-r from-[#e8f8f3] to-[#f1fbf8] p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#087d4b] shadow-sm">
                  <Sprout size={24} />
                </span>
                <div>
                  <p className="text-sm font-bold leading-snug text-[#367d70]">
                    “El conocimiento es la llave para un mejor futuro”
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#5d9c8c]">
                    SENA — Regional y Centro de Formación
                  </p>
                </div>
              </div>
            </div>

            {/* Pestañas de Navegación */}
            <nav
              aria-label="Secciones del perfil"
              className="flex gap-2 overflow-x-auto border-b border-[#e4f1ef] py-1"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold sm:text-sm transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "border-[#087d4b] text-[#087d4b]"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab.icon}
                  {tab.title}
                </button>
              ))}
            </nav>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <Loader2 className="animate-spin text-[#087d4b]" size={32} />
                <p className="text-xs font-bold text-slate-500">Cargando datos del perfil...</p>
              </div>
            ) : (
              <div className="grid gap-6 pt-6 lg:grid-cols-2">
                {/* Columna Izquierda según Pestaña */}
                <div className="space-y-6">
                  {activeTab === "personal" && (
                    <section className="rounded-2xl border border-[#e0f1ee] bg-white p-5 shadow-xs">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <SectionHeader icon={<UserRound size={16} />} title="Información de Identidad" />
                        <EditLabel />
                      </div>
                      <div className="divide-y divide-[#edf5f3]">
                        <InfoRow icon={<FileText size={15} />} label="Tipo de documento" value={docTipo} />
                        <InfoRow icon={<FileText size={15} />} label="Número de documento" value={docNum} />
                        <InfoRow icon={<CalendarDays size={15} />} label="Fecha de nacimiento" value={fechaNac} />
                        <InfoRow icon={<Clock3 size={15} />} label="Edad" value={edadTexto} />
                        <InfoRow icon={<UsersRound size={15} />} label="Sexo biológico" value={aprendiz?.sexo?.valor || "—"} />
                        <InfoRow icon={<Heart size={15} />} label="Estado civil" value={aprendiz?.estadoCivil?.valor || "—"} />
                        <InfoRow icon={<Star size={15} />} label="Comunidad LGBTIQ+" value={aprendiz?.seReconoceLgbtiq ? "Sí" : "No"} />
                      </div>
                    </section>
                  )}

                  {activeTab === "contacto" && (
                    <section className="rounded-2xl border border-[#e0f1ee] bg-white p-5 shadow-xs">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <SectionHeader icon={<Phone size={16} />} title="Información de Contacto" />
                        <EditLabel />
                      </div>
                      <div className="divide-y divide-[#edf5f3]">
                        <InfoRow icon={<Mail size={15} />} label="Correo personal" value={aprendiz?.correoPersonal || user?.correo || "—"} />
                        <InfoRow icon={<Mail size={15} />} label="Correo institucional" value={aprendiz?.correoInstitucional || "—"} />
                        <InfoRow icon={<Phone size={15} />} label="Teléfono de contacto" value={aprendiz?.telefono || "—"} />
                        <InfoRow icon={<MapPin size={15} />} label="Dirección de residencia" value={localizacion?.direccion || "—"} />
                        <InfoRow icon={<MapPin size={15} />} label="Ciudad / Municipio" value={localizacion?.ciudad?.valor || "—"} />
                        <InfoRow icon={<MapPin size={15} />} label="Estrato socioeconómico" value={localizacion?.estrato?.valor || "—"} />
                      </div>
                    </section>
                  )}

                  {activeTab === "formacion" && (
                    <section className="rounded-2xl border border-[#e0f1ee] bg-white p-5 shadow-xs">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <SectionHeader icon={<GraduationCap size={16} />} title="Matrícula y Trayectoria" />
                        <EditLabel />
                      </div>
                      <div className="divide-y divide-[#edf5f3]">
                        <InfoRow icon={<BookOpen size={15} />} label="Programa SENA" value={user?.programa || "Análisis y Desarrollo de Software"} />
                        <InfoRow icon={<FileText size={15} />} label="Ficha de matrícula" value={user?.ficha || "2670142"} />
                        <InfoRow icon={<Award size={15} />} label="Nivel formación previo" value={perfil?.nivelFormacionPrevio?.valor || "—"} />
                        <InfoRow icon={<BriefcaseBusiness size={15} />} label="Formación previa SENA" value={perfil?.formacionPreviaSena ? "Sí" : "No"} />
                        <InfoRow icon={<Star size={15} />} label="Motivación de ingreso" value={perfil?.motivacion?.valor || "—"} />
                      </div>
                    </section>
                  )}

                  {activeTab === "salud" && (
                    <section className="rounded-2xl border border-[#e0f1ee] bg-white p-5 shadow-xs">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <SectionHeader icon={<Activity size={16} />} title="Afiliación y Sisbén" />
                        <EditLabel />
                      </div>
                      <div className="divide-y divide-[#edf5f3]">
                        <InfoRow icon={<Activity size={15} />} label="EPS Afiliada" value={salud?.eps?.valor || "—"} />
                        <InfoRow icon={<Activity size={15} />} label="Régimen de salud" value={salud?.regimenSalud?.valor || "—"} />
                        <InfoRow icon={<FileText size={15} />} label="Estado Sisbén" value={salud?.sisbenEstado?.valor || "—"} />
                        <InfoRow icon={<FileText size={15} />} label="Grupo Sisbén" value={salud?.grupoSisben?.valor || "No aplica"} />
                        <InfoRow icon={<Activity size={15} />} label="Discapacidad" value={salud?.presentaDiscapacidad ? (salud?.tipoDiscapacidad?.valor || "Sí") : "No"} />
                      </div>
                    </section>
                  )}
                </div>

                {/* Columna Derecha según Pestaña */}
                <div className="space-y-6">
                  {activeTab === "personal" && (
                    <section className="rounded-2xl border border-[#e0f1ee] bg-white p-5 shadow-xs">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <SectionHeader icon={<UsersRound size={16} />} title="Contacto de Emergencia" />
                        <EditLabel />
                      </div>
                      <div className="divide-y divide-[#edf5f3]">
                        <InfoRow icon={<UserRound size={15} />} label="Nombre de acudiente" value={aprendiz?.contactoEmergenciaNombre || "—"} />
                        <InfoRow icon={<Phone size={15} />} label="Teléfono acudiente" value={aprendiz?.contactoEmergenciaTelefono || "—"} />
                        <InfoRow icon={<Heart size={15} />} label="Parentesco" value={aprendiz?.contactoEmergenciaParentesco?.valor || "—"} />
                      </div>
                    </section>
                  )}

                  {activeTab === "contacto" && (
                    <section className="rounded-2xl border border-[#e0f1ee] bg-white p-5 shadow-xs">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <SectionHeader icon={<BriefcaseBusiness size={16} />} title="Contexto Socioeconómico" />
                        <EditLabel />
                      </div>
                      <div className="divide-y divide-[#edf5f3]">
                        <InfoRow icon={<BriefcaseBusiness size={15} />} label="Sustento del hogar" value={socio?.sustentoPrincipal?.valor || "—"} />
                        <InfoRow icon={<Star size={15} />} label="Jefe de hogar" value={socio?.jefeHogar ? "Sí" : "No"} />
                        <InfoRow icon={<FileText size={15} />} label="Rango de ingresos" value={socio?.rangoIngresos?.valor || "—"} />
                        <InfoRow icon={<FileText size={15} />} label="Fuente de ingresos" value={socio?.fuenteIngresos?.valor || "—"} />
                        <InfoRow icon={<UsersRound size={15} />} label="Grupo étnico" value={socio?.grupoEtnico?.valor || "—"} />
                      </div>
                    </section>
                  )}

                  {activeTab === "formacion" && (
                    <section className="rounded-2xl border border-[#e0f1ee] bg-white p-5 shadow-xs">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <SectionHeader icon={<BriefcaseBusiness size={16} />} title="Perfil Laboral Actual" />
                        <EditLabel />
                      </div>
                      <div className="divide-y divide-[#edf5f3]">
                        <InfoRow icon={<BriefcaseBusiness size={15} />} label="¿Trabaja actualmente?" value={perfil?.trabajaActualmente ? "Sí" : "No"} />
                        <InfoRow icon={<ShieldCheck size={15} />} label="Estado caracterización" value={caracterizacion?.estado === "completa" ? "Al día (Vigente)" : "Pendiente"} />
                        <InfoRow icon={<FileText size={15} />} label="Versión de registro" value={caracterizacion ? `Versión ${caracterizacion.version}` : "—"} />
                      </div>
                    </section>
                  )}

                  {activeTab === "salud" && (
                    <section className="rounded-2xl border border-[#e0f1ee] bg-white p-5 shadow-xs">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <SectionHeader icon={<ShieldCheck size={16} />} title="Vacunación COVID-19" />
                        <EditLabel />
                      </div>
                      <div className="divide-y divide-[#edf5f3]">
                        <InfoRow icon={<ShieldCheck size={15} />} label="¿Vacunado?" value={covid?.vacunado ? "Sí" : "No"} />
                        <InfoRow icon={<Activity size={15} />} label="Biológico / Vacuna" value={covid?.vacuna?.valor || "No aplica"} />
                        <InfoRow icon={<FileText size={15} />} label="Número de dosis" value={covid?.dosis != null ? `${covid.dosis} dosis` : "—"} />
                        <InfoRow icon={<ShieldCheck size={15} />} label="Esquema completo" value={covid?.esquemaCompleto ? "Sí" : "No"} />
                      </div>
                    </section>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
