"use client";

import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type DeclarationProps = {
  formData: {
    agreedToTerms: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const translations: Record<
  SupportedLanguage,
  {
    title: string;
    description: string;
    declaration1: string;
    declaration2: string;
    declaration3: string;
    saveForLater: string;
    submitApplication: string;
  }
> = {
  en: {
    title: "Declaration",
    description:
      "Please read and confirm the following before submitting your application.",
    declaration1:
      "I declare that all information provided in this application is true, complete and accurate to the best of my knowledge.",
    declaration2:
      "I authorize Universal Standard Bank to verify my identity and any information provided as part of this application.",
    declaration3:
      "I agree to the Bank's Terms & Conditions and Privacy Policy.",
    saveForLater: "Save for Later",
    submitApplication: "Submit Application",
  },

  de: {
    title: "Erklärung",
    description:
      "Bitte lesen und bestätigen Sie die folgenden Angaben, bevor Sie Ihren Antrag einreichen.",
    declaration1:
      "Ich erkläre, dass alle in diesem Antrag gemachten Angaben nach bestem Wissen wahr, vollständig und korrekt sind.",
    declaration2:
      "Ich ermächtige die Universal Standard Bank, meine Identität und alle im Rahmen dieses Antrags gemachten Angaben zu überprüfen.",
    declaration3:
      "Ich stimme den Allgemeinen Geschäftsbedingungen und der Datenschutzrichtlinie der Bank zu.",
    saveForLater: "Für später speichern",
    submitApplication: "Antrag einreichen",
  },

  fr: {
    title: "Déclaration",
    description:
      "Veuillez lire et confirmer les éléments suivants avant de soumettre votre demande.",
    declaration1:
      "Je déclare que toutes les informations fournies dans cette demande sont, à ma connaissance, vraies, complètes et exactes.",
    declaration2:
      "J'autorise Universal Standard Bank à vérifier mon identité ainsi que toute information fournie dans le cadre de cette demande.",
    declaration3:
      "J'accepte les Conditions générales et la Politique de confidentialité de la Banque.",
    saveForLater: "Enregistrer pour plus tard",
    submitApplication: "Soumettre la demande",
  },
};

export default function Declaration({
  formData,
  setFormData,
}: DeclarationProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]*)`)
    );

    if (
      match &&
      SUPPORTED_LANGUAGES.includes(match[1] as SupportedLanguage)
    ) {
      setLanguage(match[1] as SupportedLanguage);
    }

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<SupportedLanguage>;

      if (SUPPORTED_LANGUAGES.includes(customEvent.detail)) {
        setLanguage(customEvent.detail);
      }
    };

    window.addEventListener("language-change", handleLanguageChange);

    return () => {
      window.removeEventListener(
        "language-change",
        handleLanguageChange
      );
    };
  }, []);

  const t = translations[language];

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          {t.title}
        </h2>

        <p className="text-slate-500 mt-2">
          {t.description}
        </p>
      </div>

      <div className="space-y-5">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                agreedToTerms: e.target.checked,
              }))
            }
            className="mt-1 h-5 w-5 accent-red-600"
          />

          <span className="text-slate-700 leading-relaxed">
            {t.declaration1}
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 accent-red-600"
          />

          <span className="text-slate-700 leading-relaxed">
            {t.declaration2}
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 accent-red-600"
          />

          <span className="text-slate-700 leading-relaxed">
            {t.declaration3}
          </span>
        </label>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          className="rounded-xl border border-slate-300 px-8 py-3 font-semibold hover:bg-slate-100 transition"
        >
          {t.saveForLater}
        </button>

        <button
          type="submit"
          className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700 transition"
        >
          {t.submitApplication}
        </button>
      </div>
    </section>
  );
}