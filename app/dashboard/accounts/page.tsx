import { getCurrentCustomer } from "@/lib/currentCustomer";
import AccountsClient from "@/components/dashboard/AccountsClient";

export default async function AccountsPage() {
  const customer = await getCurrentCustomer();

  return (
    <AccountsClient
      customer={{
        accountStatus: customer.accountStatus,
        accountNumber: customer.accountNumber,
        balance: Number(customer.balance),
        accountOpenedAt: customer.accountOpenedAt,
        application: {
          accountType: customer.application.accountType,
          preferredCurrency:
            customer.application.preferredCurrency,
        },
      }}
    />
  );
}