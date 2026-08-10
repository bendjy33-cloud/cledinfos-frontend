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
    namespace: "terms",
  });


  return {
    title: t("metaTitle"),
    description: t("metaDescription"),

    keywords: [
      "terms",
      "conditions d'utilisation",
      "Clé d’Infos",
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



export default async function TermsPage() {

  const t = await getTranslations("terms");


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
          {t("useTitle")}
        </h2>

        <p>
          {t("useText")}
        </p>


        <h2>
          {t("intellectualTitle")}
        </h2>

        <p>
          {t("intellectualText")}
        </p>


        <h2>
          {t("responsibilityTitle")}
        </h2>

        <p>
          {t("responsibilityText")}
        </p>


        <h2>
          {t("externalTitle")}
        </h2>

        <p>
          {t("externalText")}
        </p>


        <h2>
          {t("modificationTitle")}
        </h2>

        <p>
          {t("modificationText")}
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