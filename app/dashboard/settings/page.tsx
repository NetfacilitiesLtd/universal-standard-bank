import { getCurrentCustomer } from "@/lib/currentCustomer";
import { updatePassword, updatePin } from "./actions";
export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{
  success?: string;
  error?: string;
}>;
}) {
  const customer = await getCurrentCustomer();
const { success, error } = await searchParams;
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your account security and view your profile information.
        </p>
     {success === "password" && (
  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700 font-medium">
    ✅ Password updated successfully.
  </div>
)}

{success === "pin" && (
  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700 font-medium">
    ✅ PIN updated successfully.
  </div>
)}
{error === "wrong-password" && (
  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
    ❌ Current password is incorrect.
  </div>
)}
{error === "password-mismatch" && (
  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
    ❌ New passwords do not match.
  </div>
)}
{error === "wrong-pin" && (
  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
    ❌ Current PIN is incorrect.
  </div>
)}

{error === "pin-mismatch" && (
  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
    ❌ New PINs do not match.
  </div>
)}

{error === "invalid-pin" && (
  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
    ❌ PIN must be exactly 6 digits.
  </div>
)}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

        <div className="flex flex-col md:flex-row gap-8">

          <div className="flex justify-center">

            <img
  src="/api/customer/passport-photo"
  alt="Passport"
  className="w-40 h-40 rounded-full object-cover border-4 border-red-600"
/>

          </div>

          <div className="grid md:grid-cols-2 gap-6 flex-1">

            <div>
              <p className="text-sm text-slate-500">
                Full Name
              </p>

              <p className="font-semibold text-lg">
                {customer.application.firstName}{" "}
                {customer.application.lastName}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Account Number
              </p>

              <p className="font-semibold">
                {customer.accountNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email Address
              </p>

              <p className="font-semibold">
                {customer.application.email}
              </p>

              <p className="text-xs text-red-600 mt-1">
                To update your email address, please contact the bank.
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Phone Number
              </p>

              <p className="font-semibold">
                {customer.application.phoneNumber}
              </p>

              <p className="text-xs text-red-600 mt-1">
                To update your phone number, please contact the bank.
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Account Type
              </p>

              <p className="font-semibold">
                {customer.application.accountType}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Preferred Currency
              </p>

              <p className="font-semibold">
                {customer.application.preferredCurrency}
              </p>
            </div>

          </div>

        </div>
<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
  <h2 className="text-2xl font-bold text-slate-900 mb-2">
    Change Password
  </h2>

  <p className="text-slate-500 mb-8">
    Update your online banking password.
  </p>

  <form
    action={updatePassword}
    className="grid gap-6 max-w-xl"
  >
    <div>
      <label className="block text-sm font-medium mb-2">
        Current Password
      </label>

      <input
        name="currentPassword"
        type="password"
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        New Password
      </label>

      <input
        name="newPassword"
        type="password"
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Confirm New Password
      </label>

      <input
        name="confirmPassword"
        type="password"
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
      />
    </div>

    <button
  type="submit"
  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-xl font-semibold w-fit transition"
>
  Update Password
</button>
  </form>
</div>
<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-8">
  <h2 className="text-2xl font-bold text-slate-900 mb-2">
    Change PIN
  </h2>

  <p className="text-slate-500 mb-8">
    Update your transaction PIN.
  </p>

  <form
  action={updatePin}
  className="grid gap-6 max-w-xl"
>

    <div>
      <label className="block text-sm font-medium mb-2">
        Current PIN
      </label>

      <input
        type="password"
         name="currentPin"
        maxLength={6}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        New PIN
      </label>

      <input
        type="password"
        name="newPin"
        maxLength={6}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Confirm New PIN
      </label>

      <input
        type="password"
       name="confirmPin"
        maxLength={6}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
      />
    </div>

    <button
  type="submit"
  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold w-fit"
>
  Update PIN
</button>

</form>
</div>
      </div>

    </div>
  );
}