"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function CookieBanner() {
  const t = useTranslations("CookieBanner");

  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className="fixed bottom-5 left-5 right-5 lg:left-auto lg:w-[480px] bg-white shadow-2xl rounded-2xl border p-6 z-[9999]"
    >
      <h3
        id="cookie-title"
        className="text-xl font-bold mb-3"
      >
        🍪 {t("title")}
      </h3>

      <p className="text-gray-600 leading-7">
        {t("description")}
      </p>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={accept}
          className="flex-1 bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white py-3 rounded-xl"
        >
          {t("accept")}
        </button>

        <button
          type="button"
          onClick={reject}
          className="flex-1 border py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
        >
          {t("reject")}
        </button>
      </div>
    </div>
  );
}