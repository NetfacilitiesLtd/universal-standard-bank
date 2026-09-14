"use client";

import { UserPlus } from "lucide-react";

export default function NewCustomerPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Register New Customer
        </h1>

        <p className="text-slate-500 mt-2">
          Create a new customer profile and open their first account.
        </p>
      </div>

      {/* Form */}
      <form className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="grid md:grid-cols-2 gap-6">

          {/* First Name */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              First Name
            </label>

            <input
              type="text"
              className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              Last Name
            </label>

            <input
              type="text"
              className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              Email Address
            </label>

            <input
              type="email"
              className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              Phone Number
            </label>

            <input
              type="text"
              className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              Date of Birth
            </label>

            <input
              type="date"
              className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              Gender
            </label>

            <select className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2 text-slate-900">
              Residential Address
            </label>

            <textarea
              rows={3}
              className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              Account Type
            </label>

            <select className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600">
              <option>Savings</option>
              <option>Checking</option>
              <option>Business</option>
              <option>Fixed Deposit</option>
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              Currency
            </label>

            <select className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>GHS</option>
            </select>
          </div>

          {/* Opening Balance */}
          <div>
            <label className="block font-medium mb-2 text-slate-900">
              Opening Balance
            </label>

            <input
              type="number"
              className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 outline-none focus:border-red-600"
            />
          </div>

        </div>

        <button
          type="submit"
          className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition"
        >
          <UserPlus size={20} />
          Create Customer
        </button>
      </form>
    </div>
  );
}