import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COMENTA — SENA Caracterización Aprendices",
  description: "Plataforma de caracterización y valoración de aprendices SENA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
