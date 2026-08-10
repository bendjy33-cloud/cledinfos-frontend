"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        {t("title")}
      </h1>

      <button
        onClick={() => reset()}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded"
      >
        {t("button")}
      </button>
    </main>
  );
}