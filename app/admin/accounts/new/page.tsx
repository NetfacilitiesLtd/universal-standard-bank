import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewAccountPage() {
  const customers = await prisma.customer.findMany({
    include: {
      application: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">

        <Link
          href="/admin/accounts"
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
        >
          <ArrowLeft size={20} className="text-slate-700" />
        </Link>

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Open New Account
          </h1>

          <p className="text-slate-500 mt-2">
            Create a new bank account for a customer.
          </p>
        </div>

      </div>

      {/* Account Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-3xl">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">

          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <UserPlus size={24} className="text-red-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Account Information
            </h2>

            <p className="text-slate-500 text-sm">
              Enter the customer's account details.
            </p>
          </div>

        </div>

        <form className="space-y-6">

          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Customer
            </label>

            <select
              name="customerId"
              required
              defaultValue=""
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="" disabled>
                Select customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.application.firstName}{" "}
                  {customer.application.lastName}
                  {" - "}
                  {customer.accountNumber}
                </option>
              ))}
            </select>

            {customers.length === 0 && (
              <p className="text-sm text-red-600 mt-2">
                No customers are currently available.
              </p>
            )}
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Account Type
            </label>

            <select
              name="accountType"
              required
              defaultValue=""
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="" disabled>
                Select account type
              </option>

              <option value="Savings">
                Savings Account
              </option>

              <option value="Current">
                Current Account
              </option>
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Currency
            </label>

            <select
              name="currency"
              required
              defaultValue="USD"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="GHS">GHS - Ghana Cedi</option>
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="AED">AED - UAE Dirham</option>
              <option value="SAR">SAR - Saudi Riyal</option>
              <option value="QAR">QAR - Qatari Riyal</option>
              <option value="KWD">KWD - Kuwaiti Dinar</option>
              <option value="BHD">BHD - Bahraini Dinar</option>
              <option value="OMR">OMR - Omani Rial</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="HKD">HKD - Hong Kong Dollar</option>
              <option value="SEK">SEK - Swedish Krona</option>
              <option value="NOK">NOK - Norwegian Krone</option>
              <option value="DKK">DKK - Danish Krone</option>
              <option value="PLN">PLN - Polish Zloty</option>
              <option value="CZK">CZK - Czech Koruna</option>
              <option value="HUF">HUF - Hungarian Forint</option>
              <option value="TRY">TRY - Turkish Lira</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="MXN">MXN - Mexican Peso</option>
              <option value="ARS">ARS - Argentine Peso</option>
              <option value="CLP">CLP - Chilean Peso</option>
              <option value="COP">COP - Colombian Peso</option>
              <option value="THB">THB - Thai Baht</option>
              <option value="MYR">MYR - Malaysian Ringgit</option>
              <option value="IDR">IDR - Indonesian Rupiah</option>
              <option value="PHP">PHP - Philippine Peso</option>
              <option value="VND">VND - Vietnamese Dong</option>
              <option value="PKR">PKR - Pakistani Rupee</option>
              <option value="BDT">BDT - Bangladeshi Taka</option>
              <option value="LKR">LKR - Sri Lankan Rupee</option>
              <option value="EGP">EGP - Egyptian Pound</option>
              <option value="MAD">MAD - Moroccan Dirham</option>
              <option value="TZS">TZS - Tanzanian Shilling</option>
              <option value="UGX">UGX - Ugandan Shilling</option>
              <option value="RWF">RWF - Rwandan Franc</option>
              <option value="XOF">XOF - West African CFA Franc</option>
              <option value="XAF">XAF - Central African CFA Franc</option>
            </select>
          </div>

          {/* Initial Balance */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Initial Balance
            </label>

            <input
              name="initialBalance"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              defaultValue=""
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">

            <Link
              href="/admin/accounts"
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
            >
              Create Account
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}