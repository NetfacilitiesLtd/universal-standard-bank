import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {
  customerId: string;
};

export default async function PendingTransfers({
  customerId,
}: Props) {
  const transfers = await prisma.internationalTransfer.findMany({
    where: {
      customerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (transfers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-2">
          Pending Transfers
        </h2>

        <p className="text-slate-500">
          No international transfers found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">
        Pending Transfers
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Recipient</th>
            <th className="text-left py-3">Amount</th>
            <th className="text-left py-3">Status</th>
            <th className="text-left py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id} className="border-b">
              <td className="py-4">
                {transfer.recipientName}
              </td>

              <td className="py-4">
                {transfer.currency}{" "}
                {transfer.amount.toLocaleString()}
              </td>

              <td className="py-4">
                {transfer.status}
              </td>

              <td className="py-4">
                <Link
                  href={`/dashboard/transfers/${transfer.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}