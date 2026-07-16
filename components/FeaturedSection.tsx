import Link from "next/link";
import { Post } from "@/types/post";

type Props = {
  posts: Post[];
};

export default function FeaturedSection({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">
        ⭐ Featured News
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <p className="text-sm text-red-600 font-semibold">
                {post.category.name}
              </p>

              <h3 className="font-bold mt-2">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}