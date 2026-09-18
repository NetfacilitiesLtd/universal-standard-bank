"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { SupportedLanguage } from "@/lib/i18n/language";

const translations = {
  en: {
    badge: "Banking with confidence",
    headingLine1: "Your Trusted",
    headingLine2: "Partner",
    headingLine3: "for a",
    headingHighlight1: "Better",
    headingHighlight2: "Financial",
    headingHighlight3: "Future",
    description:
      "Universal Standard Bank provides secure and reliable financial services designed to help individuals, families, and businesses manage, grow, and protect their finances.",
    openAccount: "Open an Account",
    internetBanking: "Internet Banking",
  },
  de: {
    badge: "Banking mit Vertrauen",
    headingLine1: "Ihr vertrauenswürdiger",
    headingLine2: "Partner",
    headingLine3: "für eine",
    headingHighlight1: "bessere",
    headingHighlight2: "finanzielle",
    headingHighlight3: "Zukunft",
    description:
      "Die Universal Standard Bank bietet sichere und zuverlässige Finanzdienstleistungen, die Privatpersonen, Familien und Unternehmen dabei unterstützen, ihre Finanzen zu verwalten, zu entwickeln und zu schützen.",
    openAccount: "Konto eröffnen",
    internetBanking: "Online-Banking",
  },
  fr: {
    badge: "Une banque en toute confiance",
    headingLine1: "Votre partenaire",
    headingLine2: "de confiance",
    headingLine3: "pour un",
    headingHighlight1: "meilleur",
    headingHighlight2: "avenir",
    headingHighlight3: "financier",
    description:
      "Universal Standard Bank propose des services financiers sûrs et fiables conçus pour aider les particuliers, les familles et les entreprises à gérer, développer et protéger leurs finances.",
    openAccount: "Ouvrir un compte",
    internetBanking: "Banque en ligne",
  },
};

export default function Hero() {
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
      id="home"
      className="relative min-h-[850px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
    >
      {/* Light overlay on the left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-[850px] px-6 lg:px-12 flex items-center">
        <div className="max-w-[620px] pt-2">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/60 px-5 py-2 text-sm font-medium text-red-600 mb-5">
            <ShieldCheck size={18} />
            <span>{t.badge}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl font-black leading-[0.92] tracking-tight text-slate-900">
            {t.headingLine1}
            <br />
            {t.headingLine2}
            <br />
            {t.headingLine3}{" "}
            <span className="text-red-600">
              {t.headingHighlight1}
            </span>
            <br />
            <span className="text-red-600">
              {t.headingHighlight2}
            </span>
            <br />
            <span className="text-red-600">
              {t.headingHighlight3}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[600px] text-lg lg:text-xl leading-7 text-slate-700">
            {t.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-6">
            <Link
              href="/apply"
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold px-9 py-4 rounded-xl shadow-lg"
            >
              {t.openAccount}
            </Link>

            <Link
              href="#services"
              className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 font-semibold px-9 py-4 rounded-xl"
            >
              {t.internetBanking}
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}