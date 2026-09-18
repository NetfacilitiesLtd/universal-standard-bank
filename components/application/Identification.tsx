"use client";

import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type IdentificationProps = {
  formData: {
    idType: string;
    idNumber: string;
    idExpiryDate: string;
    nationality: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const translations = {
  en: {
    title: "Identification",
    description: "Provide a valid government-issued identification document.",
    idType: "ID Type",
    selectIdType: "Select ID Type",
    passport: "Passport",
    nationalId: "National ID",
    driversLicense: "Driver's License",
    residencePermit: "Residence Permit",
    idNumber: "ID Number",
    idNumberPlaceholder: "Enter ID Number",
    expiryDate: "ID Expiry Date",
    nationality: "Nationality",
    nationalityPlaceholder: "Enter your nationality",
  },

  de: {
    title: "Identifikation",
    description:
      "Bitte legen Sie ein gültiges amtliches Ausweisdokument vor.",
    idType: "Ausweisart",
    selectIdType: "Ausweisart auswählen",
    passport: "Reisepass",
    nationalId: "Personalausweis",
    driversLicense: "Führerschein",
    residencePermit: "Aufenthaltserlaubnis",
    idNumber: "Ausweisnummer",
    idNumberPlaceholder: "Ausweisnummer eingeben",
    expiryDate: "Ablaufdatum des Ausweises",
    nationality: "Staatsangehörigkeit",
    nationalityPlaceholder: "Geben Sie Ihre Staatsangehörigkeit ein",
  },

  fr: {
    title: "Identification",
    description:
      "Veuillez fournir une pièce d'identité officielle valide.",
    idType: "Type de pièce d'identité",
    selectIdType: "Sélectionnez le type de pièce d'identité",
    passport: "Passeport",
    nationalId: "Carte d'identité nationale",
    driversLicense: "Permis de conduire",
    residencePermit: "Titre de séjour",
    idNumber: "Numéro d'identification",
    idNumberPlaceholder: "Saisissez le numéro d'identification",
    expiryDate: "Date d'expiration de la pièce d'identité",
    nationality: "Nationalité",
    nationalityPlaceholder: "Saisissez votre nationalité",
  },
};

export default function Identification({
  formData,
  setFormData,
}: IdentificationProps) {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
        {/* ID Type */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.idType} <span className="text-red-600">*</span>
          </label>

          <select
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{t.selectIdType}</option>
            <option value="Passport">{t.passport}</option>
            <option value="National ID">{t.nationalId}</option>
            <option value="Driver's License">{t.driversLicense}</option>
            <option value="Residence Permit">{t.residencePermit}</option>
          </select>
        </div>

        {/* ID Number */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.idNumber} <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder={t.idNumberPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Expiry Date */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.expiryDate} <span className="text-red-600">*</span>
          </label>

          <input
            type="date"
            name="idExpiryDate"
            value={formData.idExpiryDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Nationality */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.nationality} <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder={t.nationalityPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </section>
  );
}