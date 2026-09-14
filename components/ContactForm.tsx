"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    setStatus("Sending...");

    const formData = new FormData(form);

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
      setStatus("Message sent successfully!");
      form.reset();
    } else {
      setStatus("Unable to send your message. Please try again.");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full border border-slate-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="w-full border border-slate-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          className="w-full border border-slate-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <textarea
          name="message"
          rows={6}
          placeholder="How can we help you?"
          required
          className="w-full border border-slate-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          Send Message
        </button>

        {status && (
          <p className="text-sm text-slate-600">{status}</p>
        )}
      </form>
    </div>
  );
}