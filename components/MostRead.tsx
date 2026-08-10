import {Link} from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Post } from "@/types/post";

type Props = {
  posts: Post[];
};

export default function MostRead({ posts }: Props) {

  const t = useTranslations("MostRead");


  return (
    <section className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        🔥 {t("title")}
      </h2>


      <ul className="space-y-4">

        {posts.map((post, index) => (

          <li key={post.id}>

            <Link
              href={`/posts/${post.slug}`}
              className="hover:text-red-600"
            >

              <span className="font-bold mr-2">
                {index + 1}.
              </span>


              {post.title}

            </Link>

          </li>

        ))}

      </ul>

    </section>
  );
}