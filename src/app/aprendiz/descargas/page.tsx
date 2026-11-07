
"use client";

// ============================================================
// IMPORTACIONES Y DEPENDENCIAS
// ============================================================

// useState permite administrar los estados y las interacciones
// del usuario dentro del componente.
import { useState } from "react";

// Iconos utilizados para representar visualmente las opciones
// de descarga, navegación y selección de información.
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

// ============================================================
// DEFINICIÓN DE TIPOS
// ============================================================

// Define los formatos de documento permitidos para la exportación.
// Esto evita utilizar formatos diferentes a los establecidos.
type DocumentType = "pdf" | "zip" | "svg";

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

// Página encargada de presentar las opciones de exportación
// de los resultados obtenidos en la caracterización.
export default function DescargarResultadosPage() {

  // ----------------------------------------------------------
  // ESTADOS DEL COMPONENTE
  // ----------------------------------------------------------

  // Almacena el formato de documento seleccionado.
  // Por defecto, se encuentra seleccionado el formato PDF.
  const [documentType, setDocumentType] = useState<DocumentType>("pdf");

  // Controla qué categorías de información se incluirán
  // en el reporte. Todas las opciones comienzan activadas.
  const [sections, setSections] = useState({
    "informacion basica": true,
    "salud": true,
    "salud sexual": true,
    "socioeconomica": true,
    "formacion": true,
    "datosPersonales": true,
  });

  // ----------------------------------------------------------
  // FUNCIÓN PARA MODIFICAR LAS SECCIONES DEL REPORTE
  // ----------------------------------------------------------


  const toggleSection = (section: keyof typeof sections) => {  // Aquí estamos creando una función llamada toggleSection
    setSections((previous) => ({  //Aquí utilizamos setSections, que es la función encargada de actualizar el estado que creamos
      ...previous,
      [section]: !previous[section],
    }));
  };

  // ----------------------------------------------------------
  // CONFIGURACIÓN DE LOS FORMATOS DE EXPORTACIÓN
  // ----------------------------------------------------------

  // Arreglo que contiene las opciones disponibles.
  // Cada formato tiene un identificador, título, descripción
  // e icono que lo representa visualmente.
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

  // ==========================================================
  // RENDERIZADO DE LA INTERFAZ
  // ==========================================================

  return (
    //<main etiqueta semántica, indica el contenido principal
    <main className="min-h-screen w-full bg-[#f1f9fc] px-4 py-6 text-[#173b63] sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* ==================================================
            ENCABEZADO DE LA PÁGINA
            ================================================== */}

        {/* Incluye el botón para regresar, el título de la
            funcionalidad, su descripción y la identificación
            institucional del SENA. */}
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

          {/* Identificación institucional visible en pantallas
              medianas y grandes. */}
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

        {/* ==================================================
            CONTENEDOR PRINCIPAL
            ================================================== */}

        {/* Agrupa los pasos de configuración y el botón final
            de generación y descarga del documento. */}
        <div className="rounded-2xl border border-[#dceef5] bg-white/80 p-4 shadow-[0_5px_20px_rgba(44,115,150,0.08)] sm:p-6 lg:p-7">

          {/* ==================================================
              PASO 1: SELECCIÓN DEL FORMATO
              ================================================== */}

          {/* Presenta las tres alternativas de exportación.
              El usuario puede seleccionar una mediante las
              tarjetas interactivas. */}
          <section>
            <h2 className="mb-3 text-base font-bold text-[#174879]">
              Paso 1: Seleccionar Tipo de Documento
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Recorre las opciones configuradas y genera
                  una tarjeta interactiva para cada formato. */}
              {documentOptions.map((option) => {
                const Icon = option.icon;

                // Comprueba si el formato actual coincide
                // con el seleccionado por el usuario.
                const selected = documentType === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"

                    // Actualiza el formato seleccionado.
                    onClick={() => setDocumentType(option.id)}

                    // Modifica los estilos según el estado
                    // de selección de cada tarjeta.
                    className={`relative flex min-h-[160px] flex-col items-center justify-center rounded-xl border p-5 text-center transition-all ${
                      selected
                        ? "border-[#45b99b] bg-[#e6f8f1] shadow-[0_3px_10px_rgba(33,160,125,0.10)]"
                        : "border-[#dceef5] bg-white hover:border-[#79cdb7] hover:bg-[#f8fdfb]"
                    }`}
                  >
                    {/* Indicador circular de selección.
                    Es un operador ternario que comprueba el valor de selected*/}
                    <span
                      className={`absolute left-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        selected
                          ? "border-[#15996d]"
                          : "border-[#b9d1d9]"
                      }`}
                    >{/*Aquí se utiliza el operador lógico && para mostrar un elemento únicamente cuando se cumple una condición.*/}
                      {selected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#15996d]" />
                      )}
                    </span>

                    {/* Icono correspondiente al formato. */}
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-[#e5f8f2] text-[#159b83]">
                      <Icon size={47} strokeWidth={1.7} />
                    </div>
                    {/*Dinamica del titulo*/}
                    <h3 className="text-sm font-bold text-[#174879]">
                      {option.title}
                    </h3>
                    {/*descripcion*/}
                    <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-[#66849d]">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ==================================================
              PASO 2: SELECCIÓN DEL CONTENIDO
              ================================================== */}

          {/* Permite elegir las categorías de información
              que se desean incorporar en el reporte. */}
          <section className="mt-6 rounded-xl border border-[#dceef5] bg-white p-5 shadow-[0_3px_12px_rgba(44,115,150,0.06)]">
            <h2 className="mb-5 text-base font-bold text-[#174879]">
              Paso 2: Seleccionar Contenido del Reporte
            </h2>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">

              {/* Icono representativo de la selección
                  y organización de la información. */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#e5f8f2] text-[#159b83]">
                <ClipboardCheck size={65} strokeWidth={1.5} />
              </div>

              <div className="flex flex-1 flex-col gap-4">

                {/* Categorías disponibles para incluir
                    o excluir del documento. */}
                {[
                  { key: "informacion basica ", label: "Información Básica y Localización" },
                  { key: "salud", label: "Salud y Condición Física" },
                  {key: "salud sexual", label: "Salud Sexual y Reproductiva" },
                  {key: "socioeconomica", label: "Situación Socioeconómica" },
                  {key: "formacion", label: "Perfil Formativo y Vacacional", },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-center gap-3 text-sm text-[#416b8c]"
                  >
                    {/* Casilla de selección vinculada al estado
                        de la categoría correspondiente. */}
                    <input
                      type="checkbox"
                      checked={sections[item.key as keyof typeof sections]}
                      onChange={() =>
                        toggleSection(item.key as keyof typeof sections)
                      }
                      className="sr-only"
                    />

                    {/* Indicador visual que refleja si la
                        categoría está seleccionada. */}
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

          {/* ==================================================
              PASO 3: OPCIONES ADICIONALES
              ================================================== */}

          {/* Permite configurar la inclusión de información
              personal dentro del documento de exportación. */}
          <section className="mt-6 rounded-xl border border-[#dceef5] bg-white p-5 shadow-[0_3px_12px_rgba(44,115,150,0.06)]">
            <h2 className="mb-5 text-base font-bold text-[#174879]">
              Paso 3: Opciones Adicionales
            </h2>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">

              {/* Icono representativo de los datos personales. */}
              <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-full bg-[#e5f8f2] text-[#159b83]">
                <FileUser size={58} strokeWidth={1.5} />
              </div>

              {/* Control independiente para incluir o excluir
                  los datos personales del reporte. */}
              <label className="flex cursor-pointer items-center gap-3 text-sm text-[#416b8c]">
                <input
                  type="checkbox"
                  checked={sections.datosPersonales}
                  onChange={() => toggleSection("datosPersonales")}
                  className="sr-only"
                />
                {/*Este componente muestra el icono que representa visualmente si los datos personales están incluidos o excluidos.*/}
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

          {/* ==================================================
              GENERACIÓN Y DESCARGA DEL DOCUMENTO
              ================================================== */}

          {/* Botón principal que representa la acción final.
              Actualmente solo muestra un mensaje informativo,
              ya que la generación real de archivos está
              pendiente de implementación. */}
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
