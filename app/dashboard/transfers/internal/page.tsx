"use client";

import { useEffect, useState } from "react";
import { ArrowLeftRight, CheckCircle } from "lucide-react";
import {
  verifyRecipient,
  transferMoney,
} from "@/app/actions/internal-transfer";
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
    recipientAccount: string;
    accountPlaceholder: string;
    recipientVerified: string;
    accountNumber: string;
    amount: string;
    descriptionOptional: string;
    descriptionPlaceholder: string;
    verifying: string;
    transferMoney: string;
    verifyRecipient: string;
    enterAccountNumber: string;
  }
> = {
  en: {
    title: "Internal Bank Transfer",
    description:
      "Send money instantly to another Universal Standard Bank account.",
    recipientAccount: "Recipient Account Number",
    accountPlaceholder: "Enter account number",
    recipientVerified: "Recipient Verified",
    accountNumber: "Account Number",
    amount: "Amount",
    descriptionOptional: "Description (Optional)",
    descriptionPlaceholder: "What's this transfer for?",
    verifying: "Verifying...",
    transferMoney: "Transfer Money",
    verifyRecipient: "Verify Recipient",
    enterAccountNumber: "Please enter an account number.",
  },

  de: {
    title: "Interne Banküberweisung",
    description:
      "Senden Sie sofort Geld an ein anderes Konto der Universal Standard Bank.",
    recipientAccount: "Kontonummer des Empfängers",
    accountPlaceholder: "Kontonummer eingeben",
    recipientVerified: "Empfänger bestätigt",
    accountNumber: "Kontonummer",
    amount: "Betrag",
    descriptionOptional: "Beschreibung (Optional)",
    descriptionPlaceholder:
      "Wofür ist diese Überweisung bestimmt?",
    verifying: "Wird überprüft...",
    transferMoney: "Geld überweisen",
    verifyRecipient: "Empfänger überprüfen",
    enterAccountNumber: "Bitte geben Sie eine Kontonummer ein.",
  },

  fr: {
    title: "Virement bancaire interne",
    description:
      "Envoyez instantanément de l'argent vers un autre compte Universal Standard Bank.",
    recipientAccount: "Numéro de compte du bénéficiaire",
    accountPlaceholder: "Saisissez le numéro de compte",
    recipientVerified: "Bénéficiaire vérifié",
    accountNumber: "Numéro de compte",
    amount: "Montant",
    descriptionOptional: "Description (Facultatif)",
    descriptionPlaceholder:
      "Quel est le motif de ce virement ?",
    verifying: "Vérification...",
    transferMoney: "Transférer de l'argent",
    verifyRecipient: "Vérifier le bénéficiaire",
    enterAccountNumber:
      "Veuillez saisir un numéro de compte.",
  },
};

export default function InternalTransferPage() {
  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

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

  async function handleVerifyRecipient() {
    if (!accountNumber.trim()) {
      alert(t.enterAccountNumber);
      return;
    }

    setLoading(true);

    const result = await verifyRecipient(accountNumber);

    setLoading(false);

    if (!result.success || !result.customer) {
      setRecipientName("");
      setVerified(false);
      alert(result.message);
      return;
    }

    setRecipientName(result.customer.fullName);
    setVerified(true);
  }

  async function handleTransfer() {
    if (!verified) return;

    const result = await transferMoney(
      accountNumber,
      Number(amount),
      description
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);

    setAccountNumber("");
    setRecipientName("");
    setAmount("");
    setDescription("");
    setVerified(false);
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}

      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
          <ArrowLeftRight
            className="text-white"
            size={30}
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            {t.title}
          </h1>

          <p className="text-slate-500 mt-2">
            {t.description}
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
        {/* Account Number */}

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t.recipientAccount}
          </label>

          <input
            type="text"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              setVerified(false);
              setRecipientName("");
            }}
            placeholder={t.accountPlaceholder}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Recipient */}

        {verified && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4">
            <CheckCircle
              className="text-green-600 mt-1"
              size={28}
            />

            <div>
              <p className="font-semibold text-green-700">
                {t.recipientVerified}
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {recipientName}
              </h3>

              <p className="text-slate-500 mt-1">
                {t.accountNumber}: {accountNumber}
              </p>
            </div>
          </div>
        )}

        {/* Amount */}

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t.amount}
          </label>

          <input
            type="number"
            value={amount}
            disabled={!verified}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
          />
        </div>

        {/* Description */}

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t.descriptionOptional}
          </label>

          <textarea
            rows={4}
            value={description}
            disabled={!verified}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.descriptionPlaceholder}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
          />
        </div>

        {/* Button */}

        <button
          onClick={
            verified
              ? handleTransfer
              : handleVerifyRecipient
          }
          disabled={loading}
          className={`w-full rounded-xl py-4 font-semibold transition ${
            verified
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading
            ? t.verifying
            : verified
            ? t.transferMoney
            : t.verifyRecipient}
        </button>
      </div>
    </div>
  );
}