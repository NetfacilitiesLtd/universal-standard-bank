import { prisma } from "@/lib/prisma";
import { updateAccountStatus } from "@/lib/actions/customer";

export default async function AccountStatusPage({
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
    },
  });

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Change Account Status
      </h1>

      <div className="mt-8 space-y-4">
        <div>
          <p className="text-sm text-slate-500">Customer Name</p>
          <p className="font-semibold">
            {customer.application.firstName}{" "}
            {customer.application.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Account Number</p>
          <p className="font-semibold">{customer.accountNumber}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Current Status</p>
          <p className="font-semibold">{customer.accountStatus}</p>
        </div>
      </div>

      <form action={updateAccountStatus} className="mt-8 space-y-6">
        <input
          type="hidden"
          name="customerId"
          value={customer.id}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            New Status
          </label>

          <select
            name="accountStatus"
            defaultValue={customer.accountStatus}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          >
            <option value="Active">Active</option>
            <option value="Frozen">Frozen</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}