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
        w-full
        max-w-6xl
        mx-auto

        px-4
        sm:px-6
        lg:px-8

        pt-24
        sm:pt-28

        pb-10

        bg-[var(--background)]

        text-gray-900
        dark:text-white

        max-sm:text-black
        max-sm:[&_*]:text-black
      "
    >

      {/* =====================================================
          VIEW COUNTER
      ===================================================== */}

      <ViewCounter
        slug={post.slug}
      />


      {/* =====================================================
          JSON-LD
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(jsonLd),
        }}
      />


      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div
        className="
          text-gray-600
          dark:text-gray-300

          max-sm:!text-black
          max-sm:[&_*]:!text-black
        "
      >
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
      </div>


      {/* =====================================================
          ARTICLE HEADER
      ===================================================== */}

      <section
        className="
          mb-12

          text-gray-900
          dark:text-white

          max-sm:!text-black
          max-sm:[&_*]:!text-black
        "
      >

        {/* CATEGORY */}

        {post.category?.name && (
          <span
            className="
              inline-block

              bg-red-600
              text-white

              max-sm:!text-white

              px-3
              py-1

              rounded-full

              text-sm
              font-semibold
            "
          >
            {post.category.name}
          </span>
        )}


        {/* =====================================================
            TITLE
        ===================================================== */}

        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl

            font-bold
            leading-tight

            mt-5
            mb-4

            !text-gray-900
            dark:!text-white

            max-sm:!text-black
          "
        >
          {post.title}
        </h1>


        {/* =====================================================
            SUBTITLE
        ===================================================== */}

        {post.subtitle && (
          <p
            className="
              text-lg
              sm:text-xl
              md:text-2xl

              leading-relaxed

              mb-5

              !text-gray-700
              dark:!text-gray-200

              max-sm:!text-black
            "
          >
            {post.subtitle}
          </p>
        )}


        {/* =====================================================
            META
        ===================================================== */}

        <div
          className="
            flex
            flex-wrap

            gap-4
            sm:gap-6

            mb-8

            text-sm
            sm:text-base

            !text-gray-600
            dark:!text-gray-300

            max-sm:!text-black
            max-sm:[&_*]:!text-black
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


        {/* =====================================================
            ARTICLE IMAGE
        ===================================================== */}

        <div
          className="
            relative
            w-full

            aspect-video

            rounded-2xl
            overflow-hidden

            bg-gray-100
            dark:bg-gray-800

            border
            border-gray-200
            dark:border-gray-700
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

            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 90vw,
              1200px
            "

            className="
              object-contain
            "
          />

        </div>

      </section>


      {/* =====================================================
          TABLE OF CONTENTS
      ===================================================== */}

      <div
        className="
          text-gray-900
          dark:text-white

          max-sm:!text-black
          max-sm:[&_*]:!text-black
        "
      >
        <TableOfContents />
      </div>


      {/* =====================================================
          ARTICLE CONTENT
      ===================================================== */}

      <article
        className="
          prose
          prose-lg
          max-w-none

          !text-gray-800

          prose-headings:!text-gray-900
          prose-headings:font-bold

          prose-p:!text-gray-800
          prose-p:leading-8

          prose-li:!text-gray-800

          prose-strong:!text-gray-900

          prose-a:!text-red-600

          prose-img:rounded-xl

          prose-headings:scroll-mt-28

          dark:prose-invert

          dark:prose-headings:!text-white
          dark:prose-p:!text-gray-200
          dark:prose-li:!text-gray-200
          dark:prose-strong:!text-white
          dark:prose-a:!text-red-400

          /* MOBILE - TOUT NOU */
          max-sm:!text-black

          max-sm:[&_h1]:!text-black
          max-sm:[&_h2]:!text-black
          max-sm:[&_h3]:!text-black
          max-sm:[&_h4]:!text-black
          max-sm:[&_h5]:!text-black
          max-sm:[&_h6]:!text-black

          max-sm:[&_p]:!text-black

          max-sm:[&_span]:!text-black

          max-sm:[&_li]:!text-black

          max-sm:[&_strong]:!text-black

          max-sm:[&_b]:!text-black

          max-sm:[&_em]:!text-black

          max-sm:[&_blockquote]:!text-black

          max-sm:[&_td]:!text-black
          max-sm:[&_th]:!text-black

          max-sm:[&_figcaption]:!text-black
        "
        dangerouslySetInnerHTML={{
          __html:
            post.content ||
            "",
        }}
      />


      {/* =====================================================
          COMMENTS
      ===================================================== */}

      <section
        className="
          mt-12

          text-gray-900
          dark:text-white

          max-sm:!text-black
          max-sm:[&_*]:!text-black

          [&_p]:!text-gray-900
          dark:[&_p]:!text-white

          [&_h1]:!text-gray-900
          [&_h2]:!text-gray-900
          [&_h3]:!text-gray-900
          [&_h4]:!text-gray-900

          dark:[&_h1]:!text-white
          dark:[&_h2]:!text-white
          dark:[&_h3]:!text-white
          dark:[&_h4]:!text-white

          max-sm:[&_p]:!text-black
          max-sm:[&_h1]:!text-black
          max-sm:[&_h2]:!text-black
          max-sm:[&_h3]:!text-black
          max-sm:[&_h4]:!text-black

          max-sm:[&_span]:!text-black
          max-sm:[&_label]:!text-black

          max-sm:[&_input]:!text-black
          max-sm:[&_textarea]:!text-black
        "
      >

        <Comments
          slug={post.slug}
        />

      </section>


      {/* =====================================================
          TAGS
      ===================================================== */}

      {post.tags &&
        post.tags.length > 0 && (
          <section
            className="
              mt-10

              text-gray-900
              dark:text-white

              max-sm:!text-black
              max-sm:[&_*]:!text-black
            "
          >

            <h3
              className="
                text-2xl
                font-bold

                mb-4

                !text-gray-900
                dark:!text-white

                max-sm:!text-black
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
                      dark:bg-gray-800

                      !text-gray-700
                      dark:!text-gray-200

                      hover:bg-red-600
                      hover:!text-white

                      transition

                      max-sm:!text-black
                    "
                  >
                    #{tag.name}
                  </Link>
                )
              )}

            </div>

          </section>
        )}


      {/* =====================================================
          SHARE
      ===================================================== */}

      <section
        className="
          mt-12

          border-t

          border-gray-200
          dark:border-gray-700

          pt-8

          max-sm:text-black
        "
      >

        <h3
          className="
            text-2xl
            font-bold

            mb-5

            !text-gray-900
            dark:!text-white

            max-sm:!text-black
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

              !text-white

              px-5
              py-3

              rounded-lg

              font-semibold

              transition
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

              !text-white

              px-5
              py-3

              rounded-lg

              font-semibold

              transition
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

              !text-white

              px-5
              py-3

              rounded-lg

              font-semibold

              transition
            "
          >
            X
          </a>

        </div>

      </section>


      {/* =====================================================
          AUTHOR
      ===================================================== */}

      <section
        className="
          mt-10

          text-gray-900
          dark:text-white

          max-sm:!text-black
          max-sm:[&_*]:!text-black

          [&_h1]:!text-gray-900
          [&_h2]:!text-gray-900
          [&_h3]:!text-gray-900
          [&_h4]:!text-gray-900

          [&_p]:!text-gray-700
          [&_span]:!text-gray-700

          dark:[&_h1]:!text-white
          dark:[&_h2]:!text-white
          dark:[&_h3]:!text-white
          dark:[&_h4]:!text-white

          dark:[&_p]:!text-gray-200
          dark:[&_span]:!text-gray-200

          max-sm:[&_h1]:!text-black
          max-sm:[&_h2]:!text-black
          max-sm:[&_h3]:!text-black
          max-sm:[&_h4]:!text-black

          max-sm:[&_p]:!text-black
          max-sm:[&_span]:!text-black
          max-sm:[&_strong]:!text-black
          max-sm:[&_b]:!text-black
        "
      >

        <AuthorBox
          author={
            post.author
          }

          published_at={
            post.published_at
          }
        />

      </section>


      {/* =====================================================
          RELATED POSTS
      ===================================================== */}

      {related.length > 0 && (
        <section
          className="
            mt-20

            max-sm:text-black
          "
        >

          <h2
            className="
              text-3xl
              sm:text-4xl

              font-bold

              mb-8

              !text-gray-900
              dark:!text-white

              max-sm:!text-black
            "
          >
            {t("related")}
          </h2>


          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3

              gap-6
              md:gap-8
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