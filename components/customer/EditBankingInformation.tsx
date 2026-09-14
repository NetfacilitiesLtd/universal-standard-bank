interface EditBankingInformationProps {
  customer: {
    accountStatus: string;
    application: {
      accountType: string;
      preferredCurrency: string;
    };
  };
}

export default function EditBankingInformation({
  customer,
}: EditBankingInformationProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold">
          Banking Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">

        <div>
          <label className="block text-sm font-medium mb-2">
            Account Type
          </label>

          <input
            defaultValue={customer.application.accountType}
            className="w-full border rounded-lg px-4 py-3 bg-slate-50"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Currency
          </label>

          <select
  name="preferredCurrency"
  defaultValue={customer.application.preferredCurrency}
  className="w-full border rounded-lg px-4 py-3"
>
  <option>USD</option>
  <option>EUR</option>
  <option>GBP</option>
  <option>GHS</option>
</select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Account Status
          </label>

          <select
  name="accountStatus"
  defaultValue={customer.accountStatus}
  className="w-full border rounded-lg px-4 py-3"
>
  <option>Active</option>
  <option>Frozen</option>
  <option>Suspended</option>
  <option>Closed</option>
</select>
        </div>

      </div>
    </div>
  );
}