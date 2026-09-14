"use client";

import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/app/admin/logout/actions";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAdmin();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}