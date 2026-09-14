"use client";

import { useTransition } from "react";
import { updateAccountStatus } from "@/lib/actions/customer";

type Props = {
  customerId: string;
  accountStatus: string;
};

export default function AccountStatusButtons({
  customerId,
  accountStatus,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function changeStatus(status: string) {
    const formData = new FormData();
    formData.append("customerId", customerId);
    formData.append("accountStatus", status);

    startTransition(async () => {
      await updateAccountStatus(formData);
    });
  }

  return (
    <>
      {accountStatus === "Active" ? (
        <button
          onClick={() => changeStatus("Frozen")}
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          {isPending ? "Updating..." : "Freeze Account"}
        </button>
      ) : (
        <button
          onClick={() => changeStatus("Active")}
          disabled={isPending}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          {isPending ? "Updating..." : "Activate Account"}
        </button>
      )}
    </>
  );
}