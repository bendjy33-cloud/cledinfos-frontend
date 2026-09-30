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

      {/* ==================================================
          MENU BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          z-[10000]
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-lg
          p-2
          text-white
          transition
          hover:bg-slate-800
          active:bg-slate-700
          cursor-pointer
          touch-manipulation
          select-none
        "
        aria-label={open ? t("close") : t("menu")}
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        {open ? (
          <X
            className="h-7 w-7 pointer-events-none"
            strokeWidth={2.5}
          />
        ) : (
          <Menu
            className="h-7 w-7 pointer-events-none"
            strokeWidth={2.5}
          />
        )}
      </button>

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      {open && (
        <div
          id="mobile-navigation"
          className="
            fixed
            left-3
            right-3
            top-[64px]
            z-[9999]
            overflow-hidden
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            text-white
            shadow-2xl
            sm:left-4
            sm:right-4
            md:left-6
            md:right-6
            lg:left-8
            lg:right-8
          "
        >
          <div
            className="
              max-h-[calc(100vh-76px)]
              overflow-y-auto
              overscroll-contain
            "
          >

            {/* ==================================================
                NAVIGATION
            ================================================== */}

            <nav className="flex flex-col">

              {/* HOME */}

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="
                  border-b
                  border-slate-700
                  px-4
                  py-3.5
                  transition
                  hover:bg-slate-800
                  active:bg-slate-800
                  hover:text-red-400
                  touch-manipulation
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
                    border-b
                    border-slate-700
                    px-4
                    py-3.5
                    transition
                    hover:bg-slate-800
                    active:bg-slate-800
                    hover:text-red-400
                    touch-manipulation
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
                  border-b
                  border-slate-700
                  px-4
                  py-3.5
                  transition
                  hover:bg-slate-800
                  active:bg-slate-800
                  hover:text-red-400
                  touch-manipulation
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
                  transition
                  hover:bg-slate-800
                  active:bg-slate-800
                  hover:text-red-400
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