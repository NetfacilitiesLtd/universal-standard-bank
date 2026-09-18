"use client";

import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type ResidentialAddressProps = {
  formData: {
    residentialAddress: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const translations = {
  en: {
    title: "Residential Address",
    description: "Tell us where you currently reside.",
    residentialAddress: "Residential Address",
    addressPlaceholder: "House Number, Street Name",
    country: "Country",
    countryPlaceholder: "Enter your country",
    state: "State / Province",
    statePlaceholder: "State or Province",
    city: "City",
    cityPlaceholder: "City",
    postalCode: "Postal Code",
    postalPlaceholder: "Postal Code",
  },

  de: {
    title: "Wohnadresse",
    description: "Geben Sie an, wo Sie derzeit wohnen.",
    residentialAddress: "Wohnadresse",
    addressPlaceholder: "Hausnummer, Straßenname",
    country: "Land",
    countryPlaceholder: "Geben Sie Ihr Land ein",
    state: "Bundesland / Provinz",
    statePlaceholder: "Bundesland oder Provinz",
    city: "Stadt",
    cityPlaceholder: "Stadt",
    postalCode: "Postleitzahl",
    postalPlaceholder: "Postleitzahl",
  },

  fr: {
    title: "Adresse résidentielle",
    description: "Indiquez-nous où vous résidez actuellement.",
    residentialAddress: "Adresse résidentielle",
    addressPlaceholder: "Numéro de maison, nom de rue",
    country: "Pays",
    countryPlaceholder: "Saisissez votre pays",
    state: "État / Province",
    statePlaceholder: "État ou province",
    city: "Ville",
    cityPlaceholder: "Ville",
    postalCode: "Code postal",
    postalPlaceholder: "Code postal",
  },
};

export default function ResidentialAddress({
  formData,
  setFormData,
}: ResidentialAddressProps) {
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
    e: React.ChangeEvent<HTMLInputElement>
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
        {/* Residential Address */}

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.residentialAddress}{" "}
            <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            placeholder={t.addressPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Country */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.country} <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder={t.countryPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* State */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.state} <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder={t.statePlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* City */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.city} <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder={t.cityPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Postal Code */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.postalCode}
          </label>

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder={t.postalPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </section>
  );
}