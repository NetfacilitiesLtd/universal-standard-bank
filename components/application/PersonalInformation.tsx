"use client";

import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type PersonalInformationProps = {
  formData: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    email: string;
    phoneNumber: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const translations = {
  en: {
    title: "Personal Information",
    description:
      "Please enter your personal details exactly as they appear on your government-issued identification.",
    firstName: "First Name",
    firstNamePlaceholder: "Enter your first name",
    middleName: "Middle Name",
    optional: "Optional",
    lastName: "Last Name",
    lastNamePlaceholder: "Enter your last name",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    selectGender: "Select Gender",
    male: "Male",
    female: "Female",
    preferNot: "Prefer not to say",
    nationality: "Nationality",
    nationalityPlaceholder: "e.g. British",
    email: "Email Address",
    emailPlaceholder: "example@email.com",
    phone: "Phone Number",
    phonePlaceholder: "+44 XX XXXX XXXX",
  },

  de: {
    title: "Persönliche Informationen",
    description:
      "Bitte geben Sie Ihre persönlichen Daten genau so ein, wie sie auf Ihrem amtlichen Ausweisdokument angegeben sind.",
    firstName: "Vorname",
    firstNamePlaceholder: "Geben Sie Ihren Vornamen ein",
    middleName: "Zweiter Vorname",
    optional: "Optional",
    lastName: "Nachname",
    lastNamePlaceholder: "Geben Sie Ihren Nachnamen ein",
    dateOfBirth: "Geburtsdatum",
    gender: "Geschlecht",
    selectGender: "Geschlecht auswählen",
    male: "Männlich",
    female: "Weiblich",
    preferNot: "Keine Angabe",
    nationality: "Staatsangehörigkeit",
    nationalityPlaceholder: "z. B. Britisch",
    email: "E-Mail-Adresse",
    emailPlaceholder: "beispiel@email.com",
    phone: "Telefonnummer",
    phonePlaceholder: "+44 XX XXXX XXXX",
  },

  fr: {
    title: "Informations personnelles",
    description:
      "Veuillez saisir vos informations personnelles exactement telles qu'elles apparaissent sur votre pièce d'identité officielle.",
    firstName: "Prénom",
    firstNamePlaceholder: "Saisissez votre prénom",
    middleName: "Deuxième prénom",
    optional: "Facultatif",
    lastName: "Nom de famille",
    lastNamePlaceholder: "Saisissez votre nom de famille",
    dateOfBirth: "Date de naissance",
    gender: "Genre",
    selectGender: "Sélectionnez votre genre",
    male: "Homme",
    female: "Femme",
    preferNot: "Préfère ne pas répondre",
    nationality: "Nationalité",
    nationalityPlaceholder: "ex. Britannique",
    email: "Adresse e-mail",
    emailPlaceholder: "exemple@email.com",
    phone: "Numéro de téléphone",
    phonePlaceholder: "+44 XX XXXX XXXX",
  },
};

export default function PersonalInformation({
  formData,
  setFormData,
}: PersonalInformationProps) {
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
        {/* First Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.firstName} <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t.firstNamePlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Middle Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.middleName}
          </label>

          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder={t.optional}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.lastName} <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t.lastNamePlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.dateOfBirth} <span className="text-red-600">*</span>
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.gender} <span className="text-red-600">*</span>
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{t.selectGender}</option>
            <option value="Male">{t.male}</option>
            <option value="Female">{t.female}</option>
            <option value="Prefer not to say">{t.preferNot}</option>
          </select>
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

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.email} <span className="text-red-600">*</span>
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.phone} <span className="text-red-600">*</span>
          </label>

          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder={t.phonePlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </section>
  );
}