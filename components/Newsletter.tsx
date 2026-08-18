"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/api";
import { useTranslations } from "next-intl";

type NewsletterResponse = {
  message?: string;
  success?: boolean;
};

export default function Newsletter() {
  const t = useTranslations("newsletter");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const data: NewsletterResponse =
        await subscribeNewsletter(email);

      setMessage(t("success"));
      setEmail("");
    } catch (err: any) {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border bg-gradient-to-br from-red-600 to-red-700 p-5 sm:p-6 text-white shadow-xl">

      <div className="mb-5">

        <p className="text-xs sm:text-sm uppercase tracking-widest text-red-100">
          {t("title")}
        </p>

        <h2 className="mt-2 text-xl sm:text-2xl font-bold">
          {t("heading")}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-red-100 leading-7">
          {t("description")}
        </p>

      </div>

      {message && (
        <div className="mb-4 rounded-lg bg-green-500/20 border border-green-300 px-4 py-3 text-sm sm:text-base text-green-100">
          ✅ {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-900/40 border border-red-300 px-4 py-3 text-sm sm:text-base text-red-100">
          ❌ {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="email"
          required
          autoComplete="email"
          placeholder={t("placeholder")}
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl bg-white px-4 sm:px-5 py-3 sm:py-4 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-white/50"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black py-3 sm:py-4 font-semibold text-white transition hover:bg-gray-900 disabled:opacity-60"
        >
          {loading
            ? t("sending")
            : `📩 ${t("button")}`}
        </button>

      </form>

      <p className="mt-4 text-xs text-red-100">
        {t("footer")}
      </p>

    </section>
  );
}