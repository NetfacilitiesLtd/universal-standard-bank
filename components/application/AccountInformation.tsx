"use client";

type AccountInformationProps = {
  formData: {
    accountType: string;
    preferredCurrency: string;
    occupation: string;
    employer: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function AccountInformation({
  formData,
  setFormData,
}: AccountInformationProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
          Account Information
        </h2>

        <p className="text-slate-500 mt-2">
          Select the type of account you would like to open and your preferred
          account currency.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Account Type */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Account Type <span className="text-red-600">*</span>
          </label>

          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Account Type</option>
            <option>Savings Account</option>
            <option>Current Account</option>
            <option>Business Account</option>
            <option>Fixed Deposit Account</option>
          </select>
        </div>

        {/* Preferred Currency */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Preferred Currency <span className="text-red-600">*</span>
          </label>

          <select
            name="preferredCurrency"
            value={formData.preferredCurrency}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Currency</option>

<option value="USD">USD - United States Dollar ($)</option>
<option value="EUR">EUR - Euro (€)</option>
<option value="GBP">GBP - British Pound (£)</option>
<option value="CHF">CHF - Swiss Franc (CHF)</option>
<option value="CAD">CAD - Canadian Dollar (C$)</option>
<option value="AUD">AUD - Australian Dollar (A$)</option>
<option value="NZD">NZD - New Zealand Dollar (NZ$)</option>
<option value="JPY">JPY - Japanese Yen (¥)</option>
<option value="CNY">CNY - Chinese Yuan (¥)</option>
<option value="SGD">SGD - Singapore Dollar (S$)</option>
<option value="HKD">HKD - Hong Kong Dollar (HK$)</option>
<option value="AED">AED - UAE Dirham (د.إ)</option>
<option value="SAR">SAR - Saudi Riyal (﷼)</option>
<option value="ZAR">ZAR - South African Rand (R)</option>
<option value="NGN">NGN - Nigerian Naira (₦)</option>
<option value="KES">KES - Kenyan Shilling (KSh)</option>
<option value="GHS">GHS - Ghana Cedi (₵)</option>
          </select>
        </div>

        {/* Occupation */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Occupation <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Enter your occupation"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Employer */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Employer / Business Name
          </label>

          <input
            type="text"
            name="employer"
            value={formData.employer}
            onChange={handleChange}
            placeholder="Employer or business name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

      </div>
    </section>
  );
}