"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  FileText,
} from "lucide-react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type QuickActionsProps = {
  customer: unknown;
};

const translations: Record<
  SupportedLanguage,
  {
    quickActions: string;
    frequentlyUsed: string;
    transferMoney: string;
    sendFunds: string;
    statements: string;
    downloadStatements: string;
  }
> = {
  en: {
    quickActions: "Quick Actions",
    frequentlyUsed: "Frequently used banking services",
    transferMoney: "Transfer Money",
    sendFunds: "Send funds securely",
    statements: "Statements",
    downloadStatements: "Download statements",
  },

  de: {
    quickActions: "Schnellaktionen",
    frequentlyUsed: "Häufig verwendete Bankdienstleistungen",
    transferMoney: "Geld überweisen",
    sendFunds: "Geld sicher senden",
    statements: "Kontoauszüge",
    downloadStatements: "Kontoauszüge herunterladen",
  },

  fr: {
    quickActions: "Actions rapides",
    frequentlyUsed: "Services bancaires fréquemment utilisés",
    transferMoney: "Transférer de l'argent",
    sendFunds: "Envoyer des fonds en toute sécurité",
    statements: "Relevés de compte",
    downloadStatements: "Télécharger les relevés",
  },
};

export default function QuickActions({
  customer,
}: QuickActionsProps) {
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

  const actions = [
    {
      title: t.transferMoney,
      description: t.sendFunds,
      href: "/dashboard/transfers",
      icon: ArrowLeftRight,
      color: "bg-red-600",
    },
    {
      title: t.statements,
      description: t.downloadStatements,
      href: "/api/statement",
      icon: FileText,
      color: "bg-amber-500",
    },
  ];

  return (
    <section className="px-10 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {t.quickActions}
        </h2>

        <p className="text-slate-500">
          {t.frequentlyUsed}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}
              >
                <Icon
                  size={28}
                  className="text-white"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-2 text-slate-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}