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
      className="
        fixed
        bottom-3
        left-3
        right-3

        sm:bottom-4
        sm:left-4
        sm:right-4

        lg:bottom-6
        lg:left-auto
        lg:right-6
        lg:w-[480px]

        bg-white
        text-gray-900
        shadow-2xl
        rounded-2xl
        border
        p-4
        sm:p-5
        lg:p-6
        z-[9999]
      "
    >
      {/* TITLE */}

      <h3
        id="cookie-title"
        className="
          text-lg
          sm:text-xl
          font-bold
          mb-2
          sm:mb-3
        "
      >
        🍪 {t("title")}
      </h3>


      {/* DESCRIPTION */}

      <p
        className="
          text-sm
          sm:text-base
          text-gray-600
          leading-6
          sm:leading-7
        "
      >
        {t("description")}
      </p>


      {/* BUTTONS */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-2
          sm:gap-3
          mt-4
          sm:mt-6
        "
      >
        <button
          type="button"
          onClick={accept}
          className="
            w-full
            sm:flex-1
            bg-red-600
            hover:bg-red-700
            transition-colors
            duration-200
            text-white
            py-3
            rounded-xl
            font-medium
          "
        >
          {t("accept")}
        </button>

        <button
          type="button"
          onClick={reject}
          className="
            w-full
            sm:flex-1
            border
            border-gray-300
            py-3
            rounded-xl
            hover:bg-gray-100
            transition-colors
            duration-200
            font-medium
          "
        >
          {t("reject")}
        </button>
      </div>
    </div>
  );
}