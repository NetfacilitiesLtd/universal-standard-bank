"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteNotificationButtonProps = {
  notificationId: string;
};

export default function DeleteNotificationButton({
  notificationId,
}: DeleteNotificationButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const response = await fetch("/api/notifications/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Unable to delete this notification. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
      title="Delete notification"
      aria-label="Delete notification"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}