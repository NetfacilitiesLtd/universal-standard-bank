"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Search,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type Transaction = {
  id: string;
  transactionDate: Date | string;
  description: string | null;
  reference: string | null;
  type: string;
  amount: number;
  status: string;
};

type Props = {
  transactions: Transaction[];
  preferredCurrency: string;
};

const translations = {
  en: {
    title: "Transactions",
    subtitle: "Review all account activity.",
    download: "Download Statement",
    search: "Search transactions...",
    date: "Date",
    description: "Description",
    reference: "Reference",
    type: "Type",
    amount: "Amount",
    status: "Status",
    noTransactions: "No transactions found.",
    deposit: "Deposit",
    withdrawal: "Withdrawal",
  },

  de: {
    title: "Transaktionen",
    subtitle: "Überprüfen Sie alle Kontoaktivitäten.",
    download: "Kontoauszug herunterladen",
    search: "Transaktionen suchen...",
    date: "Datum",
    description: "Beschreibung",
    reference: "Referenz",
    type: "Typ",
    amount: "Betrag",
    status: "Status",
    noTransactions: "Keine Transaktionen gefunden.",
    deposit: "Einzahlung",
    withdrawal: "Auszahlung",
  },

  fr: {
    title: "Transactions",
    subtitle: "Consultez toutes les activités du compte.",
    download: "Télécharger le relevé",
    search: "Rechercher des transactions...",
    date: "Date",
    description: "Description",
    reference: "Référence",
    type: "Type",
    amount: "Montant",
    status: "Statut",
    noTransactions: "Aucune transaction trouvée.",
    deposit: "Dépôt",
    withdrawal: "Retrait",
  },
};

export default function TransactionsClient({
  transactions,
  preferredCurrency,
}: Props) {
  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

  useEffect(() => {
    const savedLanguage =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith(`${LANGUAGE_COOKIE}=`)
        )
        ?.split("=")[1] as SupportedLanguage | undefined;

    if (
      savedLanguage &&
      SUPPORTED_LANGUAGES.includes(savedLanguage)
    ) {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = () => {
      const currentLanguage =
        document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith(`${LANGUAGE_COOKIE}=`)
          )
          ?.split("=")[1] as SupportedLanguage | undefined;

      if (
        currentLanguage &&
        SUPPORTED_LANGUAGES.includes(currentLanguage)
      ) {
        setLanguage(currentLanguage);
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

  const currencySymbols: Record<string, string> = {
    USD: "$",
    GBP: "£",
    EUR: "€",
    GHS: "GH₵",
  };

  const symbol =
    currencySymbols[preferredCurrency] ?? "$";

  return (
    <div>
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            {t.title}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.subtitle}
          </p>
        </div>

        <a
          href="/api/statement"
          className="mt-5 lg:mt-0 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition"
        >
          <Download size={20} />
          {t.download}
        </a>
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
        <div className="flex items-center gap-3">
          <Search className="text-slate-400" />

          <input
            type="text"
            placeholder={t.search}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="p-5">{t.date}</th>
              <th>{t.description}</th>
              <th>{t.reference}</th>
              <th>{t.type}</th>
              <th>{t.amount}</th>
              <th>{t.status}</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-10 text-slate-500"
                >
                  {t.noTransactions}
                </td>
              </tr>
            ) : (
              transactions.map((txn) => {
                const isDeposit =
                  txn.type === "Deposit";

                return (
                  <tr
                    key={txn.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="p-5">
                      {new Date(
                        txn.transactionDate
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="font-semibold">
                      {txn.description}
                    </td>

                    <td>
                      {txn.reference ?? "-"}
                    </td>

                    <td>
                      <span
                        className={`inline-flex items-center gap-2 ${
                          isDeposit
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {isDeposit ? (
                          <ArrowDownLeft size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}

                        {isDeposit
                          ? t.deposit
                          : t.withdrawal}
                      </span>
                    </td>

                    <td
                      className={`font-bold ${
                        isDeposit
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {isDeposit ? "+" : "-"}
                      {symbol}
                      {txn.amount.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}