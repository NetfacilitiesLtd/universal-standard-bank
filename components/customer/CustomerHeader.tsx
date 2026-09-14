import Link from "next/link";
import { Pencil, Wallet } from "lucide-react";

interface CustomerHeaderProps {
  customerId: string;
}

export default function CustomerHeader({
  customerId,
}: CustomerHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Customer Profile
        </h1>

        <p className="text-slate-500 mt-2">
          Customer ID: {customerId}
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/admin/customers/${customerId}/deposit`}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <Wallet size={18} />
          Deposit Money
        </Link>

        <Link
          href={`/admin/customers/${customerId}/edit`}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <Pencil size={18} />
          Edit Customer
        </Link>
      </div>
    </div>
  );
}