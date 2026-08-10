import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import PostCard from "@/components/PostCard";
import Breadcrumb from "@/components/Breadcrumb";
import { getTag } from "@/lib/api";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const tag = await getTag(slug);

  const t = await getTranslations("TagPage");

  return {
    title: t("metaTitle", {
      tag: tag.name,
    }),
    description: t("metaDescription", {
      tag: tag.name,
    }),
    openGraph: {
      title: t("metaTitle", {
        tag: tag.name,
      }),
      description: t("metaDescription", {
        tag: tag.name,
      }),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle", {
        tag: tag.name,
      }),
      description: t("metaDescription", {
        tag: tag.name,
      }),
    },
  };
}

export default async function TagPage({
  params,
}: Props) {
  const { slug } = await params;

  const t = await getTranslations("TagPage");

  const tag = await getTag(slug);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          {
            label: tag.name,
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-10">
        #{tag.name}
      </h1>

      {tag.posts?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tag.posts.map((post: any) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          {t("noPosts")}
        </p>
      )}
    </main>
  );
}