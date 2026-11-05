import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SenaButtonProps {
  href: string;
  label: string;
}

export function SenaButton({ href, label }: SenaButtonProps) {
  return (
    <Link
      href={href}
      className="mt-6 flex items-center justify-center gap-2 rounded-full py-3 px-6 text-xs font-bold text-white shadow-sm transition-all hover:opacity-95 hover:shadow-md"
      style={{
        background: "linear-gradient(135deg, #047270 0%, #068585 50%, #25af72 100%)",
      }}
    >
      <span>{label}</span>
      <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
    </Link>
  );
}
