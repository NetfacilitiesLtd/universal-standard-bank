import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditCustomerHeaderProps {
  customerId: string;
}

export default function EditCustomerHeader({
  customerId,
}: EditCustomerHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Link
          href={`/admin/customers/${customerId}`}
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Customer
        </Link>

        <h1 className="text-3xl font-bold text-slate-800 mt-4">
          Edit Customer
        </h1>

        <p className="text-slate-500 mt-2">
          Update customer information and account details.
        </p>
      </div>
    </div>
  );
}