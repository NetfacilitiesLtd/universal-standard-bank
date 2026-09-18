"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Globe2,
  ChevronRight,
} from "lucide-react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations: Record<
  SupportedLanguage,
  {
    transferMoney: string;
    chooseMethod: string;
    internalTransfer: string;
    internalDescription: string;
    internationalTransfer: string;
    internationalDescription: string;
    continue: string;
  }
> = {
  en: {
    transferMoney: "Transfer Money",
    chooseMethod: "Choose how you would like to send money.",
    internalTransfer: "Internal Bank Transfer",
    internalDescription:
      "Transfer funds instantly to another Universal Standard Bank customer using their account number.",
    internationalTransfer: "International Transfer",
    internationalDescription:
      "Send money securely to bank accounts anywhere in the world using international banking details.",
    continue: "Continue",
  },

  de: {
    transferMoney: "Geld überweisen",
    chooseMethod:
      "Wählen Sie aus, wie Sie Geld senden möchten.",
    internalTransfer: "Interne Banküberweisung",
    internalDescription:
      "Überweisen Sie Geld sofort an einen anderen Kunden der Universal Standard Bank mit dessen Kontonummer.",
    internationalTransfer: "Internationale Überweisung",
    internationalDescription:
      "Senden Sie Geld sicher an Bankkonten überall auf der Welt unter Verwendung internationaler Bankdaten.",
    continue: "Weiter",
  },

  fr: {
    transferMoney: "Transférer de l'argent",
    chooseMethod:
      "Choisissez comment vous souhaitez envoyer de l'argent.",
    internalTransfer: "Virement bancaire interne",
    internalDescription:
      "Transférez instantanément des fonds à un autre client d'Universal Standard Bank à l'aide de son numéro de compte.",
    internationalTransfer: "Virement international",
    internationalDescription:
      "Envoyez de l'argent en toute sécurité vers des comptes bancaires partout dans le monde à l'aide des coordonnées bancaires internationales.",
    continue: "Continuer",
  },
};

export default function TransferPage() {
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
    <div className="max-w-6xl">
      {/* Header */}

      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
            <ArrowLeftRight
              className="text-white"
              size={30}
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              {t.transferMoney}
            </h1>

            <p className="text-slate-500 mt-2">
              {t.chooseMethod}
            </p>
          </div>
        </div>
      </div>

      {/* Transfer Options */}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Internal Transfer */}

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 hover:shadow-xl transition">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
            <ArrowLeftRight
              className="text-white"
              size={30}
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-6">
            {t.internalTransfer}
          </h2>

          <p className="text-slate-500 mt-3 leading-7">
            {t.internalDescription}
          </p>

          <Link
            href="/dashboard/transfers/internal"
            className="mt-8 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold transition"
          >
            {t.continue}

            <ChevronRight size={20} />
          </Link>
        </div>

        {/* International Transfer */}

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 hover:shadow-xl transition">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
            <Globe2
              className="text-white"
              size={30}
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-6">
            {t.internationalTransfer}
          </h2>

          <p className="text-slate-500 mt-3 leading-7">
            {t.internationalDescription}
          </p>

          <Link
            href="/dashboard/transfers/international"
            className="mt-8 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-semibold transition"
          >
            {t.continue}

            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}