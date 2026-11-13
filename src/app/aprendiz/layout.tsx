import SidebarAprendiz from "@/components/aprendiz/SidebarAprendiz";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AprendizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="aprendiz">
      <div className="flex h-screen w-full overflow-hidden bg-[#f0fafc] font-primary text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {/* Barra lateral institucional del aprendiz */}
        <SidebarAprendiz />

        {/* Área principal desplazable de contenido */}
        <main className="flex flex-1 flex-col overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
