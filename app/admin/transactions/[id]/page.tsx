import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionDetailsPage({ params }: Props) {
  const { id } = await params;

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
    include: {
      customer: {
        include: {
          application: true,
        },
      },
    },
  });

  if (!transaction) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Transaction Details
          </h1>

          <p className="text-slate-500 mt-2">
            View complete transaction information.
          </p>
        </div>

        <Link
          href="/admin/transactions"
          className="bg-slate-700 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          ← Back
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow border border-slate-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <p className="text-sm text-slate-500">Reference</p>
            <p className="font-semibold text-lg">
              {transaction.reference ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                transaction.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : transaction.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {transaction.status}
            </span>
          </div>

          <div>
            <p className="text-sm text-slate-500">Customer</p>
            <p className="font-semibold">
              {transaction.customer.application.firstName}{" "}
              {transaction.customer.application.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Account Number</p>
            <p className="font-semibold">
              {transaction.customer.accountNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Transaction Type</p>
            <p className="font-semibold">
              {transaction.type}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Amount</p>
            <p className="text-2xl font-bold text-green-700">
              {transaction.currency}{" "}
              {Number(transaction.amount).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Description</p>
            <p className="font-semibold">
              {transaction.description || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Date & Time</p>
            <p className="font-semibold">
  {new Date(transaction.transactionDate).toLocaleString()}
</p>
          </div>

        </div>
      </div>
    </div>
  );
}