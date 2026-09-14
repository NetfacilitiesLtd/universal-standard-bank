import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InternationalTransfersPage() {
  const transfers = await prisma.internationalTransfer.findMany({
    include: {
      customer: {
        include: {
          application: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        International Transfers
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Recipient</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer.id} className="border-t">
                <td className="p-4">
                  {transfer.customer.application.firstName}{" "}
                  {transfer.customer.application.lastName}
                </td>

                <td className="p-4">
                  {transfer.recipientName}
                </td>

                <td className="p-4">
                  {transfer.currency}{" "}
                  {transfer.amount.toLocaleString()}
                </td>

                <td className="p-4">
                  {transfer.status}
                </td>

                <td className="p-4">
                  <Link
                    href={`/admin/international-transfers/${transfer.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {transfers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-8 text-slate-500"
                >
                  No international transfers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}