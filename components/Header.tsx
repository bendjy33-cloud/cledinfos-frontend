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

  const logoUrl = settings.logo_url ?? null;

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div
        className="
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

        {/* ========================= */}
        {/* LOGO */}
        {/* ========================= */}

        <Link
          href="/"
          className="
            flex
            items-center
            min-w-0
            shrink
          "
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={settings.site_name || "Clé d'Infos"}
              width={180}
              height={60}
              priority
              unoptimized
              className="
                h-8
                w-auto
                max-w-[125px]

                sm:h-9
                sm:max-w-[150px]

                md:h-10
                md:max-w-[170px]

                lg:h-12
                lg:max-w-[180px]

                object-contain
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
              {settings.site_name || "Clé d'Infos"}
            </span>
          )}
        </Link>


        {/* ========================= */}
        {/* DESKTOP NAVIGATION */}
        {/* ========================= */}

        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6">

          {/* HOME */}

          <Link
            href="/"
            className="
              whitespace-nowrap
              text-sm
              xl:text-base
              hover:text-red-400
              transition
            "
          >
            {t("home")}
          </Link>


          {/* CATEGORIES */}

          {categories.map((category: any) => {

            const categoryName =
              locale === "es"
                ? category.name_es ??
                  category.name_fr ??
                  category.name_en ??
                  category.name_ht ??
                  category.name
                : locale === "en"
                  ? category.name_en ??
                    category.name_fr ??
                    category.name_ht ??
                    category.name
                  : locale === "ht"
                    ? category.name_ht ??
                      category.name_fr ??
                      category.name_en ??
                      category.name
                    : category.name_fr ??
                      category.name_en ??
                      category.name_ht ??
                      category.name;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="
                  whitespace-nowrap
                  text-sm
                  xl:text-base
                  hover:text-red-400
                  transition
                "
              >
                {categoryName}
              </Link>
            );
          })}


          {/* ABOUT */}

          <Link
            href="/about"
            className="
              whitespace-nowrap
              text-sm
              xl:text-base
              hover:text-red-400
              transition
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
            "
          >
            {t("contact")}
          </Link>

        </nav>


        {/* ========================= */}
        {/* DESKTOP SEARCH + LANGUAGE */}
        {/* ========================= */}

        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">

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
              "
            >
              🔍
            </button>
          </form>

          <LanguageSwitcher />

        </div>


        {/* ========================= */}
        {/* MOBILE + TABLET MENU */}
        {/* ========================= */}

        <div className="lg:hidden shrink-0">
          <MobileMenu categories={categories} />
        </div>

      </div>
    </header>
  );
}