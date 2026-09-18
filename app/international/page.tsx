"use client";

import Link from "next/link";
import {
  Globe2,
  ArrowRight,
  CheckCircle2,
  Banknote,
  RefreshCw,
  Headphones,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { SupportedLanguage } from "@/lib/i18n/language";

const translations = {
  en: {
    hero: {
      eyebrow: "International Banking",
      titleLine1: "Banking Beyond",
      titleLine2: "Borders",
      description:
        "International banking solutions designed to help you manage cross-border finances, global payments and transactions involving multiple currencies.",
      openAccount: "Open an Account",
      contact: "Contact Us",
    },
    introduction: {
      eyebrow: "Global Financial Services",
      titleLine1: "Stay connected",
      titleLine2: "across borders",
      description:
        "Whether you are receiving funds from abroad, making international payments or managing finances across different currencies, our international banking services are designed to support your financial needs.",
      benefits: [
        "International payment solutions",
        "Foreign currency services",
        "Multi-currency banking support",
        "Cross-border financial assistance",
      ],
      cardTitle: "Banking without borders",
      cardDescription:
        "Manage international financial activities with banking services designed to provide convenient access to global payment and currency solutions.",
      speakWithUs: "Speak with us",
    },
    services: {
      eyebrow: "International Services",
      titleLine1: "Global banking",
      titleLine2: "made convenient",
      description:
        "Explore services designed to support your international financial activities.",
      items: [
        {
          title: "Global Transfers",
          description:
            "Send and receive funds across borders with international banking solutions designed for your global financial needs.",
        },
        {
          title: "Foreign Exchange",
          description:
            "Access currency exchange services to help you manage financial transactions involving different currencies.",
        },
        {
          title: "Multi-Currency Banking",
          description:
            "Manage financial needs involving multiple currencies with convenient international banking solutions.",
        },
        {
          title: "International Support",
          description:
            "Get assistance with your international banking needs and access support when managing cross-border finances.",
        },
      ],
    },
    cta: {
      title: "Take your banking global",
      description:
        "Explore international banking solutions designed to support your cross-border financial needs.",
      button: "Contact Us",
    },
  },

  de: {
    hero: {
      eyebrow: "Internationales Banking",
      titleLine1: "Banking ohne",
      titleLine2: "Grenzen",
      description:
        "Internationale Banking-Lösungen, die Sie bei grenzüberschreitenden Finanzen, globalen Zahlungen und Transaktionen in mehreren Währungen unterstützen.",
      openAccount: "Konto eröffnen",
      contact: "Kontakt",
    },
    introduction: {
      eyebrow: "Globale Finanzdienstleistungen",
      titleLine1: "Über Grenzen",
      titleLine2: "hinweg verbunden",
      description:
        "Ob Sie Geld aus dem Ausland erhalten, internationale Zahlungen tätigen oder Finanzen in verschiedenen Währungen verwalten – unsere internationalen Banking-Dienstleistungen unterstützen Ihre finanziellen Bedürfnisse.",
      benefits: [
        "Internationale Zahlungslösungen",
        "Fremdwährungsdienstleistungen",
        "Unterstützung für mehrere Währungen",
        "Unterstützung bei grenzüberschreitenden Finanzen",
      ],
      cardTitle: "Banking ohne Grenzen",
      cardDescription:
        "Verwalten Sie internationale Finanzaktivitäten mit Banking-Dienstleistungen, die einen bequemen Zugang zu globalen Zahlungs- und Währungslösungen ermöglichen.",
      speakWithUs: "Sprechen Sie mit uns",
    },
    services: {
      eyebrow: "Internationale Dienstleistungen",
      titleLine1: "Globales Banking",
      titleLine2: "bequem gemacht",
      description:
        "Entdecken Sie Dienstleistungen, die Ihre internationalen Finanzaktivitäten unterstützen.",
      items: [
        {
          title: "Globale Überweisungen",
          description:
            "Senden und empfangen Sie Geld grenzüberschreitend mit internationalen Banking-Lösungen für Ihre globalen finanziellen Bedürfnisse.",
        },
        {
          title: "Devisenhandel",
          description:
            "Nutzen Sie Währungsumtauschdienste, um Finanztransaktionen in verschiedenen Währungen zu verwalten.",
        },
        {
          title: "Banking in mehreren Währungen",
          description:
            "Verwalten Sie finanzielle Bedürfnisse in mehreren Währungen mit praktischen internationalen Banking-Lösungen.",
        },
        {
          title: "Internationaler Support",
          description:
            "Erhalten Sie Unterstützung bei internationalen Bankgeschäften und bei der Verwaltung grenzüberschreitender Finanzen.",
        },
      ],
    },
    cta: {
      title: "Machen Sie Ihr Banking global",
      description:
        "Entdecken Sie internationale Banking-Lösungen, die Ihre grenzüberschreitenden finanziellen Bedürfnisse unterstützen.",
      button: "Kontakt",
    },
  },

  fr: {
    hero: {
      eyebrow: "Services bancaires internationaux",
      titleLine1: "Une banque au-delà",
      titleLine2: "des frontières",
      description:
        "Des solutions bancaires internationales conçues pour vous aider à gérer vos finances transfrontalières, vos paiements internationaux et vos transactions dans plusieurs devises.",
      openAccount: "Ouvrir un compte",
      contact: "Nous contacter",
    },
    introduction: {
      eyebrow: "Services financiers internationaux",
      titleLine1: "Restez connecté",
      titleLine2: "au-delà des frontières",
      description:
        "Que vous receviez des fonds de l'étranger, effectuiez des paiements internationaux ou gériez des finances dans différentes devises, nos services bancaires internationaux sont conçus pour répondre à vos besoins financiers.",
      benefits: [
        "Solutions de paiement internationales",
        "Services en devises étrangères",
        "Assistance multi-devises",
        "Assistance financière transfrontalière",
      ],
      cardTitle: "Une banque sans frontières",
      cardDescription:
        "Gérez vos activités financières internationales grâce à des services bancaires offrant un accès pratique aux solutions de paiement et de change internationales.",
      speakWithUs: "Parlez avec nous",
    },
    services: {
      eyebrow: "Services internationaux",
      titleLine1: "Une banque internationale",
      titleLine2: "en toute simplicité",
      description:
        "Découvrez des services conçus pour accompagner vos activités financières internationales.",
      items: [
        {
          title: "Transferts internationaux",
          description:
            "Envoyez et recevez des fonds au-delà des frontières grâce à des solutions bancaires internationales adaptées à vos besoins financiers mondiaux.",
        },
        {
          title: "Change de devises",
          description:
            "Accédez à des services de change pour gérer vos transactions financières dans différentes devises.",
        },
        {
          title: "Banque multi-devises",
          description:
            "Gérez vos besoins financiers dans plusieurs devises grâce à des solutions bancaires internationales pratiques.",
        },
        {
          title: "Assistance internationale",
          description:
            "Bénéficiez d'une assistance pour vos besoins bancaires internationaux et la gestion de vos finances transfrontalières.",
        },
      ],
    },
    cta: {
      title: "Donnez une dimension internationale à votre banque",
      description:
        "Découvrez des solutions bancaires internationales conçues pour répondre à vos besoins financiers transfrontaliers.",
      button: "Nous contacter",
    },
  },
};

const icons = [
  Globe2,
  RefreshCw,
  Banknote,
  Headphones,
];

export default function InternationalBankingPage() {
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
    <main className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-36 pb-24">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">

            <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
              {t.hero.eyebrow}
            </p>

            <h1 className="mt-5 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-8 max-w-2xl">
              {t.hero.description}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">

              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                {t.hero.openAccount}
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                {t.hero.contact}
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <p className="uppercase tracking-[4px] text-red-600 text-sm font-semibold">
                {t.introduction.eyebrow}
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                {t.introduction.titleLine1}
                <br />
                {t.introduction.titleLine2}
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                {t.introduction.description}
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {t.introduction.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-red-600 flex-shrink-0"
                    />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

            </div>

            <div className="rounded-3xl bg-slate-100 p-10 md:p-12">

              <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
                <Globe2 size={30} className="text-white" />
              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                {t.introduction.cardTitle}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {t.introduction.cardDescription}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-7 font-semibold text-red-600 hover:gap-3 transition-all"
              >
                {t.introduction.speakWithUs}
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">

            <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
              {t.services.eyebrow}
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
              {t.services.titleLine1}
              <br />
              {t.services.titleLine2}
            </h2>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              {t.services.description}
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

            {t.services.items.map((service, index) => {
              const Icon = icons[index];

              return (
                <div
                  key={service.title}
                  className="bg-white border border-gray-200 rounded-2xl p-7 hover:-translate-y-1 hover:border-red-600 hover:shadow-xl transition-all duration-300"
                >

                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center">
                    <Icon
                      size={28}
                      className="text-red-600"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <div className="w-12 h-1 bg-red-600 rounded-full mt-3" />

                  <p className="mt-5 text-gray-600 leading-7">
                    {service.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">

          <div className="rounded-3xl bg-red-600 px-8 py-14 md:px-14 text-center">

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t.cta.title}
            </h2>

            <p className="mt-4 text-red-100 text-lg leading-7 max-w-2xl mx-auto">
              {t.cta.description}
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 rounded-xl bg-white px-7 py-4 font-semibold text-red-600 transition hover:bg-slate-100"
            >
              {t.cta.button}
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}