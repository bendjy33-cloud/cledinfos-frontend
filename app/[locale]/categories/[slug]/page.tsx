import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getPostsByCategory, getCategories } from "@/lib/api";
import Breadcrumb from "@/components/Breadcrumb";
import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const categories = await getCategories();

  const category = categories.find(
    (item: any) => item.slug === decodedSlug
  );

  const t = await getTranslations("CategoryPage");

  const title = category
    ? category.name
    : slug;

  return {
    title: t("metaTitle", {
      category: title,
    }),

    description: t("metaDescription", {
      category: title,
    }),

    openGraph: {
      title: `${title} - Clé d'Infos`,
      description: t("metaOgDescription", {
        category: title,
      }),
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} - Clé d'Infos`,
      description: t("metaOgDescription", {
        category: title,
      }),
    },
  };
}

export default async function CategoryPage({
  params,
}: Props) {
  const t = await getTranslations("CategoryPage");

  const locale = await getLocale();

  const { slug } = await params;

  const posts = await getPostsByCategory(slug);

  /*
   * Get all categories so we can always find
   * the category name even when there are no posts.
   */
  const categories = await getCategories();

  const category = categories.find(
    (item: any) => item.slug === slug
  );

  /*
   * Select the category name according to
   * the current language.
   */
  const categoryName =
    locale === "en"
      ? category?.name_en ??
        category?.name_fr ??
        category?.name_ht ??
        slug
      : locale === "ht"
        ? category?.name_ht ??
          category?.name_fr ??
          category?.name_en ??
          slug
        : category?.name_fr ??
          category?.name_en ??
          category?.name_ht ??
          slug;

  /*
   * Also localize the category inside posts
   * before sending them to PostCard.
   */
  const localizedPosts = posts.map((post: any) => {
    if (!post) return post;

    const localizedCategory = post.category
      ? {
          ...post.category,
          name:
            locale === "en"
              ? post.category.name_en ??
                post.category.name_fr ??
                post.category.name_ht
              : locale === "ht"
                ? post.category.name_ht ??
                  post.category.name_fr ??
                  post.category.name_en
                : post.category.name_fr ??
                  post.category.name_en ??
                  post.category.name_ht,
        }
      : null;

    return {
      ...post,
      category: localizedCategory,
    };
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <Breadcrumb
        items={[
          {
            label: categoryName,
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">
        {categoryName}
      </h1>

      {localizedPosts.length === 0 ? (
        <p className="text-gray-500">
          {t("noPosts")}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localizedPosts.map((post: any) => (
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