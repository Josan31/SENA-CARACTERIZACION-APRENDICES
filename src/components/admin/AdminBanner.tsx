import React from "react";
import Image from "next/image";

export function AdminBanner() {
  return (
    <section
      aria-labelledby="welcome-heading"
      className="relative flex flex-col lg:flex-row items-center justify-between gap-6 rounded-3xl p-6 md:p-8 shadow-xs border border-gray-100/80 mb-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #c9ede5 0%, #d9f5ef 50%, #ecfaf4 100%)",
      }}
    >
      {/* ── Esquina izquierda / Ícono y Textos ── */}
      <div className="flex items-start gap-5 flex-1 min-w-0 z-10 lg:pr-72">
        {/* Megáfono absoluto — no empuja el texto */}
        <div
          className="relative shrink-0 self-stretch"
          style={{ width: "88px" }}
        >
          <div className="absolute -top-2 -left-1 w-24 h-24 drop-shadow-lg pointer-events-none">
            <Image
              src="/admin-images/left-megaphone.png"
              alt="Megáfono"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Textos institucionales */}
        <div className="flex-1 min-w-0">
          <h2
            id="welcome-heading"
            className="text-base md:text-lg font-extrabold text-sena-navy tracking-tight leading-snug"
          >
            PANEL DE GESTIÓN DE BIENESTAR AL APRENDIZ
          </h2>
          <p className="mt-1.5 text-xs md:text-sm font-medium text-sena-navy/75 leading-relaxed max-w-xl">
            Espacio de supervisión y gestión institucional. Monitorea el estado
            de diligenciamiento de los aprendices, supervisa las respuestas a
            los módulos de caracterización y configura la oferta de apoyos de
            sostenimiento en el SENA.
          </p>
        </div>
      </div>

      {/* ── Ilustración Desktop: alineada al fondo derecho, dentro del contenedor ── */}
      <div className="hidden lg:block absolute -right-6 bottom-0 w-[380px] h-[210px] pointer-events-none z-1">
        <Image
          src="/admin-images/card-bienvenida-ilustracion.png"
          alt="Ilustración de gestión institucional"
          fill
          className="object-contain object-bottom drop-shadow-lg"
          priority
        />
      </div>

      {/* Versión responsiva para móviles */}
      <div className="relative flex lg:hidden items-center justify-center w-full h-[180px] z-10 mt-2">
        <Image
          src="/admin-images/card-bienvenida-ilustracion.png"
          alt="Ilustración de gestión institucional"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Ruido de fondo sutil */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply rounded-3xl overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/login-images/bg-noise-login.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Orbes decorativos de fondo sutiles */}
      <div
        className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/40 blur-xl pointer-events-none z-0"
        aria-hidden="true"
      />
    </section>
  );
}
