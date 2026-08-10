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
    <main className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold mb-4">
        {t("title")}
      </h1>


      <p className="text-gray-600 mb-12">
        {t("description")}
      </p>


      <div className="space-y-6">

        {faqs.map((faq, index) => (

          <details
            key={index}
            className="rounded-xl border p-6 bg-white shadow-sm"
          >

            <summary className="cursor-pointer text-xl font-semibold">
              {faq.question}
            </summary>


            <p className="mt-4 text-gray-600 leading-7">
              {faq.answer}
            </p>


          </details>

        ))}

      </div>

    </main>
  );
}