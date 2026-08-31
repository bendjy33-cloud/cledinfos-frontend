import HomeBanner from "@/components/HomeBanner";
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

  // ========================================
  // LOCALIZE POST
  // ========================================

  const getLocalizedPost = (post: any) => {
    if (!post) return post;

    const title =
      locale === "es"
        ? post.title_es ??
          post.title_en ??
          post.title_fr ??
          post.title_ht
        : locale === "en"
          ? post.title_en ??
            post.title_fr ??
            post.title_ht
          : locale === "ht"
            ? post.title_ht ??
              post.title_fr ??
              post.title_en
            : post.title_fr ??
              post.title_en ??
              post.title_ht;

    const meta_description =
      locale === "es"
        ? post.meta_description_es ??
          post.meta_description_en ??
          post.meta_description_fr ??
          post.meta_description_ht
        : locale === "en"
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
      locale === "es"
        ? post.content_es ??
          post.content_en ??
          post.content_fr ??
          post.content_ht
        : locale === "en"
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
      locale === "es"
        ? post.keywords_es ??
          post.keywords_en ??
          post.keywords_fr ??
          post.keywords_ht
        : locale === "en"
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
            locale === "es"
              ? post.category.name_es ??
                post.category.name_en ??
                post.category.name_fr ??
                post.category.name_ht
              : locale === "en"
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

  // ========================================
  // FEATURED
  // ========================================

  const featured = (home.featured ?? []).map((post: any) =>
    getLocalizedPost(post)
  );

  // ========================================
  // LATEST
  // ========================================

  const latestRaw = home.latest?.data ?? home.latest ?? [];

  const latest = latestRaw.map((post: any) =>
    getLocalizedPost(post)
  );

  // ========================================
  // TRENDING
  // ========================================

  const trending = (home.trending ?? []).map((post: any) =>
    getLocalizedPost(post)
  );

  // ========================================
  // ADS
  // ========================================

  const ads = await getAds("sidebar");

  // ========================================
  // PAGE
  // ========================================

  return (
    <main
      className="
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-5
        md:px-6
        py-6
        sm:py-8
        bg-[var(--background)]
        text-gray-900
        dark:text-white
      "
    >

      {/* ========================================
          HOME BANNER
      ======================================== */}

      <div
        className="
          mb-8
          mx-auto
          max-w-5xl
          bg-white
          dark:bg-slate-900
          rounded-xl
          border
          border-gray-100
          dark:border-slate-800
          shadow-md
          overflow-hidden
        "
      >
        <HomeBanner src="/home-banner.png" />
      </div>


      {/* ========================================
          MAIN CONTENT + SIDEBAR
      ======================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

        {/* ========================================
            ARTICLES
        ======================================== */}

        <section className="lg:col-span-2">

          {/* ========================================
              FEATURED ARTICLES
          ======================================== */}

          {featured.length > 0 && (
            <section
              className="
                bg-white
                dark:bg-slate-900
                rounded-xl
                border
                border-gray-100
                dark:border-slate-800
                shadow-md
                p-4
                sm:p-5
                md:p-6
              "
            >

              <div className="mb-5 md:mb-6">

                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {t("featured")}
                </h2>

                <div className="mt-2 w-12 h-1 bg-red-600 rounded-full" />

              </div>


              {/* FEATURED GRID */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-5
                  md:gap-6
                "
              >

                {featured.map((post: any) => (
                  <PostCard
                    key={post.id}
                    post={post}
                  />
                ))}

              </div>

            </section>
          )}


          {/* ========================================
              VIEW ALL
          ======================================== */}

          <div
            className="
              flex
              justify-center
              mt-8
              md:mt-10
              bg-white
              dark:bg-slate-900
              rounded-xl
              border
              border-gray-100
              dark:border-slate-800
              shadow-md
              p-4
            "
          >

            <Link
              href="/actualites"
              className="
                inline-flex
                items-center
                justify-center
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                sm:px-8
                py-3
                rounded-lg
                font-semibold
                transition
                text-sm
                sm:text-base
              "
            >
              {t("viewAll")} →
            </Link>

          </div>

        </section>


        {/* ========================================
            SIDEBAR
        ======================================== */}

        <aside className="w-full">

          {/* ========================================
              TRENDING
          ======================================== */}

          <div
            className="
              bg-white
              dark:bg-slate-900
              rounded-xl
              border
              border-gray-100
              dark:border-slate-800
              shadow-md
              p-4
              sm:p-5
              md:p-6
              text-gray-900
              dark:text-white
            "
          >

            <TrendingPosts posts={trending} />

          </div>


          {/* ========================================
              ADS
          ======================================== */}

          <div
            className="
              mt-8
              bg-white
              dark:bg-slate-900
              rounded-xl
              border
              border-gray-100
              dark:border-slate-800
              shadow-md
              p-4
              text-gray-900
              dark:text-white
            "
          >

            <Ads ads={ads} />

          </div>


          {/* ========================================
              NEWSLETTER
          ======================================== */}

          <div
            className="
              mt-6
              bg-white
              dark:bg-slate-900
              rounded-xl
              border
              border-gray-100
              dark:border-slate-800
              shadow-md
              overflow-hidden
            "
          >

            <Newsletter />

          </div>

        </aside>

      </div>

    </main>
  );
}