"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations: Record<
  SupportedLanguage,
  {
    customerOnlineBanking: string;
    secureAccess: string;
    protected: string;
    accountNumber: string;
    accountNumberPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    signingIn: string;
    continue: string;
    help: string;
    unableToLogin: string;
    heroDescription: string;
  }
> = {
  en: {
    customerOnlineBanking: "Customer Online Banking",
    secureAccess:
      "Secure access to your Universal Standard Bank account.",
    protected: "🔒 Protected with 256-bit SSL Encryption",
    accountNumber: "Account Number",
    accountNumberPlaceholder: "Enter your account number",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember Me",
    forgotPassword: "Forgot Password?",
    signingIn: "Signing In...",
    continue: "Continue",
    help:
      "Need help accessing your account? Contact Customer Care.",
    unableToLogin: "Unable to login.",
    heroDescription:
      "Secure banking built for individuals, businesses and organizations.",
  },

  de: {
    customerOnlineBanking: "Online-Banking für Kunden",
    secureAccess:
      "Sicherer Zugang zu Ihrem Konto bei der Universal Standard Bank.",
    protected: "🔒 Geschützt durch 256-Bit-SSL-Verschlüsselung",
    accountNumber: "Kontonummer",
    accountNumberPlaceholder: "Geben Sie Ihre Kontonummer ein",
    password: "Passwort",
    passwordPlaceholder: "Geben Sie Ihr Passwort ein",
    rememberMe: "Angemeldet bleiben",
    forgotPassword: "Passwort vergessen?",
    signingIn: "Anmeldung läuft...",
    continue: "Weiter",
    help:
      "Benötigen Sie Hilfe beim Zugriff auf Ihr Konto? Kontaktieren Sie den Kundenservice.",
    unableToLogin: "Anmeldung nicht möglich.",
    heroDescription:
      "Sicheres Banking für Privatpersonen, Unternehmen und Organisationen.",
  },

  fr: {
    customerOnlineBanking: "Services bancaires en ligne",
    secureAccess:
      "Accès sécurisé à votre compte Universal Standard Bank.",
    protected: "🔒 Protégé par un chiffrement SSL 256 bits",
    accountNumber: "Numéro de compte",
    accountNumberPlaceholder:
      "Saisissez votre numéro de compte",
    password: "Mot de passe",
    passwordPlaceholder: "Saisissez votre mot de passe",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié ?",
    signingIn: "Connexion...",
    continue: "Continuer",
    help:
      "Besoin d'aide pour accéder à votre compte ? Contactez le service clientèle.",
    unableToLogin: "Impossible de se connecter.",
    heroDescription:
      "Une banque sécurisée conçue pour les particuliers, les entreprises et les organisations.",
  },
};

export default function LoginPage() {
  const router = useRouter();

  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]*)`)
    );

    if (
      match &&
      SUPPORTED_LANGUAGES.includes(
        match[1] as SupportedLanguage
      )
    ) {
      setLanguage(match[1] as SupportedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      const customEvent =
        event as CustomEvent<SupportedLanguage>;

      if (
        SUPPORTED_LANGUAGES.includes(customEvent.detail)
      ) {
        setLanguage(customEvent.detail);
      }
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

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      router.push("/verify");
    } catch (error) {
      console.error(error);
      alert(t.unableToLogin);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <Image
          src="/images/hero-bg.jpg"
          alt="Bank"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center">
          <div className="text-center text-white px-10">
            <h1 className="text-5xl font-bold mb-6">
              Universal Standard Bank
            </h1>

            <p className="text-xl leading-8">
              {t.heroDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            {t.customerOnlineBanking}
          </h2>

          <p className="text-gray-600 mb-2">
            {t.secureAccess}
          </p>

          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium mt-4">
            {t.protected}
          </div>

          <form
            className="space-y-6 mt-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                {t.accountNumber}
              </label>

              <input
                type="text"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value)
                }
                placeholder={t.accountNumberPlaceholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-gray-50 outline-none text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                {t.password}
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 bg-gray-50">
                <LockKeyhole
                  className="text-gray-500 mr-3"
                  size={20}
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder={t.passwordPlaceholder}
                  className="w-full bg-transparent py-4 outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  className="accent-blue-700"
                />
                {t.rememberMe}
              </label>

              <Link
                href="#"
                className="text-blue-700 hover:underline"
              >
                {t.forgotPassword}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-lg disabled:opacity-50"
            >
              {loading ? t.signingIn : t.continue}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8 text-sm">
            {t.help}
          </p>
        </div>
      </div>
    </div>
  );
}