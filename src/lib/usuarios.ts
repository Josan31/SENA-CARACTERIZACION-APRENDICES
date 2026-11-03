/**
 * Cliente de API para el Módulo de Usuarios y Gestión de Cuentas (Personal SENA)
 * Conecta la UI administrativa con los endpoints NestJS (/api/v1/usuarios)
 * Ubicación: src/lib/usuarios.ts
 */

import { apiClient } from './api-client';

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: 'admin' | 'lider_bienestar' | 'coordinacion' | 'direccion_regional' | 'calidad' | string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUsuarioInput {
  nombre: string;
  correo: string;
  password: string;
  rol: string;
  activo?: boolean;
}

export interface UpdateUsuarioInput {
  nombre?: string;
  correo?: string;
  password?: string;
  rol?: string;
  activo?: boolean;
}

export const ROLES_CATALOG = [
  { value: 'admin', label: 'Administrador del Sistema' },
  { value: 'lider_bienestar', label: 'Líder de Bienestar' },
  { value: 'coordinacion', label: 'Coordinador Académico' },
  { value: 'direccion_regional', label: 'Director Regional' },
  { value: 'calidad', label: 'Gestor de Calidad' },
] as const;

export function formatRol(rol: string): string {
  const match = ROLES_CATALOG.find((r) => r.value === rol);
  if (match) return match.label;
  return rol.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Obtiene la lista de usuarios SENA
 */
export async function getUsuarios(params?: {
  rol?: string;
  activo?: boolean;
  search?: string;
}): Promise<Usuario[]> {
  const query = new URLSearchParams();
  if (params?.rol) query.append('rol', params.rol);
  if (params?.activo !== undefined) query.append('activo', String(params.activo));
  if (params?.search) query.append('search', params.search);

  const qs = query.toString() ? `?${query.toString()}` : '';
  return apiClient.get<Usuario[]>(`/usuarios${qs}`);
}

/**
 * Obtiene un usuario por ID
 */
export async function getUsuarioById(id: string): Promise<Usuario> {
  return apiClient.get<Usuario>(`/usuarios/${id}`);
}

/**
 * Crea una nueva cuenta de usuario
 */
export async function createUsuario(data: CreateUsuarioInput): Promise<Usuario> {
  return apiClient.post<Usuario>('/usuarios', data);
}

/**
 * Actualiza los datos de un usuario
 */
export async function updateUsuario(
  id: string,
  data: UpdateUsuarioInput,
): Promise<Usuario> {
  return apiClient.put<Usuario>(`/usuarios/${id}`, data);
}

/**
 * Alterna el estado activo/inactivo de una cuenta
 */
export async function toggleActivoUsuario(id: string): Promise<Usuario> {
  return apiClient.patch<Usuario>(`/usuarios/${id}/toggle-activo`);
}

/**
 * Elimina permanentemente una cuenta de usuario
 */
export async function deleteUsuario(id: string): Promise<{ success: boolean }> {
  return apiClient.delete<{ success: boolean }>(`/usuarios/${id}`);
}
