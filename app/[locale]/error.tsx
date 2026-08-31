"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-5xl font-bold dark:text-white">
        {t("title")}
      </h1>

      <button
        onClick={() => reset()}
        className="
          mt-6
          bg-red-600
          hover:bg-red-700
          text-white
          px-6
          py-3
          rounded-lg
          transition
        "
      >
        {t("button")}
      </button>

    </main>
  );
}