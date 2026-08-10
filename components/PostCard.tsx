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
      className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300"
    >

      <div className="relative h-56 w-full">

        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized
          className="object-cover"
        />

      </div>


      <div className="p-5">


        <span className="text-sm text-red-600 font-semibold">
          {post.category.name}
        </span>


        <h2 className="text-xl font-bold mt-2 mb-2 dark:text-white">
          {post.title}
        </h2>


        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.meta_description}
        </p>


        <div className="flex justify-between mt-4 text-sm text-gray-500">

          <span>
            👁 {post.views} {t("views")}
          </span>


          <span>
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