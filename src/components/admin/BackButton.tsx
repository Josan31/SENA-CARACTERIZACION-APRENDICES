"use client";

// Icon de Iconify renderiza íconos por nombre. Link para navegación con precarga. useRouter para navegación programática.
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// href omitido = vuelve al historial, "/login" = cierra sesión, cualquier otra ruta = navega directo
interface BackButtonProps {
  href?: string;
  label?: string;
}

// Círculo blanco 44px, borde gris en reposo y verde en hover
const baseClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sena-navy shadow-sm transition-all hover:-translate-x-0.5 hover:border-sena-green hover:bg-sena-light hover:text-sena-green active:scale-95";

export function BackButton({ href, label = "Volver" }: BackButtonProps) {
  const router = useRouter();

  // Limpia la sesión y redirige al login
  if (href === "/login") {
    return (
      <button
        type="button"
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
        className={baseClass}
        onClick={() => {
          try { localStorage.removeItem("sena_user"); } catch { /* ignorar */ }
          router.push("/login");
        }}
      >
        <Icon icon="lucide:arrow-left" width={20} height={20} />
      </button>
    );
  }

  // Navega a la ruta indicada
  if (href) {
    return (
      <Link href={href} aria-label={label} title={label} className={baseClass}>
        <Icon icon="lucide:arrow-left" width={20} height={20} />
      </Link>
    );
  }

  // Vuelve a la página anterior del historial
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={baseClass}
      onClick={() => router.back()}
    >
      <Icon icon="lucide:arrow-left" width={20} height={20} />
    </button>
  );
}
