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

      {/* TITLE */}
      <h2
        className="
          text-xl
          sm:text-2xl
          font-bold
          mb-5
          md:mb-6
          text-gray-900
          dark:text-white
        "
      >
        📈 {t("title")}
      </h2>

      {/* POSTS */}
      <div className="space-y-4 md:space-y-6">

        {posts.map((post, index) => (

          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="
              flex
              items-center
              gap-3
              sm:gap-4
              group
              min-w-0
            "
          >

            {/* NUMBER */}
            <span
              className="
                text-2xl
                sm:text-3xl
                font-bold
                shrink-0
                text-gray-700
                dark:text-gray-300
              "
            >
              {index + 1}
            </span>

            {/* IMAGE */}
            <div
              className="
                relative
                w-20
                h-16
                sm:w-24
                sm:h-20
                rounded-lg
                overflow-hidden
                shrink-0
              "
            >
              <Image
                src={post.image || "/placeholder.jpg"}
                alt={post.title || "Article"}
                fill
                unoptimized
                sizes="96px"
                className="
                  object-cover
                  group-hover:scale-105
                  transition
                  duration-300
                "
              />
            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">

              {/* POST TITLE */}
              <h3
                className="
                  font-bold
                  text-sm
                  sm:text-base
                  line-clamp-2
                  text-gray-900
                  dark:text-white
                  group-hover:text-red-600
                  dark:group-hover:text-red-400
                  transition
                "
              >
                {post.title}
              </h3>

              {/* VIEWS */}
              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                  dark:text-gray-400
                  mt-1
                "
              >
                👁 {post.views} {t("views")}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}