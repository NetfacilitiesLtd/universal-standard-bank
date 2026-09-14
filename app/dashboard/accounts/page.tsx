import Link from "next/link";
import { Landmark, BadgeCheck, ArrowRight } from "lucide-react";

import { getCurrentCustomer } from "@/lib/currentCustomer";

export default async function AccountsPage() {
  const customer = await getCurrentCustomer();

  return (
    <main className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            My Account
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your account from one place.
          </p>
        </div>

        {/* Account Card */}
        <div className="max-w-md">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7 hover:shadow-xl transition">
            <div className="flex justify-between items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Landmark
                  className="text-white"
                  size={30}
                />
              </div>

              <span className="flex items-center gap-2 text-green-600 font-semibold">
                <BadgeCheck size={18} />
                {customer.accountStatus}
              </span>
            </div>

            <h2 className="text-2xl font-bold mt-7">
              {customer.application.accountType}
            </h2>

            <div className="space-y-4 mt-6">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Account Number
                </span>

                <span className="font-semibold">
                  ****{customer.accountNumber.slice(-4)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Currency
                </span>

                <span className="font-semibold">
                  {customer.application.preferredCurrency}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Available Balance
                </span>

                <span className="font-bold text-lg">
                  {new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: customer.application.preferredCurrency,
}).format(customer.balance)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Date Opened
                </span>

                <span className="font-semibold">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Link
              href={`/dashboard/accounts/${customer.accountNumber}`}
              className="mt-8 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold transition"
            >
              Manage Account

              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}