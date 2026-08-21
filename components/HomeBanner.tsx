import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  src: string;
};

export default function HomeBanner({ src }: Props) {
  const t = useTranslations("HomeBanner");

  return (
    <section className="w-full mb-8 md:mb-10">

      <div
        className="
          w-full
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
          sizes="100vw"
        />

      </div>

    </section>
  );
}