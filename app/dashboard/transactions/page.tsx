import { getCurrentCustomer } from "@/lib/currentCustomer";
import TransactionsClient from "@/components/dashboard/TransactionsClient";

export default async function TransactionsPage() {
  const customer = await getCurrentCustomer();

  return (
    <TransactionsClient
      transactions={customer.transactions.map((txn) => ({
        id: txn.id,
        transactionDate: txn.transactionDate,
        description: txn.description,
        reference: txn.reference,
        type: txn.type,
        amount: Number(txn.amount),
        status: txn.status,
      }))}
      preferredCurrency={
        customer.application.preferredCurrency
      }
    />
  );
}