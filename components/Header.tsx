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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={settings.site_name}
              width={180}
              height={60}
              priority
              unoptimized
              className="h-12 w-auto object-contain"
            />
          ) : (
            <span className="text-3xl font-extrabold text-red-500">
              {settings.site_name}
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">

          {/* Home */}
          <Link
            href="/"
            className="hover:text-red-400 transition"
          >
            {t("home")}
          </Link>

          {/* Categories */}
          {categories.map((category: any) => {
            const categoryName =
              locale === "en"
                ? category.name_en
                : locale === "ht"
                  ? category.name_ht
                  : category.name_fr;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="hover:text-red-400 transition"
              >
                {categoryName}
              </Link>
            );
          })}

          {/* About */}
          <Link
            href="/about"
            className="hover:text-red-400 transition"
          >
            {t("about")}
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="hover:text-red-400 transition"
          >
            {t("contact")}
          </Link>

        </nav>

        {/* Desktop Search + Language */}
        <div className="hidden lg:flex items-center gap-3">

          <form
            action="/search"
            method="GET"
            className="flex items-center"
          >
            <input
              type="text"
              name="q"
              placeholder={t("search")}
              className="w-64 px-4 py-2 bg-white text-black placeholder:text-gray-500 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              aria-label={t("search")}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition"
            >
              🔍
            </button>
          </form>

          <LanguageSwitcher />

        </div>

        {/* Mobile Menu */}
        <MobileMenu categories={categories} />

      </div>
    </header>
  );
}