"use client";

import { useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type OnlineBankingCredentialsProps = {
  formData: {
    password: string;
    pin: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const translations = {
  en: {
    title: "Online Banking Credentials",
    description:
      "Create the credentials you will use to access your online banking after your application has been approved.",
    password: "Password",
    passwordPlaceholder: "Create a secure password",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter your password",
    pin: "6-Digit Verification PIN",
    pinPlaceholder: "Enter 6-digit PIN",
    confirmPin: "Confirm Verification PIN",
    confirmPinPlaceholder: "Confirm your 6-digit PIN",
    important: "Important:",
    securityMessage:
      "Keep your password and verification PIN secure. You will use them together with your account number to log in after your account application has been approved.",
  },

  de: {
    title: "Online-Banking-Zugangsdaten",
    description:
      "Erstellen Sie die Zugangsdaten, die Sie nach Genehmigung Ihres Antrags für den Zugriff auf Ihr Online-Banking verwenden werden.",
    password: "Passwort",
    passwordPlaceholder: "Erstellen Sie ein sicheres Passwort",
    confirmPassword: "Passwort bestätigen",
    confirmPasswordPlaceholder: "Geben Sie Ihr Passwort erneut ein",
    pin: "6-stellige Verifizierungs-PIN",
    pinPlaceholder: "6-stellige PIN eingeben",
    confirmPin: "Verifizierungs-PIN bestätigen",
    confirmPinPlaceholder: "Bestätigen Sie Ihre 6-stellige PIN",
    important: "Wichtig:",
    securityMessage:
      "Bewahren Sie Ihr Passwort und Ihre Verifizierungs-PIN sicher auf. Sie benötigen beide zusammen mit Ihrer Kontonummer, um sich nach Genehmigung Ihres Kontoantrags anzumelden.",
  },

  fr: {
    title: "Identifiants de banque en ligne",
    description:
      "Créez les identifiants que vous utiliserez pour accéder à votre banque en ligne après l'approbation de votre demande.",
    password: "Mot de passe",
    passwordPlaceholder: "Créez un mot de passe sécurisé",
    confirmPassword: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "Saisissez à nouveau votre mot de passe",
    pin: "Code PIN de vérification à 6 chiffres",
    pinPlaceholder: "Saisissez le code PIN à 6 chiffres",
    confirmPin: "Confirmer le code PIN de vérification",
    confirmPinPlaceholder: "Confirmez votre code PIN à 6 chiffres",
    important: "Important :",
    securityMessage:
      "Conservez votre mot de passe et votre code PIN de vérification en lieu sûr. Vous les utiliserez avec votre numéro de compte pour vous connecter après l'approbation de votre demande de compte.",
  },
};

export default function OnlineBankingCredentials({
  formData,
  setFormData,
}: OnlineBankingCredentialsProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

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
        {/* Password */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.password} <span className="text-red-600">*</span>
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t.passwordPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Confirm Password */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.confirmPassword} <span className="text-red-600">*</span>
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t.confirmPasswordPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Verification PIN */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.pin} <span className="text-red-600">*</span>
          </label>

          <input
            type="password"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            maxLength={6}
            placeholder={t.pinPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Confirm PIN */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.confirmPin} <span className="text-red-600">*</span>
          </label>

          <input
            type="password"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            maxLength={6}
            placeholder={t.confirmPinPlaceholder}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>{t.important}</strong> {t.securityMessage}
        </p>
      </div>
    </section>
  );
}