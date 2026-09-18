"use client";

import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type AccountInformationProps = {
  formData: {
    accountType: string;
    preferredCurrency: string;
    occupation: string;
    employer: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const translations = {
  en: {
    title: "Account Information",
    description:
      "Select the type of account you would like to open and your preferred account currency.",
    accountType: "Account Type",
    selectAccountType: "Select Account Type",
    savings: "Savings Account",
    current: "Current Account",
    business: "Business Account",
    fixedDeposit: "Fixed Deposit Account",
    currency: "Preferred Currency",
    selectCurrency: "Select Currency",
    occupation: "Occupation",
    occupationPlaceholder: "Enter your occupation",
    employer: "Employer / Business Name",
    employerPlaceholder: "Employer or business name",
    currencies: {
      USD: "USD - United States Dollar ($)",
      EUR: "EUR - Euro (€)",
      GBP: "GBP - British Pound (£)",
      CHF: "CHF - Swiss Franc (CHF)",
      CAD: "CAD - Canadian Dollar (C$)",
      AUD: "AUD - Australian Dollar (A$)",
      NZD: "NZD - New Zealand Dollar (NZ$)",
      JPY: "JPY - Japanese Yen (¥)",
      CNY: "CNY - Chinese Yuan (¥)",
      SGD: "SGD - Singapore Dollar (S$)",
      HKD: "HKD - Hong Kong Dollar (HK$)",
      AED: "AED - UAE Dirham (د.إ)",
      SAR: "SAR - Saudi Riyal (﷼)",
      ZAR: "ZAR - South African Rand (R)",
      NGN: "NGN - Nigerian Naira (₦)",
      KES: "KES - Kenyan Shilling (KSh)",
      GHS: "GHS - Ghana Cedi (₵)",
    },
  },

  de: {
    title: "Kontoinformationen",
    description:
      "Wählen Sie die Art des Kontos, das Sie eröffnen möchten, und Ihre bevorzugte Kontowährung.",
    accountType: "Kontoart",
    selectAccountType: "Kontoart auswählen",
    savings: "Sparkonto",
    current: "Girokonto",
    business: "Geschäftskonto",
    fixedDeposit: "Festgeldkonto",
    currency: "Bevorzugte Währung",
    selectCurrency: "Währung auswählen",
    occupation: "Beruf",
    occupationPlaceholder: "Geben Sie Ihren Beruf ein",
    employer: "Arbeitgeber / Firmenname",
    employerPlaceholder: "Arbeitgeber oder Firmenname",
    currencies: {
      USD: "USD - US-Dollar ($)",
      EUR: "EUR - Euro (€)",
      GBP: "GBP - Britisches Pfund (£)",
      CHF: "CHF - Schweizer Franken (CHF)",
      CAD: "CAD - Kanadischer Dollar (C$)",
      AUD: "AUD - Australischer Dollar (A$)",
      NZD: "NZD - Neuseeländischer Dollar (NZ$)",
      JPY: "JPY - Japanischer Yen (¥)",
      CNY: "CNY - Chinesischer Yuan (¥)",
      SGD: "SGD - Singapur-Dollar (S$)",
      HKD: "HKD - Hongkong-Dollar (HK$)",
      AED: "AED - VAE-Dirham (د.إ)",
      SAR: "SAR - Saudi-Riyal (﷼)",
      ZAR: "ZAR - Südafrikanischer Rand (R)",
      NGN: "NGN - Nigerianischer Naira (₦)",
      KES: "KES - Kenianischer Schilling (KSh)",
      GHS: "GHS - Ghanaischer Cedi (₵)",
    },
  },

  fr: {
    title: "Informations sur le compte",
    description:
      "Sélectionnez le type de compte que vous souhaitez ouvrir ainsi que votre devise préférée.",
    accountType: "Type de compte",
    selectAccountType: "Sélectionnez le type de compte",
    savings: "Compte d'épargne",
    current: "Compte courant",
    business: "Compte professionnel",
    fixedDeposit: "Compte de dépôt à terme",
    currency: "Devise préférée",
    selectCurrency: "Sélectionnez la devise",
    occupation: "Profession",
    occupationPlaceholder: "Saisissez votre profession",
    employer: "Employeur / Nom de l'entreprise",
    employerPlaceholder: "Employeur ou nom de l'entreprise",
    currencies: {
      USD: "USD - Dollar américain ($)",
      EUR: "EUR - Euro (€)",
      GBP: "GBP - Livre sterling (£)",
      CHF: "CHF - Franc suisse (CHF)",
      CAD: "CAD - Dollar canadien (C$)",
      AUD: "AUD - Dollar australien (A$)",
      NZD: "NZD - Dollar néo-zélandais (NZ$)",
      JPY: "JPY - Yen japonais (¥)",
      CNY: "CNY - Yuan chinois (¥)",
      SGD: "SGD - Dollar de Singapour (S$)",
      HKD: "HKD - Dollar de Hong Kong (HK$)",
      AED: "AED - Dirham des Émirats arabes unis (د.إ)",
      SAR: "SAR - Riyal saoudien (﷼)",
      ZAR: "ZAR - Rand sud-africain (R)",
      NGN: "NGN - Naira nigérian (₦)",
      KES: "KES - Shilling kényan (KSh)",
      GHS: "GHS - Cedi ghanéen (₵)",
    },
  },
};

export default function AccountInformation({
  formData,
  setFormData,
}: AccountInformationProps) {
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
        {/* Account Type */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.accountType} <span className="text-red-600">*</span>
          </label>

          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{t.selectAccountType}</option>
            <option value="Savings Account">{t.savings}</option>
            <option value="Current Account">{t.current}</option>
            <option value="Business Account">{t.business}</option>
            <option value="Fixed Deposit Account">{t.fixedDeposit}</option>
          </select>
        </div>

        {/* Preferred Currency */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.currency} <span className="text-red-600">*</span>
          </label>

          <select
            name="preferredCurrency"
            value={formData.preferredCurrency}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{t.selectCurrency}</option>

            <option value="USD">{t.currencies.USD}</option>
            <option value="EUR">{t.currencies.EUR}</option>
            <option value="GBP">{t.currencies.GBP}</option>
            <option value="CHF">{t.currencies.CHF}</option>
            <option value="CAD">{t.currencies.CAD}</option>
            <option value="AUD">{t.currencies.AUD}</option>
            <option value="NZD">{t.currencies.NZD}</option>
            <option value="JPY">{t.currencies.JPY}</option>
            <option value="CNY">{t.currencies.CNY}</option>
            <option value="SGD">{t.currencies.SGD}</option>
            <option value="HKD">{t.currencies.HKD}</option>
            <option value="AED">{t.currencies.AED}</option>
            <option value="SAR">{t.currencies.SAR}</option>
            <option value="ZAR">{t.currencies.ZAR}</option>
            <option value="NGN">{t.currencies.NGN}</option>
            <option value="KES">{t.currencies.KES}</option>
            <option value="GHS">{t.currencies.GHS}</option>
          </select>
        </div>

        {/* Occupation */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.occupation} <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder={t.occupationPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Employer */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.employer}
          </label>

          <input
            type="text"
            name="employer"
            value={formData.employer}
            onChange={handleChange}
            placeholder={t.employerPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </section>
  );
}