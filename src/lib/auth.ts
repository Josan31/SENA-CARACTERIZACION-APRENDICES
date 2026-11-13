/**
 * Utilidades centralizadas de sesión y autenticación para el Portal SENA
 * Ubicación: src/lib/auth.ts
 */

import type { UserAccount } from './users';

const TOKEN_KEY = 'sena_token';
const USER_KEY = 'sena_user';

/**
 * Guarda el token JWT y el perfil de usuario en el almacenamiento local
 */
export function saveSession(token: string, user: UserAccount): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Error al guardar la sesión institucional:', err);
  }
}

/**
 * Obtiene el token JWT actual
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * Obtiene el usuario autenticado actual desde localStorage
 */
export function getUser(): UserAccount | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as UserAccount) : null;
  } catch {
    return null;
  }
}

/**
 * Cierra la sesión activa y elimina todos los datos locales
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error('Error al limpiar la sesión:', err);
  }
}

/**
 * Comprueba si existe una sesión activa válida
 */
export function isAuthenticated(): boolean {
  return !!getToken() && !!getUser();
}

/**
 * Roles administrativos autorizados para acceder al panel institucional (/admin)
 */
export const ADMIN_ROLES = [
  'admin',
  'lider_bienestar',
  'coordinacion',
  'direccion_regional',
  'calidad',
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

/**
 * Valida si un rol específico pertenece al grupo administrativo/personal SENA
 */
export function isAdminRole(role?: string | null): boolean {
  if (!role) return false;
  const normalized = role.toLowerCase().trim();
  return ADMIN_ROLES.some((r) => r === normalized);
}

/**
 * Determina si el usuario actual tiene permisos para ingresar al portal de administración
 */
export function canAccessAdmin(user?: { rol?: string; tipo?: string } | null): boolean {
  if (!user) return false;
  if (user.tipo === 'funcionario') return true;
  return isAdminRole(user.rol);
}

/**
 * Determina si el usuario actual es un aprendiz habilitado para ingresar al portal /aprendiz
 */
export function canAccessAprendiz(user?: { rol?: string; tipo?: string } | null): boolean {
  if (!user) return false;
  if (user.tipo === 'aprendiz') return true;
  return (user.rol || '').toLowerCase().trim() === 'aprendiz';
}

/**
 * Retorna la ruta inicial por defecto según el rol y tipo del usuario
 */
export function getDefaultRouteForUser(user?: { rol?: string; tipo?: string } | null): string {
  if (canAccessAdmin(user)) return '/admin';
  if (canAccessAprendiz(user)) return '/aprendiz';
  return '/login';
}

/**
 * Comprueba si el usuario autenticado tiene un rol determinado
 */
export function hasRole(role: string): boolean {
  const user = getUser();
  if (!user?.rol) return false;
  return user.rol.toLowerCase().trim() === role.toLowerCase().trim();
}
