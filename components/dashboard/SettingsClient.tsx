"use client";

import { useEffect, useState } from "react";

import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type Customer = {
  accountNumber: string;
  application: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountType: string;
    preferredCurrency: string;
  };
};

type ServerAction = (formData: FormData) => void | Promise<void>;

type Props = {
  customer: Customer;
  updatePassword: ServerAction;
  updatePin: ServerAction;
  success?: string;
  error?: string;
};

const translations = {
  en: {
    title: "Settings",
    subtitle:
      "Manage your account security and view your profile information.",
    passwordSuccess: "Password updated successfully.",
    pinSuccess: "PIN updated successfully.",
    wrongPassword: "Current password is incorrect.",
    passwordMismatch: "New passwords do not match.",
    wrongPin: "Current PIN is incorrect.",
    pinMismatch: "New PINs do not match.",
    invalidPin: "PIN must be exactly 6 digits.",
    passport: "Passport",
    fullName: "Full Name",
    accountNumber: "Account Number",
    emailAddress: "Email Address",
    updateEmail:
      "To update your email address, please contact the bank.",
    phoneNumber: "Phone Number",
    updatePhone:
      "To update your phone number, please contact the bank.",
    accountType: "Account Type",
    preferredCurrency: "Preferred Currency",
    changePassword: "Change Password",
    passwordDescription:
      "Update your online banking password.",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    updatePassword: "Update Password",
    changePin: "Change PIN",
    pinDescription: "Update your transaction PIN.",
    currentPin: "Current PIN",
    newPin: "New PIN",
    confirmNewPin: "Confirm New PIN",
    updatePin: "Update PIN",
  },

  de: {
    title: "Einstellungen",
    subtitle:
      "Verwalten Sie Ihre Kontosicherheit und sehen Sie Ihre Profilinformationen ein.",
    passwordSuccess: "Passwort erfolgreich aktualisiert.",
    pinSuccess: "PIN erfolgreich aktualisiert.",
    wrongPassword: "Das aktuelle Passwort ist falsch.",
    passwordMismatch: "Die neuen Passwörter stimmen nicht überein.",
    wrongPin: "Die aktuelle PIN ist falsch.",
    pinMismatch: "Die neuen PINs stimmen nicht überein.",
    invalidPin: "Die PIN muss genau 6 Ziffern enthalten.",
    passport: "Passfoto",
    fullName: "Vollständiger Name",
    accountNumber: "Kontonummer",
    emailAddress: "E-Mail-Adresse",
    updateEmail:
      "Um Ihre E-Mail-Adresse zu aktualisieren, wenden Sie sich bitte an die Bank.",
    phoneNumber: "Telefonnummer",
    updatePhone:
      "Um Ihre Telefonnummer zu aktualisieren, wenden Sie sich bitte an die Bank.",
    accountType: "Kontotyp",
    preferredCurrency: "Bevorzugte Währung",
    changePassword: "Passwort ändern",
    passwordDescription:
      "Aktualisieren Sie Ihr Online-Banking-Passwort.",
    currentPassword: "Aktuelles Passwort",
    newPassword: "Neues Passwort",
    confirmNewPassword: "Neues Passwort bestätigen",
    updatePassword: "Passwort aktualisieren",
    changePin: "PIN ändern",
    pinDescription: "Aktualisieren Sie Ihre Transaktions-PIN.",
    currentPin: "Aktuelle PIN",
    newPin: "Neue PIN",
    confirmNewPin: "Neue PIN bestätigen",
    updatePin: "PIN aktualisieren",
  },

  fr: {
    title: "Paramètres",
    subtitle:
      "Gérez la sécurité de votre compte et consultez les informations de votre profil.",
    passwordSuccess: "Mot de passe mis à jour avec succès.",
    pinSuccess: "PIN mise à jour avec succès.",
    wrongPassword: "Le mot de passe actuel est incorrect.",
    passwordMismatch:
      "Les nouveaux mots de passe ne correspondent pas.",
    wrongPin: "La PIN actuelle est incorrecte.",
    pinMismatch: "Les nouvelles PIN ne correspondent pas.",
    invalidPin: "La PIN doit comporter exactement 6 chiffres.",
    passport: "Passeport",
    fullName: "Nom complet",
    accountNumber: "Numéro de compte",
    emailAddress: "Adresse e-mail",
    updateEmail:
      "Pour mettre à jour votre adresse e-mail, veuillez contacter la banque.",
    phoneNumber: "Numéro de téléphone",
    updatePhone:
      "Pour mettre à jour votre numéro de téléphone, veuillez contacter la banque.",
    accountType: "Type de compte",
    preferredCurrency: "Devise préférée",
    changePassword: "Modifier le mot de passe",
    passwordDescription:
      "Mettez à jour votre mot de passe bancaire en ligne.",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmNewPassword: "Confirmer le nouveau mot de passe",
    updatePassword: "Mettre à jour le mot de passe",
    changePin: "Modifier la PIN",
    pinDescription: "Mettez à jour votre PIN de transaction.",
    currentPin: "PIN actuelle",
    newPin: "Nouvelle PIN",
    confirmNewPin: "Confirmer la nouvelle PIN",
    updatePin: "Mettre à jour la PIN",
  },
};

export default function SettingsClient({
  customer,
  updatePassword,
  updatePin,
  success,
  error,
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {t.title}
        </h1>

        <p className="text-slate-500 mt-2">
          {t.subtitle}
        </p>

        {success === "password" && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700 font-medium">
            ✅ {t.passwordSuccess}
          </div>
        )}

        {success === "pin" && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700 font-medium">
            ✅ {t.pinSuccess}
          </div>
        )}

        {error === "wrong-password" && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
            ❌ {t.wrongPassword}
          </div>
        )}

        {error === "password-mismatch" && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
            ❌ {t.passwordMismatch}
          </div>
        )}

        {error === "wrong-pin" && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
            ❌ {t.wrongPin}
          </div>
        )}

        {error === "pin-mismatch" && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
            ❌ {t.pinMismatch}
          </div>
        )}

        {error === "invalid-pin" && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-medium">
            ❌ {t.invalidPin}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex justify-center">
            <img
              src="/api/customer/passport-photo"
              alt={t.passport}
              className="w-40 h-40 rounded-full object-cover border-4 border-red-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 flex-1">
            <div>
              <p className="text-sm text-slate-500">
                {t.fullName}
              </p>

              <p className="font-semibold text-lg">
                {customer.application.firstName}{" "}
                {customer.application.lastName}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {t.accountNumber}
              </p>

              <p className="font-semibold">
                {customer.accountNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {t.emailAddress}
              </p>

              <p className="font-semibold">
                {customer.application.email}
              </p>

              <p className="text-xs text-red-600 mt-1">
                {t.updateEmail}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {t.phoneNumber}
              </p>

              <p className="font-semibold">
                {customer.application.phoneNumber}
              </p>

              <p className="text-xs text-red-600 mt-1">
                {t.updatePhone}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {t.accountType}
              </p>

              <p className="font-semibold">
                {customer.application.accountType}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {t.preferredCurrency}
              </p>

              <p className="font-semibold">
                {customer.application.preferredCurrency}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {t.changePassword}
          </h2>

          <p className="text-slate-500 mb-8">
            {t.passwordDescription}
          </p>

          <form
            action={updatePassword}
            className="grid gap-6 max-w-xl"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                {t.currentPassword}
              </label>

              <input
                name="currentPassword"
                type="password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.newPassword}
              </label>

              <input
                name="newPassword"
                type="password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.confirmNewPassword}
              </label>

              <input
                name="confirmPassword"
                type="password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-3 rounded-xl font-semibold w-fit transition"
            >
              {t.updatePassword}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {t.changePin}
          </h2>

          <p className="text-slate-500 mb-8">
            {t.pinDescription}
          </p>

          <form
            action={updatePin}
            className="grid gap-6 max-w-xl"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                {t.currentPin}
              </label>

              <input
                type="password"
                name="currentPin"
                maxLength={6}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.newPin}
              </label>

              <input
                type="password"
                name="newPin"
                maxLength={6}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.confirmNewPin}
              </label>

              <input
                type="password"
                name="confirmPin"
                maxLength={6}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold w-fit"
            >
              {t.updatePin}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}