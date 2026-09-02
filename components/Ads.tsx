import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Ad = {
  id: number;
  title?: string | null;
  image?: string | null;
  video?: string | null;
  url?: string | null;
};

export default function Ads({
  ads,
}: {
  ads: Ad[];
}) {
  if (!ads?.length) return null;

  const isVideo = (ad: Ad) => {
    if (!ad?.video) return false;

    const videoUrl = String(ad.video).toLowerCase();

    return (
      videoUrl.includes("video/upload") ||
      videoUrl.includes(".mp4") ||
      videoUrl.includes(".webm") ||
      videoUrl.includes(".ogg") ||
      videoUrl.includes(".mov") ||
      videoUrl.includes(".m4v")
    );
  };

  const renderAd = (ad: Ad) => {
    /*
    |--------------------------------------------------------------------------
    | VIDEO
    |--------------------------------------------------------------------------
    */

    if (isVideo(ad)) {
      return (
        <video
          src={ad.video ?? undefined}
          controls
          playsInline
          preload="metadata"
          className="block w-full h-auto object-contain"
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    /*
    |--------------------------------------------------------------------------
    | IMAGE
    |--------------------------------------------------------------------------
    */

    if (ad.image) {
      return (
        <Image
          src={ad.image}
          alt={ad.title || "Advertisement"}
          width={500}
          height={400}
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
          className="block w-full h-auto object-contain"
        />
      );
    }

    return null;
  };

  return (
    <div className="w-full space-y-4 sm:space-y-5 md:space-y-6">
      {ads.map((ad) => {
        const content = renderAd(ad);

        if (!content) return null;

        return (
          <div
            key={ad.id}
            className="
              w-full
              overflow-hidden
              rounded-lg
              sm:rounded-xl
              border
              border-gray-100
              dark:border-slate-800
              bg-white
              dark:bg-slate-900
              shadow-sm
            "
          >
            {ad.url ? (
              <Link
                href={ad.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                {content}
              </Link>
            ) : (
              content
            )}
          </div>
        );
      })}
    </div>
  );
}