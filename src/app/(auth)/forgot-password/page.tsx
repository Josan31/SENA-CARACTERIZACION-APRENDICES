"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Hash,
  IdCard,
  KeyRound,
  MessageSquare,
  Send,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   Reusable sub-components  (mirror login page patterns)
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
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#007832] shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105">
        {icon}
      </div>
      <span className="mt-1 text-sm font-bold tracking-wide text-white">
        {title}
      </span>
      <span className="text-xs font-medium leading-tight text-white/90">
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
  disabled,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  prefixIcon: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-sena-navy sm:text-sm"
      >
        {label}
      </label>
      <div
        className={[
          "flex items-center gap-2 rounded-xl border bg-white px-3.5 py-2.5 shadow-sm transition-all",
          disabled
            ? "border-gray-100 opacity-60 cursor-not-allowed"
            : "border-gray-200 focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20",
        ].join(" ")}
      >
        <span className="shrink-0 text-gray-400">{prefixIcon}</span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm font-medium text-sena-black placeholder:text-gray-400 outline-none disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Confirmation state card
───────────────────────────────────────────────────────── */
function ConfirmationView({ identifier }: { identifier: string }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      {/* Animated check icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#e8f8f0] to-[#c8eedd] shadow-inner">
        <CheckCircle2 size={42} className="text-sena-green" strokeWidth={1.8} />
      </div>

      <div>
        <h2 className="text-xl font-extrabold text-sena-navy">
          Correo enviado
        </h2>
        <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
          Hemos enviado instrucciones para restablecer tu contraseña al correo
          electrónico registrado asociado al documento{" "}
          <span className="font-bold text-sena-navy">{identifier}</span>.
        </p>
        <p className="mt-3 text-xs font-medium text-gray-400">
          Revisa tu bandeja de entrada y la carpeta de spam. El enlace expira en
          30 minutos.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-100" aria-hidden="true" />

      {/* Back to login */}
      <Link
        href="/login"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-sena-green/20 transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99]"
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
        <span>Volver al Inicio de Sesión</span>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main page
───────────────────────────────────────────────────────── */
export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Por favor ingresa tu número de documento o teléfono.");
      return;
    }

    setIsLoading(true);
    // Simulate async request
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <main className="flex h-screen w-full overflow-hidden font-primary">
      {/* ══════════════════════════════════════════════
          LEFT PANEL  (identical to login page)
      ══════════════════════════════════════════════ */}
      <section className="relative hidden h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#e8f8f0]/60 via-[#d4f0e4]/60 to-[#c0e8d6]/60 backdrop-blur-sm lg:flex lg:w-1/2 xl:w-3/5">
        {/* Background noise/pattern layer */}
        <div className="absolute inset-0 z-0 mix-blend-multiply opacity-70 pointer-events-none">
          <Image
            src="/login-images/bg-noise-login.png"
            alt="Patrón de fondo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Header capsule */}
        <header className="z-10 w-full shrink-0 px-8 pt-6">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-sena-green/10 bg-white/80 p-3.5 px-5 shadow-sm backdrop-blur-md">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <MessageSquare
                  size={22}
                  className="shrink-0 text-sena-green"
                  strokeWidth={2.5}
                />
                <span className="text-lg font-extrabold tracking-wide text-sena-green">
                  CARACTERIZA SENA
                </span>
              </div>
              <p className="pl-0.5 text-xs font-medium italic text-sena-navy/80">
                Conociendo a nuestra comunidad para potenciar tu formación.
              </p>
            </div>
            <div className="flex shrink-0 items-center justify-center rounded-full border border-sena-green/10 bg-white p-2.5 shadow-md">
              <Image
                src="/sena-logo-verde.png"
                alt="Logotipo SENA"
                width={50}
                height={50}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </header>

        {/* Illustration */}
        <div className="relative z-10 flex min-h-0 flex-1 items-end justify-center -mt-8 px-4 pb-0 pt-0">
          <div className="relative flex h-full w-full max-h-[520px] max-w-2xl items-end justify-center -mb-2">
            <Image
              src="/login-images/ilustration-login.png"
              alt="Ilustración CARACTERIZA SENA"
              fill
              priority
              className="object-contain object-bottom drop-shadow-md"
            />
          </div>
        </div>

        {/* Bottom banner */}
        <div className="relative z-20 w-full shrink-0">
          <div className="rounded-t-2xl border-t border-white/20 bg-gradient-to-r from-[#00903c] via-[#007832] to-[#005d27] px-6 py-5 shadow-lg">
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
          RIGHT PANEL — Forgot-password card
      ══════════════════════════════════════════════ */}
      <section className="z-10 flex h-full flex-1 flex-col items-center justify-center overflow-y-auto bg-white px-8 py-10 lg:px-16 xl:px-24">
        <div className="my-auto w-full max-w-md">
          {/* Branding */}
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <span className="text-xl font-extrabold tracking-wide text-sena-green">
              CARACTERIZA SENA
            </span>
            <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#e8f8f0] to-[#c8eedd]">
              <KeyRound
                size={24}
                className="text-sena-green-dark"
                strokeWidth={2}
              />
            </div>
            <h1 className="text-2xl font-bold text-sena-navy">
              Recuperar contraseña
            </h1>
            {!submitted && (
              <p className="mt-1 text-sm font-medium text-gray-400 leading-relaxed max-w-xs">
                Ingresa tu número de documento o teléfono registrado y te
                enviaremos las instrucciones a tu correo.
              </p>
            )}
          </div>

          {/* ── Submitted state ── */}
          {submitted ? (
            <ConfirmationView identifier={identifier} />
          ) : (
            /* ── Form state ── */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <FormField
                id="identifier"
                label="Número de documento asociado"
                type="text"
                placeholder="Ej. 1020304050"
                value={identifier}
                onChange={setIdentifier}
                prefixIcon={<Hash size={18} />}
              />

              {error && (
                <p
                  role="alert"
                  className="text-center text-xs font-medium text-red-500"
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  mt-1 flex w-full cursor-pointer items-center justify-center gap-3
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
                    <Send size={16} strokeWidth={2.5} aria-hidden="true" />
                    <span>ENVIAR INSTRUCCIONES</span>
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>

              {/* Back to login link */}
              <Link
                href="/login"
                className="flex items-center justify-center gap-1.5 text-sm font-semibold text-sena-green hover:underline"
              >
                <ArrowLeft size={15} strokeWidth={2.5} />
                Volver al inicio de sesión
              </Link>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
