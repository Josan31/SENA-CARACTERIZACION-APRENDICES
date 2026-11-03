import SidebarAprendiz from "@/components/aprendiz/SidebarAprendiz";
import TopNavAprendiz from "@/components/aprendiz/TopNavAprendiz";

export default function AprendizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#edf5f7] font-primary text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Barra lateral institucional del aprendiz */}
      <SidebarAprendiz />

      {/* Área principal desplazable de contenido */}
      <main className="flex flex-1 flex-col overflow-y-auto min-w-0">
        {/* Top navbar compartida en todas las páginas del aprendiz */}
        <TopNavAprendiz />
        {children}
      </main>
    </div>
  );
}
