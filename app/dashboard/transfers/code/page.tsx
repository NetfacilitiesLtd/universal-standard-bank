"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TransferCodePage() {
  const router = useRouter();

  const [transferCode, setTransferCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/transfer-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transferCode,
        }),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/dashboard");
        return;
      }

      alert(result.message);
    } catch (error) {
      console.error(error);

      alert("Unable to verify transfer code.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Transfer Code Verification
        </h1>

        <p className="mt-4 text-gray-600 leading-7">
          Your international transfer request has been received successfully.
          To continue processing your transfer, please enter the Transfer Code
          provided by your account officer.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="transferCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Transfer Code
            </label>

            <input
              id="transferCode"
              type="text"
              value={transferCode}
              onChange={(e) => setTransferCode(e.target.value)}
              placeholder="Enter your transfer code"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Verifying..." : "Verify Transfer"}
          </button>
        </form>

        <div className="mt-6">
          <Link
            href="/dashboard/transfers"
            className="text-blue-700 hover:underline"
          >
            ← Back to Transfer Center
          </Link>
        </div>
      </div>
    </div>
  );
}