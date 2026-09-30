import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { getCategories, getSettings } from "@/lib/api";

import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Header() {
  const t = await getTranslations("menu");
  const locale = await getLocale();

  const [categories, settings] = await Promise.all([
    getCategories(),
    getSettings(),
  ]);

  const logoUrl =
    settings?.logo_url ||
    settings?.logo ||
    null;

  function getCategoryName(category: any) {
    switch (locale) {
      case "es":
        return (
          category?.name_es ||
          category?.name_en ||
          category?.name_fr ||
          category?.name_ht ||
          category?.name ||
          ""
        );

      case "en":
        return (
          category?.name_en ||
          category?.name_fr ||
          category?.name_ht ||
          category?.name_es ||
          category?.name ||
          ""
        );

      case "ht":
        return (
          category?.name_ht ||
          category?.name_fr ||
          category?.name_en ||
          category?.name_es ||
          category?.name ||
          ""
        );

      case "fr":
      default:
        return (
          category?.name_fr ||
          category?.name_en ||
          category?.name_ht ||
          category?.name_es ||
          category?.name ||
          ""
        );
    }
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        overflow-visible
        bg-slate-900
        text-white
        shadow-lg
      "
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-7xl
          items-center
          gap-2
          overflow-hidden
          px-3
          py-2
          sm:gap-3
          sm:px-4
          sm:py-2.5
          md:px-6
          md:py-3
          lg:px-8
          lg:py-3
          2xl:gap-6
        "
      >
        {/* LOGO */}

        <Link
          href="/"
          className="
            flex
            min-w-0
            shrink-0
            items-center
            cursor-pointer
          "
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={settings?.site_name || "Clé d'Infos"}
              width={180}
              height={60}
              priority
              unoptimized
              className="
                h-8
                w-auto
                max-w-[120px]
                object-contain
                sm:h-9
                sm:max-w-[145px]
                md:h-10
                md:max-w-[165px]
                lg:h-12
                lg:max-w-[180px]
              "
            />
          ) : (
            <span
              className="
                whitespace-nowrap
                text-lg
                font-extrabold
                text-red-500
                sm:text-xl
                md:text-2xl
                lg:text-3xl
              "
            >
              {settings?.site_name || "Clé d'Infos"}
            </span>
          )}
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav
          className="
            hidden
            min-w-0
            flex-1
            items-center
            justify-center
            gap-2
            whitespace-nowrap
            2xl:flex
            2xl:gap-5
          "
        >
          {/* HOME */}

          <Link
            href="/"
            className="
              whitespace-nowrap
              text-sm
              transition
              hover:text-red-400
            "
          >
            {t("home")}
          </Link>

          {/* CATEGORIES */}

          {Array.isArray(categories) &&
            categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="
                  whitespace-nowrap
                  text-sm
                  transition
                  hover:text-red-400
                "
              >
                {getCategoryName(category)}
              </Link>
            ))}

          {/* ABOUT */}

          <Link
            href="/about"
            className="
              whitespace-nowrap
              text-sm
              transition
              hover:text-red-400
            "
          >
            {t("about")}
          </Link>

          {/* CONTACT */}

          <Link
            href="/contact"
            className="
              whitespace-nowrap
              text-sm
              transition
              hover:text-red-400
            "
          >
            {t("contact")}
          </Link>
        </nav>

        {/* RIGHT SIDE */}

        <div
          className="
            ml-auto
            flex
            shrink-0
            items-center
            gap-1
            sm:gap-2
            2xl:gap-4
          "
        >
          {/* DESKTOP SEARCH */}

          <form
            action="/search"
            method="GET"
            className="
              hidden
              items-center
              2xl:flex
            "
          >
            <input
              type="text"
              name="q"
              placeholder={t("search")}
              className="
                w-36
                rounded-l-lg
                border
                border-gray-300
                bg-white
                px-3
                py-2
                text-sm
                text-black
                placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                2xl:w-40
              "
            />

            <button
              type="submit"
              aria-label={t("search")}
              className="
                shrink-0
                rounded-r-lg
                bg-red-600
                px-3
                py-2
                transition
                hover:bg-red-700
                cursor-pointer
              "
            >
              🔍
            </button>
          </form>

          {/* LANGUAGE SWITCHER */}

          <div
            className="
              flex
              shrink-0
              items-center
            "
          >
            <LanguageSwitcher />
          </div>

          {/* MOBILE / TABLET MENU */}

          <div
            className="
              flex
              shrink-0
              items-center
              2xl:hidden
            "
          >
            <MobileMenu
              categories={
                Array.isArray(categories)
                  ? categories
                  : []
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}