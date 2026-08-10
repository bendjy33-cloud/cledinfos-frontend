"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function SearchBar() {
  const t = useTranslations("SearchBar");

  const [query, setQuery] = useState("");

  const router = useRouter();
  const locale = useLocale();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    router.push({
      pathname: "/search",
      query: { q: query },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex"
    >
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("placeholder")}
        className="px-4 py-2 rounded-l-md text-black w-56 outline-none"
      />

      <button
        type="submit"
        aria-label={t("button")}
        className="bg-red-600 px-4 rounded-r-md"
      >
        🔍
      </button>
    </form>
  );
}