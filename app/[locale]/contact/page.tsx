import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactPage");

  return {
    title: t("metaTitle"),

    description: t("metaDescription"),

    openGraph: {
      title: t("metaTitle"),
      description: t("metaOgDescription"),
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaOgDescription"),
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}