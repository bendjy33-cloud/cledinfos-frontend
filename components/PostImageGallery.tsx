// src/components/PostImageGallery.tsx

"use client";

import { useEffect, useRef, useState } from "react";

type GalleryImage = {
  id?: number;
  image?: string | null;
  image_url?: string | null;
  sort_order?: number;
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
  | KONSTWI LIST TOUT IMAGES YO
  |--------------------------------------------------------------------------
  */

  const allImages = [
    ...(mainImage
      ? [
          {
            id: "main",
            image: mainImage,
          },
        ]
      : []),

    ...images
      .filter(
        (item) =>
          item.image_url ||
          item.image
      )
      .sort(
        (a, b) =>
          (a.sort_order ?? 0) -
          (b.sort_order ?? 0)
      )
      .map((item) => ({
        id: item.id ?? Math.random(),
        image:
          item.image_url ||
          item.image ||
          "",
      })),
  ].filter((item) => item.image);

  /*
  |--------------------------------------------------------------------------
  | DEBUG
  |--------------------------------------------------------------------------
  */

  console.log("MAIN IMAGE:", mainImage);
  console.log("GALLERY IMAGES:", images);
  console.log("ALL IMAGES:", allImages);

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [currentIndex, setCurrentIndex] =
    useState(0);

  /*
  |--------------------------------------------------------------------------
  | RESET INDEX SI LIST LA CHANJE
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

  const touchStartX =
    useRef<number | null>(null);

  const touchEndX =
    useRef<number | null>(null);

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
    allImages[currentIndex];

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