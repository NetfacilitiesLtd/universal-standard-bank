import {
  CreditCard,
  Lock,
  Eye,
  Settings,
} from "lucide-react";

export default function CardsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          My Cards
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your debit and credit cards.
        </p>
      </div>

      {/* Card */}

      <div className="max-w-lg">

        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 p-8 text-white shadow-xl">

          <div className="flex justify-between items-center">

            <CreditCard size={36} />

            <span className="font-semibold">
             Universal Standard Bank
            </span>

          </div>

          <div className="mt-12 text-2xl tracking-[4px] font-semibold">
            **** **** **** 6789
          </div>

          <div className="mt-8 flex justify-between">

            <div>
              <p className="text-sm opacity-80">
                Card Holder
              </p>

              <p className="font-semibold">
                John Doe
              </p>
            </div>

            <div>
              <p className="text-sm opacity-80">
                Expires
              </p>

              <p className="font-semibold">
                08/30
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="grid md:grid-cols-3 gap-6">

        <button className="bg-white border rounded-2xl p-6 hover:shadow-md transition flex items-center gap-4">
          <Eye className="text-red-600" />
          <span>View Card Details</span>
        </button>

        <button className="bg-white border rounded-2xl p-6 hover:shadow-md transition flex items-center gap-4">
          <Lock className="text-red-600" />
          <span>Freeze Card</span>
        </button>

        <button className="bg-white border rounded-2xl p-6 hover:shadow-md transition flex items-center gap-4">
          <Settings className="text-red-600" />
          <span>Card Settings</span>
        </button>

      </div>

    </div>
  );
}