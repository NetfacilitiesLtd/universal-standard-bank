import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Side */}

      <section className="flex-1 flex flex-col">

        <Header />

        <div className="flex-1 overflow-y-auto p-8">

          <div className="max-w-7xl mx-auto">
            {children}
          </div>

        </div>

      </section>

    </main>
  );
}