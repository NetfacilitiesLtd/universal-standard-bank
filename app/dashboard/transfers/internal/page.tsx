"use client";

import { useState } from "react";
import { ArrowLeftRight, CheckCircle } from "lucide-react";
import {
  verifyRecipient,
  transferMoney,
} from "@/app/actions/internal-transfer";

export default function InternalTransferPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  async function handleVerifyRecipient() {
    if (!accountNumber.trim()) {
      alert("Please enter an account number.");
      return;
    }

    setLoading(true);

    const result = await verifyRecipient(accountNumber);

    setLoading(false);

    if (!result.success || !result.customer) {
      setRecipientName("");
      setVerified(false);
      alert(result.message);
      return;
    }

    setRecipientName(result.customer.fullName);
    setVerified(true);
  }
async function handleTransfer() {
  if (!verified) return;

  const result = await transferMoney(
    accountNumber,
    Number(amount),
    description
  );

  if (!result.success) {
    alert(result.message);
    return;
  }

  alert(result.message);

  setAccountNumber("");
  setRecipientName("");
  setAmount("");
  setDescription("");
  setVerified(false);
}
  return (
    <div className="max-w-4xl">
      {/* Header */}

      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
          <ArrowLeftRight className="text-white" size={30} />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Internal Bank Transfer
          </h1>

          <p className="text-slate-500 mt-2">
            Send money instantly to another Universal Standard Bank account.
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">

        {/* Account Number */}

        <div>
          <label className="block text-sm font-semibold mb-2">
            Recipient Account Number
          </label>

          <input
            type="text"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              setVerified(false);
              setRecipientName("");
            }}
            placeholder="Enter account number"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Recipient */}

        {verified && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4">
            <CheckCircle
              className="text-green-600 mt-1"
              size={28}
            />

            <div>
              <p className="font-semibold text-green-700">
                Recipient Verified
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {recipientName}
              </h3>

              <p className="text-slate-500 mt-1">
                Account Number: {accountNumber}
              </p>
            </div>
          </div>
        )}

        {/* Amount */}

        <div>
          <label className="block text-sm font-semibold mb-2">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            disabled={!verified}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
          />
        </div>

        {/* Description */}

        <div>
          <label className="block text-sm font-semibold mb-2">
            Description (Optional)
          </label>

          <textarea
            rows={4}
            value={description}
            disabled={!verified}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this transfer for?"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
          />
        </div>

        {/* Button */}

        <button
          onClick={verified ? handleTransfer : handleVerifyRecipient}
          disabled={loading}
          className={`w-full rounded-xl py-4 font-semibold transition ${
            verified
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading
            ? "Verifying..."
            : verified
            ? "Transfer Money"
            : "Verify Recipient"}
        </button>

      </div>
    </div>
  );
}