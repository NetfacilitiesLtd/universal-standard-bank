import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CustomerHeader from "@/components/customer/CustomerHeader";
import CustomerInformation from "@/components/customer/CustomerInformation";
import CustomerSummary from "@/components/customer/CustomerSummary";
import TransactionHistory from "@/components/customer/TransactionHistory";

export default async function CustomerDetails({
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
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <CustomerHeader customerId={customer.id} />

      <CustomerInformation customer={customer} />

      <CustomerSummary customer={customer} />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold">
            Customer Accounts
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-5">
                Account Number
              </th>

              <th className="text-left">
                Type
              </th>

              <th className="text-left">
                Currency
              </th>

              <th className="text-left">
                Balance
              </th>

              <th className="text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-5">
                {customer.accountNumber}
              </td>

              <td>
                {customer.application.accountType}
              </td>

              <td>
                {customer.application.preferredCurrency}
              </td>

              <td>
                {customer.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>

              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {customer.accountStatus}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
  <h2 className="text-xl font-semibold mb-6">
    Supporting Documents
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div>
      <p className="text-sm text-slate-500 mb-2">
        Passport Photograph
      </p>

      {customer.application.passportPhoto ? (
  <div>
    <a
      href={`/api/admin/applications/passport-photo?applicationId=${customer.application.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      View Passport Photo
    </a>
  </div>
) : (
  <p className="text-red-500">
    No passport uploaded.
  </p>
)}
    </div>

    <div>
      <p className="text-sm text-slate-500 mb-2">
        Government ID
      </p>

      {customer.application.governmentId ? (
        <a
          href={`/api/customer/government-id?customerId=${customer.id}`}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          View Government ID
        </a>
      ) : (
        <p className="text-red-500">
          No government ID uploaded.
        </p>
      )}
    </div>

  </div>
</div>

<TransactionHistory
  transactions={customer.transactions}
/>
    </div>
  );
}