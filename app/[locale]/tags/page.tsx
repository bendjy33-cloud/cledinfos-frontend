import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getTags } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("TagsPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TagsPage() {
  const t = await getTranslations("TagsPage");

  const tags = await getTags();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">
        {t("title")}
      </h1>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {tags.map((tag: any) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="px-5 py-3 bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          {t("noTags")}
        </p>
      )}
    </main>
  );
}