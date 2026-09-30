"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  usePathname,
  useRouter,
} from "@/i18n/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const locales = [
    {
      code: "fr",
      label: t("french"),
      flag: "🇫🇷",
    },
    {
      code: "en",
      label: t("english"),
      flag: "🇺🇸",
    },
    {
      code: "ht",
      label: t("creole"),
      flag: "🇭🇹",
    },
    {
      code: "es",
      label: t("spanish"),
      flag: "🇪🇸",
    },
  ];

  function changeLocale(newLocale: string) {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }

    router.replace(pathname, {
      locale: newLocale,
    });

    setOpen(false);
  }

  return (
    <div className="relative z-[10000]">
      {/* ================================================== */}
      {/* GLOBE BUTTON */}
      {/* ================================================== */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t("label")}
        aria-expanded={open}
        className="
          flex
          h-10
          w-10
          shrink-0
          touch-manipulation
          cursor-pointer
          select-none
          items-center
          justify-center
          rounded-lg
          text-white
          transition
          hover:bg-slate-800
          active:bg-slate-700
          sm:h-11
          sm:w-11
        "
      >
        <Globe
          className="
            h-5
            w-5
            sm:h-[22px]
            sm:w-[22px]
          "
          strokeWidth={2}
        />
      </button>

      {/* ================================================== */}
      {/* LANGUAGE DROPDOWN */}
      {/* ================================================== */}

      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            z-[10001]
            mt-2
            w-40
            overflow-hidden
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            shadow-2xl
          "
        >
          {locales.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() =>
                changeLocale(item.code)
              }
              className={`
                flex
                w-full
                items-center
                gap-2
                px-4
                py-3
                text-left
                text-sm
                transition
                touch-manipulation
                cursor-pointer
                ${
                  item.code === locale
                    ? "bg-red-600 text-white"
                    : "text-white hover:bg-slate-800"
                }
              `}
            >
              <span>{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}