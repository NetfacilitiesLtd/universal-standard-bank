"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  CreditCard,
  Landmark,
  BadgeCheck,
} from "lucide-react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type BalanceCardsProps = {
  customer: {
    accountNumber: string;
    balance: number;
    accountStatus: string;
    application: {
      accountType: string;
      preferredCurrency: string;
    };
  };
};

const translations: Record<
  SupportedLanguage,
  {
    totalAvailableBalance: string;
    currentAccountBalance: string;
    yourAccount: string;
    accountDescription: string;
    accountNo: string;
    currency: string;
    balance: string;
    status: string;
    viewAccount: string;
  }
> = {
  en: {
    totalAvailableBalance: "Total Available Balance",
    currentAccountBalance: "Current Account Balance",
    yourAccount: "Your Account",
    accountDescription:
      "Account linked to your online banking profile",
    accountNo: "Account No.",
    currency: "Currency",
    balance: "Balance",
    status: "Status",
    viewAccount: "View Account",
  },

  de: {
    totalAvailableBalance: "Verfügbarer Gesamtbetrag",
    currentAccountBalance: "Aktueller Kontostand",
    yourAccount: "Ihr Konto",
    accountDescription:
      "Konto, das mit Ihrem Online-Banking-Profil verknüpft ist",
    accountNo: "Kontonummer",
    currency: "Währung",
    balance: "Kontostand",
    status: "Status",
    viewAccount: "Konto anzeigen",
  },

  fr: {
    totalAvailableBalance: "Solde total disponible",
    currentAccountBalance: "Solde actuel du compte",
    yourAccount: "Votre compte",
    accountDescription:
      "Compte lié à votre profil bancaire en ligne",
    accountNo: "N° de compte",
    currency: "Devise",
    balance: "Solde",
    status: "Statut",
    viewAccount: "Voir le compte",
  },
};

export default function BalanceCards({
  customer,
}: BalanceCardsProps) {
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

  const currency =
    customer.application.preferredCurrency || "USD";

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(customer.balance);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="uppercase tracking-widest text-red-100 text-sm">
              {t.totalAvailableBalance}
            </p>

            <h1 className="text-5xl font-bold mt-3">
              {formattedBalance}
            </h1>

            <p className="mt-4 text-red-100">
              {t.currentAccountBalance}
            </p>
          </div>

          <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white/20 items-center justify-center">
            <Wallet size={42} />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {t.yourAccount}
            </h2>

            <p className="text-slate-500">
              {t.accountDescription}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition p-6">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Landmark
                  className="text-white"
                  size={28}
                />
              </div>

              <BadgeCheck
                className="text-green-600"
                size={24}
              />
            </div>

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              {customer.application.accountType}
            </h3>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t.accountNo}
                </span>

                <span className="font-semibold">
                  {customer.accountNumber}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t.currency}
                </span>

                <span className="font-semibold">
                  {currency}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t.balance}
                </span>

                <span className="font-bold text-lg">
                  {formattedBalance}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  {t.status}
                </span>

                <span className="text-green-600 font-semibold">
                  {customer.accountStatus}
                </span>
              </div>
            </div>

            <button className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
              <CreditCard size={18} />
              {t.viewAccount}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}