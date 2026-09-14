import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateTransaction } from "./actions";
type EditTransactionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTransactionPage({
  params,
}: EditTransactionPageProps) {
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
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Transaction Not Found
        </h1>

        <p className="mt-2 text-slate-500">
          The transaction you are trying to edit does not exist.
        </p>
      </div>
    );
  }

  const application = transaction.customer.application;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Transaction
        </h1>

        <p className="mt-2 text-slate-500">
          Update transaction information.
        </p>
      </div>

      {/* Customer Information */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Customer Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-500">Customer</label>
            <input
              value={`${application.firstName} ${application.lastName}`}
              readOnly
              className="mt-1 w-full rounded-md border bg-slate-100 px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">Account Number</label>
            <input
              value={transaction.customer.accountNumber}
              readOnly
              className="mt-1 w-full rounded-md border bg-slate-100 px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">Account Type</label>
            <input
              value={application.accountType}
              readOnly
              className="mt-1 w-full rounded-md border bg-slate-100 px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">Currency</label>
            <input
              value={transaction.currency}
              readOnly
              className="mt-1 w-full rounded-md border bg-slate-100 px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Transaction Information */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Transaction Information
        </h2>

        <form
  action={updateTransaction}
  className="grid grid-cols-1 gap-6 md:grid-cols-2"
>
  <input
  type="hidden"
  name="id"
  value={transaction.id}
/>
          <div>
            <label className="text-sm text-slate-500">Reference</label>
            <input
  type="text"
  name="reference"
  defaultValue={transaction.reference ?? ""}
  className="mt-1 w-full rounded-md border px-3 py-2"
/>
          </div>

          <div>
            <label className="text-sm text-slate-500">Status</label>
            <select
  name="status"
  defaultValue={transaction.status}
  className="mt-1 w-full rounded-md border px-3 py-2"
>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-500">Amount</label>
            <input
  type="number"
  name="amount"
  step="0.01"
  defaultValue={transaction.amount}
  className="mt-1 w-full rounded-md border px-3 py-2"
/>
          </div>

          <div>
            <label className="text-sm text-slate-500">Transaction Date</label>
            <input
  type="date"
  name="transactionDate"
  defaultValue={transaction.transactionDate
    .toISOString()
    .split("T")[0]}
  className="mt-1 w-full rounded-md border px-3 py-2"
/>
          </div>

          <div>
            <label className="text-sm text-slate-500">Transaction Type</label>
            <input
              value={transaction.type}
              readOnly
              className="mt-1 w-full rounded-md border bg-slate-100 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-slate-500">Description</label>
            <textarea
  name="description"
  defaultValue={transaction.description ?? ""}
  rows={4}
  className="mt-1 w-full rounded-md border px-3 py-2"
/>
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
  <Link
  href={`/admin/transactions/${transaction.id}`}
  className="rounded-md border px-5 py-2 hover:bg-slate-100"
>
  Cancel
</Link>

  <button
    type="submit"
    className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
  >
    Save Changes
  </button>
</div>
        </form>
      </div>
    </div>
  );
}