import Image from "next/image";
import {Link} from "@/i18n/navigation";
import { getAuthors } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AuthorsPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AuthorsPage() {
  const t = await getTranslations("AuthorsPage");

  const authors = await getAuthors();


  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        {t("title")}
      </h1>


      <div className="grid md:grid-cols-3 gap-8">

        {authors.map((author:any)=>(
          
          <Link
            key={author.id}
            href={`/authors/${author.slug}`}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >

            <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden">

             <Image
                src={
                  author.photo_url
                    ? author.photo_url
                    : author.photo
                    ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/storage/${author.photo}`
                    : "/avatar.png"
                }
                alt={author.name}
                fill
                unoptimized
                className="object-cover"
              />

            </div>


            <h2 className="text-xl font-bold text-center mt-5">
              {author.name}
            </h2>


            {author.job_title && (
              <p className="text-center text-red-600">
                {author.job_title}
              </p>
            )}

          </Link>

        ))}

      </div>

    </main>
  );
}