import { getCurrentCustomer } from "@/lib/currentCustomer";
import AccountDetailsClient from "@/components/dashboard/AccountDetailsClient";

export default async function AccountDetailsPage() {
  const customer = await getCurrentCustomer();

  return (
    <AccountDetailsClient
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
        transactions: customer.transactions.map(
          (transaction) => ({
            description: transaction.description,
            transactionDate:
              transaction.transactionDate,
            amount: Number(transaction.amount),
          })
        ),
      }}
    />
  );
}