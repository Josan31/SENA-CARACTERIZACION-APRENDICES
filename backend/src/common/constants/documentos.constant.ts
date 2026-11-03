/**
 * Tipos oficiales de documentos de identidad reconocidos por el SENA
 * Ubicación: backend/src/common/constants/documentos.constant.ts
 */

export const TIPOS_DOCUMENTO = {
  CC: 'CC',
  TI: 'TI',
  CE: 'CE',
  PEP: 'PEP',
  PPT: 'PPT',
  PAS: 'PAS',
} as const;

export type TipoDocumento = (typeof TIPOS_DOCUMENTO)[keyof typeof TIPOS_DOCUMENTO];

export const MAPA_NOMBRES_DOCUMENTO: Record<TipoDocumento, string> = {
  CC: 'Cédula de Ciudadanía',
  TI: 'Tarjeta de Identidad',
  CE: 'Cédula de Extranjería',
  PEP: 'Permiso Especial de Permanencia',
  PPT: 'Permiso por Protección Temporal',
  PAS: 'Pasaporte',
};
