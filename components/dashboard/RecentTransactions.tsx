import {
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import { CurrentCustomer } from "@/types/customer";

type RecentTransactionsProps = {
  customer: CurrentCustomer;
};

export default function RecentTransactions({
  customer,
}: RecentTransactionsProps) {
  return (
    <section className="px-10 mt-10 pb-10">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Transactions
            </h2>

            <p className="text-slate-500 mt-1">
              Your latest account activity
            </p>
          </div>

          <button className="text-red-600 font-semibold hover:underline">
            View All
          </button>
        </div>

        <div>
          {customer.transactions.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No transactions available.
            </div>
          ) : (
            customer.transactions.map(
              (
                transaction: (typeof customer.transactions)[number]
              ) => {
                const incoming =
                  transaction.type.toLowerCase() === "deposit";

                const Icon = incoming
                  ? ArrowDownLeft
                  : ArrowUpRight;

                const currency =
                  customer.application.preferredCurrency ?? "USD";

                const amount = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                }).format(transaction.amount);

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-6 border-b last:border-none border-slate-100 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          incoming
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <Icon
                          size={22}
                          className={
                            incoming
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {transaction.type}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {transaction.description ||
                            transaction.createdAt.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-lg font-bold ${
                        incoming
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {incoming ? "+" : "-"}
                      {amount}
                    </p>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
    </section>
  );
}