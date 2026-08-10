import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/api";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {

  const t = await getTranslations("ActualitesPage");

  return {
    title: t("title"),
    description: t("description"),
  };
}

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function ActualitesPage({
  searchParams,
}: Props) {

  const t = await getTranslations("ActualitesPage");

  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const posts = await getPosts(page);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <Breadcrumb
        items={[
          {
            label: t("breadcrumb"),
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-10">
         {t("title")}
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.data.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>

      <Pagination
        currentPage={posts.meta.current_page}
        lastPage={posts.meta.last_page}
      />

    </main>
  );
}