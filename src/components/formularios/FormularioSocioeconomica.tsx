"use client";

import React from "react";
import DynamicFormRenderer from "@/components/formularios/DynamicFormRenderer";

interface FormularioSocioeconomicaProps {
  onSuccess?: () => void;
  linkVolver?: string;
  esVistaPrevia?: boolean;
}

export default function FormularioSocioeconomica({
  onSuccess,
  linkVolver = "/admin/formularios?form=salud",
  esVistaPrevia = false,
}: FormularioSocioeconomicaProps) {
  return (
    <DynamicFormRenderer
      moduloId="socioeconomica"
      tituloModulo="Módulo 3: Situación Socioeconómica"
      subtituloModulo="Informa sobre tu contexto socioeconómico, composición del hogar y focalización de apoyos."
      numeroPaso="Módulo 3 de 4"
      linkVolver={linkVolver}
      textoBotonSiguiente="Guardar y Continuar a Perfil Formativo"
      onSuccess={onSuccess}
      esVistaPrevia={esVistaPrevia}
    />
  );
}
