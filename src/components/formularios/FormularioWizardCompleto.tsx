"use client";

import React, { useState } from "react";
import FormularioConsentimiento from "./FormularioConsentimiento";
import FormularioBasica from "./FormularioBasica";
import FormularioSalud from "./FormularioSalud";
import FormularioSocioeconomica from "./FormularioSocioeconomica";
import FormularioFormativo from "./FormularioFormativo";
import Formulario10Confirmacion from "./Formulario10Confirmacion";
import Formulario10Finalizado from "./Formulario10Finalizado";

export type WizardStep =
  | "consentimiento"
  | "basica"
  | "salud"
  | "socioeconomica"
  | "formativo"
  | "confirmacion"
  | "finalizado";

export default function FormularioWizardCompleto() {
  const [currentStep, setCurrentStep] = useState<WizardStep>("consentimiento");
  const [radicadoGenerado, setRadicadoGenerado] = useState("RAD-SENA-2026-789412");

  const goToStep = (step: WizardStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#eef7f9] py-6 px-3 sm:px-6">
      {/* Selector Rápido de Paso para Pruebas / Desarrollo */}
      <div className="max-w-6xl mx-auto mb-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-bold text-sena-navy flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-sena-green" />
          Navegador Rápido de Flujo Completo:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "consentimiento", label: "0. Consentimiento" },
            { id: "basica", label: "1. Básica" },
            { id: "salud", label: "2. Salud" },
            { id: "socioeconomica", label: "3. Socioeconómica" },
            { id: "formativo", label: "4. Formativo" },
            { id: "confirmacion", label: "10. Confirmación" },
            { id: "finalizado", label: "✓ Radicado" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToStep(item.id as WizardStep)}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                currentStep === item.id
                  ? "bg-sena-green text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Renderizado Condicional del Componente según el Paso */}
      {currentStep === "consentimiento" && (
        <FormularioConsentimiento onContinue={() => goToStep("basica")} />
      )}

      {currentStep === "basica" && (
        <FormularioBasica />
      )}

      {currentStep === "salud" && (
        <FormularioSalud />
      )}

      {currentStep === "socioeconomica" && (
        <FormularioSocioeconomica />
      )}

      {currentStep === "formativo" && (
        <FormularioFormativo />
      )}

      {currentStep === "confirmacion" && (
        <Formulario10Confirmacion
          onBack={() => goToStep("formativo")}
          onSubmitSuccess={(rad) => {
            setRadicadoGenerado(rad);
            goToStep("finalizado");
          }}
        />
      )}

      {currentStep === "finalizado" && (
        <Formulario10Finalizado radicado={radicadoGenerado} />
      )}
    </div>
  );
}
