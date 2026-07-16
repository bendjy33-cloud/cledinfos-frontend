import Image from "next/image";
import Link from "next/link";

export default function Ads({
  ads,
}: {
  ads: any[];
}) {
  if (!ads.length) return null;

  return (
    <div className="space-y-6">

      {ads.map((ad) => (

        <div
          key={ad.id}
          className="rounded-xl overflow-hidden border bg-white shadow-sm"
        >

          {ad.url ? (

            <Link
              href={ad.url}
              target="_blank"
            >
              <Image
                src={ad.image}
                alt={ad.title}
                width={500}
                height={400}
                unoptimized
                className="w-full h-auto"
              />
            </Link>

          ) : (

            <Image
              src={ad.image}
              alt={ad.title}
              width={500}
              height={400}
              unoptimized
              className="w-full h-auto"
            />

          )}

        </div>

      ))}

    </div>
  );
}