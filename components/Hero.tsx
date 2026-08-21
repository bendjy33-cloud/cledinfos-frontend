import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export default async function Hero({ post }: Props) {
  const t = await getTranslations("Hero");

  if (!post) return null;

  return (
    <section className="relative w-full
          aspect-[16/10]
          sm:aspect-[16/9]
          md:aspect-auto
          md:h-[480px]
          lg:h-[500px]
          rounded-xl
          sm:rounded-2xl
          overflow-hidden
          mb-8
          md:mb-10
        "
      >

      <Image
        src={post.image}
        alt={post.title || "Featured article"}
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-contain"
      />

      <div className="absolute inset-0 bg-black/60 flex items-end">

        <div className="w-full p-5 sm:p-6 md:p-8 text-white">

          {post.category?.name && (
            <span className="inline-block bg-red-600 px-3 py-1 rounded text-xs sm:text-sm">
              {post.category.name}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-4 leading-tight line-clamp-3">
            {post.title}
          </h1>

          {post.meta_description && (
            <p className="mt-3 md:mt-4 max-w-2xl text-sm sm:text-base md:text-lg line-clamp-3">
              {post.meta_description}
            </p>
          )}

          <Link
            href={`/posts/${post.slug}`}
            className="inline-block mt-4 md:mt-6 bg-red-600 hover:bg-red-700 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition"
          >
            {t("readArticle")} →
          </Link>

        </div>

      </div>

    </section>
  );
}