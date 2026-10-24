"use client";

import React from "react";
import DynamicFormRenderer from "@/components/formularios/DynamicFormRenderer";

interface FormularioSaludProps {
  onSuccess?: () => void;
  linkVolver?: string;
  esVistaPrevia?: boolean;
}

export default function FormularioSalud({
  onSuccess,
  linkVolver = "/admin/formularios?form=basica",
  esVistaPrevia = false,
}: FormularioSaludProps) {
  return (
    <DynamicFormRenderer
      moduloId="salud"
      tituloModulo="Módulo 2: Salud y Condición Física"
      subtituloModulo="Registra tu estado de salud, afiliación EPS, Sisbén y condiciones médicas."
      numeroPaso="Módulo 2 de 4"
      linkVolver={linkVolver}
      textoBotonSiguiente="Guardar y Continuar a Socioeconómica"
      onSuccess={onSuccess}
      esVistaPrevia={esVistaPrevia}
    />
  );
}
