"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type BreakingNewsItem = {
  id: number;
  title: string;
  link?: string | null;
};

export default function BreakingNews({
  news,
}: {
  news: BreakingNewsItem[];
}) {
  const t = useTranslations("BreakingNews");

  if (!news || news.length === 0) {
    return null;
  }

  return (
    <div
      className="bg-red-600 text-white overflow-hidden"
      aria-label={t("label")}
    >
      <div className="flex whitespace-nowrap animate-marquee py-2">
        <span className="font-bold mx-8">
          🚨 {t("label")}:
        </span>

        {news.map((item) =>
          item.link ? (
            <Link
              key={item.id}
              href={item.link}
              className="mx-20 font-semibold hover:underline"
            >
              {item.title}
            </Link>
          ) : (
            <span
              key={item.id}
              className="mx-20 font-semibold"
            >
              {item.title}
            </span>
          )
        )}
      </div>
    </div>
  );
}