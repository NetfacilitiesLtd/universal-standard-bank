"use client";

import { FormEvent, useState } from "react";
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

export default function ApplyPage() {
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
    alert("Failed to submit application.");
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
          Back to Home
        </Link>

        <div className="bg-gradient-to-r from-blue-900 to-red-700 rounded-3xl text-white p-10 shadow-lg">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Landmark size={34} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                Open a Universal Standard Bank Account
              </h1>

              <p className="mt-3 text-blue-100 max-w-3xl">
                Complete the application below. Our banking team will review
                your application and supporting documents before your account
                is created.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-8 p-6">
          <div className="flex flex-wrap gap-3">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              1. Personal Information
            </span>

            <span className="bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm">
              2. Residential Address
            </span>

            <span className="bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm">
              3. Identification
            </span>

            <span className="bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm">
              4. Account Information
            </span>

            <span className="bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm">
              5. Online Banking
            </span>

            <span className="bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm">
              6. Documents
            </span>

            <span className="bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm">
              7. Declaration
            </span>
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