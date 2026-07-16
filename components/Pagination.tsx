import Link from "next/link";

type Props = {
  currentPage: number;
  lastPage: number;
};

export default function Pagination({
  currentPage,
  lastPage,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

      {currentPage > 1 && (
        <Link
          href={`/actualites?page=${currentPage - 1}`}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          ← Précédent
        </Link>
      )}

      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/actualites?page=${page}`}
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
          href={`/actualites?page=${currentPage + 1}`}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Suivant →
        </Link>
      )}

    </div>
  );
}