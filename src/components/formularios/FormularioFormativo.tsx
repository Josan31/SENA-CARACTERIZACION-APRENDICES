"use client";

import React from "react";
import DynamicFormRenderer from "@/components/formularios/DynamicFormRenderer";

interface FormularioFormativoProps {
  onSuccess?: () => void;
  linkVolver?: string;
  esVistaPrevia?: boolean;
}

export default function FormularioFormativo({
  onSuccess,
  linkVolver = "/admin/formularios?form=socioeconomica",
  esVistaPrevia = false,
}: FormularioFormativoProps) {
  return (
    <DynamicFormRenderer
      moduloId="formativo"
      tituloModulo="Módulo 4: Perfil Formativo y Vacunación COVID-19"
      subtituloModulo="Actualiza tu perfil académico previo, motivaciones y esquema de vacunación biológica."
      numeroPaso="Módulo 4 de 4"
      linkVolver={linkVolver}
      textoBotonSiguiente="Ir a Confirmación y Radicado"
      onSuccess={onSuccess}
      esVistaPrevia={esVistaPrevia}
    />
  );
}
