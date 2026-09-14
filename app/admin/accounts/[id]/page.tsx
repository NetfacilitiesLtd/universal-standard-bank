import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { updateAccountStatus } from "@/lib/actions/customer";
import DeleteCustomerButton from "@/components/admin/DeleteCustomerButton";
export default async function ManageAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      application: true,
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });

  if (!customer) {
    return <div>Customer not found.</div>;
  }
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
  <h2 className="text-2xl font-bold text-slate-900">
  {customer.application.firstName} {customer.application.lastName}
</h2>

<p className="text-slate-500 mt-2">
  {customer.accountNumber}
</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

  <div>
    <p className="text-sm text-slate-500">Account Type</p>
    <p className="font-semibold">
      {customer.application.accountType}
    </p>
  </div>

  <div>
    <p className="text-sm text-slate-500">Status</p>
    <p className="font-semibold">
      {customer.accountStatus}
    </p>
  </div>
<div>
  <p className="text-sm text-slate-500">Balance</p>
  <p className="font-semibold">
    {new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: customer.application.preferredCurrency,
    }).format(customer.balance)}
  </p>
</div>
<div>
  <p className="text-sm text-slate-500">Currency</p>
  <p className="font-semibold">
    {customer.application.preferredCurrency}
  </p>
</div>
<div>
  <p className="text-sm text-slate-500">Email</p>
  <p className="font-semibold">
    {customer.application.email}
  </p>
</div>
<div>
  <p className="text-sm text-slate-500">Phone Number</p>
  <p className="font-semibold">
    {customer.application.phoneNumber}
  </p>
</div>
<div>
  <p className="text-sm text-slate-500">Date Opened</p>
  <p className="font-semibold">
    {new Date(customer.createdAt).toLocaleDateString()}
  </p>
</div>

</div>

</div>

<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
  <h2 className="text-2xl font-bold text-slate-900 mb-6">
    Account Actions
  </h2>

  <div className="flex flex-wrap gap-4">

  <Link
  href={`/admin/customers/${customer.id}/deposit`}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition inline-flex items-center justify-center"
>
  Deposit
</Link>

  <Link
  href={`/admin/customers/${customer.id}/withdraw`}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition inline-flex items-center justify-center"
>
  Withdraw
</Link>

  <form action={updateAccountStatus}>
  <input
    type="hidden"
    name="customerId"
    value={customer.id}
  />

  <input
    type="hidden"
    name="accountStatus"
    value={customer.accountStatus === "Active" ? "Frozen" : "Active"}
  />

  <button
    type="submit"
    className={`${
      customer.accountStatus === "Active"
        ? "bg-red-600 hover:bg-red-700"
        : "bg-emerald-600 hover:bg-emerald-700"
    } text-white px-6 py-3 rounded-xl font-medium transition`}
  >
    {customer.accountStatus === "Active"
      ? "Freeze Account"
      : "Activate Account"}
  </button>
</form>

  <DeleteCustomerButton customerId={customer.id} />

</div>

</div>

<h1 className="text-4xl font-bold text-slate-900">
  Customer Management
</h1>

<p className="text-slate-500">
  Manage this customer's account.
</p>

</div>
);
}