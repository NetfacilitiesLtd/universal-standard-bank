"use client";

import Link from "next/link";
import { Landmark, BadgeCheck, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type Customer = {
  accountStatus: string;
  accountNumber: string;
  balance: number;
  accountOpenedAt: string | Date;
  application: {
    accountType: string;
    preferredCurrency: string;
  };
};

type Props = {
  customer: Customer;
};

const translations: Record<
  SupportedLanguage,
  {
    title: string;
    description: string;
    accountNumber: string;
    currency: string;
    availableBalance: string;
    dateOpened: string;
    manageAccount: string;
  }
> = {
  en: {
    title: "My Account",
    description: "Manage your account from one place.",
    accountNumber: "Account Number",
    currency: "Currency",
    availableBalance: "Available Balance",
    dateOpened: "Date Opened",
    manageAccount: "Manage Account",
  },

  de: {
    title: "Mein Konto",
    description: "Verwalten Sie Ihr Konto an einem Ort.",
    accountNumber: "Kontonummer",
    currency: "Währung",
    availableBalance: "Verfügbarer Kontostand",
    dateOpened: "Eröffnungsdatum",
    manageAccount: "Konto verwalten",
  },

  fr: {
    title: "Mon compte",
    description: "Gérez votre compte depuis un seul endroit.",
    accountNumber: "Numéro de compte",
    currency: "Devise",
    availableBalance: "Solde disponible",
    dateOpened: "Date d'ouverture",
    manageAccount: "Gérer le compte",
  },
};

export default function AccountsClient({
  customer,
}: Props) {
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
    <main className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            {t.title}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.description}
          </p>
        </div>

        {/* Account Card */}

        <div className="max-w-md">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7 hover:shadow-xl transition">
            <div className="flex justify-between items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Landmark
                  className="text-white"
                  size={30}
                />
              </div>

              <span className="flex items-center gap-2 text-green-600 font-semibold">
                <BadgeCheck size={18} />
                {customer.accountStatus}
              </span>
            </div>

            <h2 className="text-2xl font-bold mt-7">
              {customer.application.accountType}
            </h2>

            <div className="space-y-4 mt-6">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t.accountNumber}
                </span>

                <span className="font-semibold">
                  ****{customer.accountNumber.slice(-4)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t.currency}
                </span>

                <span className="font-semibold">
                  {customer.application.preferredCurrency}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t.availableBalance}
                </span>

                <span className="font-bold text-lg">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency:
                      customer.application.preferredCurrency,
                  }).format(customer.balance)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t.dateOpened}
                </span>

                <span className="font-semibold">
                  {new Date(
                    customer.accountOpenedAt
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Link
              href={`/dashboard/accounts/${customer.accountNumber}`}
              className="mt-8 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold transition"
            >
              {t.manageAccount}

              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}