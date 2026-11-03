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
 * Comprueba si el usuario autenticado tiene un rol determinado
 */
export function hasRole(role: 'admin' | 'aprendiz' | 'lider_bienestar'): boolean {
  const user = getUser();
  return user?.rol === role;
}
