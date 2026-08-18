"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

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

export default function MobileMenu({ categories }: Props) {
  const t = useTranslations("MobileMenu");
  const locale = useLocale();

  const [open, setOpen] = useState(false);

  function getCategoryName(category: Category) {
    switch (locale) {
      case "es":
        return (
          category.name_es ||
          category.name_en ||
          category.name_fr ||
          ""
        );

      case "en":
        return (
          category.name_en ||
          category.name_fr ||
          ""
        );

      case "ht":
        return (
          category.name_ht ||
          category.name_fr ||
          ""
        );

      case "fr":
      default:
        return category.name_fr || "";
    }
  }

  return (
    <>
      {/* ========================= */}
      {/* MENU BUTTON */}
      {/* ========================= */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          lg:hidden
          flex
          items-center
          justify-center
          p-2
          rounded-lg
          hover:bg-slate-800
          transition
        "
        aria-label={t("menu")}
        aria-expanded={open}
      >
        {open ? (
          <X className="w-7 h-7 sm:w-8 sm:h-8" />
        ) : (
          <Menu className="w-7 h-7 sm:w-8 sm:h-8" />
        )}
      </button>


      {/* ========================= */}
      {/* MOBILE / TABLET MENU */}
      {/* ========================= */}

      {open && (
        <div
          className="
            absolute
            left-0
            top-full
            w-full
            max-h-[calc(100vh-64px)]
            overflow-y-auto
            bg-slate-900
            border-t
            border-slate-700
            shadow-2xl
            z-50
          "
        >

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">

            {/* ========================= */}
            {/* SEARCH */}
            {/* ========================= */}

            <form
              action="/search"
              method="GET"
              className="flex w-full mb-4 sm:mb-5"
            >
              <input
                type="text"
                name="q"
                placeholder={t("search")}
                className="
                  flex-1
                  min-w-0
                  px-3
                  sm:px-4
                  py-2.5
                  sm:py-3
                  bg-white
                  text-black
                  placeholder:text-gray-500
                  border
                  border-gray-300
                  rounded-l-lg
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
                  bg-red-600
                  hover:bg-red-700
                  px-4
                  sm:px-5
                  py-2.5
                  sm:py-3
                  rounded-r-lg
                  transition
                "
              >
                🔍
              </button>
            </form>


            {/* ========================= */}
            {/* NAVIGATION */}
            {/* ========================= */}

            <nav className="flex flex-col">

              {/* Home */}
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="
                  py-3
                  sm:py-3.5
                  border-b
                  border-slate-700
                  hover:text-red-400
                  transition
                "
              >
                🏠 {t("home")}
              </Link>


              {/* Categories */}
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="
                    py-3
                    sm:py-3.5
                    border-b
                    border-slate-700
                    hover:text-red-400
                    transition
                  "
                >
                  {getCategoryName(category)}
                </Link>
              ))}


              {/* About */}
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="
                  py-3
                  sm:py-3.5
                  border-b
                  border-slate-700
                  hover:text-red-400
                  transition
                "
              >
                {t("about")}
              </Link>


              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="
                  py-3
                  sm:py-3.5
                  border-b
                  border-slate-700
                  hover:text-red-400
                  transition
                "
              >
                {t("contact")}
              </Link>

            </nav>

          </div>
        </div>
      )}
    </>
  );
}