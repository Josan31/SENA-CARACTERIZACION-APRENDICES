/**
 * Cliente HTTP institucional centralizado para el frontend SENA
 * Conecta Next.js con el backend NestJS (http://localhost:4000/api/v1)
 * Ubicación: src/lib/api-client.ts
 */

import { getToken, clearSession } from './auth';

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export class ApiClientError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errors?: string[] | null,
    public readonly raw?: any,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  const token = getToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    // Si la sesión expiró o el token fue revocado (401) y no estamos en login, cerrar sesión
    if (response.status === 401 && !endpoint.includes('/auth/login')) {
      clearSession();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    const message =
      data?.message ||
      (Array.isArray(data?.errors) ? data.errors.join(', ') : null) ||
      response.statusText ||
      'Error de comunicación con el servidor institucional';

    throw new ApiClientError(
      response.status,
      message,
      data?.errors,
      data,
    );
  }

  // Si la respuesta viene envuelta en el interceptor global { success: true, data: T }
  if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
    return data.data as T;
  }

  return data as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
