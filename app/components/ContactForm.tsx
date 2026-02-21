"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to API or email service
    setSubmitted(true);
  };

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (submitted) {
    return (
      <div className="mt-8 rounded-xl bg-brand-50 p-6 text-center">
        <p className="font-semibold text-brand-800">Thank you for your message.</p>
        <p className="mt-2 text-sm text-brand-600">
          We’ll get back to you within 1–2 business days.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder-brand-300 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-brand-800";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="What is this regarding?"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Your message..."
          className={`${inputClass} resize-y min-h-[120px]`}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-brand-400 py-3 text-sm font-semibold text-white shadow-md shadow-brand-200 transition hover:bg-brand-500 sm:w-auto sm:px-8"
      >
        Send message
      </button>
    </form>
  );
}
