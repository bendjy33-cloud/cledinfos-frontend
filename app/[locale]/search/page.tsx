import PostCard from "@/components/PostCard";
import { searchPosts } from "@/lib/api";
import Breadcrumb from "@/components/Breadcrumb";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SearchPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function SearchPage({
  searchParams,
}: Props) {

  const t = await getTranslations("SearchPage");

  const params = await searchParams;

  const query = params.q?.trim() ?? "";

  const posts = query
    ? await searchPosts(query)
    : [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <Breadcrumb
        items={[
          {
            label: t("breadcrumb"),
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-3">
        {t("title")}
      </h1>

      {query ? (
        <p className="text-gray-600 mb-8">
          {t("results", {
            count: posts.length,
            query,
          })}
        </p>
      ) : (
        <p className="text-gray-600 mb-8">
          {t("placeholder")}
        </p>
      )}

      {posts.length === 0 ? (
        <div className="bg-gray-100 rounded-xl p-10 text-center">

          <h2 className="text-2xl font-semibold mb-2">
            {t("noResults")}
          </h2>

          <p className="text-gray-500">
            {t("tryAgain")}
          </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post: any) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}

        </div>
      )}

    </main>
  );
}