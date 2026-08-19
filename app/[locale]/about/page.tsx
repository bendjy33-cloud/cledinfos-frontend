import type { Metadata } from "next";
import Image from "next/image";

import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),

    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}
 export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-10">
        
      {/* Hero */}
      <section className="bg-white rounded-2xl shadow-lg border border-blue-600 p-8 md:p-12 text-center">
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {t("heroTitle")}
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-8">
          {t("heroDescription")}
        </p>

      </section>

      {/* Qui sommes-nous */}
      <section className="bg-white rounded-2xl shadow-lg border border-blue-600 p-8 md:p-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          {t("who.title")}
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
          {t("who.description")}
        </p>

      </section>

      {/* Mission */}
      <section className="bg-white rounded-2xl shadow-lg border border-blue-600 p-8 md:p-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          {t("mission.title")}
        </h2>

        <p className="text-lg text-gray-700 italic mb-8">
          {t("mission.quote")}
        </p>

        <ol className="text-gray-700 leading-8 text-lg list-decimal pl-6 space-y-4">

          <li>
            <strong>{t("mission.item1Title")}</strong>{" "}
            {t("mission.item1")}
          </li>

          <li>
            <strong>{t("mission.item2Title")}</strong>{" "}
            {t("mission.item2")}
          </li>

          <li>
            <strong>{t("mission.item3Title")}</strong>{" "}
            {t("mission.item3")}
          </li>

        </ol>

      </section>

      {/* Vision */}
     <section className="bg-white rounded-2xl shadow-lg border border-blue-600 p-8 md:p-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          {t("vision.title")}
        </h2>

        <p className="text-gray-700 text-lg leading-8 mb-6">
          {t("vision.intro")}
        </p>

        <ul className="text-gray-700 text-lg leading-8 list-disc pl-6 space-y-4">

          <li>
            <strong>{t("vision.item1Title")}</strong>{" "}
            {t("vision.item1")}
          </li>

          <li>
            <strong>{t("vision.item2Title")}</strong>{" "}
            {t("vision.item2")}
          </li>

          <li>
            <strong>{t("vision.item3Title")}</strong>{" "}
            {t("vision.item3")}
          </li>

        </ul>

      </section>

      {/* Valeurs */}

      <section className="bg-white rounded-2xl shadow-lg border border-blue-600 p-8 md:p-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          {t("values.title")}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">✔️</div>

           <h3 className="text-2xl font-bold mb-3">
            {t("values.integrity")}
           </h3>

           <p className="text-gray-600">
            {t("values.integrityText")}
           </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">🤝</div>

           <h3 className="text-2xl font-bold mb-3">
              {t("values.objectivity")}
           </h3>

           <p className="text-gray-600">
              {t("values.objectivityText")}
           </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">🎯</div>

            <h3 className="text-2xl font-bold mb-3">
              {t("values.responsibility")}
            </h3>

            <p className="text-gray-600">
              {t("values.responsibilityText")}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">❤️</div>

           <h3 className="text-2xl font-bold mb-3">
              {t("values.respect")}
            </h3>

            <p className="text-gray-600">
              {t("values.respectText")}
            </p>

          </div>

        </div>

      </section>

      {/* Nos chiffres */}

      <section className="bg-white rounded-2xl shadow-lg border border-blue-600 p-8 md:p-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          {t("stats.title")}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-red-600 text-white rounded-2xl p-8 text-center">

            <h3 className="text-5xl font-bold">
              500+
            </h3>
         
            <p>{t("stats.articles")}</p>

          </div>

          <div className="bg-red-600 text-white rounded-2xl p-8 text-center">

            <h3 className="text-5xl font-bold">
              10+
            </h3>

           <p>{t("stats.categories")}</p>

          </div>

          <div className="bg-red-600 text-white rounded-2xl p-8 text-center">

            <h3 className="text-5xl font-bold">
              24/7
            </h3>

            <p>{t("stats.news")}</p>

          </div>

          <div className="bg-red-600 text-white rounded-2xl p-8 text-center">

            <h3 className="text-5xl font-bold">
              100%
            </h3>

            <p>{t("stats.verified")}</p>

          </div>

        </div>

      </section>

      {/* Notre équipe */}

      <section className="bg-white rounded-2xl shadow-lg border border-blue-600 p-8 md:p-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          {t("team.title")}</h2>
        <p className="text-center">{t("team.description")}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center">

            <Image
              src="/team-placeholder3.jpeg"
              alt="Claude Bernard FRANÇOIS"
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-red-600 object-cover"
            />

            <h3 className="text-xl font-bold mt-5">
              Claude Bernard FRANÇOIS
            </h3>

            <p>{t("team.ceo")}</p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center">

            <Image
              src="/team-placeholder.jpeg"
              alt="Marc-Rock Bendjy JEAN"
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-red-600 object-cover"
            />

            <h3 className="text-xl font-bold mt-5">
              Marc-Rock Bendjy JEAN
            </h3>

            <p>{t("team.developer")}</p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center">

            <Image
              src="/team-placeholder2.jpeg"
              alt="Zacharie MORLAN"
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-red-600 object-cover"
            />

            <h3 className="text-xl font-bold mt-5">
              Zacharie MORLAN
            </h3>

            <p>{t("team.designer")}</p>

          </div>

        </div>

      </section>

    </main>
  );
}