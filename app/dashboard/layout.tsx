import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

import { getCurrentCustomer } from "@/lib/currentCustomer";
import { prisma } from "@/lib/prisma";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = await getCurrentCustomer();
const unreadNotifications = await prisma.notification.count({
  where: {
    customerId: customer.id,
    isRead: false,
  },
});
  return (
    <main className="min-h-screen flex bg-slate-100">
      <Sidebar />

      <section className="flex-1 flex flex-col">
        <Header
  customer={customer}
  unreadNotifications={unreadNotifications}
/>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}