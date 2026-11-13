"use client";

import { useEffect, useState } from "react";
import {
  getUser,
  getToken,
  canAccessAdmin,
  canAccessAprendiz,
  getDefaultRouteForUser,
} from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "aprendiz" | string;
}

/**
 * Componente Guard que protege las rutas del sistema en el cliente.
 * Bloquea el acceso sin sesión o con un rol no autorizado.
 */
export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = getToken();
    const user = getUser();

    // 1. Sin sesión activa -> Redirigir al login
    if (!token || !user) {
      window.location.href = "/login";
      return;
    }

    // 2. Control de acceso basado en roles institucionales (RBAC)
    if (requiredRole === "admin") {
      // Permite acceso a personal administrativo: admin, lider_bienestar, coordinacion, etc.
      if (!canAccessAdmin(user)) {
        if (canAccessAprendiz(user)) {
          window.location.href = "/aprendiz";
        } else {
          window.location.href = "/login";
        }
        return;
      }
    } else if (requiredRole === "aprendiz") {
      // Exclusivo para aprendices
      if (!canAccessAprendiz(user)) {
        if (canAccessAdmin(user)) {
          window.location.href = "/admin";
        } else {
          window.location.href = "/login";
        }
        return;
      }
    } else if (requiredRole && user.rol !== requiredRole) {
      const target = getDefaultRouteForUser(user);
      if (window.location.pathname.startsWith(target)) {
        setIsAuthorized(true);
        return;
      }
      window.location.href = target;
      return;
    }

    // 3. Autorizado
    setIsAuthorized(true);
  }, [requiredRole]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#f8fafc] font-primary select-none">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <div className="absolute h-full w-full animate-ping rounded-full bg-sena-green/20" />
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-sena-green border-t-transparent" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-sena-navy tracking-wide">
              CARACTERIZA SENA
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Validando credenciales institucionales...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
