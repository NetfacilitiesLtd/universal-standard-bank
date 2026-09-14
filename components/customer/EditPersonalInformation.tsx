interface EditPersonalInformationProps {
  customer: {
    application: {
      firstName: string;
      middleName: string | null;
      lastName: string;
      email: string;
      phoneNumber: string;
      occupation: string;
      employer: string | null;
    };
  };
}

export default function EditPersonalInformation({
  customer,
}: EditPersonalInformationProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold">
          Personal Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">

        <div>
          <label className="block text-sm font-medium mb-2">
            First Name
          </label>

          <input
  name="firstName"
  defaultValue={customer.application.firstName}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Middle Name
          </label>

          <input
  name="middleName"
  defaultValue={customer.application.middleName ?? ""}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Last Name
          </label>

          <input
  name="lastName"
  defaultValue={customer.application.lastName}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            name="email"
            defaultValue={customer.application.email}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>

          <input
  name="phoneNumber"
  defaultValue={customer.application.phoneNumber}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Occupation
          </label>

          <input
  name="occupation"
  defaultValue={customer.application.occupation}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Employer
          </label>

          <input
  name="employer"
  defaultValue={customer.application.employer ?? ""}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

      </div>
    </div>
  );
}