"use client";

import Link from "next/link";
import {
  Landmark,
  BriefcaseBusiness,
  CreditCard,
  Globe2,
  ArrowRight,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { SupportedLanguage } from "@/lib/i18n/language";

const translations = {
  en: {
    eyebrow: "Our Banking Solutions",
    headingLine1: "Banking Products",
    headingLine2: "For Every Need",
    description:
      "Discover secure and reliable banking solutions designed to support your everyday finances, business growth and international banking needs.",
    personalBanking: {
      title: "Personal Banking",
      description:
        "Flexible banking solutions designed to help you manage your everyday finances with confidence.",
      items: [
        "Savings Accounts",
        "Current Accounts",
        "Personal Loans",
        "Mobile Banking",
      ],
    },
    businessBanking: {
      title: "Business Banking",
      description:
        "Reliable financial solutions to help businesses manage operations, growth and payments.",
      items: [
        "Business Accounts",
        "Payroll Solutions",
        "Trade Finance",
        "Merchant Services",
      ],
    },
    cardsPayments: {
      title: "Cards & Payments",
      description:
        "Convenient and secure payment solutions for your everyday purchases and transactions.",
      items: [
        "Debit Cards",
        "Credit Cards",
        "Online Payments",
        "Contactless Banking",
      ],
    },
    internationalBanking: {
      title: "International Banking",
      description:
        "Banking solutions designed for international transfers, currencies and cross-border needs.",
      items: [
        "Global Transfers",
        "Foreign Exchange",
        "Multi-Currency",
        "International Support",
      ],
    },
    learnMore: "Learn More",
  },

  de: {
    eyebrow: "Unsere Banking-Lösungen",
    headingLine1: "Bankprodukte",
    headingLine2: "Für jeden Bedarf",
    description:
      "Entdecken Sie sichere und zuverlässige Banking-Lösungen für Ihre täglichen Finanzen, Ihr Unternehmenswachstum und Ihre internationalen Bankgeschäfte.",
    personalBanking: {
      title: "Privatkundengeschäft",
      description:
        "Flexible Banking-Lösungen, die Ihnen helfen, Ihre täglichen Finanzen sicher und zuverlässig zu verwalten.",
      items: [
        "Sparkonten",
        "Girokonten",
        "Privatkredite",
        "Mobile Banking",
      ],
    },
    businessBanking: {
      title: "Geschäftsbanking",
      description:
        "Zuverlässige Finanzlösungen, die Unternehmen bei der Verwaltung von Geschäftsabläufen, Wachstum und Zahlungen unterstützen.",
      items: [
        "Geschäftskonten",
        "Gehaltsabrechnung",
        "Handelsfinanzierung",
        "Händlerdienste",
      ],
    },
    cardsPayments: {
      title: "Karten & Zahlungen",
      description:
        "Bequeme und sichere Zahlungslösungen für Ihre täglichen Einkäufe und Transaktionen.",
      items: [
        "Debitkarten",
        "Kreditkarten",
        "Online-Zahlungen",
        "Kontaktloses Banking",
      ],
    },
    internationalBanking: {
      title: "Internationales Banking",
      description:
        "Banking-Lösungen für internationale Überweisungen, Währungen und grenzüberschreitende Finanzbedürfnisse.",
      items: [
        "Globale Überweisungen",
        "Devisenhandel",
        "Mehrere Währungen",
        "Internationaler Support",
      ],
    },
    learnMore: "Mehr erfahren",
  },

  fr: {
    eyebrow: "Nos solutions bancaires",
    headingLine1: "Produits bancaires",
    headingLine2: "Pour chaque besoin",
    description:
      "Découvrez des solutions bancaires sûres et fiables conçues pour répondre à vos besoins financiers quotidiens, soutenir la croissance de votre entreprise et faciliter vos opérations bancaires internationales.",
    personalBanking: {
      title: "Banque personnelle",
      description:
        "Des solutions bancaires flexibles conçues pour vous aider à gérer vos finances quotidiennes en toute confiance.",
      items: [
        "Comptes d'épargne",
        "Comptes courants",
        "Prêts personnels",
        "Banque mobile",
      ],
    },
    businessBanking: {
      title: "Banque professionnelle",
      description:
        "Des solutions financières fiables pour aider les entreprises à gérer leurs activités, leur croissance et leurs paiements.",
      items: [
        "Comptes professionnels",
        "Solutions de paie",
        "Financement du commerce",
        "Services aux commerçants",
      ],
    },
    cardsPayments: {
      title: "Cartes et paiements",
      description:
        "Des solutions de paiement pratiques et sécurisées pour vos achats et transactions quotidiens.",
      items: [
        "Cartes de débit",
        "Cartes de crédit",
        "Paiements en ligne",
        "Paiement sans contact",
      ],
    },
    internationalBanking: {
      title: "Services bancaires internationaux",
      description:
        "Des solutions bancaires conçues pour les transferts internationaux, les devises et les besoins financiers transfrontaliers.",
      items: [
        "Transferts internationaux",
        "Change de devises",
        "Multi-devises",
        "Assistance internationale",
      ],
    },
    learnMore: "En savoir plus",
  },
};

export default function Services() {
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

  const services = [
    {
      title: t.personalBanking.title,
      icon: Landmark,
      href: "/personal-banking",
      description: t.personalBanking.description,
      items: t.personalBanking.items,
    },
    {
      title: t.businessBanking.title,
      icon: BriefcaseBusiness,
      href: "/business-banking",
      description: t.businessBanking.description,
      items: t.businessBanking.items,
    },
    {
      title: t.cardsPayments.title,
      icon: CreditCard,
      href: "/cards",
      description: t.cardsPayments.description,
      items: t.cardsPayments.items,
    },
    {
      title: t.internationalBanking.title,
      icon: Globe2,
      href: "/international",
      description: t.internationalBanking.description,
      items: t.internationalBanking.items,
    },
  ];

  return (
    <section id="services" className="bg-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="uppercase tracking-[5px] text-red-600 text-sm font-semibold">
            {t.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
            {t.headingLine1}
            <br />
            <span className="text-red-600">{t.headingLine2}</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {t.description}
          </p>

        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-xl"
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
                  {service.title}
                </h3>

                {/* Red Accent */}
                <div className="w-12 h-1 bg-red-600 rounded-full mt-3" />

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>

                {/* Services List */}
                <ul className="mt-5 space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                        <Check
                          size={13}
                          strokeWidth={2.5}
                          className="text-red-600"
                        />
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More */}
                <div className="mt-auto pt-7">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 font-semibold text-red-600 transition-all duration-300 group-hover:gap-3"
                  >
                    {t.learnMore}
                    <ArrowRight size={18} />
                  </Link>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}