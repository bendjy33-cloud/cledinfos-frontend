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
    namespace: "faq",
  });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),

    keywords: [
      "FAQ",
      "questions fréquentes",
      "Clé d’Infos",
      "news",
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

export default async function FAQPage() {
  const t = await getTranslations("faq");

  const faqs = [
    {
      question: t("items.0.question"),
      answer: t("items.0.answer"),
    },
    {
      question: t("items.1.question"),
      answer: t("items.1.answer"),
    },
    {
      question: t("items.2.question"),
      answer: t("items.2.answer"),
    },
    {
      question: t("items.3.question"),
      answer: t("items.3.answer"),
    },
    {
      question: t("items.4.question"),
      answer: t("items.4.answer"),
    },
  ];

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
      {/* HEADER */}
      <div className="mb-8 sm:mb-10 md:mb-12">

        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            leading-tight
            mb-3
            sm:mb-4
          "
        >
          {t("title")}
        </h1>

        <p
          className="
            text-sm
            sm:text-base
            md:text-lg
            text-gray-600
            dark:text-gray-300
            leading-7
          "
        >
          {t("description")}
        </p>

      </div>

      {/* FAQ LIST */}
      <div className="space-y-4 sm:space-y-5 md:space-y-6">

        {faqs.map((faq, index) => (
          <details
            key={index}
            className="
              group
              rounded-xl
              sm:rounded-2xl
              border
              border-gray-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              shadow-sm
              hover:shadow-md
              transition
              overflow-hidden
            "
          >
            <summary
              className="
                cursor-pointer
                list-none
                px-4
                sm:px-5
                md:px-6
                py-4
                sm:py-5
                md:py-6
                pr-12
                text-base
                sm:text-lg
                md:text-xl
                font-semibold
                leading-6
                sm:leading-7
                relative
                select-none
              "
            >
              {faq.question}

              {/* + / - ICON */}
              <span
                className="
                  absolute
                  right-4
                  sm:right-5
                  md:right-6
                  top-1/2
                  -translate-y-1/2
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-red-600
                  transition-transform
                  duration-200
                  group-open:rotate-45
                "
              >
                +
              </span>
            </summary>

            <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6">

              <p
                className="
                  text-sm
                  sm:text-base
                  md:text-lg
                  text-gray-600
                  dark:text-gray-300
                  leading-7
                  sm:leading-8
                "
              >
                {faq.answer}
              </p>

            </div>
          </details>
        ))}

      </div>
    </main>
  );
}