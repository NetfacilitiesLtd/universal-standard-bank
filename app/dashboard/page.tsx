import BalanceCards from "@/components/dashboard/BalanceCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import PendingTransfers from "@/components/dashboard/PendingTransfers";
import { getCurrentCustomer } from "@/lib/currentCustomer";

export default async function DashboardPage() {
  const customer = await getCurrentCustomer();
const fullName = `${customer.application.firstName} ${customer.application.lastName}`;
  return (
  <div className="space-y-8">

    
  <BalanceCards customer={customer} />

  <PendingTransfers customerId={customer.id} />

  <QuickActions customer={customer} />

  <RecentTransactions customer={customer} />
</div>
  );
}