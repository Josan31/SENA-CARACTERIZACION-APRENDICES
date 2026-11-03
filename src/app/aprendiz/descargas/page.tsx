
"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  FileArchive,
  FileImage,
  ClipboardCheck,
  FileUser,
  CheckCircle2,
} from "lucide-react";

type DocumentType = "pdf" | "zip" | "svg";

export default function DescargarResultadosPage() {
  const [documentType, setDocumentType] = useState<DocumentType>("pdf");

  const [sections, setSections] = useState({
    salud: true,
    socioeconomica: true,
    formacion: true,
    datosPersonales: true,
  });

  const toggleSection = (section: keyof typeof sections) => {
    setSections((previous) => ({
      ...previous,
      [section]: !previous[section],
    }));
  };

  const documentOptions = [
    {
      id: "pdf" as const,
      title: "Reporte Ejecutivo (PDF)",
      description:
        "Resumen completo con gráficos y análisis de tu caracterización.",
      icon: FileText,
    },
    {
      id: "zip" as const,
      title: "Gráficos Individuales (ZIP de PNG)",
      description: "Todas las gráficas en alta resolución.",
      icon: FileArchive,
    },
    {
      id: "svg" as const,
      title: "Gráficos Vectoriales (SVG)",
      description: "Editables, para impresión o diseño.",
      icon: FileImage,
    },
  ];

  return (
    <main className="min-h-screen w-full bg-[#f1f9fc] px-4 py-6 text-[#173b63] sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* ENCABEZADO */}
        <header className="mb-7 flex items-start gap-4">
          <button
            type="button"
            aria-label="Volver"
            onClick={() => window.history.back()}
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#168c91] shadow-md transition hover:bg-[#e8f8f5]"
          >
            <ChevronLeft size={25} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#173b63] sm:text-3xl">
              Descargar Mis Resultados y Gráficos
            </h1>

            <p className="mt-1 text-sm text-[#6285a5]">
              Selecciona el formato y los datos que deseas exportar. Se
              generará un documento con las gráficas y análisis de tu
              caracterización actual.
            </p>
          </div>

          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-xl font-black leading-none text-[#08713e]">
              SENA
            </p>
            <p className="mt-1 text-[10px] leading-tight text-[#27634c]">
              Tecnología
              <br />
              e innovación
              <br />
              para un mejor país
            </p>
            <div className="ml-auto mt-2 h-1 w-12 bg-[#08713e]" />
          </div>
        </header>

        {/* CONTENEDOR GENERAL */}
        <div className="rounded-2xl border border-[#dceef5] bg-white/80 p-4 shadow-[0_5px_20px_rgba(44,115,150,0.08)] sm:p-6 lg:p-7">

          {/* PASO 1 */}
          <section>
            <h2 className="mb-3 text-base font-bold text-[#174879]">
              Paso 1: Seleccionar Tipo de Documento
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {documentOptions.map((option) => {
                const Icon = option.icon;
                const selected = documentType === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDocumentType(option.id)}
                    className={`relative flex min-h-[160px] flex-col items-center justify-center rounded-xl border p-5 text-center transition-all ${
                      selected
                        ? "border-[#45b99b] bg-[#e6f8f1] shadow-[0_3px_10px_rgba(33,160,125,0.10)]"
                        : "border-[#dceef5] bg-white hover:border-[#79cdb7] hover:bg-[#f8fdfb]"
                    }`}
                  >
                    <span
                      className={`absolute left-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        selected
                          ? "border-[#15996d]"
                          : "border-[#b9d1d9]"
                      }`}
                    >
                      {selected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#15996d]" />
                      )}
                    </span>

                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-[#e5f8f2] text-[#159b83]">
                      <Icon size={47} strokeWidth={1.7} />
                    </div>

                    <h3 className="text-sm font-bold text-[#174879]">
                      {option.title}
                    </h3>

                    <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-[#66849d]">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* PASO 2 */}
          <section className="mt-6 rounded-xl border border-[#dceef5] bg-white p-5 shadow-[0_3px_12px_rgba(44,115,150,0.06)]">
            <h2 className="mb-5 text-base font-bold text-[#174879]">
              Paso 2: Seleccionar Contenido del Reporte
            </h2>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#e5f8f2] text-[#159b83]">
                <ClipboardCheck size={65} strokeWidth={1.5} />
              </div>

              <div className="flex flex-1 flex-col gap-4">
                {[
                  { key: "salud", label: "Salud y Condición Física" },
                  {
                    key: "socioeconomica",
                    label: "Situación Socioeconómica",
                  },
                  {
                    key: "formacion",
                    label: "Perfil Formativo y Vacacional",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-center gap-3 text-sm text-[#416b8c]"
                  >
                    <input
                      type="checkbox"
                      checked={sections[item.key as keyof typeof sections]}
                      onChange={() =>
                        toggleSection(item.key as keyof typeof sections)
                      }
                      className="sr-only"
                    />

                    <CheckCircle2
                      size={19}
                      className={
                        sections[item.key as keyof typeof sections]
                          ? "fill-[#08734f] text-white"
                          : "text-gray-300"
                      }
                    />

                    {item.label}
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* PASO 3 */}
          <section className="mt-6 rounded-xl border border-[#dceef5] bg-white p-5 shadow-[0_3px_12px_rgba(44,115,150,0.06)]">
            <h2 className="mb-5 text-base font-bold text-[#174879]">
              Paso 3: Opciones Adicionales
            </h2>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
              <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-full bg-[#e5f8f2] text-[#159b83]">
                <FileUser size={58} strokeWidth={1.5} />
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-[#416b8c]">
                <input
                  type="checkbox"
                  checked={sections.datosPersonales}
                  onChange={() => toggleSection("datosPersonales")}
                  className="sr-only"
                />

                <CheckCircle2
                  size={19}
                  className={
                    sections.datosPersonales
                      ? "fill-[#08734f] text-white"
                      : "text-gray-300"
                  }
                />

                Incluir datos personales en el reporte
              </label>
            </div>
          </section>

          {/* BOTÓN DE DESCARGA */}
          <button
            type="button"
            onClick={() =>
              alert(
                "La generación y descarga de documentos se implementará posteriormente."
              )
            }
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#087966] to-[#2eaa91] px-4 py-4 text-sm font-bold text-white shadow-sm transition hover:brightness-105 active:scale-[0.99]"
          >
            <Download size={22} strokeWidth={2.5} />
            <span>GENERAR Y DESCARGAR DOCUMENTO</span>
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
    </main>
  );
}
