import Sidebar from "@/components/admin/Sidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import AuthGuard from "@/components/auth/AuthGuard";
import { SidebarProvider } from "@/components/admin/SidebarContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="admin">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-[#edf5f7] font-primary text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
          {/* Barra lateral institucional del administrador */}
          <Sidebar />

          {/* Área principal desplazable de contenido */}
          <main className="flex flex-1 flex-col overflow-y-auto min-w-0">
            {/* Header compartido en todas las páginas del panel admin */}
            <DashboardHeader />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
