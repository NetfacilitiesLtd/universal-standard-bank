import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { depositMoney } from "@/lib/actions/customer";

export default async function DepositPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;

  const customer = await prisma.customer.findUnique({
  where: {
    id: customerId,
  },
  include: {
    application: true,
    transactions: true,
  },
});

  if (!customer) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Deposit Money
        </h1>

        <p className="text-slate-500 mt-2">
          Credit funds into a customer's account.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={depositMoney} className="space-y-6">
          <input
            type="hidden"
            name="customerId"
            value={customer.id}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Account Number
            </label>

            <input
              type="text"
              value={customer.accountNumber}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Customer Name
            </label>

            <input
              type="text"
              value={`${customer.application.firstName} ${customer.application.lastName}`}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Deposit Amount
            </label>

            <input
              type="number"
              name="amount"
              min="0.01"
              step="0.01"
              required
              placeholder="Enter amount"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              placeholder="Deposit description..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
            >
              Deposit Funds
            </button>

            <Link
              href={`/admin/customers/${customer.id}`}
              className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}