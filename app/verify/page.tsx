"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyPage() {
  const router = useRouter();

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (pin.length !== 6) {
      alert("Please enter your 6-digit PIN.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Verification failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Universal Standard Bank
          </h1>

          <p className="text-gray-500 mt-2">
            Identity Verification
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-600 mt-2">
              Please enter your 6-digit Security PIN.
            </p>
          </div>

          <input
            type="password"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg text-center text-2xl font-bold py-4 tracking-[12px] mb-8 outline-none focus:border-blue-600"
            placeholder="••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify Identity"}
          </button>

        </form>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-gray-700 text-center">
            🔒 Your identity is protected with 256-bit SSL Encryption.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-blue-700 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>

      </div>
    </main>
  );
}