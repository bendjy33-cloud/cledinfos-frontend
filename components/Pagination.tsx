import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
  currentPage: number;
  lastPage: number;
};

export default function Pagination({
  currentPage,
  lastPage,
}: Props) {
  const t = useTranslations("Pagination");

  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

      {currentPage > 1 && (
        <Link
          href={{
            pathname: "/actualites",
            query: { page: currentPage - 1 },
          }}
          aria-label={t("previous")}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          ← {t("previous")}
        </Link>
      )}

      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={{
            pathname: "/actualites",
            query: { page },
          }}
          aria-current={page === currentPage ? "page" : undefined}
          className={`px-4 py-2 rounded-lg transition ${
            page === currentPage
              ? "bg-red-600 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < lastPage && (
        <Link
          href={{
            pathname: "/actualites",
            query: { page: currentPage + 1 },
          }}
          aria-label={t("next")}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          {t("next")} →
        </Link>
      )}

    </div>
  );
}