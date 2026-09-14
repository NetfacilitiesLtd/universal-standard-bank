"use client";

type IdentificationProps = {
  formData: {
    idType: string;
    idNumber: string;
    idExpiryDate: string;
    nationality: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function Identification({
  formData,
  setFormData,
}: IdentificationProps) {
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
          Identification
        </h2>

        <p className="text-slate-500 mt-2">
          Provide a valid government-issued identification document.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* ID Type */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ID Type <span className="text-red-600">*</span>
          </label>

          <select
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select ID Type</option>
            <option>Passport</option>
            <option>National ID</option>
            <option>Driver's License</option>
            <option>Residence Permit</option>
          </select>
        </div>

        {/* ID Number */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ID Number <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="Enter ID Number"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Expiry Date */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ID Expiry Date <span className="text-red-600">*</span>
          </label>

          <input
            type="date"
            name="idExpiryDate"
            value={formData.idExpiryDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Nationality */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nationality <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Enter your nationality"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

      </div>
    </section>
  );
}