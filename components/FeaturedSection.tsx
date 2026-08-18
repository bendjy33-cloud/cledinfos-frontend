import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Post } from "@/types/post";

type Props = {
  posts: Post[];
};

export default function FeaturedSection({ posts }: Props) {
  const t = useTranslations("FeaturedSection");

  if (!posts.length) return null;

  return (
    <section className="mb-10 md:mb-12">

      <h2 className="text-2xl sm:text-3xl font-bold mb-5 md:mb-6">
        ⭐ {t("title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        {posts.map((post) => (

          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
          >

            <div className="relative h-48 sm:h-52 md:h-56 w-full">

              <Image
                src={post.image}
                alt={post.title || "Featured article"}
                fill
                unoptimized
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  25vw
                "
                className="object-cover"
              />

            </div>

            <div className="p-4">

              <p className="text-sm text-red-600 font-semibold line-clamp-1">
                {post.category?.name || ""}
              </p>

              <h3 className="font-bold mt-2 text-base sm:text-lg line-clamp-3">
                {post.title}
              </h3>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}