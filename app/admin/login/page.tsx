"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LockKeyhole, User } from "lucide-react";
import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await loginAdmin(username, password);

    if (!result.success) {
      setError(result.message ?? "Login failed.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <Image
          src="/images/hero-bg.jpg"
          alt="Bank"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center">
          <div className="text-center text-white px-10">
            <h1 className="text-5xl font-bold mb-6">
              Universal Standard Bank
            </h1>

            <p className="text-xl leading-8">
              Administration Portal
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Administrator Login
          </h2>

          <p className="text-gray-600 mb-6">
            Authorized personnel only.
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-medium">
                Username
              </label>

              <div className="flex items-center border rounded-lg px-4">
                <User className="mr-3 text-gray-500" size={20} />

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-4 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="flex items-center border rounded-lg px-4">
                <LockKeyhole className="mr-3 text-gray-500" size={20} />

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-4 outline-none"
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-700 text-white py-4 rounded-lg hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}