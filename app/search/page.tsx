import PostCard from "@/components/PostCard";
import { searchPosts } from "@/lib/api";
import Breadcrumb from "@/components/Breadcrumb";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const query = params.q?.trim() ?? "";

  const posts = query
    ? await searchPosts(query)
    : [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <Breadcrumb
        items={[
          {
            label: "Recherche",
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-3">
        Recherche
      </h1>

      {query ? (
        <p className="text-gray-600 mb-8">
          {posts.length} résultat(s) pour <strong>"{query}"</strong>
        </p>
      ) : (
        <p className="text-gray-600 mb-8">
          Tapez un mot dans la barre de recherche.
        </p>
      )}

      {posts.length === 0 ? (
        <div className="bg-gray-100 rounded-xl p-10 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Aucun article trouvé
          </h2>

          <p className="text-gray-500">
            Essayez un autre mot-clé.
          </p>
        </div>
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