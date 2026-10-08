import Sidebar from "@/components/admin/Sidebar";

/**
 * Admin shell — fixed sidebar on the left, scrollable main content on the right.
 * The header is rendered per-page so each view can customise its title / subtitle.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-sena-light font-primary">
      {/* Fixed-width sidebar */}
      <Sidebar />

      {/* Scrollable page area */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
