"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  Globe2,
  ChevronRight,
} from "lucide-react";

export default function TransferPage() {
  return (
    <div className="max-w-6xl">
      {/* Header */}

      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
            <ArrowLeftRight className="text-white" size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Transfer Money
            </h1>

            <p className="text-slate-500 mt-2">
              Choose how you would like to send money.
            </p>
          </div>
        </div>
      </div>

      {/* Transfer Options */}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Internal Transfer */}

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 hover:shadow-xl transition">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
            <ArrowLeftRight className="text-white" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-6">
            Internal Bank Transfer
          </h2>

          <p className="text-slate-500 mt-3 leading-7">
            Transfer funds instantly to another Universal Standard Bank customer
            using their account number.
          </p>

          <Link
  href="/dashboard/transfers/internal"
  className="mt-8 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold transition"
>
  Continue

  <ChevronRight size={20} />
</Link>
        </div>

        {/* International Transfer */}

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 hover:shadow-xl transition">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
            <Globe2 className="text-white" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-6">
            International Transfer
          </h2>

          <p className="text-slate-500 mt-3 leading-7">
            Send money securely to bank accounts anywhere in the world using
            international banking details.
          </p>

          <Link
            href="/dashboard/transfers/international"
            className="mt-8 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-semibold transition"
          >
            Continue

            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}