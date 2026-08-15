import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import TrendingPosts from "@/components/TrendingPosts";
import { Link } from "@/i18n/navigation";
import { getHomeData, getAds } from "@/lib/api";
import Ads from "@/components/Ads";
import Newsletter from "@/components/Newsletter";
import { getLocale, getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  const home = await getHomeData();

  const getLocalizedPost = (post: any) => {
    if (!post) return post;

    const title =
      locale === "en"
        ? post.title_en ?? post.title_fr ?? post.title_ht
        : locale === "ht"
          ? post.title_ht ?? post.title_fr ?? post.title_en
          : post.title_fr ?? post.title_en ?? post.title_ht;

    const meta_description =
      locale === "en"
        ? post.meta_description_en ??
          post.meta_description_fr ??
          post.meta_description_ht
        : locale === "ht"
          ? post.meta_description_ht ??
            post.meta_description_fr ??
            post.meta_description_en
          : post.meta_description_fr ??
            post.meta_description_en ??
            post.meta_description_ht;

    const content =
      locale === "en"
        ? post.content_en ??
          post.content_fr ??
          post.content_ht
        : locale === "ht"
          ? post.content_ht ??
            post.content_fr ??
            post.content_en
          : post.content_fr ??
            post.content_en ??
            post.content_ht;

    const keywords =
      locale === "en"
        ? post.keywords_en ??
          post.keywords_fr ??
          post.keywords_ht
        : locale === "ht"
          ? post.keywords_ht ??
            post.keywords_fr ??
            post.keywords_en
          : post.keywords_fr ??
            post.keywords_en ??
            post.keywords_ht;

    const category = post.category
      ? {
          ...post.category,
          name:
            locale === "en"
              ? post.category.name_en ??
                post.category.name_fr ??
                post.category.name_ht
              : locale === "ht"
                ? post.category.name_ht ??
                  post.category.name_fr ??
                  post.category.name_en
                : post.category.name_fr ??
                  post.category.name_en ??
                  post.category.name_ht,
        }
      : null;

    return {
      ...post,
      title: title ?? "",
      meta_description: meta_description ?? "",
      content: content ?? "",
      keywords: keywords ?? "",
      category,
    };
  };

  const hero = getLocalizedPost(home.hero);

  const featured = (home.featured ?? []).map(
    (post: any) => getLocalizedPost(post)
  );

  const latestRaw = home.latest?.data ?? home.latest ?? [];

  const latest = latestRaw.map(
    (post: any) => getLocalizedPost(post)
  );

  const trending = (home.trending ?? []).map(
    (post: any) => getLocalizedPost(post)
  );

  const ads = await getAds("sidebar");

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      {hero && <Hero post={hero} />}

      <div className="grid lg:grid-cols-3 gap-10">

        <section className="lg:col-span-2">

          {featured.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-6">
                {t("featured")}
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
            {t("latest")}
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
              {t("viewAll")} →
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