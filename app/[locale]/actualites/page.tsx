import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/api";
import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ActualitesPage");

  return {
    title: t("title"),
    description: t("description"),
  };
}

// =====================================================
// LOCALIZE POST
// =====================================================

function localizePost(post: any, locale: string) {
  if (!post) return post;

  const title =
    locale === "en"
      ? post.title_en ??
        post.title_fr ??
        post.title_ht ??
        post.title_es
      : locale === "ht"
        ? post.title_ht ??
          post.title_fr ??
          post.title_en ??
          post.title_es
        : locale === "es"
          ? post.title_es ??
            post.title_fr ??
            post.title_en ??
            post.title_ht
          : post.title_fr ??
            post.title_en ??
            post.title_ht ??
            post.title_es;

  const subtitle =
    locale === "en"
      ? post.subtitle_en ??
        post.subtitle_fr ??
        post.subtitle_ht ??
        post.subtitle_es
      : locale === "ht"
        ? post.subtitle_ht ??
          post.subtitle_fr ??
          post.subtitle_en ??
          post.subtitle_es
        : locale === "es"
          ? post.subtitle_es ??
            post.subtitle_fr ??
            post.subtitle_en ??
            post.subtitle_ht
          : post.subtitle_fr ??
            post.subtitle_en ??
            post.subtitle_ht ??
            post.subtitle_es;

  const metaDescription =
    locale === "en"
      ? post.meta_description_en ??
        post.meta_description_fr ??
        post.meta_description_ht ??
        post.meta_description_es
      : locale === "ht"
        ? post.meta_description_ht ??
          post.meta_description_fr ??
          post.meta_description_en ??
          post.meta_description_es
        : locale === "es"
          ? post.meta_description_es ??
            post.meta_description_fr ??
            post.meta_description_en ??
            post.meta_description_ht
          : post.meta_description_fr ??
            post.meta_description_en ??
            post.meta_description_ht ??
            post.meta_description_es;

  const content =
    locale === "en"
      ? post.content_en ??
        post.content_fr ??
        post.content_ht ??
        post.content_es
      : locale === "ht"
        ? post.content_ht ??
          post.content_fr ??
          post.content_en ??
          post.content_es
        : locale === "es"
          ? post.content_es ??
            post.content_fr ??
            post.content_en ??
            post.content_ht
          : post.content_fr ??
            post.content_en ??
            post.content_ht ??
            post.content_es;

  const keywords =
    locale === "en"
      ? post.keywords_en ??
        post.keywords_fr ??
        post.keywords_ht ??
        post.keywords_es
      : locale === "ht"
        ? post.keywords_ht ??
          post.keywords_fr ??
          post.keywords_en ??
          post.keywords_es
        : locale === "es"
          ? post.keywords_es ??
            post.keywords_fr ??
            post.keywords_en ??
            post.keywords_ht
          : post.keywords_fr ??
            post.keywords_en ??
            post.keywords_ht ??
            post.keywords_es;

  // =====================================================
  // CATEGORY
  // =====================================================

  const category = post.category
    ? {
        ...post.category,

        name:
          locale === "en"
            ? post.category.name_en ??
              post.category.name_fr ??
              post.category.name_ht ??
              post.category.name_es
            : locale === "ht"
              ? post.category.name_ht ??
                post.category.name_fr ??
                post.category.name_en ??
                post.category.name_es
              : locale === "es"
                ? post.category.name_es ??
                  post.category.name_fr ??
                  post.category.name_en ??
                  post.category.name_ht
                : post.category.name_fr ??
                  post.category.name_en ??
                  post.category.name_ht ??
                  post.category.name_es,
      }
    : null;

  return {
    ...post,

    title: title ?? "",
    subtitle: subtitle ?? "",
    meta_description: metaDescription ?? "",
    content: content ?? "",
    keywords: keywords ?? "",

    category,
  };
}

// =====================================================
// PAGE
// =====================================================

export default async function ActualitesPage({
  searchParams,
}: Props) {
  const t = await getTranslations("ActualitesPage");
  const locale = await getLocale();

  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const posts = await getPosts(page);

  // =====================================================
  // LOCALIZE POSTS
  // =====================================================

  const localizedPosts = (posts.data ?? []).map(
    (post: any) => localizePost(post, locale)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">

      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <Breadcrumb
        items={[
          {
            label: t("breadcrumb"),
          },
        ]}
      />

      {/* =================================================
          PAGE TITLE
      ================================================= */}

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        {t("title")}
      </h1>

      {/* =================================================
          POSTS
      ================================================= */}

      {localizedPosts.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">
          {t("noPosts")}
        </p>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            sm:gap-6
            md:gap-8
          "
        >
          {localizedPosts.map((post: any) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}

      {/* =================================================
          PAGINATION
      ================================================= */}

      {posts.meta && posts.meta.last_page > 1 && (
        <div className="mt-8 sm:mt-10 md:mt-12">
          <Pagination
            currentPage={posts.meta.current_page}
            lastPage={posts.meta.last_page}
          />
        </div>
      )}

    </main>
  );
}