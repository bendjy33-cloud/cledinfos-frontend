"use client";

import { useState } from "react";
import {useTranslations} from "next-intl";

export default function ContactClient() {

  const t = useTranslations("ContactPage");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || t("success"));

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError(data.message || t("error"));
      }
    } catch {
      setError(t("serverError"));
    }

    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-4">
        {t("title")}
      </h1>

      <p className="text-gray-600 mb-10">
        {t("subtitle")}
      </p>

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-6">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          required
          className="w-full border rounded-lg p-3"
          placeholder={t("name")}
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          required
          className="w-full border rounded-lg p-3"
          placeholder={t("email")}
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          required
          className="w-full border rounded-lg p-3"
          placeholder={t("subject")}
          value={form.subject}
          onChange={(e) =>
            setForm({
              ...form,
              subject: e.target.value,
            })
          }
        />

        <textarea
          required
          rows={6}
          className="w-full border rounded-lg p-3"
          placeholder={t("message")}
          value={form.message}
          onChange={(e) =>
            setForm({
              ...form,
              message: e.target.value,
            })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg transition"
        >
          {loading ? t("sending") : t("send")}
        </button>

      </form>

    </main>
  );
}