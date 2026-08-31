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
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        rounded-2xl
        border
        border-red-500
        bg-gradient-to-br
        from-red-600
        to-red-700
        p-5
        sm:p-6
        text-white
        shadow-xl
      "
    >
      {/* HEADER */}
      <div className="mb-5">
        <p
          className="
            text-xs
            sm:text-sm
            uppercase
            tracking-widest
            text-white
            font-semibold
          "
        >
          {t("title")}
        </p>

        <h2
          className="
            mt-2
            text-xl
            sm:text-2xl
            font-bold
            text-white
          "
        >
          {t("heading")}
        </h2>

        <p
          className="
            mt-3
            text-sm
            sm:text-base
            text-white
            leading-7
          "
        >
          {t("description")}
        </p>
      </div>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div
          className="
            mb-4
            rounded-lg
            bg-green-500/30
            border
            border-green-200
            px-4
            py-3
            text-sm
            sm:text-base
            text-white
            font-medium
          "
        >
          ✅ {message}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div
          className="
            mb-4
            rounded-lg
            bg-black/30
            border
            border-white/50
            px-4
            py-3
            text-sm
            sm:text-base
            text-white
            font-medium
          "
        >
          ❌ {error}
        </div>
      )}

      {/* FORM */}
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
          className="
            w-full
            rounded-xl
            bg-white
            px-4
            sm:px-5
            py-3
            sm:py-4
            text-gray-900
            placeholder:text-gray-500
            outline-none
            focus:ring-2
            focus:ring-white
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-black
            py-3
            sm:py-4
            font-semibold
            text-white
            transition
            hover:bg-gray-900
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? t("sending")
            : `📩 ${t("button")}`}
        </button>
      </form>

      {/* FOOTER */}
      <p
        className="
          mt-4
          text-xs
          text-white
          leading-5
        "
      >
        {t("footer")}
      </p>
    </section>
  );
}