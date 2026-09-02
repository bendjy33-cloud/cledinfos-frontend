// src/components/PostImageGallery.tsx

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type GalleryImage = {
  id?: number;
  image?: string | null;
  image_url?: string | null;
  sort_order?: number;
};

type GalleryItem = {
  id: string | number;
  image: string;
};

type PostImageGalleryProps = {
  mainImage?: string | null;
  images?: GalleryImage[];
  title?: string;
};

export default function PostImageGallery({
  mainImage,
  images = [],
  title = "Article",
}: PostImageGalleryProps) {
  /*
  |--------------------------------------------------------------------------
  | KONSTWI LIS TOUT IMAGES YO
  |--------------------------------------------------------------------------
  */

  const allImages = useMemo<GalleryItem[]>(() => {
    const result: GalleryItem[] = [];

    // MAIN IMAGE
    if (
      typeof mainImage === "string" &&
      mainImage.trim() !== ""
    ) {
      result.push({
        id: "main",
        image: mainImage.trim(),
      });
    }

    // GALLERY IMAGES
    const galleryImages = [...images]
      .filter(
        (item) =>
          (typeof item.image_url === "string" &&
            item.image_url.trim() !== "") ||
          (typeof item.image === "string" &&
            item.image.trim() !== "")
      )
      .sort(
        (a, b) =>
          (a.sort_order ?? 0) -
          (b.sort_order ?? 0)
      );

    galleryImages.forEach((item, index) => {
      const url =
        typeof item.image_url === "string" &&
        item.image_url.trim() !== ""
          ? item.image_url.trim()
          : typeof item.image === "string"
            ? item.image.trim()
            : "";

      if (!url) {
        return;
      }

      result.push({
        id: item.id ?? `gallery-${index}`,
        image: url,
      });
    });

    return result;
  }, [mainImage, images]);

  /*
  |--------------------------------------------------------------------------
  | DEBUG
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    console.log("=================================");
    console.log("POST IMAGE GALLERY");
    console.log("MAIN IMAGE:", mainImage);
    console.log("GALLERY IMAGES:", images);
    console.log("ALL IMAGES:", allImages);
    console.log("=================================");
  }, [mainImage, images, allImages]);

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [currentIndex, setCurrentIndex] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | RESET INDEX WHEN IMAGES CHANGE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setCurrentIndex(0);
  }, [mainImage, images]);

  /*
  |--------------------------------------------------------------------------
  | TOUCH / SWIPE
  |--------------------------------------------------------------------------
  */

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;

    touchEndX.current = null;
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current =
      event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current -
      touchEndX.current;

    const minimumSwipeDistance = 50;

    if (
      Math.abs(distance) >=
      minimumSwipeDistance
    ) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  /*
  |--------------------------------------------------------------------------
  | PREVIOUS
  |--------------------------------------------------------------------------
  */

  const goToPrevious = () => {
    if (allImages.length <= 1) {
      return;
    }

    setCurrentIndex((current) =>
      current === 0
        ? allImages.length - 1
        : current - 1
    );
  };

  /*
  |--------------------------------------------------------------------------
  | NEXT
  |--------------------------------------------------------------------------
  */

  const goToNext = () => {
    if (allImages.length <= 1) {
      return;
    }

    setCurrentIndex((current) =>
      current === allImages.length - 1
        ? 0
        : current + 1
    );
  };

  /*
  |--------------------------------------------------------------------------
  | NO IMAGE
  |--------------------------------------------------------------------------
  */

  if (allImages.length === 0) {
    return (
      <div
        className="
          relative
          w-full
          aspect-video
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-gray-100
          dark:border-gray-700
          dark:bg-gray-800
        "
      >
        <img
          src="/placeholder.jpg"
          alt={title}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-contain
          "
        />
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | CURRENT IMAGE
  |--------------------------------------------------------------------------
  */

  const currentImage =
    allImages[currentIndex] ?? allImages[0];

  /*
  |--------------------------------------------------------------------------
  | IMAGE ERROR
  |--------------------------------------------------------------------------
  */

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = event.currentTarget;

    console.error(
      "IMAGE FAILED TO LOAD:",
      img.src
    );

    if (!img.src.endsWith("/placeholder.jpg")) {
      img.src = "/placeholder.jpg";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ONE IMAGE ONLY
  |--------------------------------------------------------------------------
  */

  if (allImages.length === 1) {
    return (
      <div
        className="
          relative
          w-full
          aspect-video
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-gray-100
          dark:border-gray-700
          dark:bg-gray-800
        "
      >
        <img
          key={currentImage.image}
          src={currentImage.image}
          alt={title}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-contain
          "
          draggable={false}
          onError={handleImageError}
        />
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SLIDER
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="
        relative
        w-full
        aspect-video
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-gray-100
        select-none
        dark:border-gray-700
        dark:bg-gray-800
        touch-pan-y
      "
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* IMAGE */}

      <img
        key={currentImage.image}
        src={currentImage.image}
        alt={`${title} - ${currentIndex + 1}`}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-contain
          pointer-events-none
        "
        draggable={false}
        onError={handleImageError}
      />

      {/* LEFT ARROW */}

      <button
        type="button"
        onClick={goToPrevious}
        aria-label="Previous image"
        className="
          absolute
          left-3
          top-1/2
          z-30
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-black/70
          text-3xl
          leading-none
          text-white
          shadow-lg
          transition
          hover:bg-black/90
          sm:left-4
          sm:h-11
          sm:w-11
          cursor-pointer
        "
      >
        ‹
      </button>

      {/* RIGHT ARROW */}

      <button
        type="button"
        onClick={goToNext}
        aria-label="Next image"
        className="
          absolute
          right-3
          top-1/2
          z-30
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-black/70
          text-3xl
          leading-none
          text-white
          shadow-lg
          transition
          hover:bg-black/90
          sm:right-4
          sm:h-11
          sm:w-11
          cursor-pointer
        "
      >
        ›
      </button>

      {/* COUNTER */}

      <div
        className="
          absolute
          bottom-3
          left-1/2
          z-30
          -translate-x-1/2
          rounded-full
          bg-black/70
          px-3
          py-1
          text-xs
          font-semibold
          text-white
          shadow-md
          sm:bottom-4
          sm:text-sm
        "
      >
        {currentIndex + 1} / {allImages.length}
      </div>
    </div>
  );
}