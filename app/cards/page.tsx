"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  ShieldCheck,
  Smartphone,
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations = {
  en: {
    heroLabel: "Cards & Payments",
    heroTitle: (
      <>
        Simple, Secure
        <br />
        Ways to Pay
      </>
    ),
    heroDescription:
      "Convenient card and payment solutions designed to help you make everyday purchases, manage payments and stay connected to your finances.",
    openAccount: "Open an Account",
    onlineBanking: "Online Banking",

    introLabel: "Card & Payment Solutions",
    introTitle: (
      <>
        Payment solutions
        <br />
        for everyday life
      </>
    ),
    introDescription:
      "From everyday purchases to online transactions, our card and payment solutions are designed to give you convenient ways to manage your spending and make payments.",
    benefits: [
      "Convenient everyday payments",
      "Secure card transactions",
      "Online payment support",
      "International payment capability",
    ],

    cardTitle: "Cards made convenient",
    cardDescription:
      "Use your eligible banking cards for everyday purchases and access convenient payment options designed for modern banking.",
    learnSecurity: "Learn about security",

    servicesLabel: "Cards & Payments",
    servicesTitle: (
      <>
        Payment options
        <br />
        built for convenience
      </>
    ),
    servicesDescription:
      "Explore convenient card and payment services designed for everyday financial needs.",

    services: [
      {
        title: "Debit Cards",
        description:
          "Convenient payment cards for everyday purchases, withdrawals and access to your available funds.",
      },
      {
        title: "Credit Cards",
        description:
          "Flexible card solutions designed to provide convenient access to credit for eligible customers.",
      },
      {
        title: "Online Payments",
        description:
          "Make online purchases and payments conveniently through secure digital payment services.",
      },
      {
        title: "Contactless Banking",
        description:
          "Enjoy convenient contactless payment options for eligible cards and supported payment terminals.",
      },
    ],

    securityLabel: "Secure Payments",
    securityTitle: "Designed with security in mind",
    securityDescription:
      "Protecting your financial information is an important part of modern banking. Always keep your card details, passwords and PIN confidential and use secure channels when making payments.",
    protectTitle: "Protect your account",
    protectDescription:
      "Learn more about security practices for protecting your online banking and payment information.",
    securityCenter: "Security Center",

    ctaTitle: "Ready for convenient banking?",
    ctaDescription:
      "Open an account and access convenient banking and payment solutions.",
  },

  de: {
    heroLabel: "Karten & Zahlungen",
    heroTitle: (
      <>
        Einfach und sicher
        <br />
        bezahlen
      </>
    ),
    heroDescription:
      "Bequeme Karten- und Zahlungslösungen, die Ihnen helfen, alltägliche Einkäufe zu tätigen, Zahlungen zu verwalten und den Überblick über Ihre Finanzen zu behalten.",
    openAccount: "Konto eröffnen",
    onlineBanking: "Online-Banking",

    introLabel: "Karten- & Zahlungslösungen",
    introTitle: (
      <>
        Zahlungslösungen
        <br />
        für den Alltag
      </>
    ),
    introDescription:
      "Von alltäglichen Einkäufen bis hin zu Online-Transaktionen bieten unsere Karten- und Zahlungslösungen bequeme Möglichkeiten, Ihre Ausgaben zu verwalten und Zahlungen vorzunehmen.",
    benefits: [
      "Bequeme Zahlungen im Alltag",
      "Sichere Kartentransaktionen",
      "Unterstützung für Online-Zahlungen",
      "Internationale Zahlungsmöglichkeiten",
    ],

    cardTitle: "Karten, die das Bezahlen einfacher machen",
    cardDescription:
      "Nutzen Sie Ihre berechtigten Bankkarten für alltägliche Einkäufe und profitieren Sie von bequemen Zahlungsoptionen für modernes Banking.",
    learnSecurity: "Mehr über Sicherheit erfahren",

    servicesLabel: "Karten & Zahlungen",
    servicesTitle: (
      <>
        Zahlungsoptionen
        <br />
        für mehr Komfort
      </>
    ),
    servicesDescription:
      "Entdecken Sie bequeme Karten- und Zahlungsdienste für Ihre alltäglichen finanziellen Bedürfnisse.",

    services: [
      {
        title: "Debitkarten",
        description:
          "Bequeme Zahlungskarten für alltägliche Einkäufe, Abhebungen und den Zugriff auf Ihre verfügbaren Guthaben.",
      },
      {
        title: "Kreditkarten",
        description:
          "Flexible Kartenlösungen, die berechtigten Kunden einen bequemen Zugang zu Kredit ermöglichen.",
      },
      {
        title: "Online-Zahlungen",
        description:
          "Tätigen Sie Online-Einkäufe und Zahlungen bequem über sichere digitale Zahlungsdienste.",
      },
      {
        title: "Kontaktloses Banking",
        description:
          "Nutzen Sie bequeme kontaktlose Zahlungsoptionen für berechtigte Karten und unterstützte Zahlungsterminals.",
      },
    ],

    securityLabel: "Sichere Zahlungen",
    securityTitle: "Sicherheit steht im Mittelpunkt",
    securityDescription:
      "Der Schutz Ihrer Finanzinformationen ist ein wichtiger Bestandteil des modernen Bankings. Bewahren Sie Ihre Kartendaten, Passwörter und PINs stets vertraulich auf und verwenden Sie sichere Kanäle für Zahlungen.",
    protectTitle: "Schützen Sie Ihr Konto",
    protectDescription:
      "Erfahren Sie mehr über Sicherheitsmaßnahmen zum Schutz Ihres Online-Bankings und Ihrer Zahlungsinformationen.",
    securityCenter: "Sicherheitscenter",

    ctaTitle: "Bereit für bequemes Banking?",
    ctaDescription:
      "Eröffnen Sie ein Konto und nutzen Sie bequeme Banking- und Zahlungslösungen.",
  },

  fr: {
    heroLabel: "Cartes & Paiements",
    heroTitle: (
      <>
        Des moyens de paiement
        <br />
        simples et sécurisés
      </>
    ),
    heroDescription:
      "Des solutions de cartes et de paiement pratiques conçues pour vous aider à effectuer vos achats quotidiens, gérer vos paiements et rester connecté à vos finances.",
    openAccount: "Ouvrir un compte",
    onlineBanking: "Banque en ligne",

    introLabel: "Solutions de cartes & de paiement",
    introTitle: (
      <>
        Des solutions de paiement
        <br />
        pour la vie quotidienne
      </>
    ),
    introDescription:
      "Des achats quotidiens aux transactions en ligne, nos solutions de cartes et de paiement vous offrent des moyens pratiques de gérer vos dépenses et d'effectuer vos paiements.",
    benefits: [
      "Paiements quotidiens pratiques",
      "Transactions par carte sécurisées",
      "Prise en charge des paiements en ligne",
      "Possibilité de paiements internationaux",
    ],

    cardTitle: "Des cartes pratiques",
    cardDescription:
      "Utilisez vos cartes bancaires éligibles pour vos achats quotidiens et profitez d'options de paiement pratiques conçues pour les besoins bancaires modernes.",
    learnSecurity: "En savoir plus sur la sécurité",

    servicesLabel: "Cartes & Paiements",
    servicesTitle: (
      <>
        Des options de paiement
        <br />
        conçues pour votre confort
      </>
    ),
    servicesDescription:
      "Découvrez des services de cartes et de paiement pratiques conçus pour vos besoins financiers quotidiens.",

    services: [
      {
        title: "Cartes de débit",
        description:
          "Des cartes de paiement pratiques pour les achats quotidiens, les retraits et l'accès à vos fonds disponibles.",
      },
      {
        title: "Cartes de crédit",
        description:
          "Des solutions de cartes flexibles conçues pour offrir un accès pratique au crédit aux clients éligibles.",
      },
      {
        title: "Paiements en ligne",
        description:
          "Effectuez vos achats et paiements en ligne facilement grâce à des services de paiement numériques sécurisés.",
      },
      {
        title: "Banque sans contact",
        description:
          "Profitez d'options de paiement sans contact pratiques avec les cartes éligibles et les terminaux de paiement compatibles.",
      },
    ],

    securityLabel: "Paiements sécurisés",
    securityTitle: "La sécurité au cœur de nos services",
    securityDescription:
      "La protection de vos informations financières est un élément essentiel des services bancaires modernes. Gardez toujours vos informations de carte, mots de passe et codes PIN confidentiels et utilisez des canaux sécurisés pour vos paiements.",
    protectTitle: "Protégez votre compte",
    protectDescription:
      "Découvrez les bonnes pratiques de sécurité pour protéger vos services bancaires en ligne et vos informations de paiement.",
    securityCenter: "Centre de sécurité",

    ctaTitle: "Prêt pour une banque plus pratique ?",
    ctaDescription:
      "Ouvrez un compte et accédez à des solutions bancaires et de paiement pratiques.",
  },
};

export default function CardsPage() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  useEffect(() => {
    const readLanguage = () => {
      const match = document.cookie.match(
        new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]*)`)
      );

      if (
        match &&
        SUPPORTED_LANGUAGES.includes(match[1] as SupportedLanguage)
      ) {
        setLanguage(match[1] as SupportedLanguage);
      } else {
        setLanguage("en");
      }
    };

    readLanguage();

    window.addEventListener("language-change", readLanguage);

    return () => {
      window.removeEventListener("language-change", readLanguage);
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
              {t.heroLabel}
            </p>

            <h1 className="mt-5 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              {t.heroTitle}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-8 max-w-2xl">
              {t.heroDescription}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                {t.openAccount}
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                {t.onlineBanking}
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
                {t.introLabel}
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                {t.introTitle}
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                {t.introDescription}
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {t.benefits.map((benefit) => (
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
                {t.cardTitle}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {t.cardDescription}
              </p>

              <Link
                href="/security"
                className="inline-flex items-center gap-2 mt-7 font-semibold text-red-600 hover:gap-3 transition-all"
              >
                {t.learnSecurity}
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
              {t.servicesLabel}
            </p>

            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
              {t.servicesTitle}
            </h2>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              {t.servicesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {t.services.map((service, index) => {
              const icons = [
                CreditCard,
                ShieldCheck,
                ShoppingCart,
                Smartphone,
              ];

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

      {/* Security */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="uppercase tracking-[4px] text-red-600 text-sm font-semibold">
                {t.securityLabel}
              </p>

              <h2 className="mt-4 text-4xl font-bold text-slate-900">
                {t.securityTitle}
              </h2>

              <p className="mt-5 text-lg text-gray-600 leading-8 max-w-3xl">
                {t.securityDescription}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-8 text-white">
              <ShieldCheck size={34} />

              <h3 className="mt-5 text-xl font-bold">
                {t.protectTitle}
              </h3>

              <p className="mt-3 text-slate-300 leading-7">
                {t.protectDescription}
              </p>

              <Link
                href="/security"
                className="inline-flex items-center gap-2 mt-6 font-semibold text-white hover:gap-3 transition-all"
              >
                {t.securityCenter}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-red-600 px-8 py-14 md:px-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t.ctaTitle}
            </h2>

            <p className="mt-4 text-red-100 text-lg leading-7 max-w-2xl mx-auto">
              {t.ctaDescription}
            </p>

            <Link
              href="/apply"
              className="inline-flex items-center gap-2 mt-8 rounded-xl bg-white px-7 py-4 font-semibold text-red-600 transition hover:bg-slate-100"
            >
              {t.openAccount}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}