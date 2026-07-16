"use client";

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

  if (!news || news.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white overflow-hidden">

      <div className="flex whitespace-nowrap animate-marquee py-2">

        <span className="font-bold mx-8">
          🚨 DERNIÈRE MINUTE :
        </span>


        {news.map((item) => (

          <span
            key={item.id}
            className="mx-20 font-semibold"
          >
            {item.title}
          </span>

        ))}


      </div>

    </div>
  );
}