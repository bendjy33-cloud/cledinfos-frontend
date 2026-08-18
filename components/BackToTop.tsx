"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function BackToTop() {
  const t = useTranslations("BackToTop");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label={t("label")}
      className="
        fixed
        bottom-4
        right-4
        sm:bottom-6
        sm:right-6
        z-50
        flex
        items-center
        justify-center
        w-10
        h-10
        sm:w-12
        sm:h-12
        rounded-full
        bg-red-600
        hover:bg-red-700
        text-white
        text-lg
        sm:text-xl
        font-bold
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
      "
    >
      ↑
    </button>
  );
}