"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations: Record<
  SupportedLanguage,
  {
    identityVerification: string;
    welcomeBack: string;
    enterPin: string;
    invalidPin: string;
    verificationFailed: string;
    verifying: string;
    verifyIdentity: string;
    protected: string;
    backToLogin: string;
  }
> = {
  en: {
    identityVerification: "Identity Verification",
    welcomeBack: "Welcome Back",
    enterPin: "Please enter your 6-digit Security PIN.",
    invalidPin: "Please enter your 6-digit PIN.",
    verificationFailed: "Verification failed.",
    verifying: "Verifying...",
    verifyIdentity: "Verify Identity",
    protected:
      "🔒 Your identity is protected with 256-bit SSL Encryption.",
    backToLogin: "← Back to Login",
  },

  de: {
    identityVerification: "Identitätsprüfung",
    welcomeBack: "Willkommen zurück",
    enterPin:
      "Bitte geben Sie Ihre 6-stellige Sicherheits-PIN ein.",
    invalidPin:
      "Bitte geben Sie Ihre 6-stellige PIN ein.",
    verificationFailed: "Überprüfung fehlgeschlagen.",
    verifying: "Wird überprüft...",
    verifyIdentity: "Identität überprüfen",
    protected:
      "🔒 Ihre Identität ist durch eine 256-Bit-SSL-Verschlüsselung geschützt.",
    backToLogin: "← Zurück zur Anmeldung",
  },

  fr: {
    identityVerification: "Vérification d'identité",
    welcomeBack: "Bienvenue",
    enterPin:
      "Veuillez saisir votre code PIN de sécurité à 6 chiffres.",
    invalidPin:
      "Veuillez saisir votre code PIN à 6 chiffres.",
    verificationFailed: "Échec de la vérification.",
    verifying: "Vérification...",
    verifyIdentity: "Vérifier l'identité",
    protected:
      "🔒 Votre identité est protégée par un chiffrement SSL 256 bits.",
    backToLogin: "← Retour à la connexion",
  },
};

export default function VerifyPage() {
  const router = useRouter();

  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

  const [pin, setPin] = useState("");
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

    if (pin.length !== 6) {
      alert(t.invalidPin);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert(t.verificationFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Universal Standard Bank
          </h1>

          <p className="text-gray-500 mt-2">
            {t.identityVerification}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {t.welcomeBack}
            </h2>

            <p className="text-gray-600 mt-2">
              {t.enterPin}
            </p>
          </div>

          <input
            type="password"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg text-center text-2xl font-bold py-4 tracking-[12px] mb-8 outline-none focus:border-blue-600"
            placeholder="••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-lg"
          >
            {loading ? t.verifying : t.verifyIdentity}
          </button>
        </form>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-gray-700 text-center">
            {t.protected}
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-blue-700 hover:underline"
          >
            {t.backToLogin}
          </Link>
        </div>
      </div>
    </main>
  );
}