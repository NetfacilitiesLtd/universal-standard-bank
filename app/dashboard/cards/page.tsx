"use client";

import {
  CreditCard,
  Lock,
  Eye,
  Settings,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations = {
  en: {
    title: "My Cards",
    subtitle: "Manage your debit and credit cards.",
    cardHolder: "Card Holder",
    expires: "Expires",
    viewDetails: "View Card Details",
    freeze: "Freeze Card",
    settings: "Card Settings",
  },

  de: {
    title: "Meine Karten",
    subtitle: "Verwalten Sie Ihre Debit- und Kreditkarten.",
    cardHolder: "Karteninhaber",
    expires: "Gültig bis",
    viewDetails: "Kartendetails anzeigen",
    freeze: "Karte sperren",
    settings: "Karteneinstellungen",
  },

  fr: {
    title: "Mes cartes",
    subtitle: "Gérez vos cartes de débit et de crédit.",
    cardHolder: "Titulaire de la carte",
    expires: "Expire",
    viewDetails: "Voir les détails de la carte",
    freeze: "Bloquer la carte",
    settings: "Paramètres de la carte",
  },
};

export default function CardsPage() {
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

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          {t.title}
        </h1>

        <p className="text-slate-500 mt-2">
          {t.subtitle}
        </p>
      </div>

      {/* Card */}

      <div className="max-w-lg">

        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 p-8 text-white shadow-xl">

          <div className="flex justify-between items-center">

            <CreditCard size={36} />

            <span className="font-semibold">
              Universal Standard Bank
            </span>

          </div>

          <div className="mt-12 text-2xl tracking-[4px] font-semibold">
            **** **** **** 6789
          </div>

          <div className="mt-8 flex justify-between">

            <div>
              <p className="text-sm opacity-80">
                {t.cardHolder}
              </p>

              <p className="font-semibold">
                John Doe
              </p>
            </div>

            <div>
              <p className="text-sm opacity-80">
                {t.expires}
              </p>

              <p className="font-semibold">
                08/30
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="grid md:grid-cols-3 gap-6">

        <button className="bg-white border rounded-2xl p-6 hover:shadow-md transition flex items-center gap-4">
          <Eye className="text-red-600" />
          <span>{t.viewDetails}</span>
        </button>

        <button className="bg-white border rounded-2xl p-6 hover:shadow-md transition flex items-center gap-4">
          <Lock className="text-red-600" />
          <span>{t.freeze}</span>
        </button>

        <button className="bg-white border rounded-2xl p-6 hover:shadow-md transition flex items-center gap-4">
          <Settings className="text-red-600" />
          <span>{t.settings}</span>
        </button>

      </div>

    </div>
  );
}