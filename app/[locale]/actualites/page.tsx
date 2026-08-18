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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">

      <Breadcrumb
        items={[
          {
            label: t("breadcrumb"),
          },
        ]}
      />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {posts.data.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12">
        <Pagination
          currentPage={posts.meta.current_page}
          lastPage={posts.meta.last_page}
        />
      </div>

    </main>
  );
}