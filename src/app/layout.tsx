import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "CARACTERIZA — SENA Caracterización Aprendices",
  description: "Plataforma de caracterización y valoración de aprendices SENA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
