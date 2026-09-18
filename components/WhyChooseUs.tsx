"use client";

import {
  ShieldCheck,
  Globe2,
  Headphones,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { SupportedLanguage } from "@/lib/i18n/language";

const translations = {
  en: {
    eyebrow: "Why Choose Us",
    headingLine1: "Bank With",
    headingLine2: "Confidence",
    description:
      "At Universal Standard Bank, we combine modern banking technology, strong security and dedicated customer service to give you a banking experience you can rely on.",
    features: [
      {
        title: "Secure Banking",
        description:
          "Your money and personal information are protected with modern security measures and reliable banking systems.",
      },
      {
        title: "International Banking",
        description:
          "Access convenient banking solutions for international transfers, multiple currencies and cross-border financial needs.",
      },
      {
        title: "Dedicated Support",
        description:
          "Our customer-focused approach ensures that you have access to assistance whenever you need it.",
      },
      {
        title: "Built for Your Future",
        description:
          "From everyday banking to long-term financial goals, our solutions are designed to support your financial journey.",
      },
    ],
  },

  de: {
    eyebrow: "Warum wir",
    headingLine1: "Banking mit",
    headingLine2: "Vertrauen",
    description:
      "Bei Universal Standard Bank verbinden wir moderne Banking-Technologie, hohe Sicherheitsstandards und engagierten Kundenservice, um Ihnen ein zuverlässiges Bankerlebnis zu bieten.",
    features: [
      {
        title: "Sicheres Banking",
        description:
          "Ihr Geld und Ihre persönlichen Daten werden durch moderne Sicherheitsmaßnahmen und zuverlässige Banksysteme geschützt.",
      },
      {
        title: "Internationales Banking",
        description:
          "Nutzen Sie praktische Banking-Lösungen für internationale Überweisungen, mehrere Währungen und grenzüberschreitende Finanzbedürfnisse.",
      },
      {
        title: "Persönlicher Support",
        description:
          "Unser kundenorientierter Service stellt sicher, dass Sie jederzeit Unterstützung erhalten, wenn Sie diese benötigen.",
      },
      {
        title: "Für Ihre Zukunft",
        description:
          "Vom täglichen Banking bis zu langfristigen finanziellen Zielen – unsere Lösungen begleiten Sie auf Ihrem finanziellen Weg.",
      },
    ],
  },

  fr: {
    eyebrow: "Pourquoi nous choisir",
    headingLine1: "Une banque en toute",
    headingLine2: "confiance",
    description:
      "Chez Universal Standard Bank, nous associons une technologie bancaire moderne, une sécurité renforcée et un service client attentif afin de vous offrir une expérience bancaire fiable.",
    features: [
      {
        title: "Banque sécurisée",
        description:
          "Votre argent et vos informations personnelles sont protégés grâce à des mesures de sécurité modernes et des systèmes bancaires fiables.",
      },
      {
        title: "Services bancaires internationaux",
        description:
          "Profitez de solutions bancaires pratiques pour les transferts internationaux, plusieurs devises et vos besoins financiers transfrontaliers.",
      },
      {
        title: "Assistance dédiée",
        description:
          "Notre approche centrée sur le client vous garantit un accès à une assistance lorsque vous en avez besoin.",
      },
      {
        title: "Pensé pour votre avenir",
        description:
          "Des opérations bancaires quotidiennes à vos objectifs financiers à long terme, nos solutions vous accompagnent dans votre parcours financier.",
      },
    ],
  },
};

const icons = [
  ShieldCheck,
  Globe2,
  Headphones,
  TrendingUp,
];

export default function WhyChooseUs() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  useEffect(() => {
    const match = document.cookie.match(
      /(?:^|; )usb-language=([^;]*)/
    );

    if (
      match &&
      (match[1] === "en" ||
        match[1] === "de" ||
        match[1] === "fr")
    ) {
      setLanguage(match[1] as SupportedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<SupportedLanguage>;
      setLanguage(customEvent.detail);
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
    <section
      id="about"
      className="bg-slate-50 pt-24 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
            {t.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            {t.headingLine1}
            <br />
            <span className="text-red-600">
              {t.headingLine2}
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {t.description}
          </p>

        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

          {t.features.map((feature, index) => {
            const Icon = icons[index];

            return (
              <div
                key={feature.title}
                className="group bg-white border border-slate-200 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-xl"
              >

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center transition-all duration-300 group-hover:bg-red-600">
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                    className="text-red-600 transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                {/* Red Accent */}
                <div className="w-12 h-1 bg-red-600 rounded-full mt-3" />

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}