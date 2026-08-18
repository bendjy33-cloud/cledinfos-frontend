import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function TrendingPosts({
  posts,
}: {
  posts: any[];
}) {
  const t = useTranslations("TrendingPosts");

  if (!posts?.length) return null;

  return (
    <section className="mt-6 md:mt-10">

      <h2 className="text-xl sm:text-2xl font-bold mb-5 md:mb-6">
        📈 {t("title")}
      </h2>

      <div className="space-y-4 md:space-y-6">

        {posts.map((post, index) => (

          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="flex items-center gap-3 sm:gap-4 group min-w-0"
          >

            {/* Number */}
            <span className="text-2xl sm:text-3xl font-bold shrink-0 text-gray-700 dark:text-gray-300">
              {index + 1}
            </span>

            {/* Image */}
            <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden shrink-0">

              <Image
                src={post.image}
                alt={post.title || "Article"}
                fill
                unoptimized
                sizes="96px"
                className="object-cover group-hover:scale-105 transition duration-300"
              />

            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">

              <h3 className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-red-600 transition">
                {post.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                👁 {post.views} {t("views")}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}