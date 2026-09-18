"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Landmark,
  BadgeCheck,
  ArrowLeftRight,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type Transaction = {
  description: string | null;
  transactionDate: string | Date;
  amount: number;
};

type Customer = {
  accountStatus: string;
  accountNumber: string;
  balance: number;
  accountOpenedAt: string | Date;
  application: {
    accountType: string;
    preferredCurrency: string;
  };
  transactions: Transaction[];
};

type Props = {
  customer: Customer;
};

const translations: Record<
  SupportedLanguage,
  {
    backToAccounts: string;
    accountNumber: string;
    availableBalance: string;
    currency: string;
    dateOpened: string;
    accountType: string;
    transferMoney: string;
    downloadStatement: string;
    recentTransactions: string;
    transactionsForAccount: string;
  }
> = {
  en: {
    backToAccounts: "Back to My Accounts",
    accountNumber: "Account Number",
    availableBalance: "Available Balance",
    currency: "Currency",
    dateOpened: "Date Opened",
    accountType: "Account Type",
    transferMoney: "Transfer Money",
    downloadStatement: "Download Statement",
    recentTransactions: "Recent Transactions",
    transactionsForAccount: "Transactions for this account",
  },

  de: {
    backToAccounts: "Zurück zu meinen Konten",
    accountNumber: "Kontonummer",
    availableBalance: "Verfügbarer Kontostand",
    currency: "Währung",
    dateOpened: "Eröffnungsdatum",
    accountType: "Kontotyp",
    transferMoney: "Geld überweisen",
    downloadStatement: "Kontoauszug herunterladen",
    recentTransactions: "Letzte Transaktionen",
    transactionsForAccount: "Transaktionen für dieses Konto",
  },

  fr: {
    backToAccounts: "Retour à mes comptes",
    accountNumber: "Numéro de compte",
    availableBalance: "Solde disponible",
    currency: "Devise",
    dateOpened: "Date d'ouverture",
    accountType: "Type de compte",
    transferMoney: "Transférer de l'argent",
    downloadStatement: "Télécharger le relevé",
    recentTransactions: "Transactions récentes",
    transactionsForAccount: "Transactions pour ce compte",
  },
};

export default function AccountDetailsClient({
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
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/dashboard/accounts"
          className="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline mb-8"
        >
          <ArrowLeft size={18} />
          {t.backToAccounts}
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Landmark
                  className="text-white"
                  size={36}
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {customer.application.accountType}
                </h1>

                <p className="text-slate-500 mt-1">
                  {t.accountNumber}: ****
                  {customer.accountNumber.slice(-4)}
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex items-center gap-2 text-green-600 font-semibold">
              <BadgeCheck size={20} />
              {customer.accountStatus}
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="text-slate-500 text-sm">
                {t.availableBalance}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency:
                    customer.application.preferredCurrency,
                }).format(customer.balance)}
              </h2>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="text-slate-500 text-sm">
                {t.currency}
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {customer.application.preferredCurrency}
              </h2>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="text-slate-500 text-sm">
                {t.dateOpened}
              </p>

              <h2 className="text-xl font-bold mt-2">
                {new Date(
                  customer.accountOpenedAt
                ).toLocaleDateString()}
              </h2>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <p className="text-slate-500 text-sm">
                {t.accountType}
              </p>

              <h2 className="text-xl font-bold mt-2">
                {customer.application.accountType}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Link
            href="/dashboard/transfers"
            className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 flex items-center justify-center gap-3 font-semibold transition"
          >
            <ArrowLeftRight size={22} />
            {t.transferMoney}
          </Link>

          <a
            href="/api/statement"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 flex items-center justify-center gap-3 font-semibold transition"
          >
            <FileText size={22} />
            {t.downloadStatement}
          </a>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm mt-8 p-8">
          <h2 className="text-2xl font-bold">
            {t.recentTransactions}
          </h2>

          <p className="text-slate-500 mt-2 mb-6">
            {t.transactionsForAccount}
          </p>

          <div className="space-y-5">
            {customer.transactions
              .slice(0, 3)
              .map((transaction, index) => (
                <div
                  key={index}
                  className={`flex justify-between ${
                    index < 2
                      ? "border-b pb-4"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="font-semibold">
                      {transaction.description}
                    </h3>

                    <p className="text-slate-500 text-sm">
                      {new Date(
                        transaction.transactionDate
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`font-bold ${
                      index === 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency:
                        customer.application
                          .preferredCurrency,
                    }).format(transaction.amount)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}