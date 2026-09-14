"use client";

type PersonalInformationProps = {
  formData: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    email: string;
    phoneNumber: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function PersonalInformation({
  formData,
  setFormData,
}: PersonalInformationProps) {
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
          Personal Information
        </h2>

        <p className="text-slate-500 mt-2">
          Please enter your personal details exactly as they appear on your
          government-issued identification.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* First Name */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            First Name <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Middle Name */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Middle Name
          </label>

          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Last Name */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Last Name <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Date of Birth */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Date of Birth <span className="text-red-600">*</span>
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Gender */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Gender <span className="text-red-600">*</span>
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>
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
  placeholder="e.g. British"
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
/>
</div>

{/* Email */}

<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Email Address <span className="text-red-600">*</span>
  </label>

  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="example@email.com"
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
  />
</div>

{/* Phone */}

<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Phone Number <span className="text-red-600">*</span>
  </label>

  <input
    type="tel"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleChange}
    placeholder="+44 XX XXXX XXXX"
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
  />
</div>
      </div>
    </section>
  );
}