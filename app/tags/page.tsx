import Link from "next/link";
import { getTags } from "@/lib/api";


export default async function TagsPage(){

  const tags = await getTags();


  return (

    <main className="max-w-7xl mx-auto px-6 py-10">


      <h1 className="text-4xl font-bold mb-10">
        Tags
      </h1>



      <div className="flex flex-wrap gap-4">


        {tags.map((tag:any)=>(

          <Link
            key={tag.id}
            href={`/tags/${tag.slug}`}
            className="px-5 py-3 bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition"
          >

            #{tag.name}

          </Link>

        ))}


      </div>


    </main>

  );

}