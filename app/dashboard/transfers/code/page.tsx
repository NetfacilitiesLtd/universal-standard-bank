"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations: Record<
  SupportedLanguage,
  {
    title: string;
    description: string;
    label: string;
    placeholder: string;
    verifying: string;
    verifyTransfer: string;
    back: string;
    unableToVerify: string;
  }
> = {
  en: {
    title: "Transfer Code Verification",
    description:
      "Your international transfer request has been received successfully. To continue processing your transfer, please enter the Transfer Code provided by your account officer.",
    label: "Transfer Code",
    placeholder: "Enter your transfer code",
    verifying: "Verifying...",
    verifyTransfer: "Verify Transfer",
    back: "← Back to Transfer Center",
    unableToVerify: "Unable to verify transfer code.",
  },

  de: {
    title: "Überprüfung des Überweisungscodes",
    description:
      "Ihre internationale Überweisungsanfrage wurde erfolgreich empfangen. Um die Bearbeitung Ihrer Überweisung fortzusetzen, geben Sie bitte den von Ihrem Kundenbetreuer bereitgestellten Überweisungscode ein.",
    label: "Überweisungscode",
    placeholder: "Geben Sie Ihren Überweisungscode ein",
    verifying: "Wird überprüft...",
    verifyTransfer: "Überweisung überprüfen",
    back: "← Zurück zum Überweisungsbereich",
    unableToVerify:
      "Der Überweisungscode konnte nicht überprüft werden.",
  },

  fr: {
    title: "Vérification du code de virement",
    description:
      "Votre demande de virement international a été reçue avec succès. Pour poursuivre le traitement de votre virement, veuillez saisir le code de virement fourni par votre conseiller.",
    label: "Code de virement",
    placeholder: "Saisissez votre code de virement",
    verifying: "Vérification...",
    verifyTransfer: "Vérifier le virement",
    back: "← Retour au centre des virements",
    unableToVerify:
      "Impossible de vérifier le code de virement.",
  },
};

export default function TransferCodePage() {
  const router = useRouter();

  const [transferCode, setTransferCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

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
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/transfer-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transferCode,
        }),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/dashboard");
        return;
      }

      alert(result.message);
    } catch (error) {
      console.error(error);

      alert(t.unableToVerify);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t.title}
        </h1>

        <p className="mt-4 text-gray-600 leading-7">
          {t.description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label
              htmlFor="transferCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.label}
            </label>

            <input
              id="transferCode"
              type="text"
              value={transferCode}
              onChange={(e) =>
                setTransferCode(e.target.value)
              }
              placeholder={t.placeholder}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading
              ? t.verifying
              : t.verifyTransfer}
          </button>
        </form>

        <div className="mt-6">
          <Link
            href="/dashboard/transfers"
            className="text-blue-700 hover:underline"
          >
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
}