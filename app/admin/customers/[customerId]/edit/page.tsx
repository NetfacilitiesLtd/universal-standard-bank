import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditCustomerHeader from "@/components/customer/EditCustomerHeader";
import EditPersonalInformation from "@/components/customer/EditPersonalInformation";
import EditAddressInformation from "@/components/customer/EditAddressInformation";
import EditBankingInformation from "@/components/customer/EditBankingInformation";
import { updateCustomer } from "@/lib/actions";

interface PageProps {
  params: Promise<{
    customerId: string;
  }>;
}

export default async function EditCustomerPage({
  params,
}: PageProps) {
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
    notFound();
  }

  return (
    <form action={updateCustomer} className="space-y-6">
      <input
        type="hidden"
        name="customerId"
        value={customer.id}
      />

      <EditCustomerHeader customerId={customer.id} />

      <EditPersonalInformation customer={customer} />

      <EditAddressInformation customer={customer} />

      <EditBankingInformation customer={customer} />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}