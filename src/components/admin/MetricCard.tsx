import { Icon } from "@iconify/react";

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: string;
}

export function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <article className="relative flex items-center gap-3.5 overflow-hidden rounded-2xl bg-[#fcfeff] p-5 shadow-xs transition-all hover:shadow-md cursor-pointer border border-gray-100/80">

      {/* Pestaña verde en la esquina */}
      <div
        className="absolute top-0 left-0 h-0 w-0 border-t-[20px] border-t-sena-green border-r-[20px] border-r-transparent"
        aria-hidden="true"
      />

      {/* Círculo contenedor #dff5ed */}
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full ml-1"
        style={{ backgroundColor: "#dff5ed" }}
      >
        {/* Ícono de Iconify con gradiente aplicado */}
        <Icon
          icon={icon}
          width="26"
          height="26"
          style={{ stroke: "url(#sena-gradient)", fill: "url(#sena-gradient)" }}
        />

        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="sena-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0aa250" />
              <stop offset="100%" stopColor="#035651" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Contenido derecho */}
      <div className="flex flex-col flex-1 min-w-0 pr-1">
        <p className="text-3xl font-extrabold text-sena-navy leading-none">
          {value}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-sena-navy/75 leading-tight break-words">
          {label}
        </p>
        <div
          className="mt-2 h-1 w-8 rounded-full bg-[#0aa250]"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
