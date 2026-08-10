import {Link} from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="max-w-4xl mx-auto px-6 py-24 text-center">

      <h1 className="text-8xl font-extrabold text-red-600">
        404
      </h1>

      <h2 className="text-4xl font-bold mt-6">
        {t("title")}
      </h2>

      <p className="text-gray-600 mt-4 mb-10">
        {t("description")}
      </p>

      <Link
        href="/"
        className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg"
      >
        {t("button")}
      </Link>

    </main>
  );
}