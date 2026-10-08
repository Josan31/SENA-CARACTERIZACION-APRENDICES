"use client";

import {
  ArrowRight,
  ClipboardList,
  CreditCard,
  Eye,
  EyeOff,
  Hash,
  IdCard,
  Lock,
  LogIn,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   Opciones de Tipo de Documento SENA
───────────────────────────────────────────────────────── */
const DOCUMENT_TYPES = [
  { value: "CC", label: "Cédula de Ciudadanía (C.C.)" },
  { value: "TI", label: "Tarjeta de Identidad (T.I.)" },
  { value: "CE", label: "Cédula de Extranjería (C.E.)" },
  { value: "PEP", label: "Permiso Especial de Permanencia (PEP)" },
  { value: "PPT", label: "Permiso por Protección Temporal (PPT)" },
  { value: "PAS", label: "Pasaporte" },
];

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

function FeatureBadge({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      {/* Contenedor blanco más grande con sombra nítida para destacar sobre el fondo */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#007832] shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105">
        {icon}
      </div>
      <span className="text-sm font-bold text-white mt-1 tracking-wide">
        {title}
      </span>
      <span className="text-xs font-medium text-white/90 leading-tight">
        {subtitle}
      </span>
    </div>
  );
}

function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  prefixIcon,
  suffixNode,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  prefixIcon: React.ReactNode;
  suffixNode?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs sm:text-sm font-semibold text-sena-navy"
      >
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20 transition-all shadow-sm">
        <span className="shrink-0 text-gray-400">{prefixIcon}</span>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm font-medium text-sena-black placeholder:text-gray-400 outline-none"
        />

        {suffixNode}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Page Component
───────────────────────────────────────────────────────── */

export default function LoginPage() {
  const router = useRouter();

  const [docType, setDocType] = useState("CC");
  const [docNumber, setDocNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!privacyAccepted) {
      setError("Debes aceptar la política de privacidad para continuar.");
      return;
    }
    if (!docNumber || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (docNumber.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/aprendiz");
      }
      setIsLoading(false);
    }, 800);
  }

  return (
    <main className="flex h-screen w-full font-primary overflow-hidden">
      {/* ══════════════════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════════════════ */}
      <section className="relative hidden flex-col justify-between lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-[#e8f8f0]/60 via-[#d4f0e4]/60 to-[#c0e8d6]/60 backdrop-blur-sm overflow-hidden h-full">
        {/* Capa de imagen de ruido/patrón suave de fondo */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-70 mix-blend-multiply">
          <Image
            src="/login-images/bg-noise-login.png"
            alt="Patrón de fondo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Header balanceado con cápsula independiente para el logo */}
        <header className="px-8 pt-6 z-10 shrink-0 w-full">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 p-3.5 px-5 shadow-sm border border-sena-green/10 backdrop-blur-md">
            {/* Lado Izquierdo: Título y Eslogan */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <MessageSquare
                  size={22}
                  className="text-sena-green shrink-0"
                  strokeWidth={2.5}
                />
                <span className="text-lg font-extrabold tracking-wide text-sena-green">
                  CARACTERIZA SENA
                </span>
              </div>
              <p className="text-xs font-medium text-sena-navy/80 italic pl-0.5">
                Conociendo a nuestra comunidad para potenciar tu formación.
              </p>
            </div>

            {/* Lado Derecho: Logo SENA en badge circular/cápsula independiente */}
            <div className="flex items-center justify-center rounded-full bg-white p-2.5 shadow-md border border-sena-green/10 shrink-0">
              <Image
                src="/sena-logo-verde.png"
                alt="Logotipo SENA"
                width={50}
                height={50}
                priority
                className="object-contain min-w-[50px] min-h-[50px]"
              />
            </div>
          </div>
        </header>

        {/* Imagen Ilustración Pegada Abajo */}
        <div className="relative flex flex-1 items-end justify-center px-4 pt-0 pb-0 z-10 min-h-0 -mt-8">
          <div className="relative w-full h-full max-w-2xl max-h-[520px] flex items-end justify-center -mb-2">
            <Image
              src="/login-images/ilustration-login.png"
              alt="Ilustración CARACTERIZA SENA"
              fill
              priority
              className="object-contain object-bottom drop-shadow-md"
            />
          </div>
        </div>
        {/* Bottom Banner Plano */}
        <div className="relative z-20 w-full shrink-0">
          {/* Contenedor con borde superior curvo sobrio y degradado */}
          <div className="rounded-t-2xl bg-gradient-to-r from-[#00903c] via-[#007832] to-[#005d27] px-6 py-5 shadow-lg border-t border-white/20 relative z-10">
            <div className="flex items-center justify-around gap-2">
              <FeatureBadge
                icon={
                  <IdCard
                    size={26}
                    strokeWidth={2.2}
                    className="text-[#007832]"
                  />
                }
                title="Identifica"
                subtitle="Registra tu perfil institucional."
              />

              {/* Divisoria con alto contraste */}
              <div className="h-14 w-px bg-white/30" aria-hidden="true" />

              <FeatureBadge
                icon={
                  <ClipboardList
                    size={26}
                    strokeWidth={2.2}
                    className="text-[#007832]"
                  />
                }
                title="Caracteriza"
                subtitle="Tu información socioeconómica."
              />

              {/* Divisoria con alto contraste */}
              <div className="h-14 w-px bg-white/30" aria-hidden="true" />

              <FeatureBadge
                icon={
                  <UserCheck
                    size={26}
                    strokeWidth={2.2}
                    className="text-[#007832]"
                  />
                }
                title="Impulsa"
                subtitle="Mejoramos tu experiencia SENA."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RIGHT PANEL — Full Height & Full Width Block
      ══════════════════════════════════════════════ */}
      <section className="flex flex-1 flex-col justify-center items-center bg-white px-8 py-10 lg:px-16 xl:px-24 h-full overflow-y-auto z-10">
        <div className="w-full max-w-md my-auto">
          {/* Branding / Header */}
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wide text-sena-green">
                CARACTERIZA SENA
              </span>
            </div>
            <h1 className="text-2xl font-bold text-sena-navy mt-1">
              Iniciar Sesión
            </h1>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Tipo de Documento */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="docType"
                className="text-xs sm:text-sm font-semibold text-sena-navy"
              >
                Tipo de Documento
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20 transition-all shadow-sm">
                <span className="shrink-0 text-gray-400">
                  <CreditCard size={18} />
                </span>
                <select
                  id="docType"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-medium text-sena-black outline-none cursor-pointer"
                >
                  {DOCUMENT_TYPES.map((doc) => (
                    <option key={doc.value} value={doc.value}>
                      {doc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Número de Documento */}
            <FormField
              id="docNumber"
              label="Número de Documento"
              type="text"
              placeholder="Ej. 1020304050"
              value={docNumber}
              onChange={setDocNumber}
              prefixIcon={<Hash size={18} />}
            />

            {/* Contraseña */}
            <FormField
              id="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={setPassword}
              prefixIcon={<Lock size={18} />}
              suffixNode={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="shrink-0 text-gray-400 hover:text-sena-green transition-colors"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              }
            />

            <div className="flex items-center justify-between gap-2 pt-1">
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-sena-green"
                />
                <span className="text-xs sm:text-sm font-medium text-sena-navy">
                  Política de privacidad
                </span>
              </label>

              <button
                type="button"
                className="text-xs cursor-pointer sm:text-sm font-semibold text-sena-green hover:underline whitespace-nowrap"
              >
                ¿Sin contraseña?
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="text-xs font-medium text-red-500 text-center"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="
                mt-2 flex w-full cursor-pointer items-center justify-center gap-3
                rounded-full
                bg-gradient-to-r from-sena-green to-sena-green-dark
                px-6 py-3.5
                text-sm font-bold uppercase tracking-widest text-white
                shadow-lg shadow-sena-green/20
                transition-all duration-200
                hover:opacity-95 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              {isLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn size={18} strokeWidth={2.5} />
                  <span>INGRESAR</span>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
