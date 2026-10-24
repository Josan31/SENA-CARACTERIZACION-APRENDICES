"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Check,
  Circle,
  Lock,
  AlertTriangle,
  FileText,
} from "lucide-react";

import FormularioBasica from "@/components/formularios/FormularioBasica";
import FormularioSalud from "@/components/formularios/FormularioSalud";
import FormularioSocioeconomica from "@/components/formularios/FormularioSocioeconomica";
import FormularioFormativo from "@/components/formularios/FormularioFormativo";
import FormularioAsesoriaDirecta from "@/components/formularios/FormularioAsesoriaDirecta";
import Formulario10Finalizado from "@/components/formularios/Formulario10Finalizado";
import DynamicFormRenderer from "@/components/formularios/DynamicFormRenderer";

/* ──────────────────────────────────────────────────────────────────────────
   ILUSTRACIONES VECTORIALES SVG EXACTAS AL MOCKUP DEL USUARIO
────────────────────────────────────────────────────────────────────────── */

/** Icono Tarjeta 1: Información Básica y Localización */
function InformacionBasicaIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f5] p-1.5 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        {/* Sombra suave / aura */}
        <circle cx="40" cy="40" r="34" fill="#d7f3ee" opacity="0.7" />

        {/* Persona (Avatar) */}
        {/* Cuerpo / Camiseta verde azulada */}
        <path
          d="M18 64C18 53.5 25.5 46 36 46H38C48.5 46 56 53.5 56 64"
          fill="#00785a"
        />
        {/* Cuello */}
        <path d="M33 42H41V47H33V42Z" fill="#ffcfa8" />
        {/* Cabeza */}
        <circle cx="37" cy="33" r="11.5" fill="#ffdcb8" />
        {/* Cabello estilizado verde oscuro institucional */}
        <path
          d="M26 31C26 24.5 30.8 19.5 37 19.5C43.2 19.5 48 24.5 48 31C48 33 46.5 34 44.5 34C43 34 42 32.5 40 31.5C38 30.5 35 30.5 33 31.5C31 32.5 30 34 28.5 34C26.5 34 26 33 26 31Z"
          fill="#004e26"
        />

        {/* Pin de Ubicación (Verde SENA con centro blanco) */}
        <g transform="translate(18, 4)">
          <path
            d="M36 17C36 10.37 30.63 5 24 5C17.37 5 12 10.37 12 17C12 25.5 24 37 24 37C24 37 36 25.5 36 17Z"
            fill="#00a85a"
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <circle cx="24" cy="17" r="4.2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

/** Icono Tarjeta 2: Salud y Condición Física */
function SaludCondicionFisicaIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f5] p-1.5 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#d7f3ee" opacity="0.7" />

        {/* Corazón verde */}
        <path
          d="M34 19C28.48 19 24 23.48 24 29C24 38 34 47.5 34 47.5C34 47.5 44 38 44 29C44 23.48 39.52 19 34 19Z"
          fill="#00a85a"
          transform="scale(1.18) translate(-6, -4)"
        />

        {/* Línea de pulso cardíaco ECG en blanco */}
        <path
          d="M26 30H30L32.5 25L35.5 34L38.5 27L40.5 31H44"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Curita / Tira adhesiva médica diagonal */}
        <g transform="rotate(-30 46 50)">
          <rect
            x="32"
            y="48"
            width="32"
            height="11"
            rx="5.5"
            fill="#a7e6cf"
            stroke="#008f4c"
            strokeWidth="1.6"
          />
          <circle cx="43" cy="53.5" r="1.3" fill="#00785a" />
          <circle cx="48" cy="53.5" r="1.3" fill="#00785a" />
          <circle cx="53" cy="53.5" r="1.3" fill="#00785a" />
        </g>

        {/* Mini cruz médica inferior izquierda */}
        <circle cx="24" cy="52" r="9" fill="#00a85a" stroke="#ffffff" strokeWidth="1.5" />
        <path
          d="M20 52H28M24 48V56"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** Icono Tarjeta 3: Salud Sexual y Reproductiva */
function SaludSexualReproductivaIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#f2eefb] p-1.5 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#e7def7" opacity="0.7" />

        {/* Símbolo masculino (arriba derecha) en verde */}
        <circle
          cx="43"
          cy="31"
          r="10.5"
          stroke="#00a85a"
          strokeWidth="3.4"
          fill="none"
        />
        <path
          d="M51 23L59.5 14.5M59.5 14.5H53M59.5 14.5V21"
          stroke="#00a85a"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Símbolo femenino (abajo izquierda) en verde institucional */}
        <circle
          cx="29"
          cy="42"
          r="10.5"
          stroke="#008f4c"
          strokeWidth="3.4"
          fill="none"
        />
        <path
          d="M29 53V63M24 58H34"
          stroke="#008f4c"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Paquete de protección / prevención (cuadrado teal) */}
        <g transform="translate(42, 42)">
          <rect
            x="0"
            y="0"
            width="20"
            height="20"
            rx="4.5"
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="1.5"
          />
          <circle cx="10" cy="10" r="5.5" fill="#38bdf8" />
          <circle cx="10" cy="10" r="2.8" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

/** Icono Tarjeta 4: Situación Socioeconómica */
function SituacionSocioeconomicaIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f5] p-1.5 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#d7f3ee" opacity="0.7" />

        {/* Silueta Persona 1 (izquierda) */}
        <circle cx="28" cy="27" r="7.5" fill="#00875a" />
        <path
          d="M17 56C17 47 22.5 41 28.5 41C34.5 41 40 47 40 56"
          fill="#00875a"
        />

        {/* Silueta Persona 2 (derecha) */}
        <circle cx="43" cy="24" r="8" fill="#00a85a" />
        <path
          d="M33 56C33 46 38.5 39 45 39C51.5 39 57 46 57 56"
          fill="#00a85a"
        />

        {/* Moneda / Símbolo de Dinero ($) en círculo dorado */}
        <g transform="translate(40, 40)">
          <circle
            cx="14"
            cy="14"
            r="12.5"
            fill="#fdc300"
            stroke="#b45309"
            strokeWidth="1.6"
          />
          <text
            x="14"
            y="19"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#78350f"
            fontFamily="sans-serif"
          >
            $
          </text>
        </g>
      </svg>
    </div>
  );
}

/** Icono Tarjeta 5: Perfil Formativo y Vacunación COVID-19 */
function PerfilFormativoIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#f2eefb] p-1.5 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#e7def7" opacity="0.7" />

        {/* Birrete de graduación (Mortarboard) */}
        <g transform="translate(6, 6)">
          <polygon points="32,14 56,25 32,36 8,25" fill="#005a40" />
          <path
            d="M18 29.5V38C18 43 24 46 32 46C40 46 46 43 46 38V29.5"
            fill="#003d2b"
          />
          <path
            d="M32 25L52 34V46"
            stroke="#fdc300"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="52" cy="47" r="2.5" fill="#fdc300" />
        </g>

        {/* Jeringa / Vacuna diagonal */}
        <g transform="rotate(-40 45 52)">
          {/* Aguja */}
          <line
            x1="22"
            y1="52"
            x2="14"
            y2="52"
            stroke="#94a3b8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Cilindro */}
          <rect
            x="22"
            y="47"
            width="25"
            height="10"
            rx="2"
            fill="#ffffff"
            stroke="#00875a"
            strokeWidth="1.8"
          />
          {/* Líquido verde */}
          <rect x="24" y="49" width="15" height="6" rx="1" fill="#00c853" />
          {/* Marcas de medición */}
          <line x1="30" y1="47" x2="30" y2="50" stroke="#004e26" strokeWidth="1" />
          <line x1="34" y1="47" x2="34" y2="50" stroke="#004e26" strokeWidth="1" />
          {/* Émbolo */}
          <rect x="47" y="50" width="8" height="4" fill="#00875a" />
          <line
            x1="55"
            y1="46"
            x2="55"
            y2="58"
            stroke="#00875a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

/** Icono Tarjeta 6: Reportes y Asesoría Directa */
function ReportesAsesoriaIcon() {
  return (
    <div className="relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f5] p-1.5 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
        <circle cx="40" cy="40" r="34" fill="#d7f3ee" opacity="0.7" />

        {/* Pantalla / Monitor con estadísticas */}
        <rect
          x="16"
          y="18"
          width="43"
          height="32"
          rx="5"
          fill="#003847"
          stroke="#00222b"
          strokeWidth="1.5"
        />
        {/* Cabecera del monitor */}
        <rect x="16" y="18" width="43" height="7" rx="4" fill="#00222b" />
        <circle cx="21" cy="21.5" r="1.5" fill="#ef4444" />
        <circle cx="26" cy="21.5" r="1.5" fill="#f59e0b" />
        <circle cx="31" cy="21.5" r="1.5" fill="#10b981" />

        {/* Barras del gráfico */}
        <rect x="23" y="36" width="5" height="10" rx="1.5" fill="#00a85a" />
        <rect x="31" y="30" width="5" height="16" rx="1.5" fill="#38bdf8" />
        <rect x="39" y="33" width="5" height="13" rx="1.5" fill="#fdc300" />
        <rect x="47" y="28" width="5" height="18" rx="1.5" fill="#a855f7" />

        {/* Soporte de la pantalla */}
        <path d="M33 50H42V55H33V50Z" fill="#00222b" />
        <rect x="28" y="55" width="19" height="3" rx="1.5" fill="#00222b" />

        {/* Auricular Telefónico verde superpuesto */}
        <g transform="translate(37, 33) rotate(15)">
          <path
            d="M10 8C7 5 3 6 1 9C-1 12 0 16 3 20C6 24 10 27 15 28C19 29 23 27 24 24C25 21 23 18 19 17L17 19C16 19 14 18 12 16C10 14 10 12 11 11L10 8Z"
            fill="#00a85a"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL: DASHBOARD DE 6 FORMULARIOS (MOCKUP EXACTO)
────────────────────────────────────────────────────────────────────────── */

type ActiveForm =
  | "basica"
  | "salud_fisica"
  | "salud_sexual"
  | "socioeconomica"
  | "formativo"
  | "reportes"
  | null;

function AprendizFormulariosContent() {
  const router = useRouter();
  const [selectedForm, setSelectedForm] = useState<ActiveForm>(null);
  const [showRecaracterizacionInfo, setShowRecaracterizacionInfo] = useState(false);

  // ════════════════════════════════════════════════════════════════════════
  // MODO DILIGENCIAMIENTO: Si el aprendiz hace clic en una tarjeta
  // ════════════════════════════════════════════════════════════════════════
  if (selectedForm !== null) {
    return (
      <div className="min-h-screen w-full bg-[#edf5f7] p-4 sm:p-6 md:p-10 font-primary">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Barra Superior de Retorno */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedForm(null)}
              className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-[#00304d] transition-all cursor-pointer"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>Volver al Catálogo de Formularios</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#008f4c] bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-[#008f4c] animate-pulse" />
              <span>Diligenciamiento de Módulo</span>
            </div>
          </div>

          {/* Formulario Activo Renderizado Sincronizado Par en Par */}
          <main className="rounded-3xl bg-white p-4 sm:p-8 shadow-sm border border-slate-200">
            {selectedForm === "basica" && (
              <DynamicFormRenderer
                moduloId="basica"
                tituloModulo="Módulo 1: Información Básica y Localización"
                subtituloModulo="Completa o actualiza tus datos de identidad, contacto, acudiente y residencia."
                numeroPaso="1 de 4"
                linkVolver=""
                textoBotonSiguiente="Guardar y Continuar a Salud"
                onSuccess={() => setSelectedForm("salud_fisica")}
              />
            )}
            {selectedForm === "salud_fisica" && (
              <DynamicFormRenderer
                moduloId="salud"
                tituloModulo="Módulo 2: Salud y Condición Física"
                subtituloModulo="Registra tu estado de salud, afiliación EPS, Sisbén y condiciones médicas."
                numeroPaso="2 de 4"
                linkVolver=""
                textoBotonSiguiente="Guardar y Continuar a Socioeconómica"
                onSuccess={() => setSelectedForm("socioeconomica")}
              />
            )}
            {selectedForm === "salud_sexual" && (
              <DynamicFormRenderer
                moduloId="salud"
                tituloModulo="Módulo 2: Salud Sexual y Reproductiva"
                subtituloModulo="Información confidencial protegida por secreto profesional de bienestar."
                numeroPaso="2 de 4"
                linkVolver=""
                textoBotonSiguiente="Guardar y Continuar"
                onSuccess={() => setSelectedForm(null)}
              />
            )}
            {selectedForm === "socioeconomica" && (
              <DynamicFormRenderer
                moduloId="socioeconomica"
                tituloModulo="Módulo 3: Situación Socioeconómica"
                subtituloModulo="Informa sobre tu contexto socioeconómico, composición del hogar y apoyos."
                numeroPaso="3 de 4"
                linkVolver=""
                textoBotonSiguiente="Guardar y Continuar a Perfil Formativo"
                onSuccess={() => setSelectedForm("formativo")}
              />
            )}
            {selectedForm === "formativo" && (
              <DynamicFormRenderer
                moduloId="formativo"
                tituloModulo="Módulo 4: Perfil Formativo y Vacunación COVID-19"
                subtituloModulo="Actualiza tu trayectoria académica, motivaciones y esquema de vacunación biológica."
                numeroPaso="4 de 4"
                linkVolver=""
                textoBotonSiguiente="Guardar y Finalizar Caracterización"
                onSuccess={() => setSelectedForm("reportes")}
              />
            )}
            {selectedForm === "reportes" && (
              <Formulario10Finalizado radicado="RAD-SENA-2026-789412" />
            )}
          </main>

          {/* Botón flotante inferior para volver */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setSelectedForm(null)}
              className="rounded-full bg-slate-200 hover:bg-slate-300 text-[#00304d] px-6 py-2.5 text-xs font-bold transition-all cursor-pointer"
            >
              ← Volver al Panel de Tarjetas
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // VISTA PRINCIPAL: 6 TARJETAS EXACTAS AL MOCKUP DEL USUARIO
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className="flex-1 w-full bg-[#edf5f7] p-4 sm:p-6 md:p-8 font-primary selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ── ENCABEZADO SUPERIOR: Botón Volver + Logo SENA Institucional ── */}
        <header className="flex items-start justify-between gap-4">
          {/* Botón Circular de Retorno (arriba a la izquierda) */}
          <button
            type="button"
            onClick={() => router.push("/aprendiz")}
            className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#00304d] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer hover:-translate-x-0.5 active:scale-95"
            aria-label="Volver al inicio"
            title="Volver"
          >
            <ArrowLeft size={20} strokeWidth={2.6} />
          </button>

          {/* Logotipo Oficial SENA (arriba a la derecha con barra inferior) */}
          <div className="flex flex-col items-end text-right select-none">
            <span className="text-xl sm:text-2xl font-black text-[#008f4c] tracking-tight leading-none mb-1">
              SENA
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#007038] leading-tight">
              Tecnología
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#007038] leading-tight">
              e innovación
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#007038] leading-tight pb-1">
              para un mejor país
            </span>
            <div className="w-full h-[3px] bg-[#008f4c] rounded-full" />
          </div>
        </header>

        {/* ── BIENVENIDA Y SUBTÍTULO DE FORMACIÓN ── */}
        <section className="space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#00304d] tracking-tight">
            Bienvenido(a), Valentina
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Programa de Formación: Tecnólogo en Programación de Software (Ficha 234567)
          </p>
        </section>

        {/* ── BARRA DE ALERTA RECARACTERIZACIÓN Y PROGRESO (65%) ── */}
        <section className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
            {/* Alerta de Recaracterización */}
            <div className="flex items-center gap-2">
              <AlertTriangle size={17} className="text-[#f59e0b] shrink-0" />
              <span className="font-extrabold uppercase tracking-wide text-[#00304d]">
                RECARACTERIZACIÓN REQUERIDA EN 3 MESES
              </span>
              <button
                type="button"
                onClick={() => setShowRecaracterizacionInfo(!showRecaracterizacionInfo)}
                className="text-[#0284c7] underline font-semibold hover:text-[#0369a1] transition-colors cursor-pointer ml-1"
              >
                Saber más
              </button>
            </div>

            {/* Porcentaje de avance */}
            <span className="font-extrabold text-[#00304d]">
              65% Completado
            </span>
          </div>

          {/* Mensaje colapsable de "Saber más" */}
          {showRecaracterizacionInfo && (
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-amber-200 text-xs text-slate-700 animate-in fade-in duration-200 space-y-1">
              <strong className="text-[#00304d]">¿Qué es la Recaracterización?</strong>
              <p>
                Cada 3 a 6 meses el SENA te solicitará validar cambios en tu dirección, afiliación a EPS, situación socioeconómica o estado de salud para mantener actualizados los apoyos de Bienestar al Aprendiz.
              </p>
            </div>
          )}

          {/* Barra de Progreso horizontal redondeada */}
          <div className="h-3 sm:h-3.5 w-full rounded-full bg-slate-200/90 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#008f5d] to-[#00b87c] transition-all duration-700 shadow-xs"
              style={{ width: "65%" }}
            />
          </div>
        </section>

        {/* ── CUADRÍCULA DE LAS 6 TARJETAS (3 COLUMNAS X 2 FILAS) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-2">
          {/* ══════════════════════════════════════════════════════════════════
              CARD 1: Información Básica y Localización.
          ══════════════════════════════════════════════════════════════════ */}
          <article
            onClick={() => setSelectedForm("basica")}
            className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden min-h-[195px]"
          >
            {/* Triángulo verde superior izquierdo (#39b54a) */}
            <div
              className="absolute top-0 left-0 w-7 h-7 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                backgroundColor: "#39b54a",
              }}
              aria-hidden="true"
            />

            {/* Cabecera con Ilustración y Título */}
            <div className="flex items-start gap-4">
              <InformacionBasicaIcon />
              <div className="flex-1 pt-1">
                <h2 className="text-base font-bold text-[#00304d] leading-snug">
                  Información Básica
                  <br />y Localización.
                </h2>
              </div>
            </div>

            {/* Pie de Tarjeta: Completado + Chevron derecho */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00875a] text-white">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Completado</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf7fc] text-[#0284c7] group-hover:bg-[#dff0fa] group-hover:scale-105 transition-all">
                <ChevronRight size={17} strokeWidth={2.8} />
              </div>
            </div>
          </article>

          {/* ══════════════════════════════════════════════════════════════════
              CARD 2: Salud y Condición Física.
          ══════════════════════════════════════════════════════════════════ */}
          <article
            onClick={() => setSelectedForm("salud_fisica")}
            className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden min-h-[195px]"
          >
            {/* Triángulo verde superior izquierdo */}
            <div
              className="absolute top-0 left-0 w-7 h-7 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                backgroundColor: "#39b54a",
              }}
              aria-hidden="true"
            />

            {/* Cabecera con Ilustración y Título */}
            <div className="flex items-start gap-4">
              <SaludCondicionFisicaIcon />
              <div className="flex-1 pt-1">
                <h2 className="text-base font-bold text-[#00304d] leading-snug">
                  Salud y Condición
                  <br />Física.
                </h2>
              </div>
            </div>

            {/* Pie de Tarjeta: Completado + Chevron derecho */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00875a] text-white">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Completado</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf7fc] text-[#0284c7] group-hover:bg-[#dff0fa] group-hover:scale-105 transition-all">
                <ChevronRight size={17} strokeWidth={2.8} />
              </div>
            </div>
          </article>

          {/* ══════════════════════════════════════════════════════════════════
              CARD 3: Salud Sexual y Reproductiva.
          ══════════════════════════════════════════════════════════════════ */}
          <article
            onClick={() => setSelectedForm("salud_sexual")}
            className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden min-h-[195px]"
          >
            {/* Triángulo morado superior izquierdo (#7b2cbf) */}
            <div
              className="absolute top-0 left-0 w-7 h-7 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                backgroundColor: "#7b2cbf",
              }}
              aria-hidden="true"
            />

            {/* Triángulo amarillo superior derecho (#fdc300) */}
            <div
              className="absolute top-0 right-0 w-7 h-7 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                backgroundColor: "#fdc300",
              }}
              aria-hidden="true"
            />

            {/* Cabecera con Ilustración, Título y Chevron a la derecha del título */}
            <div className="flex items-start gap-4">
              <SaludSexualReproductivaIcon />
              <div className="flex-1 flex items-start justify-between gap-2 pt-1">
                <h2 className="text-base font-bold text-[#00304d] leading-snug">
                  Salud Sexual y
                  <br />Reproductiva.
                </h2>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf7fc] text-[#0284c7] group-hover:bg-[#dff0fa] group-hover:scale-105 transition-all">
                  <ChevronRight size={17} strokeWidth={2.8} />
                </div>
              </div>
            </div>

            {/* Estado Pendiente, Candado de Seguridad y Alerta de Confidencialidad */}
            <div className="pt-3 mt-2 border-t border-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-slate-400" />
                  <span className="text-xs font-bold text-slate-600">Pendiente</span>
                </div>
                <Lock size={15} className="text-slate-400" />
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium flex items-center gap-1.5">
                <span className="text-[#f59e0b]">⚠️</span>
                <span>Tus datos son confidenciales y protegidos.</span>
              </p>
            </div>
          </article>

          {/* ══════════════════════════════════════════════════════════════════
              CARD 4: Situación Socioeconómica.
          ══════════════════════════════════════════════════════════════════ */}
          <article
            onClick={() => setSelectedForm("socioeconomica")}
            className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden min-h-[195px]"
          >
            {/* Triángulo verde superior izquierdo */}
            <div
              className="absolute top-0 left-0 w-7 h-7 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                backgroundColor: "#39b54a",
              }}
              aria-hidden="true"
            />

            {/* Cabecera con Ilustración y Título */}
            <div className="flex items-start gap-4">
              <SituacionSocioeconomicaIcon />
              <div className="flex-1 pt-1">
                <h2 className="text-base font-bold text-[#00304d] leading-snug">
                  Situación
                  <br />Socioeconómica.
                </h2>
              </div>
            </div>

            {/* Pie de Tarjeta: Completado + Chevron derecho */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00875a] text-white">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Completado</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf7fc] text-[#0284c7] group-hover:bg-[#dff0fa] group-hover:scale-105 transition-all">
                <ChevronRight size={17} strokeWidth={2.8} />
              </div>
            </div>
          </article>

          {/* ══════════════════════════════════════════════════════════════════
              CARD 5: Perfil Formativo y Vacunación COVID-19.
          ══════════════════════════════════════════════════════════════════ */}
          <article
            onClick={() => setSelectedForm("formativo")}
            className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden min-h-[195px]"
          >
            {/* Triángulo morado superior izquierdo (#7b2cbf) */}
            <div
              className="absolute top-0 left-0 w-7 h-7 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                backgroundColor: "#7b2cbf",
              }}
              aria-hidden="true"
            />

            {/* Cabecera con Ilustración y Título */}
            <div className="flex items-start gap-4">
              <PerfilFormativoIcon />
              <div className="flex-1 pt-1">
                <h2 className="text-base font-bold text-[#00304d] leading-snug">
                  Perfil Formativo y
                  <br />Vacunación COVID-19.
                </h2>
              </div>
            </div>

            {/* Pie de Tarjeta: Completado + Chevron derecho */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00875a] text-white">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Completado</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf7fc] text-[#0284c7] group-hover:bg-[#dff0fa] group-hover:scale-105 transition-all">
                <ChevronRight size={17} strokeWidth={2.8} />
              </div>
            </div>
          </article>

          {/* ══════════════════════════════════════════════════════════════════
              CARD 6: Reportes y Asesoría Directa.
          ══════════════════════════════════════════════════════════════════ */}
          <article className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden min-h-[195px]">
            {/* Triángulo verde superior izquierdo */}
            <div
              className="absolute top-0 left-0 w-7 h-7 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                backgroundColor: "#39b54a",
              }}
              aria-hidden="true"
            />

            {/* Triángulo azul oscuro superior derecho (#00304d) */}
            <div
              className="absolute top-0 right-0 w-7 h-7 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                backgroundColor: "#00304d",
              }}
              aria-hidden="true"
            />

            {/* Cabecera con Ilustración, Título y Chevron a la derecha */}
            <div className="flex items-start gap-4">
              <ReportesAsesoriaIcon />
              <div className="flex-1 flex items-start justify-between gap-2 pt-1">
                <h2 className="text-base font-bold text-[#00304d] leading-snug">
                  Reportes y
                  <br />Asesoría Directa.
                </h2>
                <button
                  type="button"
                  onClick={() => router.push("/aprendiz/resultados")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf7fc] text-[#0284c7] hover:bg-[#dff0fa] hover:scale-105 transition-all cursor-pointer"
                  title="Ver Resultados"
                >
                  <ChevronRight size={17} strokeWidth={2.8} />
                </button>
              </div>
            </div>

            {/* Estado Disponible + Botón Generar Reporte Personal */}
            <div className="pt-3 mt-2 border-t border-slate-50 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00875a]" />
                <span className="text-xs font-semibold text-slate-700">Disponible</span>
              </div>

              {/* Botón Verde: Generar Reporte Personal > */}
              <button
                type="button"
                onClick={() => router.push("/aprendiz/resultados")}
                className="w-full flex items-center justify-between rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white py-2.5 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2">
                  <FileText size={15} className="text-white shrink-0" />
                  <span>Generar Reporte Personal</span>
                </div>
                <ChevronRight size={16} strokeWidth={2.6} className="text-white shrink-0" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function AprendizFormulariosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#edf5f7]">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#008f4c] border-t-transparent" />
        </div>
      }
    >
      <AprendizFormulariosContent />
    </Suspense>
  );
}
