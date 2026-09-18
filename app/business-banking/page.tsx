"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BriefcaseBusiness,
  Building2,
  Users,
  BarChart3,
  Globe2,
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
      eyebrow: "Business Banking",
      titleLine1: "Banking Built",
      titleLine2: "for",
      titleAccent: "Business",
      description:
        "Banking solutions designed to help businesses manage their finances, support growth and handle everyday financial operations with confidence.",
      openAccount: "Open an Account",
      contact: "Contact Us",
    },
    introduction: {
      eyebrow: "Business Banking Solutions",
      titleLine1: "Financial solutions",
      titleLine2: "for your business",
      description:
        "Whether you are managing a growing company or an established business, our banking solutions are designed to support your financial operations and help you manage your business effectively.",
      benefits: [
        "Business-focused banking solutions",
        "Convenient account management",
        "Support for business growth",
        "Domestic and international banking services",
      ],
      cardTitle: "Banking for businesses",
      cardDescription:
        "From everyday business banking to payment and trade solutions, access services designed around the needs of modern businesses.",
      speakWithUs: "Speak with us",
    },
    services: {
      eyebrow: "Business Services",
      titleLine1: "Banking solutions",
      titleLine2: "for every stage",
      description:
        "Explore banking services designed to support your business operations and financial goals.",
      items: [
        {
          title: "Business Accounts",
          description:
            "Reliable business banking accounts designed to help you manage your company's everyday financial needs.",
        },
        {
          title: "Payroll Solutions",
          description:
            "Convenient banking solutions to help businesses manage payroll and employee payments efficiently.",
        },
        {
          title: "Trade Finance",
          description:
            "Financial solutions designed to support businesses involved in domestic and international trade.",
        },
        {
          title: "Merchant Services",
          description:
            "Payment solutions that help businesses receive and manage customer payments with greater convenience.",
        },
      ],
    },
    cta: {
      title: "Let's support your business",
      description:
        "Explore business banking solutions designed to help you manage your finances and support your business objectives.",
      button: "Contact Us",
    },
  },

  de: {
    hero: {
      eyebrow: "Geschäftsbanking",
      titleLine1: "Banking für",
      titleLine2: "Ihr",
      titleAccent: "Unternehmen",
      description:
        "Banking-Lösungen, die Unternehmen dabei unterstützen, ihre Finanzen zu verwalten, ihr Wachstum voranzutreiben und ihre täglichen Finanzgeschäfte zuverlässig abzuwickeln.",
      openAccount: "Konto eröffnen",
      contact: "Kontakt",
    },
    introduction: {
      eyebrow: "Geschäftliche Banking-Lösungen",
      titleLine1: "Finanzlösungen",
      titleLine2: "für Ihr Unternehmen",
      description:
        "Ob Sie ein wachsendes Unternehmen oder ein etabliertes Geschäft führen – unsere Banking-Lösungen unterstützen Ihre finanziellen Abläufe und helfen Ihnen bei einer effizienten Unternehmensführung.",
      benefits: [
        "Banking-Lösungen für Unternehmen",
        "Bequeme Kontoverwaltung",
        "Unterstützung für Unternehmenswachstum",
        "Nationale und internationale Bankdienstleistungen",
      ],
      cardTitle: "Banking für Unternehmen",
      cardDescription:
        "Vom täglichen Geschäftsbanking bis hin zu Zahlungs- und Handelsfinanzierungslösungen bieten wir Dienstleistungen, die auf die Bedürfnisse moderner Unternehmen zugeschnitten sind.",
      speakWithUs: "Sprechen Sie mit uns",
    },
    services: {
      eyebrow: "Geschäftliche Dienstleistungen",
      titleLine1: "Banking-Lösungen",
      titleLine2: "für jede Phase",
      description:
        "Entdecken Sie Banking-Dienstleistungen, die Ihre Geschäftsabläufe und finanziellen Ziele unterstützen.",
      items: [
        {
          title: "Geschäftskonten",
          description:
            "Zuverlässige Geschäftskonten, die Ihnen helfen, die täglichen finanziellen Anforderungen Ihres Unternehmens zu verwalten.",
        },
        {
          title: "Gehaltsabrechnung",
          description:
            "Bequeme Banking-Lösungen, mit denen Unternehmen Gehaltsabrechnungen und Zahlungen an Mitarbeiter effizient verwalten können.",
        },
        {
          title: "Handelsfinanzierung",
          description:
            "Finanzlösungen zur Unterstützung von Unternehmen im nationalen und internationalen Handel.",
        },
        {
          title: "Händlerdienste",
          description:
            "Zahlungslösungen, mit denen Unternehmen Kundenzahlungen bequem entgegennehmen und verwalten können.",
        },
      ],
    },
    cta: {
      title: "Wir unterstützen Ihr Unternehmen",
      description:
        "Entdecken Sie Geschäftslösungen, die Ihnen helfen, Ihre Finanzen zu verwalten und Ihre Unternehmensziele zu unterstützen.",
      button: "Kontakt",
    },
  },

  fr: {
    hero: {
      eyebrow: "Banque professionnelle",
      titleLine1: "Une banque conçue",
      titleLine2: "pour votre",
      titleAccent: "entreprise",
      description:
        "Des solutions bancaires conçues pour aider les entreprises à gérer leurs finances, soutenir leur croissance et effectuer leurs opérations financières quotidiennes en toute confiance.",
      openAccount: "Ouvrir un compte",
      contact: "Nous contacter",
    },
    introduction: {
      eyebrow: "Solutions bancaires professionnelles",
      titleLine1: "Des solutions financières",
      titleLine2: "pour votre entreprise",
      description:
        "Que vous dirigiez une entreprise en pleine croissance ou une société établie, nos solutions bancaires sont conçues pour soutenir vos opérations financières et vous aider à gérer efficacement votre activité.",
      benefits: [
        "Solutions bancaires dédiées aux entreprises",
        "Gestion de compte pratique",
        "Accompagnement de la croissance",
        "Services bancaires nationaux et internationaux",
      ],
      cardTitle: "Une banque pour les entreprises",
      cardDescription:
        "Des services bancaires quotidiens aux solutions de paiement et de financement du commerce, accédez à des services conçus pour répondre aux besoins des entreprises modernes.",
      speakWithUs: "Parlez avec nous",
    },
    services: {
      eyebrow: "Services aux entreprises",
      titleLine1: "Des solutions bancaires",
      titleLine2: "pour chaque étape",
      description:
        "Découvrez des services bancaires conçus pour soutenir vos activités et vos objectifs financiers.",
      items: [
        {
          title: "Comptes professionnels",
          description:
            "Des comptes bancaires professionnels fiables pour vous aider à gérer les besoins financiers quotidiens de votre entreprise.",
        },
        {
          title: "Solutions de paie",
          description:
            "Des solutions bancaires pratiques pour aider les entreprises à gérer efficacement les salaires et les paiements des employés.",
        },
        {
          title: "Financement du commerce",
          description:
            "Des solutions financières conçues pour accompagner les entreprises engagées dans le commerce national et international.",
        },
        {
          title: "Services aux commerçants",
          description:
            "Des solutions de paiement permettant aux entreprises de recevoir et de gérer les paiements des clients plus facilement.",
        },
      ],
    },
    cta: {
      title: "Accompagnons votre entreprise",
      description:
        "Découvrez des solutions bancaires professionnelles conçues pour vous aider à gérer vos finances et à soutenir vos objectifs.",
      button: "Nous contacter",
    },
  },
};

const icons = [
  Building2,
  Users,
  Globe2,
  BarChart3,
];

export default function BusinessBankingPage() {
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
            src="/images/business-banking.jpg"
            alt="Business banking consultation"
            fill
            priority
            className="object-cover object-center"
          />

          {/* White gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 via-25% to-transparent" />

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
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white/80 px-7 py-4 font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
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
                <BriefcaseBusiness
                  size={30}
                  className="text-white"
                />
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