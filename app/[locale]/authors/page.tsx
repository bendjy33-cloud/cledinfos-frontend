import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getAuthors } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AuthorsPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AuthorsPage() {
  const t = await getTranslations("AuthorsPage");

  const authors = await getAuthors();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 text-center md:text-left">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">

        {authors.map((author: any) => (
          <Link
            key={author.id}
            href={`/authors/${author.slug}`}
            className="
              block
              border
              rounded-xl
              p-5
              sm:p-6
              bg-white
              dark:bg-slate-900
              hover:shadow-lg
              hover:-translate-y-1
              transition
              duration-300
            "
          >

            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden">

              <Image
                src={
                  author.photo_url
                    ? author.photo_url
                    : author.photo
                      ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/storage/${author.photo}`
                      : "/avatar.png"
                }
                alt={author.name}
                fill
                unoptimized
                sizes="112px"
                className="object-cover"
              />

            </div>

            <h2 className="text-lg sm:text-xl font-bold text-center mt-4 sm:mt-5 line-clamp-2">
              {author.name}
            </h2>

            {author.job_title && (
              <p className="text-center text-sm sm:text-base text-red-600 mt-1">
                {author.job_title}
              </p>
            )}

          </Link>
        ))}

      </div>

    </main>
  );
}