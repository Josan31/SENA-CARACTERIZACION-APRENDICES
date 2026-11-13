// Icon de Iconify renderiza el ícono que llega por prop. SenaButton es el botón institucional reutilizable.
import { Icon } from "@iconify/react";
import { SenaButton } from "@/components/ui/SenaButton";

interface QuickActionCardProps {
  href: string;
  title: string;
  description: string;
  buttonLabel: string;
  icon: string;
}

export function QuickActionCard({ href, title, description, buttonLabel, icon }: QuickActionCardProps) {
  return (
    <article className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#fcfeff] p-6 shadow-xs border border-gray-100/80 transition-all hover:shadow-md">

      {/* Pestaña triangular verde en la esquina superior izquierda */}
      <div className="absolute top-0 left-0 h-0 w-0 border-t-[22px] border-t-sena-green border-r-[22px] border-r-transparent" aria-hidden="true" />

      {/* Círculo con ícono y gradiente SVG inline + título y descripción */}
      <div className="flex items-start gap-4 mt-1">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-xs" style={{ backgroundColor: "#dff5ed" }}>
          <Icon icon={icon} width="30" height="30" style={{ stroke: "url(#quick-icon-gradient)", fill: "url(#quick-icon-gradient)" }} />
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="quick-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0aa250" />
                <stop offset="100%" stopColor="#035651" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-sena-navy leading-tight">{title}</h3>
          <p className="mt-1.5 text-xs font-medium text-sena-navy/65 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Botón de acción reutilizable al pie de la tarjeta */}
      <SenaButton href={href} label={buttonLabel} />
    </article>
  );
}
