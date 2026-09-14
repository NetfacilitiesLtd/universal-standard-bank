import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      application: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Customers
        </h1>

        <p className="text-slate-500 mt-2">
          All approved bank customers
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="p-5">Account Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Account Type</th>
              <th>Currency</th>
              <th>Balance</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map(
              (
                customer: (typeof customers)[number]
              ) => (
                <tr
                  key={customer.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-5 font-semibold">
                    {customer.accountNumber}
                  </td>

                  <td>
                    {customer.application.firstName}{" "}
                    {customer.application.lastName}
                  </td>

                  <td>
                    {customer.application.email}
                  </td>

                  <td>
                    {customer.application.accountType}
                  </td>

                  <td>
                    {customer.application.preferredCurrency}
                  </td>

                  <td>
                    {customer.balance.toLocaleString()}
                  </td>

                  <td>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      {customer.accountStatus}
                    </span>
                  </td>

                  <td className="text-center">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="inline-block px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )
            )}

            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center p-10 text-slate-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}