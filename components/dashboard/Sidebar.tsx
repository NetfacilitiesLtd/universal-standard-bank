"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  ReceiptText,
  Settings,
  LogOut,
} from "lucide-react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const menuItems = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    key: "accounts",
    icon: Wallet,
    href: "/dashboard/accounts",
  },
  {
    key: "transfer",
    icon: ArrowLeftRight,
    href: "/dashboard/transfers",
  },
  {
    key: "transactions",
    icon: ReceiptText,
    href: "/dashboard/transactions",
  },
  {
    key: "settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

const translations: Record<
  SupportedLanguage,
  {
    mainMenu: string;
    dashboard: string;
    accounts: string;
    transfer: string;
    transactions: string;
    settings: string;
    logout: string;
  }
> = {
  en: {
    mainMenu: "Main Menu",
    dashboard: "Dashboard",
    accounts: "My Accounts",
    transfer: "Transfer Money",
    transactions: "Transactions",
    settings: "Settings",
    logout: "Logout",
  },

  de: {
    mainMenu: "Hauptmenü",
    dashboard: "Dashboard",
    accounts: "Meine Konten",
    transfer: "Geld überweisen",
    transactions: "Transaktionen",
    settings: "Einstellungen",
    logout: "Abmelden",
  },

  fr: {
    mainMenu: "Menu principal",
    dashboard: "Tableau de bord",
    accounts: "Mes comptes",
    transfer: "Transférer de l'argent",
    transactions: "Transactions",
    settings: "Paramètres",
    logout: "Déconnexion",
  },
};

export default function Sidebar() {
  const pathname = usePathname();

  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]*)`)
    );

    if (
      match &&
      SUPPORTED_LANGUAGES.includes(
        match[1] as SupportedLanguage
      )
    ) {
      setLanguage(match[1] as SupportedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      const customEvent =
        event as CustomEvent<SupportedLanguage>;

      if (
        SUPPORTED_LANGUAGES.includes(customEvent.detail)
      ) {
        setLanguage(customEvent.detail);
      }
    };

    window.addEventListener(
      "language-change",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener(
        "language-change",
        handleLanguageChange
      );
    };
  }, []);

  const t = translations[language];

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
          {t.mainMenu}
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            const title =
              item.key === "dashboard"
                ? t.dashboard
                : item.key === "accounts"
                ? t.accounts
                : item.key === "transfer"
                ? t.transfer
                : item.key === "transactions"
                ? t.transactions
                : t.settings;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-red-600"
                }`}
              >
                <Icon size={22} />

                <span className="font-medium">
                  {title}
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
            {t.logout}
          </span>
        </Link>
      </div>
    </aside>
  );
}