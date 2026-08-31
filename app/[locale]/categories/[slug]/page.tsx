import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import {
  getPostsByCategory,
  getCategories,
} from "@/lib/api";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const decodedSlug =
    decodeURIComponent(slug);

  const locale = await getLocale();

  const categories =
    await getCategories();

  const category = categories.find(
    (item: any) =>
      item.slug === decodedSlug
  );

  const t =
    await getTranslations(
      "CategoryPage"
    );

  const categoryName =
    locale === "es"
      ? category?.name_es ??
        category?.name_en ??
        category?.name_fr ??
        category?.name_ht ??
        decodedSlug
      : locale === "en"
        ? category?.name_en ??
          category?.name_fr ??
          category?.name_ht ??
          category?.name_es ??
          decodedSlug
        : locale === "ht"
          ? category?.name_ht ??
            category?.name_fr ??
            category?.name_en ??
            category?.name_es ??
            decodedSlug
          : category?.name_fr ??
            category?.name_en ??
            category?.name_ht ??
            category?.name_es ??
            decodedSlug;

  return {
    title: t("metaTitle", {
      category: categoryName,
    }),

    description: t(
      "metaDescription",
      {
        category: categoryName,
      }
    ),

    openGraph: {
      title: `${categoryName} - Clé d'Infos`,

      description: t(
        "metaOgDescription",
        {
          category: categoryName,
        }
      ),

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title: `${categoryName} - Clé d'Infos`,

      description: t(
        "metaOgDescription",
        {
          category: categoryName,
        }
      ),
    },
  };
}

export default async function CategoryPage({
  params,
}: Props) {
  const t =
    await getTranslations(
      "CategoryPage"
    );

  const locale =
    await getLocale();

  const { slug } = await params;

  const decodedSlug =
    decodeURIComponent(slug);

  const posts =
    await getPostsByCategory(
      decodedSlug
    );

  const categories =
    await getCategories();

  const category =
    categories.find(
      (item: any) =>
        item.slug === decodedSlug
    );

  /*
  |--------------------------------------------------------------------------
  | CATEGORY NAME
  |--------------------------------------------------------------------------
  */

  const categoryName =
    locale === "es"
      ? category?.name_es ??
        category?.name_en ??
        category?.name_fr ??
        category?.name_ht ??
        decodedSlug
      : locale === "en"
        ? category?.name_en ??
          category?.name_fr ??
          category?.name_ht ??
          category?.name_es ??
          decodedSlug
        : locale === "ht"
          ? category?.name_ht ??
            category?.name_fr ??
            category?.name_en ??
            category?.name_es ??
            decodedSlug
          : category?.name_fr ??
            category?.name_en ??
            category?.name_ht ??
            category?.name_es ??
            decodedSlug;

  /*
  |--------------------------------------------------------------------------
  | LOCALIZE POSTS
  |--------------------------------------------------------------------------
  */

  const localizedPosts =
    posts.map((post: any) => {
      if (!post) return post;

      /*
      |--------------------------------------------------------------------------
      | CATEGORY
      |--------------------------------------------------------------------------
      */

      const localizedCategory =
        post.category
          ? {
              ...post.category,

              name:
                locale === "es"
                  ? post.category.name_es ??
                    post.category.name_en ??
                    post.category.name_fr ??
                    post.category.name_ht
                  : locale === "en"
                    ? post.category.name_en ??
                      post.category.name_fr ??
                      post.category.name_ht ??
                      post.category.name_es
                    : locale === "ht"
                      ? post.category.name_ht ??
                        post.category.name_fr ??
                        post.category.name_en ??
                        post.category.name_es
                      : post.category.name_fr ??
                        post.category.name_en ??
                        post.category.name_ht ??
                        post.category.name_es,
            }
          : null;

      /*
      |--------------------------------------------------------------------------
      | TITLE
      |--------------------------------------------------------------------------
      */

      const title =
        locale === "es"
          ? post.title_es ??
            post.title_en ??
            post.title_fr ??
            post.title_ht
          : locale === "en"
            ? post.title_en ??
              post.title_fr ??
              post.title_ht ??
              post.title_es
            : locale === "ht"
              ? post.title_ht ??
                post.title_fr ??
                post.title_en ??
                post.title_es
              : post.title_fr ??
                post.title_en ??
                post.title_ht ??
                post.title_es;

      /*
      |--------------------------------------------------------------------------
      | META DESCRIPTION
      |--------------------------------------------------------------------------
      */

      const metaDescription =
        locale === "es"
          ? post.meta_description_es ??
            post.meta_description_en ??
            post.meta_description_fr ??
            post.meta_description_ht
          : locale === "en"
            ? post.meta_description_en ??
              post.meta_description_fr ??
              post.meta_description_ht ??
              post.meta_description_es
            : locale === "ht"
              ? post.meta_description_ht ??
                post.meta_description_fr ??
                post.meta_description_en ??
                post.meta_description_es
              : post.meta_description_fr ??
                post.meta_description_en ??
                post.meta_description_ht ??
                post.meta_description_es;

      return {
        ...post,

        title:
          title ?? "",

        meta_description:
          metaDescription ?? "",

        category:
          localizedCategory,
      };
    });

  /*
  |--------------------------------------------------------------------------
  | PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">

      <Breadcrumb
        items={[
          {
            label: categoryName,
          },
        ]}
      />

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
        {categoryName}
      </h1>

      {localizedPosts.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">
          {t("noPosts")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">

          {localizedPosts.map(
            (post: any) => (
              <PostCard
                key={post.id}
                post={post}
              />
            )
          )}

        </div>
      )}

    </main>
  );
}