"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import { CurrentCustomer } from "@/types/customer";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type RecentTransactionsProps = {
  customer: CurrentCustomer;
};

const translations: Record<
  SupportedLanguage,
  {
    recentTransactions: string;
    latestActivity: string;
    viewAll: string;
    noTransactions: string;
  }
> = {
  en: {
    recentTransactions: "Recent Transactions",
    latestActivity: "Your latest account activity",
    viewAll: "View All",
    noTransactions: "No transactions available.",
  },

  de: {
    recentTransactions: "Letzte Transaktionen",
    latestActivity: "Ihre aktuellen Kontoaktivitäten",
    viewAll: "Alle anzeigen",
    noTransactions: "Keine Transaktionen verfügbar.",
  },

  fr: {
    recentTransactions: "Transactions récentes",
    latestActivity: "Votre activité récente sur le compte",
    viewAll: "Tout afficher",
    noTransactions: "Aucune transaction disponible.",
  },
};

export default function RecentTransactions({
  customer,
}: RecentTransactionsProps) {
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
    <section className="px-10 mt-10 pb-10">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {t.recentTransactions}
            </h2>

            <p className="text-slate-500 mt-1">
              {t.latestActivity}
            </p>
          </div>

          <button className="text-red-600 font-semibold hover:underline">
            {t.viewAll}
          </button>
        </div>

        <div>
          {customer.transactions.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              {t.noTransactions}
            </div>
          ) : (
            customer.transactions.map(
              (
                transaction: (typeof customer.transactions)[number]
              ) => {
                const incoming =
                  transaction.type.toLowerCase() === "deposit";

                const Icon = incoming
                  ? ArrowDownLeft
                  : ArrowUpRight;

                const currency =
                  customer.application.preferredCurrency ?? "USD";

                const amount = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                }).format(transaction.amount);

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-6 border-b last:border-none border-slate-100 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          incoming
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <Icon
                          size={22}
                          className={
                            incoming
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {transaction.type}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {transaction.description ||
                            transaction.createdAt.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-lg font-bold ${
                        incoming
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {incoming ? "+" : "-"}
                      {amount}
                    </p>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
    </section>
  );
}