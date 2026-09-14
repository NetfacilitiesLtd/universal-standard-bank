"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  ReceiptText,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "My Accounts",
    icon: Wallet,
    href: "/dashboard/accounts",
  },
  {
    title: "Transfer Money",
    icon: ArrowLeftRight,
    href: "/dashboard/transfers",
  },
  {
    title: "Transactions",
    icon: ReceiptText,
    href: "/dashboard/transactions",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}

      <div className="px-8 py-8 border-b">
        <Image
          src="/logo.png"
          alt="Universal Standard Bank"
          width={180}
          height={55}
          priority
        />
      </div>

      {/* Menu */}

      <nav className="flex-1 px-5 py-8">
        <p className="uppercase tracking-[4px] text-xs text-slate-400 mb-6 px-4">
          Main Menu
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-red-600"
                }`}
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}

      <div className="border-t p-5">
        <Link
          href="/"
          className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={22} />

          <span className="font-medium">
            Logout
          </span>
        </Link>
      </div>
    </aside>
  );
}