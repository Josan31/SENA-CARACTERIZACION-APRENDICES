import Sidebar from "@/components/admin/Sidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#edf5f7] font-primary text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Barra lateral institucional del administrador */}
      <Sidebar />

      {/* Área principal desplazable de contenido */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Header compartido en todas las páginas del panel admin */}
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}
