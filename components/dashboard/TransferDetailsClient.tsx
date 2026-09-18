"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type Transfer = {
  id: string;
  recipientName: string;
  bankName: string;
  currency: string;
  amount: number;
  status: string;
};

type Props = {
  transfer: Transfer;
  verifyTransferCode: (formData: FormData) => void | Promise<void>;
};

const translations = {
  en: {
    title: "International Transfer",
    notFound: "Transfer not found.",
    recipient: "Recipient",
    bank: "Bank",
    amount: "Amount",
    status: "Status",
    pendingMessage:
      "Please enter the transfer code provided to you by the bank.",
    enterCode: "Enter Transfer Code",
    verifyCode: "Verify Code",
    codeGenerated: "Transfer Code Generated",
    codeGeneratedMessage:
      "Please enter the transfer code provided to you by the bank to continue with your transfer.",
    codeVerified: "Transfer Code Verified",
    processingMessage:
      "Your transfer is now being processed by Universal Standard Bank.",
    returnDashboard: "Return to Dashboard",
    completed: "Transfer Completed",
    completedMessage:
      "Your international transfer has been completed successfully.",
    failed: "Transfer Failed",
    failedMessage:
      "Unfortunately, your international transfer could not be completed.",
    assistance:
      "Please contact Universal Standard Bank for further assistance.",
  },

  de: {
    title: "Internationale Überweisung",
    notFound: "Überweisung nicht gefunden.",
    recipient: "Empfänger",
    bank: "Bank",
    amount: "Betrag",
    status: "Status",
    pendingMessage:
      "Bitte geben Sie den von der Bank bereitgestellten Überweisungscode ein.",
    enterCode: "Überweisungscode eingeben",
    verifyCode: "Code bestätigen",
    codeGenerated: "Überweisungscode erstellt",
    codeGeneratedMessage:
      "Bitte geben Sie den von der Bank bereitgestellten Überweisungscode ein, um mit Ihrer Überweisung fortzufahren.",
    codeVerified: "Überweisungscode bestätigt",
    processingMessage:
      "Ihre Überweisung wird jetzt von der Universal Standard Bank bearbeitet.",
    returnDashboard: "Zum Dashboard zurückkehren",
    completed: "Überweisung abgeschlossen",
    completedMessage:
      "Ihre internationale Überweisung wurde erfolgreich abgeschlossen.",
    failed: "Überweisung fehlgeschlagen",
    failedMessage:
      "Leider konnte Ihre internationale Überweisung nicht abgeschlossen werden.",
    assistance:
      "Bitte wenden Sie sich für weitere Unterstützung an die Universal Standard Bank.",
  },

  fr: {
    title: "Virement international",
    notFound: "Virement introuvable.",
    recipient: "Bénéficiaire",
    bank: "Banque",
    amount: "Montant",
    status: "Statut",
    pendingMessage:
      "Veuillez saisir le code de virement fourni par la banque.",
    enterCode: "Saisir le code de virement",
    verifyCode: "Vérifier le code",
    codeGenerated: "Code de virement généré",
    codeGeneratedMessage:
      "Veuillez saisir le code de virement fourni par la banque pour continuer votre virement.",
    codeVerified: "Code de virement vérifié",
    processingMessage:
      "Votre virement est maintenant traité par Universal Standard Bank.",
    returnDashboard: "Retour au tableau de bord",
    completed: "Virement terminé",
    completedMessage:
      "Votre virement international a été effectué avec succès.",
    failed: "Échec du virement",
    failedMessage:
      "Malheureusement, votre virement international n'a pas pu être effectué.",
    assistance:
      "Veuillez contacter Universal Standard Bank pour obtenir de l'aide.",
  },
};

export default function TransferDetailsClient({
  transfer,
  verifyTransferCode,
}: Props) {
  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

  useEffect(() => {
    const savedLanguage =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith(`${LANGUAGE_COOKIE}=`)
        )
        ?.split("=")[1] as SupportedLanguage | undefined;

    if (
      savedLanguage &&
      SUPPORTED_LANGUAGES.includes(savedLanguage)
    ) {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = () => {
      const currentLanguage =
        document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith(`${LANGUAGE_COOKIE}=`)
          )
          ?.split("=")[1] as SupportedLanguage | undefined;

      if (
        currentLanguage &&
        SUPPORTED_LANGUAGES.includes(currentLanguage)
      ) {
        setLanguage(currentLanguage);
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

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8">
          {t.title}
        </h1>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-500">
              {t.recipient}
            </p>

            <p className="font-semibold">
              {transfer.recipientName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              {t.bank}
            </p>

            <p className="font-semibold">
              {transfer.bankName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              {t.amount}
            </p>

            <p className="font-semibold">
              {transfer.currency}{" "}
              {transfer.amount.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              {t.status}
            </p>

            <p className="font-semibold">
              {transfer.status}
            </p>
          </div>

          {/* PENDING TRANSFER CODE */}
          {transfer.status === "Pending Transfer Code" && (
            <div className="border-t pt-6">
              <p className="text-slate-600 mb-4">
                {t.pendingMessage}
              </p>

              <form
                action={verifyTransferCode}
                className="space-y-4"
              >
                <input
                  type="hidden"
                  name="transferId"
                  value={transfer.id}
                />

                <input
                  type="text"
                  name="code"
                  placeholder={t.enterCode}
                  className="w-full border rounded-xl px-4 py-3"
                  required
                />

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                >
                  {t.verifyCode}
                </button>
              </form>
            </div>
          )}

          {/* CODE GENERATED */}
          {transfer.status === "Code Generated" && (
            <div className="border-t pt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-blue-700">
                  {t.codeGenerated}
                </h2>

                <p className="mt-3 text-slate-700">
                  {t.codeGeneratedMessage}
                </p>

                <form
                  action={verifyTransferCode}
                  className="space-y-4 mt-5"
                >
                  <input
                    type="hidden"
                    name="transferId"
                    value={transfer.id}
                  />

                  <input
                    type="text"
                    name="code"
                    placeholder={t.enterCode}
                    className="w-full border rounded-xl px-4 py-3"
                    required
                  />

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                  >
                    {t.verifyCode}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* PROCESSING */}
          {transfer.status === "Processing" && (
            <div className="border-t pt-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-green-700">
                  ✅ {t.codeVerified}
                </h2>

                <p className="mt-3 text-slate-700">
                  {t.processingMessage}
                </p>

                <Link
                  href="/dashboard"
                  className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  {t.returnDashboard}
                </Link>
              </div>
            </div>
          )}

          {/* COMPLETED */}
          {transfer.status === "Completed" && (
            <div className="border-t pt-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-green-700">
                  ✅ {t.completed}
                </h2>

                <p className="mt-3 text-slate-700">
                  {t.completedMessage}
                </p>

                <Link
                  href="/dashboard"
                  className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  {t.returnDashboard}
                </Link>
              </div>
            </div>
          )}

          {/* FAILED */}
          {transfer.status === "Failed" && (
            <div className="border-t pt-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-red-700">
                  ❌ {t.failed}
                </h2>

                <p className="mt-3 text-slate-700">
                  {t.failedMessage}
                </p>

                <p className="mt-2 text-slate-600">
                  {t.assistance}
                </p>

                <Link
                  href="/dashboard"
                  className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  {t.returnDashboard}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}