import {
  Landmark,
  ShieldCheck,
  ArrowLeftRight,
} from "lucide-react";

interface CustomerSummaryProps {
  customer: {
    accountStatus: string;
    transactions: {
      id: string;
    }[];
  };
}

export default function CustomerSummary({
  customer,
}: CustomerSummaryProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <Landmark className="text-red-600 mb-4" />

        <p className="text-slate-500">
          Accounts
        </p>

        <h2 className="text-3xl font-bold mt-2">
          1
        </h2>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <ShieldCheck className="text-red-600 mb-4" />

        <p className="text-slate-500">
          Account Status
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {customer.accountStatus}
        </h2>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <ArrowLeftRight className="text-red-600 mb-4" />

        <p className="text-slate-500">
          Transactions
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {customer.transactions.length}
        </h2>
      </div>
    </div>
  );
}