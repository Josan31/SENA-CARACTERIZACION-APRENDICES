"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export default function DateBadge() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(
      new Date().toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    );
  }, []);

  // Render nothing until hydration is done — avoids server/client mismatch
  if (!label) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-1.5 pr-5 text-sm font-bold text-sena-navy shadow-sm transition-all hover:shadow-md hover:border-sena-green/30">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sena-green/10 to-emerald-600/10 text-sena-green">
        <Calendar size={18} strokeWidth={2.5} />
      </div>
      <span className="capitalize">{label}</span>
    </div>
  );
}
