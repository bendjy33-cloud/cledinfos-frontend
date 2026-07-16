import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAuthor } from "@/lib/api";


type Props = {
  params: Promise<{
    slug:string;
  }>;
};


export default async function AuthorPage({
  params
}:Props){

  const {slug}=await params;


  const author = await getAuthor(slug);



  return (

    <main className="max-w-6xl mx-auto px-6 py-10">


      <section className="border rounded-2xl p-8 bg-gray-50 mb-12">


        <div className="flex flex-col md:flex-row gap-8 items-center">


          <div className="relative w-40 h-40 rounded-full overflow-hidden">

            <Image
              src={author.photo || "/avatar.png"}
              alt={author.name}
              fill
              unoptimized
              className="object-cover"
            />

          </div>



          <div>

            <h1 className="text-4xl font-bold">
              {author.name}
            </h1>


            {author.job_title && (
              <p className="text-red-600 text-xl mt-2">
                {author.job_title}
              </p>
            )}


            <p className="mt-5 text-gray-700 leading-7">
              {author.bio}
            </p>


            <div className="flex gap-4 mt-5">

              {author.facebook && (
                <Link href={author.facebook}>
                  Facebook
                </Link>
              )}

              {author.twitter && (
                <Link href={author.twitter}>
                  X
                </Link>
              )}

              {author.linkedin && (
                <Link href={author.linkedin}>
                  LinkedIn
                </Link>
              )}

            </div>


          </div>


        </div>


      </section>



      <h2 className="text-3xl font-bold mb-8">
        Articles de {author.name}
      </h2>



      <div className="grid md:grid-cols-3 gap-8">


        {author.posts?.map((post:any)=>(
          
          <PostCard
            key={post.id}
            post={post}
          />

        ))}


      </div>


    </main>

  );
}