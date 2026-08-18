import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import PostCard from "@/components/PostCard";
import { getAuthor } from "@/lib/api";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const author = await getAuthor(slug);

  const t = await getTranslations("AuthorPage");

  return {
    title: t("metaTitle", {
      name: author.name,
    }),
    description:
      author.bio ||
      t("metaDescription", {
        name: author.name,
      }),
  };
}

export default async function AuthorPage({
  params,
}: Props) {
  const t = await getTranslations("AuthorPage");

  const { slug } = await params;

  const author = await getAuthor(slug);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">

      {/* AUTHOR PROFILE */}
      <section className="border rounded-2xl p-5 sm:p-6 md:p-8 bg-gray-50 dark:bg-slate-900 mb-10 sm:mb-12">

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">

          {/* PHOTO */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0">

            <Image
              src={
                author.photo_url
                  ? author.photo_url
                  : author.photo
                    ? `${process.env.NEXT_PUBLIC_API_URL?.replace(
                        "/api",
                        ""
                      )}/storage/${author.photo}`
                    : "/avatar.png"
              }
              alt={author.name}
              fill
              unoptimized
              sizes="160px"
              className="object-cover"
            />

          </div>

          {/* AUTHOR INFORMATION */}
          <div className="w-full text-center md:text-left">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
              {author.name}
            </h1>

            {author.job_title && (
              <p className="text-red-600 text-lg sm:text-xl mt-2">
                {author.job_title}
              </p>
            )}

            {author.bio && (
              <p className="mt-4 sm:mt-5 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-7">
                {author.bio}
              </p>
            )}

            {/* SOCIAL LINKS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mt-5">

              {author.facebook && (
                <Link
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-blue-600 hover:underline"
                >
                  Facebook
                </Link>
              )}

              {author.twitter && (
                <Link
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:underline"
                >
                  X
                </Link>
              )}

              {author.linkedin && (
                <Link
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-blue-700 hover:underline"
                >
                  LinkedIn
                </Link>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* AUTHOR ARTICLES */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
        {t("articlesBy", {
          name: author.name,
        })}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">

        {author.posts?.map((post: any) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}

      </div>

    </main>
  );
}