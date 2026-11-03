import { obtenerMiCaracterizacion, MiCaracterizacionResponse } from './caracterizacion';
import { sincronizarRespuestasConStore } from './sincronizacion';
import { getToken, getUser } from './auth';

const SESSION_CACHE_KEY = 'sena_caracterizacion_cache_v2';
const CACHE_EVENT_NAME = 'sena_caracterizacion_actualizada';

// Caché en memoria durante la vida útil de la pestaña
let memCache: {
  data: MiCaracterizacionResponse | null;
  doc: string | null;
  timestamp: number;
} = {
  data: null,
  doc: null,
  timestamp: 0,
};

let pendingPromise: Promise<MiCaracterizacionResponse | null> | null = null;

/**
 * Obtiene síncronamente en 0ms la caracterización activa en caché para renderizado instantáneo.
 */
export function getCaracterizacionCachedSync(): MiCaracterizacionResponse | null {
  const user = getUser();
  const currentDoc = user?.numeroDocumento || null;

  // 1. Revisar memoria
  if (memCache.data && (!currentDoc || memCache.doc === currentDoc)) {
    return memCache.data;
  }

  // 2. Revisar sessionStorage
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.data && (!currentDoc || parsed?.doc === currentDoc)) {
          memCache = {
            data: parsed.data,
            doc: parsed.doc,
            timestamp: parsed.timestamp || Date.now(),
          };
          return parsed.data;
        }
      }
    } catch {
      // Ignorar error de parsing
    }
  }

  return null;
}

/**
 * Guarda en caché de memoria y sesión
 */
function guardarEnCache(data: MiCaracterizacionResponse, doc?: string | null) {
  const currentDoc = doc || data?.aprendiz?.numeroDocumento || null;
  memCache = {
    data,
    doc: currentDoc,
    timestamp: Date.now(),
  };

  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(
        SESSION_CACHE_KEY,
        JSON.stringify({
          data,
          doc: currentDoc,
          timestamp: Date.now(),
        })
      );
    } catch {
      // Ignorar quota errors
    }
  }
}

/**
 * Invalida la caché (ej: tras guardar o actualizar)
 */
export function invalidarCacheCaracterizacion(): void {
  memCache = { data: null, doc: null, timestamp: 0 };
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem(SESSION_CACHE_KEY);
    } catch {}
  }
}

/**
 * Carga con patrón Stale-While-Revalidate (SWR):
 * 1. Si hay caché, resuelve de inmediato en paralelo o la usa de base.
 * 2. Revalida contra el backend sin bloquear la interfaz.
 * 3. Sincroniza con el store local de respuestas y emite evento si hubo cambios.
 */
export async function fetchCaracterizacionSWR(
  onUpdate?: (data: MiCaracterizacionResponse) => void
): Promise<MiCaracterizacionResponse | null> {
  const token = getToken();
  if (!token) return null;

  const user = getUser();
  const cached = getCaracterizacionCachedSync();

  // Si ya hay una petición en vuelo, devolver la existente para deduplicar peticiones
  if (pendingPromise) {
    const res = await pendingPromise;
    if (res && onUpdate) onUpdate(res);
    return res;
  }

  pendingPromise = (async () => {
    try {
      const resBackend = await obtenerMiCaracterizacion();
      if (resBackend && resBackend.aprendiz) {
        guardarEnCache(resBackend, user?.numeroDocumento);
        await sincronizarRespuestasConStore(resBackend);

        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent(CACHE_EVENT_NAME, { detail: resBackend })
          );
        }

        if (onUpdate) {
          onUpdate(resBackend);
        }

        return resBackend;
      }
      return cached;
    } catch (err) {
      console.warn('Fallo revalidación SWR en segundo plano, usando caché:', err);
      return cached;
    } finally {
      pendingPromise = null;
    }
  })();

  return cached || (await pendingPromise);
}

/**
 * Hook utilitario para suscribirse a cambios de caracterización
 */
export function subscribeCaracterizacionActualizada(
  callback: (data: MiCaracterizacionResponse) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: any) => {
    if (e.detail) {
      callback(e.detail);
    }
  };

  window.addEventListener(CACHE_EVENT_NAME, handler);
  return () => {
    window.removeEventListener(CACHE_EVENT_NAME, handler);
  };
}
