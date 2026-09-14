"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      router.push("/verify");
    } catch (error) {
      console.error(error);
      alert("Unable to login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <Image
  src="/images/hero-bg.jpg"
  alt="Bank"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>

        <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center">
          <div className="text-center text-white px-10">
            <h1 className="text-5xl font-bold mb-6">
              Universal Standard Bank
            </h1>

            <p className="text-xl leading-8">
              Secure banking built for individuals,
              businesses and organizations.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Customer Online Banking
          </h2>

          <p className="text-gray-600 mb-2">
            Secure access to your Universal Standard Bank account.
          </p>

          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium mt-4">
            🔒 Protected with 256-bit SSL Encryption
          </div>

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Account Number
              </label>

              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your account number"
                className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-gray-50 outline-none text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 bg-gray-50">
                <LockKeyhole className="text-gray-500 mr-3" size={20} />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-4 outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="accent-blue-700" />
                Remember Me
              </label>

              <Link href="#" className="text-blue-700 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-lg disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Continue"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8 text-sm">
            Need help accessing your account? Contact Customer Care.
          </p>
        </div>
      </div>
    </div>
  );
}