/**
 * Roles institucionales del sistema de Caracterización SENA
 * Ubicación: backend/src/common/constants/roles.constant.ts
 */

export const ROLES = {
  ADMIN: 'admin',
  APRENDIZ: 'aprendiz',
  LIDER_BIENESTAR: 'lider_bienestar',
  COORDINACION: 'coordinacion',
  DIRECCION_REGIONAL: 'direccion_regional',
  CALIDAD: 'calidad',
  // Alias de retrocompatibilidad
  COORDINADOR: 'coordinacion',
  INSTRUCTOR: 'calidad',
} as const;

export const ROLES_USUARIOS = [
  ROLES.ADMIN,
  ROLES.LIDER_BIENESTAR,
  ROLES.COORDINACION,
  ROLES.DIRECCION_REGIONAL,
  ROLES.CALIDAD,
] as const;

export type Rol = (typeof ROLES)[keyof typeof ROLES];
