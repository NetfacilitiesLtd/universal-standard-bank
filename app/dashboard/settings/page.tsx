import { getCurrentCustomer } from "@/lib/currentCustomer";
import { updatePassword, updatePin } from "./actions";
import SettingsClient from "@/components/dashboard/SettingsClient";

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
    <SettingsClient
      customer={{
        accountNumber: customer.accountNumber,
        application: {
          firstName: customer.application.firstName,
          lastName: customer.application.lastName,
          email: customer.application.email,
          phoneNumber: customer.application.phoneNumber,
          accountType: customer.application.accountType,
          preferredCurrency:
            customer.application.preferredCurrency,
        },
      }}
      updatePassword={updatePassword}
      updatePin={updatePin}
      success={success}
      error={error}
    />
  );
}