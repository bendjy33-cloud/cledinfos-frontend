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
          category.name_ht ||
          ""
        );

      case "en":
        return (
          category.name_en ||
          category.name_fr ||
          category.name_ht ||
          ""
        );

      case "ht":
        return (
          category.name_ht ||
          category.name_fr ||
          category.name_en ||
          ""
        );

      case "fr":
      default:
        return (
          category.name_fr ||
          category.name_en ||
          category.name_ht ||
          ""
        );
    }
  }

  return (
    <div className="relative z-[110]">

      {/* ========================= */}
      {/* MENU BUTTON */}
      {/* ========================= */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          z-[120]
          flex
          items-center
          justify-center
          p-2
          rounded-lg
          text-white
          hover:bg-slate-800
          active:bg-slate-700
          transition
          cursor-pointer
          pointer-events-auto
        "
        aria-label={open ? t("close") : t("menu")}
        aria-expanded={open}
      >
        {open ? (
          <X className="w-8 h-8" strokeWidth={2.5} />
        ) : (
          <Menu className="w-8 h-8" strokeWidth={2.5} />
        )}
      </button>


      {/* ========================= */}
      {/* MOBILE MENU */}
      {/* ========================= */}

      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            mt-2
            w-[calc(100vw-24px)]
            max-w-md
            overflow-hidden
            rounded-xl
            bg-slate-900
            text-white
            border
            border-slate-700
            shadow-2xl
            z-[110]
          "
        >

          <div className="max-h-[calc(100vh-80px)] overflow-y-auto">

            {/* SEARCH */}

            <div className="p-4 border-b border-slate-700">

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
                    flex-1
                    min-w-0
                    px-3
                    py-2.5
                    bg-white
                    text-black
                    placeholder:text-gray-500
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
                    rounded-r-lg
                    transition
                    cursor-pointer
                  "
                >
                  🔍
                </button>
              </form>

            </div>


            {/* NAVIGATION */}

            <nav className="flex flex-col">

              {/* HOME */}

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="
                  px-4
                  py-3.5
                  border-b
                  border-slate-700
                  hover:bg-slate-800
                  hover:text-red-400
                  transition
                "
              >
                🏠 {t("home")}
              </Link>


              {/* CATEGORIES */}

              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="
                    px-4
                    py-3.5
                    border-b
                    border-slate-700
                    hover:bg-slate-800
                    hover:text-red-400
                    transition
                  "
                >
                  {getCategoryName(category)}
                </Link>
              ))}


              {/* ABOUT */}

              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="
                  px-4
                  py-3.5
                  border-b
                  border-slate-700
                  hover:bg-slate-800
                  hover:text-red-400
                  transition
                "
              >
                {t("about")}
              </Link>


              {/* CONTACT */}

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="
                  px-4
                  py-3.5
                  hover:bg-slate-800
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

    </div>
  );
}