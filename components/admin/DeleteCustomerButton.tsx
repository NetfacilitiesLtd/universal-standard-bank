"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/app/admin/accounts/actions";

type Props = {
  customerId: string;
};

export default function DeleteCustomerButton({
  customerId,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this customer?\n\nThis action cannot be undone."
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteCustomer(customerId);
      router.push("/admin/customers");
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white px-6 py-3 rounded-xl font-medium transition"
    >
      {isPending ? "Deleting..." : "Delete Customer"}
    </button>
  );
}