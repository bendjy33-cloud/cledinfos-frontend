import Image from "next/image";
import Link from "next/link";

export default function TrendingPosts({
  posts,
}: {
  posts: any[];
}) {
  return (
    <section className="mt-10">

      <h2 className="text-2xl font-bold mb-6">
        📈 Tendances
      </h2>


      <div className="space-y-6">

        {posts.map((post, index) => (

          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="flex gap-4 items-center"
          >

            <span className="text-3xl font-bold">
              {index + 1}
            </span>


            <div className="relative w-24 h-20 rounded overflow-hidden">

              <Image
                src={post.image}
                alt={post.title}
                fill
                unoptimized
                className="object-cover"
              />

            </div>


            <div>

              <h3 className="font-bold line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-gray-500">
                👁 {post.views} vues
              </p>

            </div>


          </Link>

        ))}

      </div>

    </section>
  );
}