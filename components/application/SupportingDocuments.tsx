"use client";

import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type SupportingDocumentsProps = {
  formData: {
    passportPhoto: File | null;
    governmentId: File | null;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const translations: Record<
  SupportedLanguage,
  {
    title: string;
    description: string;
    passportPhoto: string;
    passportPhotoDescription: string;
    governmentId: string;
    governmentIdDescription: string;
    selected: string;
  }
> = {
  en: {
    title: "Supporting Documents",
    description:
      "Upload the required documents to help us verify your identity and process your application.",
    passportPhoto: "Passport Photograph",
    passportPhotoDescription:
      "Upload a recent passport-sized photograph.",
    governmentId: "Government Issued ID",
    governmentIdDescription:
      "Passport, National ID, Driver's License or Residence Permit.",
    selected: "Selected:",
  },

  de: {
    title: "Erforderliche Dokumente",
    description:
      "Laden Sie die erforderlichen Dokumente hoch, damit wir Ihre Identität überprüfen und Ihren Antrag bearbeiten können.",
    passportPhoto: "Passfoto",
    passportPhotoDescription:
      "Laden Sie ein aktuelles Passfoto hoch.",
    governmentId: "Amtlicher Ausweis",
    governmentIdDescription:
      "Reisepass, Personalausweis, Führerschein oder Aufenthaltstitel.",
    selected: "Ausgewählt:",
  },

  fr: {
    title: "Documents justificatifs",
    description:
      "Téléchargez les documents requis afin de nous permettre de vérifier votre identité et de traiter votre demande.",
    passportPhoto: "Photo d'identité",
    passportPhotoDescription:
      "Téléchargez une photo d'identité récente au format passeport.",
    governmentId: "Pièce d'identité officielle",
    governmentIdDescription:
      "Passeport, carte d'identité, permis de conduire ou titre de séjour.",
    selected: "Sélectionné :",
  },
};

export default function SupportingDocuments({
  formData,
  setFormData,
}: SupportingDocumentsProps) {
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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: file,
    }));
  };

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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Passport Photograph */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.passportPhoto}{" "}
            <span className="text-red-600">*</span>
          </label>

          <input
            type="file"
            name="passportPhoto"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-white hover:file:bg-red-700"
          />

          <p className="text-sm text-slate-500 mt-2">
            {t.passportPhotoDescription}
          </p>

          {formData.passportPhoto && (
            <p className="mt-2 text-sm text-green-600">
              {t.selected} {formData.passportPhoto.name}
            </p>
          )}
        </div>

        {/* Government ID */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.governmentId}{" "}
            <span className="text-red-600">*</span>
          </label>

          <input
            type="file"
            name="governmentId"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-white hover:file:bg-red-700"
          />

          <p className="text-sm text-slate-500 mt-2">
            {t.governmentIdDescription}
          </p>

          {formData.governmentId && (
            <p className="mt-2 text-sm text-green-600">
              {t.selected} {formData.governmentId.name}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}