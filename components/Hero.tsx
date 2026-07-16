import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export default function Hero({ post }: Props) {
  if (!post) return null;

  return (
    <section className="relative h-[500px] rounded-2xl overflow-hidden mb-10">

      <Image
        src={post.image}
        alt={post.title}
        fill
        priority
        unoptimized
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60 flex items-end">

        <div className="p-8 text-white">

          <span className="bg-red-600 px-3 py-1 rounded text-sm">
            {post.category.name}
          </span>

          <h1 className="text-5xl font-bold mt-4">
            {post.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg">
            {post.meta_description}
          </p>

          <Link
            href={`/posts/${post.slug}`}
            className="inline-block mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
          >
            Lire l'article →
          </Link>

        </div>

      </div>

    </section>
  );
}