import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useFormatter } from "next-intl";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const t = useTranslations("PostCard");
  const format = useFormatter();

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="
        block
        bg-white
        dark:bg-slate-900
        rounded-xl
        overflow-hidden
        border
        border-gray-100
        dark:border-slate-800
        shadow-md
        hover:shadow-xl
        transition
        duration-300
      "
    >

      {/* ========================================
          IMAGE
      ======================================== */}

      <div
        className="
          relative
          w-full
          aspect-[16/9]
          overflow-hidden
          bg-gray-100
          dark:bg-slate-800
        "
      >

        {/* Blurred Background */}
        <Image
          src={post.image || "/placeholder.jpg"}
          alt=""
          fill
          unoptimized
          sizes="33vw"
          className="
            object-cover
            scale-110
            blur-xl
            opacity-70
          "
          aria-hidden="true"
        />

        {/* Soft Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-black/10
          "
        />

        {/* ========================================
            ORIGINAL IMAGE
            FULLY VISIBLE — NO CROP
        ======================================== */}

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={post.image || "/placeholder.jpg"}
            alt={post.title || "Article"}
            fill
            unoptimized
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-contain
            "
          />
        </div>

      </div>


      {/* ========================================
          CONTENT
      ======================================== */}

      <div className="p-4 sm:p-5">

        {/* Category */}
        <span
          className="
            text-xs
            sm:text-sm
            text-red-600
            font-semibold
            line-clamp-1
          "
        >
          {post.category?.name || ""}
        </span>


        {/* Title */}
        <h2
          className="
            text-lg
            sm:text-xl
            font-bold
            mt-2
            mb-2
            dark:text-white
            line-clamp-3
          "
        >
          {post.title}
        </h2>


        {/* Description */}
        <p
          className="
            text-sm
            sm:text-base
            text-gray-600
            dark:text-gray-300
            line-clamp-3
          "
        >
          {post.meta_description}
        </p>


        {/* Meta */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            justify-between
            gap-2
            mt-4
            text-xs
            sm:text-sm
            text-gray-500
          "
        >

          <span className="whitespace-nowrap">
            👁 {post.views} {t("views")}
          </span>

          <span className="whitespace-nowrap">
            {format.dateTime(new Date(post.published_at), {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

        </div>

      </div>

    </Link>
  );
}