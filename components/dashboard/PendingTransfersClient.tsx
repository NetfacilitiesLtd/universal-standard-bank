"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type Transfer = {
  id: string;
  recipientName: string;
  currency: string;
  amount: number;
  status: string;
};

type Props = {
  transfers: Transfer[];
};

const translations: Record<
  SupportedLanguage,
  {
    pendingTransfers: string;
    noTransfers: string;
    recipient: string;
    amount: string;
    status: string;
    action: string;
    view: string;
  }
> = {
  en: {
    pendingTransfers: "Pending Transfers",
    noTransfers: "No international transfers found.",
    recipient: "Recipient",
    amount: "Amount",
    status: "Status",
    action: "Action",
    view: "View",
  },

  de: {
    pendingTransfers: "Ausstehende Überweisungen",
    noTransfers: "Keine internationalen Überweisungen gefunden.",
    recipient: "Empfänger",
    amount: "Betrag",
    status: "Status",
    action: "Aktion",
    view: "Anzeigen",
  },

  fr: {
    pendingTransfers: "Virements en attente",
    noTransfers: "Aucun virement international trouvé.",
    recipient: "Bénéficiaire",
    amount: "Montant",
    status: "Statut",
    action: "Action",
    view: "Voir",
  },
};

export default function PendingTransfersClient({
  transfers,
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

  if (transfers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-2">
          {t.pendingTransfers}
        </h2>

        <p className="text-slate-500">
          {t.noTransfers}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">
        {t.pendingTransfers}
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              {t.recipient}
            </th>

            <th className="text-left py-3">
              {t.amount}
            </th>

            <th className="text-left py-3">
              {t.status}
            </th>

            <th className="text-left py-3">
              {t.action}
            </th>
          </tr>
        </thead>

        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id} className="border-b">
              <td className="py-4">
                {transfer.recipientName}
              </td>

              <td className="py-4">
                {transfer.currency}{" "}
                {transfer.amount.toLocaleString()}
              </td>

              <td className="py-4">
                {transfer.status}
              </td>

              <td className="py-4">
                <Link
                  href={`/dashboard/transfers/${transfer.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {t.view}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}