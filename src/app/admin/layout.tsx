import Sidebar from "@/components/admin/Sidebar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="admin">
      <div className="flex h-screen w-full overflow-hidden bg-[#edf4f7] font-primary text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {/* Barra lateral institucional del administrador */}
        <Sidebar />

        {/* Área principal desplazable de contenido */}
        <main className="flex flex-1 flex-col overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
