import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  src: string;
};

export default function HomeBanner({ src }: Props) {
  const t = useTranslations("HomeBanner");

  return (
    <section className="w-full mb-6 md:mb-8">

      <div
        className="
          w-full
          max-w-5xl
          mx-auto
          overflow-hidden
          rounded-xl
          shadow-md
          border
          border-gray-200
          bg-white
        "
      >

        <Image
          src={src}
          alt={t("imageAlt")}
          width={1600}
          height={840}
          priority
          unoptimized
          className="
            w-full
            h-auto
            object-contain
            block
          "
          sizes="(max-width: 1024px) 100vw, 1024px"
        />

      </div>

    </section>
  );
}