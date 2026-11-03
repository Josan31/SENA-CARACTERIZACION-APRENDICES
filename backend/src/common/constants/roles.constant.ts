/**
 * Roles institucionales del sistema de Caracterización SENA
 * Ubicación: backend/src/common/constants/roles.constant.ts
 */

export const ROLES = {
  ADMIN: 'admin',
  APRENDIZ: 'aprendiz',
  LIDER_BIENESTAR: 'lider_bienestar',
  COORDINADOR: 'coordinador',
  INSTRUCTOR: 'instructor',
} as const;

export type Rol = (typeof ROLES)[keyof typeof ROLES];
