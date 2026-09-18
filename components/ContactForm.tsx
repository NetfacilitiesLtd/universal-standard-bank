"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const translations = {
  en: {
    title: "Send Us a Message",
    fullName: "Full Name",
    email: "Email Address",
    subject: "Subject",
    message: "How can we help you?",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Unable to send your message. Please try again.",
  },

  de: {
    title: "Senden Sie uns eine Nachricht",
    fullName: "Vollständiger Name",
    email: "E-Mail-Adresse",
    subject: "Betreff",
    message: "Wie können wir Ihnen helfen?",
    send: "Nachricht senden",
    sending: "Wird gesendet...",
    success: "Nachricht erfolgreich gesendet!",
    error: "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
  },

  fr: {
    title: "Envoyez-nous un message",
    fullName: "Nom complet",
    email: "Adresse e-mail",
    subject: "Objet",
    message: "Comment pouvons-nous vous aider ?",
    send: "Envoyer le message",
    sending: "Envoi en cours...",
    success: "Message envoyé avec succès !",
    error: "Impossible d'envoyer votre message. Veuillez réessayer.",
  },
};

export default function ContactForm() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [status, setStatus] = useState("");

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

    const form = e.currentTarget;

    setStatus(t.sending);

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (response.ok) {
        setStatus(t.success);
        form.reset();
      } else {
        setStatus(t.error);
      }
    } catch {
      setStatus(t.error);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        {t.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder={t.fullName}
          required
          className="w-full border border-slate-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="email"
          name="email"
          placeholder={t.email}
          required
          className="w-full border border-slate-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="text"
          name="subject"
          placeholder={t.subject}
          required
          className="w-full border border-slate-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <textarea
          name="message"
          rows={6}
          placeholder={t.message}
          required
          className="w-full border border-slate-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          {t.send}
        </button>

        {status && (
          <p className="text-sm text-slate-600">{status}</p>
        )}
      </form>
    </div>
  );
}