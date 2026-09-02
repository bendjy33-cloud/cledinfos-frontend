"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  useTranslations,
  useFormatter,
  useLocale,
} from "next-intl";

type LocalizedJobTitle = {
  fr?: string | null;
  en?: string | null;
  ht?: string | null;
  es?: string | null;
};

type Author = {
  name: string;
  slug: string;
  photo?: string | null;
  photo_url?: string | null;

  job_title?: LocalizedJobTitle | null;

  bio_fr?: string | null;
  bio_en?: string | null;
  bio_ht?: string | null;
  bio_es?: string | null;

  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
};

type Props = {
  author: Author;
  published_at: string;
};

export default function AuthorBox({
  author,
  published_at,
}: Props) {
  const t = useTranslations("AuthorBox");
  const format = useFormatter();
  const locale = useLocale();

  if (!author) {
    return null;
  }

  const authorPhoto =
    author.photo_url ||
    author.photo ||
    "/avatar.png";

  /*
  |--------------------------------------------------------------------------
  | LOCALIZED JOB TITLE
  |--------------------------------------------------------------------------
  */

  const authorJobTitle =
    locale === "en"
      ? author.job_title?.en ??
        author.job_title?.fr ??
        author.job_title?.ht ??
        author.job_title?.es
      : locale === "ht"
        ? author.job_title?.ht ??
          author.job_title?.fr ??
          author.job_title?.en ??
          author.job_title?.es
        : locale === "es"
          ? author.job_title?.es ??
            author.job_title?.fr ??
            author.job_title?.en ??
            author.job_title?.ht
          : author.job_title?.fr ??
            author.job_title?.en ??
            author.job_title?.ht ??
            author.job_title?.es;

  /*
  |--------------------------------------------------------------------------
  | LOCALIZED BIO
  |--------------------------------------------------------------------------
  */

  const authorBio =
    locale === "en"
      ? author.bio_en ??
        author.bio_fr ??
        author.bio_ht ??
        author.bio_es
      : locale === "ht"
        ? author.bio_ht ??
          author.bio_fr ??
          author.bio_en ??
          author.bio_es
        : locale === "es"
          ? author.bio_es ??
            author.bio_fr ??
            author.bio_en ??
            author.bio_ht
          : author.bio_fr ??
            author.bio_en ??
            author.bio_ht ??
            author.bio_es;

  return (
    <section
      className="
        mt-12
        rounded-2xl
        border
        border-gray-200
        bg-gray-50
        p-6
        text-gray-900
        max-sm:!text-black
        max-sm:[&_*]:!text-black
      "
    >
      <h3
        className="
          text-2xl
          font-bold
          mb-6
          text-gray-900
          max-sm:!text-black
        "
      >
        {t("aboutAuthor")}
      </h3>

      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-6
        "
      >
        {/* AUTHOR PHOTO */}

        <div className="shrink-0">
          <div
            className="
              relative
              w-28
              h-28
              rounded-full
              overflow-hidden
              border
              border-gray-200
              bg-gray-100
              flex
              items-center
              justify-center
            "
          >
            <Image
              src={authorPhoto}
              alt={author.name}
              fill
              unoptimized
              sizes="112px"
              className="object-contain"
            />
          </div>
        </div>

        {/* AUTHOR INFORMATION */}

        <div
          className="
            flex-1
            text-gray-900
            max-sm:!text-black
            max-sm:[&_*]:!text-black
          "
        >
          {/* NAME */}

          <Link
            href={`/authors/${author.slug}`}
            className="
              text-2xl
              font-bold
              text-gray-900
              hover:text-red-600
              transition
              max-sm:!text-black
            "
          >
            {author.name}
          </Link>

          {/* JOB TITLE */}

          {authorJobTitle && (
            <p
              className="
                text-red-600
                font-medium
                mt-1
                max-sm:!text-black
              "
            >
              {authorJobTitle}
            </p>
          )}

          {/* PUBLISHED DATE */}

          <p
            className="
              text-gray-500
              mt-3
              max-sm:!text-black
            "
          >
            {t("publishedOn")}{" "}

            {format.dateTime(
              new Date(published_at),
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>

          {/* BIO */}

          {authorBio && (
            <p
              className="
                mt-5
                text-gray-700
                leading-7
                max-sm:!text-black
              "
            >
              {authorBio}
            </p>
          )}

          {/* SOCIAL LINKS */}

          <div
            className="
              flex
              flex-wrap
              gap-4
              mt-6
            "
          >
            {author.facebook && (
              <a
                href={author.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-blue-600
                  hover:underline
                  max-sm:!text-black
                "
              >
                Facebook
              </a>
            )}

            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-gray-900
                  hover:underline
                  transition
                  max-sm:!text-black
                "
              >
                X
              </a>
            )}

            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-blue-700
                  hover:underline
                  max-sm:!text-black
                "
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}