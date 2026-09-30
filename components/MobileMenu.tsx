"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  Menu,
  X,
} from "lucide-react";
import {
  useLocale,
  useTranslations,
} from "next-intl";

type Category = {
  id: number;
  name_fr?: string | null;
  name_en?: string | null;
  name_ht?: string | null;
  name_es?: string | null;
  slug: string;
};

type Props = {
  categories: Category[];
};

export default function MobileMenu({
  categories,
}: Props) {
  const t = useTranslations("MobileMenu");
  const locale = useLocale();

  const [open, setOpen] = useState(false);

  function getCategoryName(
    category: Category
  ) {
    switch (locale) {
      case "es":
        return (
          category.name_es ||
          category.name_en ||
          category.name_fr ||
          category.name_ht ||
          ""
        );

      case "en":
        return (
          category.name_en ||
          category.name_fr ||
          category.name_ht ||
          category.name_es ||
          ""
        );

      case "ht":
        return (
          category.name_ht ||
          category.name_fr ||
          category.name_en ||
          category.name_es ||
          ""
        );

      case "fr":
      default:
        return (
          category.name_fr ||
          category.name_en ||
          category.name_ht ||
          category.name_es ||
          ""
        );
    }
  }

  return (
    <div className="relative z-[9999]">

      {/* ================================================== */}
      {/* MENU BUTTON */}
      {/* ================================================== */}

      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          relative
          z-[10000]
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
        aria-label={
          open
            ? t("close")
            : t("menu")
        }
        aria-expanded={open}
      >
        {open ? (
          <X
            className="h-6 w-6 pointer-events-none sm:h-7 sm:w-7"
            strokeWidth={2.5}
          />
        ) : (
          <Menu
            className="h-6 w-6 pointer-events-none sm:h-7 sm:w-7"
            strokeWidth={2.5}
          />
        )}
      </button>

      {/* ================================================== */}
      {/* MOBILE MENU */}
      {/* ================================================== */}

      {open && (
        <div
          className="
            fixed
            left-3
            right-3
            top-[60px]
            z-[9999]
            max-h-[calc(100dvh-72px)]
            overflow-hidden
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            text-white
            shadow-2xl
            sm:top-[64px]
            md:top-[68px]
            md:left-4
            md:right-4
            md:max-h-[calc(100dvh-80px)]
          "
        >
          <div
            className="
              max-h-[calc(100dvh-72px)]
              overflow-y-auto
              overscroll-contain
              sm:max-h-[calc(100dvh-76px)]
              md:max-h-[calc(100dvh-80px)]
            "
          >

            {/* ================================================== */}
            {/* SEARCH */}
            {/* ================================================== */}

            <div
              className="
                border-b
                border-slate-700
                p-4
              "
            >
              <form
                action="/search"
                method="GET"
                className="flex w-full"
              >
                <input
                  type="text"
                  name="q"
                  placeholder={t("search")}
                  className="
                    min-w-0
                    flex-1
                    rounded-l-lg
                    bg-white
                    px-3
                    py-2.5
                    text-black
                    placeholder:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500
                  "
                />

                <button
                  type="submit"
                  aria-label={t("search")}
                  className="
                    shrink-0
                    rounded-r-lg
                    bg-red-600
                    px-4
                    transition
                    hover:bg-red-700
                    active:bg-red-800
                    cursor-pointer
                    touch-manipulation
                  "
                >
                  🔍
                </button>
              </form>
            </div>

            {/* ================================================== */}
            {/* NAVIGATION */}
            {/* ================================================== */}

            <nav className="flex flex-col">

              {/* HOME */}

              <Link
                href="/"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  border-b
                  border-slate-700
                  px-4
                  py-3.5
                  transition
                  hover:bg-slate-800
                  hover:text-red-400
                  active:bg-slate-800
                  touch-manipulation
                "
              >
                🏠 {t("home")}
              </Link>

              {/* CATEGORIES */}

              {categories.map(
                (category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    onClick={() =>
                      setOpen(false)
                    }
                    className="
                      border-b
                      border-slate-700
                      px-4
                      py-3.5
                      transition
                      hover:bg-slate-800
                      hover:text-red-400
                      active:bg-slate-800
                      touch-manipulation
                    "
                  >
                    {getCategoryName(
                      category
                    )}
                  </Link>
                )
              )}

              {/* ABOUT */}

              <Link
                href="/about"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  border-b
                  border-slate-700
                  px-4
                  py-3.5
                  transition
                  hover:bg-slate-800
                  hover:text-red-400
                  active:bg-slate-800
                  touch-manipulation
                "
              >
                {t("about")}
              </Link>

              {/* CONTACT */}

              <Link
                href="/contact"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  px-4
                  py-3.5
                  transition
                  hover:bg-slate-800
                  hover:text-red-400
                  active:bg-slate-800
                  touch-manipulation
                "
              >
                {t("contact")}
              </Link>

            </nav>
          </div>
        </div>
      )}
    </div>
  );
}