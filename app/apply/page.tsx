"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react";
import type { ApplicationFormData } from "@/types/application";

import PersonalInformation from "@/components/application/PersonalInformation";
import ResidentialAddress from "@/components/application/ResidentialAddress";
import Identification from "@/components/application/Identification";
import AccountInformation from "@/components/application/AccountInformation";
import OnlineBankingCredentials from "@/components/application/OnlineBankingCredentials";
import SupportingDocuments from "@/components/application/SupportingDocuments";
import Declaration from "@/components/application/Declaration";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations = {
  en: {
    backHome: "Back to Home",
    title: "Open a Universal Standard Bank Account",
    description:
      "Complete the application below. Our banking team will review your application and supporting documents before your account is created.",

    steps: [
      "1. Personal Information",
      "2. Residential Address",
      "3. Identification",
      "4. Account Information",
      "5. Online Banking",
      "6. Documents",
      "7. Declaration",
    ],

    uploadFailed: "Failed to upload documents.",
    submitFailed: "Failed to submit application.",
  },

  de: {
    backHome: "Zurück zur Startseite",
    title: "Eröffnen Sie ein Konto bei der Universal Standard Bank",
    description:
      "Füllen Sie den folgenden Antrag aus. Unser Bankteam wird Ihren Antrag und die erforderlichen Dokumente prüfen, bevor Ihr Konto eröffnet wird.",

    steps: [
      "1. Persönliche Informationen",
      "2. Wohnadresse",
      "3. Identifikation",
      "4. Kontoinformationen",
      "5. Online-Banking",
      "6. Dokumente",
      "7. Erklärung",
    ],

    uploadFailed: "Das Hochladen der Dokumente ist fehlgeschlagen.",
    submitFailed: "Der Antrag konnte nicht übermittelt werden.",
  },

  fr: {
    backHome: "Retour à l'accueil",
    title: "Ouvrir un compte Universal Standard Bank",
    description:
      "Remplissez le formulaire ci-dessous. Notre équipe bancaire examinera votre demande et les documents justificatifs avant la création de votre compte.",

    steps: [
      "1. Informations personnelles",
      "2. Adresse résidentielle",
      "3. Identification",
      "4. Informations sur le compte",
      "5. Banque en ligne",
      "6. Documents",
      "7. Déclaration",
    ],

    uploadFailed: "Échec du téléchargement des documents.",
    submitFailed: "Échec de l'envoi de la demande.",
  },
};

export default function ApplyPage() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    email: "",
    phoneNumber: "",

    residentialAddress: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",

    idType: "",
    idNumber: "",
    idExpiryDate: "",

    accountType: "",
    preferredCurrency: "",
    occupation: "",
    employer: "",

    password: "",
    pin: "",

    passportPhoto: null,
    governmentId: null,

    agreedToTerms: false,
  });

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const uploadData = new FormData();

      if (formData.passportPhoto) {
        uploadData.append("passportPhoto", formData.passportPhoto);
      }

      if (formData.governmentId) {
        uploadData.append("governmentId", formData.governmentId);
      }

      const uploadResponse = await fetch("/api/uploads", {
        method: "POST",
        body: uploadData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.success) {
        alert(uploadResult.message);
        return;
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          nationality: formData.nationality,
          email: formData.email,
          phoneNumber: formData.phoneNumber,

          residentialAddress: formData.residentialAddress,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          postalCode: formData.postalCode,

          idType: formData.idType,
          idNumber: formData.idNumber,
          idExpiryDate: formData.idExpiryDate,

          accountType: formData.accountType,
          preferredCurrency: formData.preferredCurrency,
          occupation: formData.occupation,
          employer: formData.employer,

          password: formData.password,
          pin: formData.pin,

          passportPhoto: uploadResult.passportPhoto,
          governmentId: uploadResult.governmentId,
        }),
      });

      const result = await response.json();

      alert(result.message);

      if (result.success) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      alert(t.submitFailed);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mb-8"
        >
          <ArrowLeft size={20} />
          {t.backHome}
        </Link>

        <div className="bg-gradient-to-r from-blue-900 to-red-700 rounded-3xl text-white p-10 shadow-lg">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Landmark size={34} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {t.title}
              </h1>

              <p className="mt-3 text-blue-100 max-w-3xl">
                {t.description}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-8 p-6">
          <div className="flex flex-wrap gap-3">
            {t.steps.map((step, index) => (
              <span
                key={step}
                className={
                  index === 0
                    ? "bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                    : "bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm"
                }
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <PersonalInformation
            formData={formData}
            setFormData={setFormData}
          />

          <ResidentialAddress
            formData={formData}
            setFormData={setFormData}
          />

          <Identification
            formData={formData}
            setFormData={setFormData}
          />

          <AccountInformation
            formData={formData}
            setFormData={setFormData}
          />

          <OnlineBankingCredentials
            formData={formData}
            setFormData={setFormData}
          />

          <SupportingDocuments
            formData={formData}
            setFormData={setFormData}
          />

          <Declaration
            formData={formData}
            setFormData={setFormData}
          />
        </form>
      </div>
    </main>
  );
}