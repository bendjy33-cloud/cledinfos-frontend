import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getPostsByCategory, getCategories } from "@/lib/api";
import Breadcrumb from "@/components/Breadcrumb";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};


export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { slug } = await params;

  const categories = await getCategories();

  const category = categories.find(
    (item: any) => item.slug === slug
  );

  const t = await getTranslations("CategoryPage");


  const title = category
    ? category.name
    : slug;


  return {
    title: t("metaTitle", {
      category: title
    }),

    description: t("metaDescription", {
      category: title
    }),

    openGraph: {
      title: `${title} - Clé d'Infos`,
      description: t("metaOgDescription", {
        category: title
      }),
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} - Clé d'Infos`,
      description: t("metaOgDescription", {
        category: title
      }),
    },
  };
}



export default async function CategoryPage({ params }: Props) {

  const t = await getTranslations("CategoryPage");

  const { slug } = await params;

  const posts = await getPostsByCategory(slug);


  const categoryName =
    posts.length > 0
      ? posts[0].category.name
      : slug;


  return (
    <main className="max-w-7xl mx-auto px-6 py-8">


      <Breadcrumb
        items={[
          {
            label: categoryName,
          },
        ]}
      />


      <h1 className="text-4xl font-bold mb-8">
        {categoryName}
      </h1>


      {posts.length === 0 ? (

        <p className="text-gray-500">
         {t("noPosts")}
        </p>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post: any) => (

            <PostCard
              key={post.id}
              post={post}
            />

          ))}

        </div>

      )}


    </main>
  );
}