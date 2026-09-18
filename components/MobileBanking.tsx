"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  ShieldCheck,
  Zap,
  Globe2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { SupportedLanguage } from "@/lib/i18n/language";

const translations = {
  en: {
    eyebrow: "Banking On The Go",
    headingLine1: "Your Bank,",
    headingLine2: "Always With You",
    description:
      "Manage your finances wherever you are with convenient digital banking designed to give you secure and easy access to your account.",
    features: [
      {
        title: "Easy Access",
        description:
          "Access your account and manage your finances whenever you need.",
      },
      {
        title: "Secure Banking",
        description:
          "Advanced security features help keep your account and information protected.",
      },
      {
        title: "Fast & Convenient",
        description:
          "Carry out everyday banking activities quickly and conveniently.",
      },
      {
        title: "Bank Globally",
        description:
          "Manage international banking needs and multiple currencies with ease.",
      },
    ],
    button: "Explore Digital Banking",
  },

  de: {
    eyebrow: "Banking Unterwegs",
    headingLine1: "Ihre Bank,",
    headingLine2: "Immer Bei Ihnen",
    description:
      "Verwalten Sie Ihre Finanzen überall mit praktischem Digital Banking, das Ihnen einen sicheren und einfachen Zugang zu Ihrem Konto ermöglicht.",
    features: [
      {
        title: "Einfacher Zugang",
        description:
          "Greifen Sie jederzeit auf Ihr Konto zu und verwalten Sie Ihre Finanzen.",
      },
      {
        title: "Sicheres Banking",
        description:
          "Moderne Sicherheitsfunktionen helfen dabei, Ihr Konto und Ihre Daten zu schützen.",
      },
      {
        title: "Schnell & bequem",
        description:
          "Erledigen Sie Ihre täglichen Bankgeschäfte schnell und bequem.",
      },
      {
        title: "Globales Banking",
        description:
          "Verwalten Sie internationale Bankgeschäfte und mehrere Währungen ganz einfach.",
      },
    ],
    button: "Digital Banking entdecken",
  },

  fr: {
    eyebrow: "Banque Où Que Vous Soyez",
    headingLine1: "Votre banque,",
    headingLine2: "Toujours avec vous",
    description:
      "Gérez vos finances où que vous soyez grâce à des services bancaires numériques pratiques, conçus pour vous offrir un accès sécurisé et simple à votre compte.",
    features: [
      {
        title: "Accès facile",
        description:
          "Accédez à votre compte et gérez vos finances à tout moment.",
      },
      {
        title: "Banque sécurisée",
        description:
          "Des fonctionnalités de sécurité avancées contribuent à protéger votre compte et vos informations.",
      },
      {
        title: "Rapide et pratique",
        description:
          "Effectuez vos opérations bancaires quotidiennes rapidement et facilement.",
      },
      {
        title: "Banque internationale",
        description:
          "Gérez facilement vos besoins bancaires internationaux et plusieurs devises.",
      },
    ],
    button: "Découvrir le Digital Banking",
  },
};

const icons = [
  Smartphone,
  ShieldCheck,
  Zap,
  Globe2,
];

export default function MobileBanking() {
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
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>

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

            <p className="mt-5 text-lg leading-8 text-slate-600 max-w-xl">
              {t.description}
            </p>

            {/* Features */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">

              {t.features.map((feature, index) => {
                const Icon = icons[index];

                return (
                  <div
                    key={feature.title}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Button */}
            <div className="mt-10">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                {t.button}
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative">

            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/images/mobile-banking.jpg"
                alt="Mobile banking"
                width={800}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Security Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                <CheckCircle2
                  size={24}
                  className="text-red-600"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  {language === "de"
                    ? "Sicheres Banking"
                    : language === "fr"
                    ? "Banque sécurisée"
                    : "Secure Banking"}
                </p>

                <p className="text-xs text-slate-500">
                  {language === "de"
                    ? "Ihre Sicherheit hat Priorität"
                    : language === "fr"
                    ? "Votre sécurité est notre priorité"
                    : "Your security is our priority"}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}