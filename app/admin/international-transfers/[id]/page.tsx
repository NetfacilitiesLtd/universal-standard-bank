import { prisma } from "@/lib/prisma";
import {
  generateTransferCode,
  updateTransferStatus,
} from "@/lib/actions/customer";

export default async function TransferDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const transfer = await prisma.internationalTransfer.findUnique({
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

  if (!transfer) {
    return <div>Transfer not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h1 className="text-3xl font-bold text-slate-900">
          International Transfer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <div>
            <p className="text-sm text-slate-500">Customer</p>
            <p className="font-semibold">
              {transfer.customer.application.firstName}{" "}
              {transfer.customer.application.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Recipient</p>
            <p className="font-semibold">
              {transfer.recipientName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Bank</p>
            <p className="font-semibold">
              {transfer.bankName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Country</p>
            <p className="font-semibold">
              {transfer.country}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Amount</p>
            <p className="font-semibold">
              {transfer.currency}{" "}
              {transfer.amount.toLocaleString()}
            </p>
          </div>

          <div>
  <p className="text-sm text-slate-500">Status</p>

  <p className="font-semibold mb-4">
    {transfer.status}
  </p>

  <form action={updateTransferStatus} className="space-y-3">
    <input
      type="hidden"
      name="transferId"
      value={transfer.id}
    />

    <select
      name="status"
      defaultValue={transfer.status}
      className="w-full border rounded-lg px-3 py-2"
    >
      <option>Pending Transfer Code</option>
      <option>Code Generated</option>
      <option>Processing</option>
      <option>Completed</option>
      <option>Failed</option>
    </select>

    <button
      type="submit"
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
    >
      Update Status
    </button>
  </form>
</div>

          <div className="md:col-span-2">
  <p className="text-sm text-slate-500">
    Current Transfer Code
  </p>

  <p className="text-2xl font-bold text-blue-700 mt-2 mb-4">
    {transfer.transferCode || "No transfer code generated"}
  </p>

  <form action={generateTransferCode}>
    <input
      type="hidden"
      name="transferId"
      value={transfer.id}
    />

    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
    >
      {transfer.transferCode
        ? "Generate New Code"
        : "Generate Code"}
    </button>
  </form>
</div>

        </div>
      </div>
    </div>
  );
}