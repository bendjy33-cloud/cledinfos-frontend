import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { getCategories, getSettings } from "@/lib/api";

import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Header() {
  const t = await getTranslations("menu");
  const locale = await getLocale();

  const categories = await getCategories();
  const settings = await getSettings();

  /*
   * Logo
   * Prefer logo_url, then logo as fallback.
   */
  const logoUrl =
    settings?.logo_url ||
    settings?.logo ||
    null;

  /*
   * Get translated category name
   */
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
          category?.name ||
          ""
        );

      case "ht":
        return (
          category?.name_ht ||
          category?.name_fr ||
          category?.name_en ||
          category?.name ||
          ""
        );

      case "fr":
      default:
        return (
          category?.name_fr ||
          category?.name_en ||
          category?.name_ht ||
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
        z-[9999]
        w-full
        bg-slate-900
        text-white
        shadow-lg
        isolate
      "
    >
      <div
        className="
          relative
          z-[9999]
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
          gap-3
          px-3
          sm:px-4
          md:px-6
          lg:px-8
          py-2.5
          sm:py-3
          md:py-4
        "
      >

        {/* ================================================== */}
        {/* LOGO */}
        {/* ================================================== */}

        <Link
          href="/"
          className="
            relative
            z-[10000]
            flex
            items-center
            min-w-0
            shrink
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
                max-w-[125px]
                object-contain

                sm:h-9
                sm:max-w-[150px]

                md:h-10
                md:max-w-[170px]

                lg:h-12
                lg:max-w-[180px]
              "
            />
          ) : (
            <span
              className="
                text-lg
                sm:text-xl
                md:text-2xl
                lg:text-3xl
                font-extrabold
                text-red-500
                truncate
                max-w-[160px]
                sm:max-w-[200px]
                md:max-w-none
              "
            >
              {settings?.site_name || "Clé d'Infos"}
            </span>
          )}
        </Link>


        {/* ================================================== */}
        {/* DESKTOP NAVIGATION */}
        {/* ================================================== */}

        <nav
          className="
            hidden
            lg:flex
            items-center
            gap-3
            xl:gap-5
            2xl:gap-6
          "
        >

          {/* HOME */}

          <Link
            href="/"
            className="
              whitespace-nowrap
              text-sm
              xl:text-base
              hover:text-red-400
              transition
              cursor-pointer
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
                  xl:text-base
                  hover:text-red-400
                  transition
                  cursor-pointer
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
              xl:text-base
              hover:text-red-400
              transition
              cursor-pointer
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
              xl:text-base
              hover:text-red-400
              transition
              cursor-pointer
            "
          >
            {t("contact")}
          </Link>

        </nav>


        {/* ================================================== */}
        {/* DESKTOP SEARCH + LANGUAGE */}
        {/* ================================================== */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
            xl:gap-3
            shrink-0
          "
        >

          {/* SEARCH */}

          <form
            action="/search"
            method="GET"
            className="flex items-center"
          >
            <input
              type="text"
              name="q"
              placeholder={t("search")}
              className="
                w-36
                xl:w-52
                2xl:w-60
                px-3
                xl:px-4
                py-2
                text-sm
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
                bg-red-600
                hover:bg-red-700
                px-3
                xl:px-4
                py-2
                rounded-r-lg
                transition
                cursor-pointer
              "
            >
              🔍
            </button>
          </form>


          {/* LANGUAGE SWITCHER */}

          <LanguageSwitcher />

        </div>


        {/* ================================================== */}
        {/* MOBILE / TABLET MENU */}
        {/* ================================================== */}

        <div
          className="
            relative
            z-[10000]
            shrink-0
            lg:hidden
            pointer-events-auto
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
    </header>
  );
}