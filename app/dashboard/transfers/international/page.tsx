"use client";

import { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";
import InternationalTransferForm from "@/components/transfers/InternationalTransferForm";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations: Record<
  SupportedLanguage,
  {
    title: string;
    description: string;
  }
> = {
  en: {
    title: "International Transfer",
    description:
      "Complete the beneficiary information below to send money internationally.",
  },

  de: {
    title: "Internationale Überweisung",
    description:
      "Füllen Sie die untenstehenden Angaben zum Zahlungsempfänger aus, um Geld international zu senden.",
  },

  fr: {
    title: "Virement international",
    description:
      "Remplissez les informations du bénéficiaire ci-dessous pour envoyer de l'argent à l'international.",
  },
};

export default function InternationalTransferPage() {
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
    <div className="max-w-5xl">
      {/* Header */}

      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
            <Globe2
              className="text-white"
              size={30}
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              {t.title}
            </h1>

            <p className="text-slate-500 mt-2">
              {t.description}
            </p>
          </div>
        </div>
      </div>

      <InternationalTransferForm />
    </div>
  );
}