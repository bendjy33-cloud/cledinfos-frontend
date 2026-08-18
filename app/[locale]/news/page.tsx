import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/api";
import { Post } from "@/types/post";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("news");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),

    keywords: [
      "actualité",
      "news",
      "Clé d’Infos",
      "information",
    ],

    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      siteName: "Clé d’Infos",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function NewsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const response = await getPosts(page);

  const posts = response.data;

  const t = await getTranslations("news");

  return (
    <main
      className="
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        md:px-8
        py-8
        sm:py-10
        md:py-12
      "
    >
      {/* PAGE TITLE */}
      <h1
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-bold
          leading-tight
          mb-7
          sm:mb-8
          md:mb-10
        "
      >
        {t("title")}
      </h1>

      {/* POSTS */}
      {posts.length > 0 ? (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            sm:gap-6
            lg:gap-8
          "
        >
          {posts.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          {t("noPosts")}
        </p>
      )}

      {/* PAGINATION */}
      <div className="mt-8 sm:mt-10 md:mt-12">
        <Pagination
          currentPage={response.meta.current_page}
          lastPage={response.meta.last_page}
        />
      </div>
    </main>
  );
}