"use client";
import Link from "next/link";
import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import NotificationBadge from "./NotificationBadge";
type HeaderProps = {
  customer: {
    accountNumber: string;
    application: {
      firstName: string;
      lastName: string;
      accountType: string;
      passportPhoto: string | null;
    };
  };
  unreadNotifications: number;
};

export default function Header({
  customer,
  unreadNotifications,
}: HeaderProps) {
  const fullName = `${customer.application.firstName} ${customer.application.lastName}`;

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-10 py-6">

        <div>
          <p className="text-slate-500 text-sm">
            Welcome Back,
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            {fullName}
          </h1>

          <p className="text-slate-500 mt-2">
            Account Number: {customer.accountNumber}
          </p>
        </div>

        <div className="flex items-center gap-5">

          <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-3 w-80">
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-3 w-full text-sm"
            />
          </div>

          <Link href="/dashboard/notifications">
  <button className="relative w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center">
    <Bell size={20} />
    <NotificationBadge initialCount={unreadNotifications} />
  </button>
</Link>

          <button className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-2">

            {customer.application.passportPhoto ? (
  <img
  src="/api/customer/passport-photo"
  alt={fullName}
  className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
/>
) : (
  <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
    {customer.application.firstName.charAt(0)}
  </div>
)}

            <div className="hidden lg:block text-left">

              <p className="font-semibold text-slate-900">
                {fullName}
              </p>

              <p className="text-sm text-slate-500">
                {customer.application.accountType}
              </p>

            </div>

            <ChevronDown
              size={18}
              className="text-slate-500"
            />

          </button>

        </div>

      </div>
    </header>
  );
}