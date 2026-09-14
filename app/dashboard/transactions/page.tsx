import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Search,
} from "lucide-react";

import { getCurrentCustomer } from "@/lib/currentCustomer";

export default async function TransactionsPage() {
  const customer = await getCurrentCustomer();

  const currencySymbols: Record<string, string> = {
    USD: "$",
    GBP: "£",
    EUR: "€",
    GHS: "GH₵",
  };

  const symbol =
    currencySymbols[customer.application.preferredCurrency] ?? "$";

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Transactions
          </h1>

          <p className="text-slate-500 mt-2">
            Review all account activity.
          </p>
        </div>

        <a
  href="/api/statement"
  className="mt-5 lg:mt-0 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition"
>
  <Download size={20} />
  Download Statement
</a>
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
        <div className="flex items-center gap-3">
          <Search className="text-slate-400" />

          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="p-5">Date</th>
              <th>Description</th>
              <th>Reference</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {customer.transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-10 text-slate-500"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              customer.transactions.map((txn) => {
                const isDeposit = txn.type === "Deposit";

                return (
                  <tr
                    key={txn.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="p-5">
                      {new Date(txn.transactionDate).toLocaleDateString(
  "en-GB",
  {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
)}
                    </td>

                    <td className="font-semibold">
                      {txn.description}
                    </td>

                    <td>
                      {txn.reference ?? "-"}
                    </td>

                    <td>
                      <span
                        className={`inline-flex items-center gap-2 ${
                          isDeposit
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {isDeposit ? (
                          <ArrowDownLeft size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}

                        {txn.type}
                      </span>
                    </td>

                    <td
                      className={`font-bold ${
                        isDeposit
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {isDeposit ? "+" : "-"}
                      {symbol}
                      {txn.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    <td>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}