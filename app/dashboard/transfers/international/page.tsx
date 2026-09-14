import { Globe2 } from "lucide-react";
import InternationalTransferForm from "@/components/transfers/InternationalTransferForm";

export default function InternationalTransferPage() {
  return (
    <div className="max-w-5xl">
      {/* Header */}

      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
            <Globe2 className="text-white" size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              International Transfer
            </h1>

            <p className="text-slate-500 mt-2">
              Complete the beneficiary information below to send money
              internationally.
            </p>
          </div>
        </div>
      </div>

      <InternationalTransferForm />
    </div>
  );
}