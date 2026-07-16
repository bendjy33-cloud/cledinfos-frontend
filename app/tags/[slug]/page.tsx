import PostCard from "@/components/PostCard";
import Breadcrumb from "@/components/Breadcrumb";
import { getTag } from "@/lib/api";


type Props = {
  params: Promise<{
    slug:string;
  }>;
};



export default async function TagPage({
  params
}:Props){


  const {slug}=await params;


  const tag =
    await getTag(slug);



  return (

    <main className="max-w-7xl mx-auto px-6 py-10">


      <Breadcrumb
        items={[
          {
            label: tag.name
          }
        ]}
      />



      <h1 className="text-4xl font-bold mb-10">
        #{tag.name}
      </h1>



      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


        {tag.posts?.map((post:any)=>(

          <PostCard
            key={post.id}
            post={post}
          />

        ))}


      </div>



    </main>

  );

}