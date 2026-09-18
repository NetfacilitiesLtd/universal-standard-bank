"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Landmark,
  PiggyBank,
  WalletCards,
  Smartphone,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { SupportedLanguage } from "@/lib/i18n/language";

const translations = {
  en: {
    hero: {
      eyebrow: "Personal Banking",
      titleLine1: "Banking Designed",
      titleLine2: "Around",
      titleAccent: "You",
      description:
        "Secure and convenient banking solutions to help you manage your everyday finances, save for the future and achieve your personal financial goals.",
      openAccount: "Open an Account",
      onlineBanking: "Online Banking",
    },
    introduction: {
      eyebrow: "Your Financial Partner",
      titleLine1: "Banking that fits",
      titleLine2: "your everyday life",
      description:
        "From managing your daily expenses to building long-term savings, our personal banking services are designed to give you convenient access to the financial tools you need.",
      benefits: [
        "Secure everyday banking",
        "Convenient digital access",
        "Flexible account options",
        "Personal financial support",
      ],
      cardTitle: "Simple, secure banking",
      cardDescription:
        "Access your accounts, monitor your finances and manage your banking needs through secure channels designed for convenience.",
      security: "Learn about security",
    },
    services: {
      eyebrow: "Personal Banking Services",
      titleLine1: "Solutions for your",
      titleLine2: "financial needs",
      description:
        "Choose from a range of personal banking services created to make managing your finances easier.",
      items: [
        {
          title: "Savings Accounts",
          description:
            "Build your savings with secure accounts designed to help you manage your money and plan for the future.",
        },
        {
          title: "Current Accounts",
          description:
            "Enjoy convenient everyday banking with access to the services you need to manage your finances.",
        },
        {
          title: "Personal Loans",
          description:
            "Access financing options designed to support personal goals, planned purchases and important expenses.",
        },
        {
          title: "Mobile Banking",
          description:
            "Manage your banking securely and conveniently wherever you are using digital banking services.",
        },
      ],
    },
    cta: {
      title: "Ready to get started?",
      description:
        "Open a personal account and experience convenient banking designed around your needs.",
      button: "Open an Account",
    },
  },

  de: {
    hero: {
      eyebrow: "Privatkundengeschäft",
      titleLine1: "Banking, das auf",
      titleLine2: "Sie",
      titleAccent: "zugeschnitten ist",
      description:
        "Sichere und bequeme Banking-Lösungen, mit denen Sie Ihre täglichen Finanzen verwalten, für die Zukunft sparen und Ihre persönlichen finanziellen Ziele erreichen können.",
      openAccount: "Konto eröffnen",
      onlineBanking: "Online-Banking",
    },
    introduction: {
      eyebrow: "Ihr Finanzpartner",
      titleLine1: "Banking, das in",
      titleLine2: "Ihren Alltag passt",
      description:
        "Von der Verwaltung Ihrer täglichen Ausgaben bis zum Aufbau langfristiger Ersparnisse bieten unsere Privatkundenlösungen einen bequemen Zugang zu den Finanzinstrumenten, die Sie benötigen.",
      benefits: [
        "Sicheres tägliches Banking",
        "Bequemer digitaler Zugang",
        "Flexible Kontomöglichkeiten",
        "Persönliche Finanzberatung",
      ],
      cardTitle: "Einfaches, sicheres Banking",
      cardDescription:
        "Greifen Sie auf Ihre Konten zu, überwachen Sie Ihre Finanzen und verwalten Sie Ihre Bankgeschäfte über sichere und komfortable Kanäle.",
      security: "Mehr über Sicherheit erfahren",
    },
    services: {
      eyebrow: "Privatkundendienstleistungen",
      titleLine1: "Lösungen für Ihre",
      titleLine2: "finanziellen Bedürfnisse",
      description:
        "Wählen Sie aus einer Reihe von Privatkundenlösungen, die Ihnen die Verwaltung Ihrer Finanzen erleichtern.",
      items: [
        {
          title: "Sparkonten",
          description:
            "Bauen Sie Ihre Ersparnisse mit sicheren Konten auf, die Ihnen helfen, Ihr Geld zu verwalten und für die Zukunft zu planen.",
        },
        {
          title: "Girokonten",
          description:
            "Profitieren Sie von bequemem täglichem Banking und den Dienstleistungen, die Sie für Ihre Finanzverwaltung benötigen.",
        },
        {
          title: "Privatkredite",
          description:
            "Nutzen Sie Finanzierungsmöglichkeiten zur Unterstützung persönlicher Ziele, geplanter Anschaffungen und wichtiger Ausgaben.",
        },
        {
          title: "Mobile Banking",
          description:
            "Verwalten Sie Ihre Bankgeschäfte sicher und bequem von überall mit digitalen Banking-Diensten.",
        },
      ],
    },
    cta: {
      title: "Bereit für den nächsten Schritt?",
      description:
        "Eröffnen Sie ein Privatkonto und erleben Sie bequemes Banking, das auf Ihre Bedürfnisse zugeschnitten ist.",
      button: "Konto eröffnen",
    },
  },

  fr: {
    hero: {
      eyebrow: "Banque personnelle",
      titleLine1: "Une banque conçue",
      titleLine2: "pour",
      titleAccent: "vous",
      description:
        "Des solutions bancaires sécurisées et pratiques pour vous aider à gérer vos finances quotidiennes, épargner pour l'avenir et atteindre vos objectifs financiers personnels.",
      openAccount: "Ouvrir un compte",
      onlineBanking: "Banque en ligne",
    },
    introduction: {
      eyebrow: "Votre partenaire financier",
      titleLine1: "Une banque adaptée",
      titleLine2: "à votre quotidien",
      description:
        "De la gestion de vos dépenses quotidiennes à la constitution d'une épargne à long terme, nos services bancaires personnels vous offrent un accès pratique aux outils financiers dont vous avez besoin.",
      benefits: [
        "Services bancaires quotidiens sécurisés",
        "Accès numérique pratique",
        "Options de comptes flexibles",
        "Accompagnement financier personnalisé",
      ],
      cardTitle: "Une banque simple et sécurisée",
      cardDescription:
        "Accédez à vos comptes, suivez vos finances et gérez vos besoins bancaires grâce à des canaux sécurisés conçus pour votre confort.",
      security: "En savoir plus sur la sécurité",
    },
    services: {
      eyebrow: "Services bancaires personnels",
      titleLine1: "Des solutions pour vos",
      titleLine2: "besoins financiers",
      description:
        "Choisissez parmi une gamme de services bancaires personnels conçus pour faciliter la gestion de vos finances.",
      items: [
        {
          title: "Comptes d'épargne",
          description:
            "Développez votre épargne grâce à des comptes sécurisés conçus pour vous aider à gérer votre argent et à préparer l'avenir.",
        },
        {
          title: "Comptes courants",
          description:
            "Profitez de services bancaires quotidiens pratiques avec les solutions dont vous avez besoin pour gérer vos finances.",
        },
        {
          title: "Prêts personnels",
          description:
            "Accédez à des solutions de financement conçues pour soutenir vos projets personnels, vos achats planifiés et vos dépenses importantes.",
        },
        {
          title: "Banque mobile",
          description:
            "Gérez vos opérations bancaires en toute sécurité et simplicité, où que vous soyez, grâce aux services bancaires numériques.",
        },
      ],
    },
    cta: {
      title: "Prêt à commencer ?",
      description:
        "Ouvrez un compte personnel et profitez d'une banque pratique conçue autour de vos besoins.",
      button: "Ouvrir un compte",
    },
  },
};

const icons = [
  PiggyBank,
  Landmark,
  WalletCards,
  Smartphone,
];

export default function PersonalBankingPage() {
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
      <section className="relative min-h-[760px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/personal-banking.png"
            alt="Personal banking customer using mobile banking"
            fill
            priority
            className="object-cover object-center"
          />

          {/* White gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/45 via-25% to-transparent" />

          {/* Soft lower fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-28 min-h-[760px] flex items-center">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
              {t.hero.eyebrow}
            </p>

            <h1 className="mt-5 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}{" "}
              <span className="text-red-600">
                {t.hero.titleAccent}
              </span>
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
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white/80 px-7 py-4 font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
              >
                {t.hero.onlineBanking}
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
                <CreditCard size={30} className="text-white" />
              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                {t.introduction.cardTitle}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {t.introduction.cardDescription}
              </p>

              <Link
                href="/security"
                className="inline-flex items-center gap-2 mt-7 font-semibold text-red-600 hover:gap-3 transition-all"
              >
                {t.introduction.security}
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
                    <Icon size={28} className="text-red-600" />
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
              href="/apply"
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