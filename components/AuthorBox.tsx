import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useFormatter } from "next-intl";

type Author = {
  name: string;
  slug: string;
  photo?: string | null;
  photo_url?: string | null;
  job_title?: string | null;
  bio?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
};

type Props = {
  author: Author;
  published_at: string;
};

export default function AuthorBox({
  author,
  published_at,
}: Props) {

  const t = useTranslations("AuthorBox");
  const format = useFormatter();

  const authorPhoto = 
  author.photo_url || 
  author.photo ||
  "/avatar.png";


  return (
    <section className="mt-12 rounded-2xl border bg-gray-50 p-6">


      <h3 className="text-2xl font-bold mb-6">
        {t("aboutAuthor")}
      </h3>


      <div className="flex flex-col md:flex-row gap-6">


        <div className="shrink-0">

          <div className="relative w-28 h-28 rounded-full overflow-hidden border">

            <Image
              src={author.photo || "/avatar.png"}
              alt={author.name}
              fill
              unoptimized
              className="object-cover"
            />

          </div>

        </div>


        <div className="flex-1">


          <Link
            href={`/authors/${author.slug}`}
            className="text-2xl font-bold hover:text-red-600 transition"
          >
            {author.name}
          </Link>


          {author.job_title && (
            <p className="text-red-600 font-medium mt-1">
              {author.job_title}
            </p>
          )}


          <p className="text-gray-500 mt-3">
            {t("publishedOn")}{" "}
            {format.dateTime(new Date(published_at), {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>


          {author.bio && (
            <p className="mt-5 text-gray-700 leading-7">
              {author.bio}
            </p>
          )}


          <div className="flex gap-4 mt-6">

            {author.facebook && (
              <a
                href={author.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook
              </a>
            )}


            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                X
              </a>
            )}


            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                LinkedIn
              </a>
            )}

          </div>


        </div>


      </div>


    </section>
  );
}