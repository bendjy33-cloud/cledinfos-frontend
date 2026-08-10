import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/api";
import { Post } from "@/types/post";
import { getTranslations } from "next-intl/server";


type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};



export async function generateMetadata() {

  const t = await getTranslations("news");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),

    keywords: [
      "actualité",
      "news",
      "Clé d’Infos",
      "information",
    ],

    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      siteName: "Clé d’Infos",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}



export default async function NewsPage({
  searchParams,
}: Props) {


  const params = await searchParams;

  const page = Number(params.page ?? 1);


  const response = await getPosts(page);

  const posts = response.data;


  const t = await getTranslations("news");


  return (
    <>

      <Header />


      <main className="max-w-7xl mx-auto px-6 py-8">


        <h1 className="text-5xl font-bold mb-10">
          {t("title")}
        </h1>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post: Post) => (

            <PostCard
              key={post.id}
              post={post}
            />

          ))}

        </div>


        <Pagination
          currentPage={response.meta.current_page}
          lastPage={response.meta.last_page}
        />


      </main>

    </>
  );
}