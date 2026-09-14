"use client";

import { useState } from "react";

type OnlineBankingCredentialsProps = {
  formData: {
    password: string;
    pin: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function OnlineBankingCredentials({
  formData,
  setFormData,
}: OnlineBankingCredentialsProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Online Banking Credentials
        </h2>

        <p className="text-slate-500 mt-2">
          Create the credentials you will use to access your online banking after
          your application has been approved.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Password */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Password <span className="text-red-600">*</span>
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a secure password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Confirm Password */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Confirm Password <span className="text-red-600">*</span>
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Verification PIN */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            6-Digit Verification PIN <span className="text-red-600">*</span>
          </label>

          <input
            type="password"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            maxLength={6}
            placeholder="Enter 6-digit PIN"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Confirm PIN */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Confirm Verification PIN <span className="text-red-600">*</span>
          </label>

          <input
            type="password"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            maxLength={6}
            placeholder="Confirm your 6-digit PIN"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

      </div>

      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> Keep your password and verification PIN secure.
          You will use them together with your account number to log in after your
          account application has been approved.
        </p>
      </div>
    </section>
  );
}