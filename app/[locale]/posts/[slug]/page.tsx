import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";
import ViewCounter from "@/components/ViewCounter";
import PostCard from "@/components/PostCard";
import TableOfContents from "@/components/TableOfContents";
import AuthorBox from "@/components/AuthorBox";
import Comments from "@/components/Comments";

import {
  getPost,
  getRelatedPosts,
} from "@/lib/api";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

const ORGANIZATION = {
  "@type": "NewsMediaOrganization",
  name: "Clé d'Infos",
  url: SITE_URL,

  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon-512.png`,
  },
};

/*
|--------------------------------------------------------------------------
| LOCALIZE POST
|--------------------------------------------------------------------------
*/

function localizePost(post: any, locale: string) {
  if (!post) return post;

  // TITLE
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

  // SUBTITLE
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

  // CONTENT
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

  // META DESCRIPTION
  const meta_description =
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

  // KEYWORDS
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

  // CATEGORY
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
    content: content ?? "",
    meta_description: meta_description ?? "",
    keywords: keywords ?? "",

    category,
  };
}

/*
|--------------------------------------------------------------------------
| METADATA
|--------------------------------------------------------------------------
*/

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const locale = await getLocale();

  const rawPost = await getPost(slug);

  if (!rawPost) {
    return {
      title: "Clé d'Infos",
    };
  }

  const post = localizePost(
    rawPost,
    locale
  );

  return {
    title: post.title,

    description:
      post.meta_description ||
      post.title,

    keywords: post.keywords
      ? post.keywords
          .split(",")
          .map((keyword: string) =>
            keyword.trim()
          )
      : [],

    alternates: {
      canonical:
        `${SITE_URL}/${locale}/posts/${post.slug}`,
    },

    openGraph: {
      title: post.title,

      description:
        post.meta_description ||
        post.title,

      url:
        `${SITE_URL}/${locale}/posts/${post.slug}`,

      siteName: "Clé d'Infos",

      type: "article",

      publishedTime:
        post.published_at,

      modifiedTime:
        post.updated_at ||
        post.published_at,

      section:
        post.category?.name,

      images: [
        {
          url:
            post.image ||
            `${SITE_URL}/placeholder.jpg`,

          width: 1200,

          height: 630,

          alt:
            post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title:
        post.title,

      description:
        post.meta_description ||
        post.title,

      images: [
        post.image ||
        `${SITE_URL}/placeholder.jpg`,
      ],
    },
  };
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default async function PostPage({
  params,
}: Props) {
  const { slug } = await params;

  const locale = await getLocale();

  const t =
    await getTranslations("PostPage");

  /*
  |--------------------------------------------------------------------------
  | GET POST
  |--------------------------------------------------------------------------
  */

  const rawPost =
    await getPost(slug);

  if (!rawPost) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | LOCALIZED POST
  |--------------------------------------------------------------------------
  */

  const post =
    localizePost(
      rawPost,
      locale
    );

  /*
  |--------------------------------------------------------------------------
  | RELATED POSTS
  |--------------------------------------------------------------------------
  */

  const rawRelated =
    await getRelatedPosts(slug);

  const related =
    Array.isArray(rawRelated)
      ? rawRelated.map(
          (item: any) =>
            localizePost(
              item,
              locale
            )
        )
      : [];

  /*
  |--------------------------------------------------------------------------
  | DATE LOCALE
  |--------------------------------------------------------------------------
  */

  const localeMap: Record<
    string,
    string
  > = {
    fr: "fr-FR",
    en: "en-US",
    ht: "fr-HT",
    es: "es-ES",
  };

  /*
  |--------------------------------------------------------------------------
  | JSON-LD
  |--------------------------------------------------------------------------
  */

  const jsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "NewsArticle",

    headline:
      post.title,

    description:
      post.meta_description ||
      post.title,

    keywords:
      post.keywords,

    articleSection:
      post.category?.name,

    image: [
      {
        "@type":
          "ImageObject",

        url:
          post.image ||
          `${SITE_URL}/placeholder.jpg`,

        width: 1200,

        height: 630,
      },
    ],

    datePublished:
      post.published_at,

    dateModified:
      post.updated_at ||
      post.published_at,

    mainEntityOfPage: {
      "@type":
        "WebPage",

      "@id":
        `${SITE_URL}/${locale}/posts/${post.slug}`,
    },

    author: {
      "@type":
        "Person",

      name:
        post.author?.name ||
        "Clé d'Infos",

      url: post.author?.slug
        ? `${SITE_URL}/${locale}/authors/${post.author.slug}`
        : SITE_URL,
    },

    publisher:
      ORGANIZATION,
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <main
      className="
        max-w-6xl
        mx-auto
        px-4
        sm:px-6
        py-6
        sm:py-10
        text-gray-900
        dark:text-white
      "
    >

      {/* VIEW COUNTER */}

      <ViewCounter
        slug={post.slug}
      />


      {/* JSON-LD */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(jsonLd),
        }}
      />


      {/* BREADCRUMB */}

      <Breadcrumb
        items={[
          ...(post.category?.name
            ? [
                {
                  label:
                    post.category.name,

                  href:
                    `/categories/${post.category.slug}`,
                },
              ]
            : []),

          {
            label:
              post.title,
          },
        ]}
      />


      {/* ARTICLE HEADER */}

      <section className="mb-12">

        {/* CATEGORY */}

        {post.category?.name && (
          <span
            className="
              inline-block
              bg-red-600
              text-white
              px-3
              py-1
              rounded-full
              text-sm
            "
          >
            {post.category.name}
          </span>
        )}


        {/* TITLE */}

        <h1
          className="
            text-4xl
            sm:text-5xl
            font-bold
            leading-tight
            mt-5
            mb-3
            text-gray-900
            dark:text-white
          "
        >
          {post.title}
        </h1>


        {/* SUBTITLE */}

        {post.subtitle && (
          <p
            className="
              text-xl
              sm:text-2xl
              text-gray-900
              dark:text-gray-200
              leading-relaxed
              mb-5
            "
          >
            {post.subtitle}
          </p>
        )}


        {/* META */}

        <div
          className="
            flex
            flex-wrap
            gap-6
            text-gray-500
            dark:text-gray-400
            mb-8
          "
        >

          <span>
            👁️{" "}
            {post.views}{" "}
            {t("views")}
          </span>

          <span>
            📅{" "}

            {post.published_at
              ? new Date(
                  post.published_at
                ).toLocaleDateString(
                  localeMap[locale] ??
                    "fr-FR"
                )
              : ""}
          </span>

        </div>


        {/* IMAGE */}

        <div
          className="
            relative
            w-full
            aspect-video
            rounded-2xl
            overflow-hidden
            bg-gray-100
            dark:bg-slate-800
          "
        >
          <Image
            src={
              post.image ||
              "/placeholder.jpg"
            }
            alt={
              post.title ||
              "Article"
            }
            fill
            priority
            unoptimized
            className="object-contain"
          />
        </div>

      </section>


      {/* TABLE OF CONTENTS */}

      <TableOfContents />


      {/* ARTICLE CONTENT */}

      <article
        className="
          prose
          lg:prose-lg
          max-w-none
          prose-img:rounded-xl
          prose-headings:scroll-mt-28
          text-gray-900
          dark:text-gray-200
          dark:prose-invert
        "
        dangerouslySetInnerHTML={{
          __html:
            post.content ||
            "",
        }}
      />


      {/* COMMENTS */}

      <Comments
        slug={post.slug}
      />


      {/* TAGS */}

      {post.tags &&
        post.tags.length > 0 && (
          <section className="mt-10">

            <h3
              className="
                text-2xl
                font-bold
                mb-4
                text-gray-900
                dark:text-white
              "
            >
              {t("tags")}
            </h3>


            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              {post.tags.map(
                (tag: any) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-gray-100
                      text-gray-700
                      dark:bg-slate-800
                      dark:text-gray-200
                      hover:bg-red-600
                      hover:text-white
                      transition
                    "
                  >
                    #{tag.name}
                  </Link>
                )
              )}

            </div>

          </section>
        )}


      {/* SHARE */}

      <section
        className="
          mt-12
          border-t
          border-gray-200
          dark:border-slate-700
          pt-8
        "
      >

        <h3
          className="
            text-2xl
            font-bold
            mb-5
            text-gray-900
            dark:text-white
          "
        >
          {t("share")}
        </h3>


        <div
          className="
            flex
            flex-wrap
            gap-4
          "
        >

          {/* FACEBOOK */}

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `${SITE_URL}/${locale}/posts/${post.slug}`
              )}`
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-lg
            "
          >
            Facebook
          </a>


          {/* WHATSAPP */}

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              `https://wa.me/?text=${encodeURIComponent(
                `${SITE_URL}/${locale}/posts/${post.slug}`
              )}`
            }
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              py-3
              rounded-lg
            "
          >
            WhatsApp
          </a>


          {/* X */}

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                `${SITE_URL}/${locale}/posts/${post.slug}`
              )}`
            }
            className="
              bg-black
              hover:bg-gray-800
              text-white
              px-5
              py-3
              rounded-lg
            "
          >
            X
          </a>

        </div>

      </section>


      {/* AUTHOR */}

      <AuthorBox
        author={
          post.author
        }
        published_at={
          post.published_at
        }
      />


      {/* RELATED POSTS */}

      {related.length > 0 && (
        <section className="mt-20">

          <h2
            className="
              text-3xl
              sm:text-4xl
              font-bold
              mb-8
              text-gray-900
              dark:text-white
            "
          >
            {t("related")}
          </h2>


          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {related.map(
              (item: any) => (
                <PostCard
                  key={item.id}
                  post={item}
                />
              )
            )}

          </div>

        </section>
      )}

    </main>
  );
}