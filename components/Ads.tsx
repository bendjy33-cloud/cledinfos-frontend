import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Ads({
  ads,
}: {
  ads: any[];
}) {
  if (!ads?.length) return null;

  return (
    <div className="w-full space-y-4 sm:space-y-5 md:space-y-6">

      {ads.map((ad) => (

        <div
          key={ad.id}
          className="w-full rounded-lg sm:rounded-xl overflow-hidden border bg-white dark:bg-slate-900 shadow-sm"
        >

          {ad.url ? (

            <Link
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Image
                src={ad.image}
                alt={ad.title || "Advertisement"}
                width={500}
                height={400}
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                className="w-full h-auto object-contain"
              />
            </Link>

          ) : (

            <Image
              src={ad.image}
              alt={ad.title || "Advertisement"}
              width={500}
              height={400}
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
              className="w-full h-auto object-contain"
            />

          )}

        </div>

      ))}

    </div>
  );
}