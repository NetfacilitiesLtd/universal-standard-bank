import {
  Wallet,
  CreditCard,
  Landmark,
  BadgeCheck,
} from "lucide-react";

type BalanceCardsProps = {
  customer: {
    accountNumber: string;
    balance: number;
    accountStatus: string;
    application: {
      accountType: string;
      preferredCurrency: string;
    };
  };
};

export default function BalanceCards({
  customer,
}: BalanceCardsProps) {
  const currency = customer.application.preferredCurrency || "USD";

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(customer.balance);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="uppercase tracking-widest text-red-100 text-sm">
              Total Available Balance
            </p>

            <h1 className="text-5xl font-bold mt-3">
              {formattedBalance}
            </h1>

            <p className="mt-4 text-red-100">
              Current Account Balance
            </p>
          </div>

          <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white/20 items-center justify-center">
            <Wallet size={42} />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Your Account
            </h2>

            <p className="text-slate-500">
              Account linked to your online banking profile
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition p-6">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Landmark className="text-white" size={28} />
              </div>

              <BadgeCheck
                className="text-green-600"
                size={24}
              />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              {customer.application.accountType}
            </h3>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Account No.
                </span>

                <span className="font-semibold">
                  {customer.accountNumber}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Currency
                </span>

                <span className="font-semibold">
                  {currency}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Balance
                </span>

                <span className="font-bold text-lg">
                  {formattedBalance}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Status
                </span>

                <span className="text-green-600 font-semibold">
                  {customer.accountStatus}
                </span>
              </div>
            </div>

            <button className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
              <CreditCard size={18} />
              View Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}