import Link from "next/link";
import {
  Landmark,
  DollarSign,
  Search,
  Plus,
  Eye,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getAccounts() {
  return prisma.customer.findMany({
    include: {
      application: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function AccountsPage() {
  const accounts = await getAccounts();

  const totalAccounts = accounts.length;

  const activeAccounts = accounts.filter(
    (account) => account.accountStatus === "Active"
  ).length;

  const totalDeposits = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Accounts
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all customer bank accounts.
          </p>

        </div>

        <Link
          href="/admin/accounts/new"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <Plus size={20} />
          Open New Account
        </Link>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 text-sm">
                Total Accounts
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
  {totalAccounts}
</h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

              <Landmark
                size={28}
                className="text-red-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 text-sm">
                Active Accounts
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
  {activeAccounts}
</h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

              <Landmark
                size={28}
                className="text-green-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 text-sm">
                Total Deposits
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
  ${totalDeposits.toLocaleString()}
</h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <DollarSign
                size={28}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border border-slate-200 p-5">

        <div className="flex items-center gap-3">

          <Search className="text-slate-400" />

          <input
            type="text"
            placeholder="Search account number or customer..."
            className="w-full outline-none text-slate-900"
          />

        </div>

      </div>

      {/* Accounts Table */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="p-5">Account Number</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Currency</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {accounts.map((account) => (

              <tr
                key={account.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="p-5 font-medium">
                  {account.accountNumber}
                </td>

                <td className="font-semibold">
                  {account.application.firstName} {account.application.lastName}
                </td>

                <td>
                  {account.application.accountType}
                </td>

                <td>
                  {account.application.preferredCurrency}
                </td>

                <td className="font-semibold">
                  ${account.balance.toLocaleString()}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      account.accountStatus === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {account.accountStatus}
                  </span>

                </td>

                <td>

                  <Link
  href={`/admin/accounts/${account.id}`}
  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
>
  <Eye size={18} />
  View
</Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}