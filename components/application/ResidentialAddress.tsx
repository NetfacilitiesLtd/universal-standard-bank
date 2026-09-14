"use client";

type ResidentialAddressProps = {
  formData: {
    residentialAddress: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function ResidentialAddress({
  formData,
  setFormData,
}: ResidentialAddressProps) {
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
          Residential Address
        </h2>

        <p className="text-slate-500 mt-2">
          Tell us where you currently reside.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Residential Address */}

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Residential Address <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            placeholder="House Number, Street Name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Country */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Country <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* State */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            State / Province <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State or Province"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* City */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            City <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Postal Code */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Postal Code
          </label>

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

      </div>
    </section>
  );
}