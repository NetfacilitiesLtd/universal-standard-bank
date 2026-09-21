"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations = {
  en: {
    title: "Contact Us",
    description:
      "We're here to help. Whether you have questions about your account, online banking or our financial services, our team is ready to assist you.",
    getInTouch: "Get in Touch",
    registeredOffice: "Registered Office",
    telephone: "Telephone",
    email: "Email",
    businessHours: "Business Hours",
    weekdays: "Monday – Friday",
    hours: "8:30 AM – 5:30 PM",
  },

  de: {
    title: "Kontaktieren Sie uns",
    description:
      "Wir sind für Sie da. Ganz gleich, ob Sie Fragen zu Ihrem Konto, Online-Banking oder unseren Finanzdienstleistungen haben – unser Team steht Ihnen gerne zur Verfügung.",
    getInTouch: "Kontakt aufnehmen",
    registeredOffice: "Geschäftssitz",
    telephone: "Telefon",
    email: "E-Mail",
    businessHours: "Geschäftszeiten",
    weekdays: "Montag – Freitag",
    hours: "8:30 Uhr – 17:30 Uhr",
  },

  fr: {
    title: "Contactez-nous",
    description:
      "Nous sommes là pour vous aider. Que vous ayez des questions concernant votre compte, votre banque en ligne ou nos services financiers, notre équipe est à votre disposition.",
    getInTouch: "Nous contacter",
    registeredOffice: "Siège social",
    telephone: "Téléphone",
    email: "E-mail",
    businessHours: "Heures d'ouverture",
    weekdays: "Lundi – Vendredi",
    hours: "8h30 – 17h30",
  },
};

export default function ContactPage() {
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

  return (
    <>
      <Navbar showLogo={false} />

      <main className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-red-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <h1 className="text-5xl font-bold mb-6">
              {t.title}
            </h1>

            <p className="text-slate-300 max-w-2xl text-lg leading-8">
              {t.description}
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                {t.getInTouch}
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-red-600 mt-1" />

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {t.registeredOffice}
                    </h3>

                    <p className="text-slate-600 mt-2 leading-7">
                      33 St James's Square
                      <br />
                      St James's
                      <br />
                      London SW1Y 4JS
                      <br />
                      England
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-red-600 mt-1" />

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {t.telephone}
                    </h3>

                    <p className="text-slate-600 mt-2">
                      +44 79 536 23468
                      <br />
                      +44 73 554 53466
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-red-600 mt-1" />

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {t.email}
                    </h3>

                    <p className="text-slate-600 mt-2">
  info@universalstanb.com
  <br />
  inquiry@universalstanb.com
</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="text-red-600 mt-1" />

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {t.businessHours}
                    </h3>

                    <p className="text-slate-600 mt-2">
                      {t.weekdays}
                      <br />
                      {t.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}