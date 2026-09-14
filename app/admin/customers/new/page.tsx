"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle, UserPlus, ArrowLeft, Eye } from "lucide-react";

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "GHS",
  "NGN",
  "KES",
  "ZAR",
  "CAD",
  "AUD",
  "NZD",
  "CHF",
  "JPY",
  "CNY",
  "INR",
  "AED",
  "SAR",
  "QAR",
  "KWD",
  "BHD",
  "OMR",
  "SGD",
  "HKD",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "CZK",
  "HUF",
  "TRY",
  "BRL",
  "MXN",
  "ARS",
  "CLP",
  "COP",
  "THB",
  "MYR",
  "IDR",
  "PHP",
  "VND",
  "PKR",
  "BDT",
  "LKR",
  "EGP",
  "MAD",
  "TZS",
  "UGX",
  "RWF",
  "XOF",
  "XAF",
];

type CreatedCustomer = {
  accountNumber: string;
  customerId: string;
};

export default function NewCustomerPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdCustomer, setCreatedCustomer] =
    useState<CreatedCustomer | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");
    setCreatedCustomer(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/admin/customers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create customer.");
        setLoading(false);
        return;
      }

      setMessage(data.message || "Customer created successfully.");

      setCreatedCustomer({
        accountNumber: data.accountNumber,
        customerId: data.customerId,
      });

      form.reset();
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  function registerAnotherCustomer() {
    setMessage("");
    setError("");
    setCreatedCustomer(null);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link
          href="/admin/customers"
          className="mt-1 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={22} />
        </Link>

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Register New Customer
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new customer profile and open their first account.
          </p>
        </div>
      </div>

      {/* Success Confirmation */}
      {createdCustomer && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle size={28} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-green-800">
                Customer Created Successfully
              </h2>

              <p className="mt-1 text-green-700">
                The customer profile and bank account have been created.
              </p>

              <div className="mt-5 rounded-xl border border-green-200 bg-white p-5">
                <p className="text-sm font-medium text-slate-500">
                  Account Number
                </p>

                <p className="mt-1 text-2xl font-bold tracking-wider text-slate-900">
                  {createdCustomer.accountNumber}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/admin/customers/${createdCustomer.customerId}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  <Eye size={19} />
                  View Customer Profile
                </Link>

                <button
                  type="button"
                  onClick={registerAnotherCustomer}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <UserPlus size={19} />
                  Register Another Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      {!createdCustomer && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">

            {/* First Name */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                First Name
              </label>

              <input
                name="firstName"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Middle Name */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Middle Name
              </label>

              <input
                name="middleName"
                type="text"
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Last Name
              </label>

              <input
                name="lastName"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Phone Number
              </label>

              <input
                name="phoneNumber"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Date of Birth
              </label>

              <input
                name="dateOfBirth"
                type="date"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Gender
              </label>

              <select
                name="gender"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Nationality */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Nationality
              </label>

              <input
                name="nationality"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Residential Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-slate-900">
                Residential Address
              </label>

              <textarea
                name="residentialAddress"
                rows={3}
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Country */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Country
              </label>

              <input
                name="country"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* State */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                State / Region
              </label>

              <input
                name="state"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                City
              </label>

              <input
                name="city"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Postal Code
              </label>

              <input
                name="postalCode"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* ID Type */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                ID Type
              </label>

              <select
                name="idType"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              >
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">
                  Driver&apos;s License
                </option>
                <option value="Voter ID">Voter ID</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* ID Number */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                ID Number
              </label>

              <input
                name="idNumber"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* ID Expiry */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                ID Expiry Date
              </label>

              <input
                name="idExpiryDate"
                type="date"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Account Type
              </label>

              <select
                name="accountType"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              >
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
                <option value="Business">Business</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Currency
              </label>

              <select
                name="preferredCurrency"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            {/* Account Number */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-slate-900">
                Account Number
              </label>

              <input
                name="accountNumber"
                type="text"
                inputMode="numeric"
                maxLength={12}
                pattern="[0-9]{12}"
                placeholder="Leave blank to generate automatically"
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />

              <p className="mt-2 text-sm text-slate-500">
                Enter a unique 12-digit account number, or leave this blank to
                generate one automatically.
              </p>
            </div>

            {/* Occupation */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Occupation
              </label>

              <input
                name="occupation"
                type="text"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Employer */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Employer
              </label>

              <input
                name="employer"
                type="text"
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Temporary Password
              </label>

              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* PIN */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Verification PIN
              </label>

              <input
                name="pin"
                type="password"
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]{4,6}"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Opening Balance */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Opening Balance
              </label>

              <input
                name="openingBalance"
                type="number"
                min="0"
                step="0.01"
                defaultValue="0"
                required
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-red-600"
              />
            </div>

            {/* Passport Photo */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Passport Photograph
              </label>

              <input
                name="passportPhoto"
                type="file"
                accept="image/*"
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900"
              />
            </div>

            {/* Government ID */}
            <div>
              <label className="mb-2 block font-medium text-slate-900">
                Government ID
              </label>

              <input
                name="governmentId"
                type="file"
                accept="image/*,.pdf"
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700 disabled:bg-slate-400"
          >
            <UserPlus size={20} />

            {loading ? "Creating Customer..." : "Create Customer"}
          </button>
        </form>
      )}
    </div>
  );
}