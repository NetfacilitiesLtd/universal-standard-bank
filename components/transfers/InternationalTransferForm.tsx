"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations: Record<
  SupportedLanguage,
  {
    recipientFullName: string;
    recipientAddress: string;
    bankName: string;
    bankAddress: string;
    country: string;
    swiftCode: string;
    accountNumber: string;
    currency: string;
    selectCurrency: string;
    amount: string;
    purpose: string;
    descriptionOptional: string;
    submitting: string;
    continue: string;
    unableToSubmit: string;
  }
> = {
  en: {
    recipientFullName: "Recipient Full Name",
    recipientAddress: "Recipient Address",
    bankName: "Bank Name",
    bankAddress: "Bank Address",
    country: "Country",
    swiftCode: "SWIFT / BIC Code",
    accountNumber: "Account Number",
    currency: "Currency",
    selectCurrency: "Select Currency",
    amount: "Amount",
    purpose: "Purpose",
    descriptionOptional: "Description (Optional)",
    submitting: "Submitting...",
    continue: "Continue",
    unableToSubmit: "Unable to submit transfer.",
  },

  de: {
    recipientFullName: "Vollständiger Name des Empfängers",
    recipientAddress: "Adresse des Empfängers",
    bankName: "Name der Bank",
    bankAddress: "Adresse der Bank",
    country: "Land",
    swiftCode: "SWIFT / BIC-Code",
    accountNumber: "Kontonummer",
    currency: "Währung",
    selectCurrency: "Währung auswählen",
    amount: "Betrag",
    purpose: "Verwendungszweck",
    descriptionOptional: "Beschreibung (Optional)",
    submitting: "Wird übermittelt...",
    continue: "Weiter",
    unableToSubmit: "Überweisung konnte nicht übermittelt werden.",
  },

  fr: {
    recipientFullName: "Nom complet du bénéficiaire",
    recipientAddress: "Adresse du bénéficiaire",
    bankName: "Nom de la banque",
    bankAddress: "Adresse de la banque",
    country: "Pays",
    swiftCode: "Code SWIFT / BIC",
    accountNumber: "Numéro de compte",
    currency: "Devise",
    selectCurrency: "Sélectionner la devise",
    amount: "Montant",
    purpose: "Motif",
    descriptionOptional: "Description (Facultatif)",
    submitting: "Envoi en cours...",
    continue: "Continuer",
    unableToSubmit: "Impossible de soumettre le virement.",
  },
};

export default function InternationalTransferForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAddress: "",
    bankName: "",
    bankAddress: "",
    country: "",
    swiftCode: "",
    accountNumber: "",
    currency: "",
    amount: "",
    purpose: "",
    description: "",
  });

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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "/api/international-transfers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setFormData({
          recipientName: "",
          recipientAddress: "",
          bankName: "",
          bankAddress: "",
          country: "",
          swiftCode: "",
          accountNumber: "",
          currency: "",
          amount: "",
          purpose: "",
          description: "",
        });

        router.push("/dashboard/transfers/code");
        return;
      }

      alert(result.message);
    } catch (error) {
      console.error(error);
      alert(t.unableToSubmit);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
    >
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-semibold">
            {t.recipientFullName}
          </label>

          <input
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            type="text"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.recipientAddress}
          </label>

          <input
            name="recipientAddress"
            value={formData.recipientAddress}
            onChange={handleChange}
            type="text"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.bankName}
          </label>

          <input
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            type="text"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.bankAddress}
          </label>

          <input
            name="bankAddress"
            value={formData.bankAddress}
            onChange={handleChange}
            type="text"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.country}
          </label>

          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            type="text"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.swiftCode}
          </label>

          <input
            name="swiftCode"
            value={formData.swiftCode}
            onChange={handleChange}
            type="text"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.accountNumber}
          </label>

          <input
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            type="text"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.currency}
          </label>

          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          >
            <option value="">
              {t.selectCurrency}
            </option>

            <option value="USD">
              USD - United States Dollar ($)
            </option>

            <option value="EUR">
              EUR - Euro (€)
            </option>

            <option value="GBP">
              GBP - British Pound (£)
            </option>

            <option value="CHF">
              CHF - Swiss Franc (CHF)
            </option>

            <option value="CAD">
              CAD - Canadian Dollar (C$)
            </option>

            <option value="AUD">
              AUD - Australian Dollar (A$)
            </option>

            <option value="NZD">
              NZD - New Zealand Dollar (NZ$)
            </option>

            <option value="JPY">
              JPY - Japanese Yen (¥)
            </option>

            <option value="CNY">
              CNY - Chinese Yuan (¥)
            </option>

            <option value="SGD">
              SGD - Singapore Dollar (S$)
            </option>

            <option value="HKD">
              HKD - Hong Kong Dollar (HK$)
            </option>

            <option value="AED">
              AED - UAE Dirham (د.إ)
            </option>

            <option value="SAR">
              SAR - Saudi Riyal (﷼)
            </option>

            <option value="ZAR">
              ZAR - South African Rand (R)
            </option>

            <option value="NGN">
              NGN - Nigerian Naira (₦)
            </option>

            <option value="KES">
              KES - Kenyan Shilling (KSh)
            </option>

            <option value="GHS">
              GHS - Ghana Cedi (₵)
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.amount}
          </label>

          <input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="number"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {t.purpose}
          </label>

          <input
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            type="text"
            className="w-full border border-slate-300 rounded-xl p-4"
            required
          />
        </div>

      </div>

      <div className="mt-6">

        <label className="block mb-2 font-semibold">
          {t.descriptionOptional}
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full border border-slate-300 rounded-xl p-4"
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-3 transition"
      >
        <Send size={20} />

        {loading ? t.submitting : t.continue}
      </button>
    </form>
  );
}