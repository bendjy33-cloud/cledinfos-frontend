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
    namespace: "cookies",
  });

  return {
    title: t("metaTitle"),

    description: t("metaDescription"),

    keywords: [
      "cookies",
      "privacy",
      "Clé d’Infos",
      "digital news",
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

export default async function CookiesPage() {
  const t = await getTranslations("cookies");

  return (
    <main
      className="
        w-full
        max-w-5xl
        mx-auto
        px-4
        sm:px-6
        md:px-8
        py-8
        sm:py-12
        md:py-16
      "
    >
      <h1
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-bold
          mb-8
          sm:mb-10
          leading-tight
        "
      >
        {t("title")}
      </h1>

      <div
        className="
          prose
          prose-sm
          sm:prose-base
          lg:prose-lg
          max-w-none
          dark:prose-invert
        "
      >
        <p>
          {t("intro")}
        </p>

        <h2>
          {t("whatTitle")}
        </h2>

        <p>
          {t("whatText")}
        </p>

        <h2>
          {t("whyTitle")}
        </h2>

        <ul>
          <li>{t("items.performance")}</li>
          <li>{t("items.analytics")}</li>
          <li>{t("items.preferences")}</li>
          <li>{t("items.content")}</li>
        </ul>

        <h2>
          {t("manageTitle")}
        </h2>

        <p>
          {t("manageText")}
        </p>

        <h2>
          {t("updateTitle")}
        </h2>

        <p>
          {t("updateText")}
        </p>
      </div>
    </main>
  );
}