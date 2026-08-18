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
      className="w-full bg-red-600 text-white overflow-hidden"
      aria-label={t("label")}
    >
      <div
        className="
          flex
          w-max
          whitespace-nowrap
          animate-marquee
          py-2
          text-sm
          sm:text-base
        "
      >
        {/* LABEL */}
        <span className="font-bold mx-4 sm:mx-8 shrink-0">
          🚨 {t("label")}:
        </span>

        {/* NEWS */}
        {news.map((item) =>
          item.link ? (
            <Link
              key={item.id}
              href={item.link}
              className="
                mx-8
                sm:mx-12
                lg:mx-20
                font-semibold
                hover:underline
                shrink-0
              "
            >
              {item.title}
            </Link>
          ) : (
            <span
              key={item.id}
              className="
                mx-8
                sm:mx-12
                lg:mx-20
                font-semibold
                shrink-0
              "
            >
              {item.title}
            </span>
          )
        )}
      </div>
    </div>
  );
}