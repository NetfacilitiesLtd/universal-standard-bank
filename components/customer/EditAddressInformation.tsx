interface EditAddressInformationProps {
  customer: {
    application: {
      residentialAddress: string;
      country: string;
      state: string;
      city: string;
      postalCode: string;
    };
  };
}

export default function EditAddressInformation({
  customer,
}: EditAddressInformationProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold">
          Address Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Residential Address
          </label>

          <input
  name="residentialAddress"
  defaultValue={customer.application.residentialAddress}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Country
          </label>

          <input
  name="country"
  defaultValue={customer.application.country}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            State
          </label>

          <input
  name="state"
  defaultValue={customer.application.state}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            City
          </label>

          <input
  name="city"
  defaultValue={customer.application.city}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Postal Code
          </label>

          <input
  name="postalCode"
  defaultValue={customer.application.postalCode}
  className="w-full border rounded-lg px-4 py-3"
/>
        </div>

      </div>
    </div>
  );
}