"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { SupportedLanguage } from "@/lib/i18n/language";

const translations = {
  en: {
    home: "Home",
    personalBanking: "Personal Banking",
    businessBanking: "Business Banking",
    aboutUs: "About Us",
    contact: "Contact",
    openAccount: "Open Account",
    login: "Login",
  },
  de: {
    home: "Startseite",
    personalBanking: "Privatkundengeschäft",
    businessBanking: "Geschäftskunden",
    aboutUs: "Über uns",
    contact: "Kontakt",
    openAccount: "Konto eröffnen",
    login: "Anmelden",
  },
  fr: {
    home: "Accueil",
    personalBanking: "Banque personnelle",
    businessBanking: "Banque professionnelle",
    aboutUs: "À propos de nous",
    contact: "Contact",
    openAccount: "Ouvrir un compte",
    login: "Connexion",
  },
};

export default function Navbar({
  showLogo = true,
}: {
  showLogo?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
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

  const navLinks = [
    { name: t.home, href: "/#home" },
    {
      name: t.personalBanking,
      href: "/personal-banking",
    },
    {
      name: t.businessBanking,
      href: "/business-banking",
    },
    { name: t.aboutUs, href: "/#about" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {showLogo && (
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-transparent.png"
                alt="Universal Standard Bank"
                width={170}
                height={48}
                priority
                className="mix-blend-multiply"
              />
            </Link>
          )}

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[15px] font-medium transition-colors duration-300 ${
                  link.href === "/#home"
                    ? "text-red-600"
                    : "text-slate-700 hover:text-red-600"
                }`}
              >
                {link.name}

                {link.href === "/#home" && (
                  <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-red-600"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              href="/apply"
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              {t.openAccount}
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-red-600 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              {t.login}
            </Link>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="rounded-xl bg-white shadow-lg border border-gray-200 p-6 lg:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-slate-700"
                >
                  {link.name}
                </Link>
              ))}

              <LanguageSwitcher />

              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-red-600 py-3 text-center font-semibold text-white"
              >
                {t.openAccount}
              </Link>

              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-red-600 py-3 text-center font-semibold text-red-600"
              >
                {t.login}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}