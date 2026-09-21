"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import type { SupportedLanguage } from "@/lib/i18n/language";

const translations = {
  en: {
    description:
      "Delivering secure, innovative and trusted banking solutions for individuals, businesses and international clients worldwide.",
    banking: "Banking",
    personalBanking: "Personal Banking",
    businessBanking: "Business Banking",
    internationalBanking: "International Banking",
    cardsPayments: "Cards & Payments",
    quickLinks: "Quick Links",
    openAccount: "Open an Account",
    internetBanking: "Internet Banking",
    securityCenter: "Security Center",
    contactUs: "Contact Us",
    contact: "Contact",
    privacyPolicy: "Privacy Policy",
    terms: "Terms & Conditions",
    security: "Security",
    rights: "All Rights Reserved.",
  },

  de: {
    description:
      "Wir bieten sichere, innovative und vertrauenswürdige Banking-Lösungen für Privatpersonen, Unternehmen und internationale Kunden weltweit.",
    banking: "Banking",
    personalBanking: "Privatkundengeschäft",
    businessBanking: "Geschäftsbanking",
    internationalBanking: "Internationales Banking",
    cardsPayments: "Karten & Zahlungen",
    quickLinks: "Schnellzugriff",
    openAccount: "Konto eröffnen",
    internetBanking: "Online-Banking",
    securityCenter: "Sicherheitszentrum",
    contactUs: "Kontaktieren Sie uns",
    contact: "Kontakt",
    privacyPolicy: "Datenschutzrichtlinie",
    terms: "Allgemeine Geschäftsbedingungen",
    security: "Sicherheit",
    rights: "Alle Rechte vorbehalten.",
  },

  fr: {
    description:
      "Nous proposons des solutions bancaires sécurisées, innovantes et fiables pour les particuliers, les entreprises et les clients internationaux dans le monde entier.",
    banking: "Services bancaires",
    personalBanking: "Banque personnelle",
    businessBanking: "Banque professionnelle",
    internationalBanking: "Services bancaires internationaux",
    cardsPayments: "Cartes et paiements",
    quickLinks: "Liens rapides",
    openAccount: "Ouvrir un compte",
    internetBanking: "Banque en ligne",
    securityCenter: "Centre de sécurité",
    contactUs: "Nous contacter",
    contact: "Contact",
    privacyPolicy: "Politique de confidentialité",
    terms: "Conditions générales",
    security: "Sécurité",
    rights: "Tous droits réservés.",
  },
};

export default function Footer() {
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
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-16 lg:gap-20">

          {/* Company */}

          <div>

            <p className="uppercase tracking-[4px] text-red-500 text-sm font-semibold mb-4">
              Universal Standard Bank
            </p>

            <Image
              src="/logo.png"
              alt="Universal Standard Bank"
              width={180}
              height={60}
              className="bg-white rounded-xl p-2 w-auto"
            />

            <p className="mt-6 text-slate-400 leading-8 max-w-sm">
              {t.description}
            </p>

          </div>

          {/* Banking */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              {t.banking}
            </h3>

            <div className="flex flex-col gap-4 text-slate-400">

              <Link
                href="/personal-banking"
                className="hover:text-white transition"
              >
                {t.personalBanking}
              </Link>

              <Link
                href="/business-banking"
                className="hover:text-white transition"
              >
                {t.businessBanking}
              </Link>

              <Link
                href="/international"
                className="hover:text-white transition"
              >
                {t.internationalBanking}
              </Link>

              <Link
                href="/cards"
                className="hover:text-white transition"
              >
                {t.cardsPayments}
              </Link>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              {t.quickLinks}
            </h3>

            <div className="flex flex-col gap-4 text-slate-400">

              <Link
                href="/apply"
                className="hover:text-white transition"
              >
                {t.openAccount}
              </Link>

              <Link
                href="/login"
                className="hover:text-white transition"
              >
                {t.internetBanking}
              </Link>

              <Link
                href="/security"
                className="hover:text-white transition"
              >
                {t.securityCenter}
              </Link>

              <Link
                href="/contact"
                className="hover:text-white transition"
              >
                {t.contactUs}
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              {t.contact}
            </h3>

            <div className="space-y-5 text-slate-400">

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="text-red-500 mt-1 flex-shrink-0"
                />

                <span>
                  33 St James's Square<br />
                  St James's<br />
                  London SW1Y 4JS<br />
                  England
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-red-500 flex-shrink-0"
                />

                <span>
                  +44 79 536 23468<br />
                  +44 73 554 53466
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-red-500 flex-shrink-0"
                />

                <span>
  info@universalstanb.com
  <br />
  inquiry@universalstanb.com
</span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-16 pt-8">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Universal Standard Bank.{" "}
              {t.rights}
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm">

              <Link
                href="/privacy"
                className="text-slate-500 hover:text-white transition"
              >
                {t.privacyPolicy}
              </Link>

              <Link
                href="/terms"
                className="text-slate-500 hover:text-white transition"
              >
                {t.terms}
              </Link>

              <Link
                href="/security"
                className="text-slate-500 hover:text-white transition"
              >
                {t.security}
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}