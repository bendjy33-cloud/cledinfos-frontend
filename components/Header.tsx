import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";
import { getCategories, getSettings } from "@/lib/api";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Header() {

  const t = await getTranslations("menu");

  const categories = await getCategories();
  const settings = await getSettings();

  const logoUrl = settings.logo_url ?? null;

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

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

        <nav className="hidden lg:flex items-center gap-6">

          <Link href="/" className="hover:text-red-400 transition">
            {t("home")}
          </Link>

          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="hover:text-red-400 transition"
            >
              {category.name}
            </Link>
          ))}

          <Link
            href="/about"
            className="hover:text-red-400 transition"
          >
            {t("about")}
          </Link>

          <Link
            href="/contact"
            className="hover:text-red-400 transition"
          >
            {t("contact")}
          </Link>

        </nav>

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

        <MobileMenu categories={categories} />

      </div>
    </header>
  );
} 