"use client";

import React from "react";
import DynamicFormRenderer from "@/components/formularios/DynamicFormRenderer";

interface FormularioBasicaProps {
  onSuccess?: () => void;
  linkVolver?: string;
  esVistaPrevia?: boolean;
}

export default function FormularioBasica({
  onSuccess,
  linkVolver = "/admin/formularios",
  esVistaPrevia = false,
}: FormularioBasicaProps) {
  return (
    <DynamicFormRenderer
      moduloId="basica"
      tituloModulo="Módulo 1: Información Básica y Localización"
      subtituloModulo="Completa o actualiza tus datos de identidad, contacto, acudiente y residencia."
      numeroPaso="Módulo 1 de 4"
      linkVolver={linkVolver}
      textoBotonSiguiente="Guardar y Continuar a Salud"
      onSuccess={onSuccess}
      esVistaPrevia={esVistaPrevia}
    />
  );
}
