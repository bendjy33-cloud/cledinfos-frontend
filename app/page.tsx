import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import TrendingPosts from "@/components/TrendingPosts";
import Link from "next/link";
import { getHomeData } from "@/lib/api";
import Ads from "@/components/Ads";
import { getAds } from "@/lib/api";
import Newsletter from "@/components/Newsletter";

export default async function HomePage() {
  const home = await getHomeData();

  const hero = home.hero;
  const featured = home.featured ?? [];
  const latest = home.latest?.data ?? home.latest ?? [];
  const trending = home.trending ?? [];
  const ads = await getAds("sidebar");

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {hero && <Hero post={hero} />}

      <div className="grid lg:grid-cols-3 gap-10">
        <section className="lg:col-span-2">
          {featured.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-6">
                À la Une
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-14">
                {featured.map((post: any) => (
                  <PostCard
                    key={post.id}
                    post={post}
                  />
                ))}
              </div>
            </>
          )}

          <h2 className="text-3xl font-bold mb-6">
            Derniers Articles
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {latest.map((post: any) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              href="/actualites"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Voir toutes les actualités →
            </Link>
          </div>
        </section>

        <aside>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 sticky top-24">
            <TrendingPosts posts={trending} />
          </div>

          <div className="mt-10">
            <Ads ads={ads} />
          </div>

          <div className="mt-8">
            <Newsletter />
          </div>
        </aside>
      </div>
    </main>
  );
}