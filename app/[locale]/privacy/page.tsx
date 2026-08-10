import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";


type Props = {
  params: Promise<{
    locale: string;
  }>;
};


export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "privacy",
  });


  return {
    title: t("metaTitle"),
    description: t("metaDescription"),

    keywords: [
      "privacy",
      "confidentialité",
      "Clé d’Infos",
      "protection des données",
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



export default async function PrivacyPage() {

  const t = await getTranslations("privacy");


  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold mb-10">
        {t("title")}
      </h1>


      <div className="prose lg:prose-lg max-w-none">


        <p>
          {t("intro")}
        </p>


        <h2>
          {t("collectTitle")}
        </h2>

        <p>
          {t("collectText")}
        </p>


        <h2>
          {t("cookiesTitle")}
        </h2>

        <p>
          {t("cookiesText")}
        </p>


        <h2>
          {t("analyticsTitle")}
        </h2>

        <p>
          {t("analyticsText")}
        </p>


        <h2>
          {t("adsTitle")}
        </h2>

        <p>
          {t("adsText")}
        </p>


        <h2>
          {t("protectionTitle")}
        </h2>

        <p>
          {t("protectionText")}
        </p>


        <h2>
          {t("contactTitle")}
        </h2>

        <p>
          {t("contactText")}
        </p>


      </div>

    </main>
  );
}