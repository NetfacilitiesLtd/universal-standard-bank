export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function TransactionsPage() {
  const transactions = await prisma.transaction.findMany({
    include: {
      customer: {
        include: {
          application: true,
        },
      },
    },
    orderBy: {
  transactionDate: "desc",
},
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Transactions
        </h1>

        <p className="text-slate-500 mt-2">
          View all customer transactions across the bank.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-4">Reference</th>

              <th className="text-left px-6 py-4">Customer</th>

              <th className="text-left px-6 py-4">Account No.</th>

              <th className="text-left px-6 py-4">Type</th>

              <th className="text-left px-6 py-4">Amount</th>

              <th className="text-left px-6 py-4">Status</th>

              <th className="text-left px-6 py-4">Date</th>

              <th className="text-center px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-mono text-sm text-slate-600">
                  {transaction.reference ?? "-"}
                </td>

                <td className="px-6 py-4 font-medium">
                  {transaction.customer.application.firstName}{" "}
                  {transaction.customer.application.lastName}
                </td>

                <td className="px-6 py-4">
                  {transaction.customer.accountNumber}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === "Deposit"
                        ? "bg-green-100 text-green-700"
                        : transaction.type === "Withdrawal"
                        ? "bg-red-100 text-red-700"
                        : transaction.type === "Transfer In"
                        ? "bg-blue-100 text-blue-700"
                        : transaction.type === "Transfer Out"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold text-green-700">
                  {transaction.currency}{" "}
                  {Number(transaction.amount).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>

                <td className="px-6 py-4">
  {new Date(transaction.transactionDate).toLocaleString()}
</td>

                <td className="px-6 py-4">
  <div className="flex items-center justify-center gap-2">
    <Link
      href={`/admin/transactions/${transaction.id}`}
      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
    >
      👁 View
    </Link>

    <Link
      href={`/admin/transactions/${transaction.id}/edit`}
      className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition"
    >
      ✏️ Edit
    </Link>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}