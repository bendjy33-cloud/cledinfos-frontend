import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import ViewCounter from "@/components/ViewCounter";
import PostCard from "@/components/PostCard";
import Breadcrumb from "@/components/Breadcrumb";
import TableOfContents from "@/components/TableOfContents";
import AuthorBox from "@/components/AuthorBox";
import Comments from "@/components/Comments";

import {
  getPost,
  getRelatedPosts,
} from "@/lib/api";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};


const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";



const ORGANIZATION = {

  "@type":
    "NewsMediaOrganization",

  name:
    "Clé d'Infos",

  url:
    SITE_URL,


  logo: {

    "@type":
      "ImageObject",

    url:
      `${SITE_URL}/icon-512.png`,

  },

};





export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {


  const { slug } =
    await params;


  const post =
    await getPost(slug);



  return {


    title:
      post.title,


    description:
      post.meta_description ||
      post.title,



    keywords:
      post.keywords
      ?.split(",")
      || [],



    alternates: {

      canonical:
        `${SITE_URL}/posts/${post.slug}`,

    },



    openGraph: {


      title:
        post.title,


      description:
        post.meta_description ||
        post.title,


      url:
        `${SITE_URL}/posts/${post.slug}`,


      siteName:
        "Clé d'Infos",


      type:
        "article",


      publishedTime:
        post.published_at,


      modifiedTime:
        post.updated_at ||
        post.published_at,



      section:
        post.category?.name,



      images: [

        {

          url:
            post.image ||
            `${SITE_URL}/placeholder.jpg`,

          width:
            1200,

          height:
            630,

          alt:
            post.title,

        },

      ],

    },



    twitter: {

      card:
        "summary_large_image",


      title:
        post.title,


      description:
        post.meta_description ||
        post.title,


      images: [

        post.image ||
        `${SITE_URL}/placeholder.jpg`

      ],

    },


  };

}





export default async function PostPage({
  params,
}: Props) {


  const { slug } =
    await params;



  const post =
    await getPost(slug);



  const related =
    await getRelatedPosts(slug);




  const jsonLd = {


    "@context":
      "https://schema.org",



    "@type":
      "NewsArticle",



    headline:
      post.title,



    description:
      post.meta_description,



    keywords:
      post.keywords,



    articleSection:
      post.category?.name,



    image: [

      {

        "@type":
          "ImageObject",

        url:
          post.image ||
          `${SITE_URL}/placeholder.jpg`,

        width:
          1200,

        height:
          630,

      },

    ],



    datePublished:
      post.published_at,



    dateModified:
      post.updated_at ||
      post.published_at,



    mainEntityOfPage: {


      "@type":
        "WebPage",


      "@id":
        `${SITE_URL}/posts/${post.slug}`,

    },



    author: {


      "@type":
        "Person",


      name:
        post.author?.name ||
        "Clé d'Infos",



      url:
        post.author?.slug

        ? `${SITE_URL}/authors/${post.author.slug}`

        : SITE_URL,

    },



    publisher:
      ORGANIZATION,


  };
  return (

    <main className="max-w-6xl mx-auto px-6 py-10">


      <ViewCounter slug={post.slug} />



      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(jsonLd),
        }}
      />



      <Breadcrumb

        items={[

          {
            label:
              post.category?.name,

            href:
              `/categories/${post.category?.slug}`,
          },


          {
            label:
              post.title,
          },

        ]}

      />





      <section className="mb-12">


        <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm">

          {post.category?.name}

        </span>




        <h1 className="text-5xl font-bold leading-tight mt-5 mb-5">

          {post.title}

        </h1>





        <div className="flex flex-wrap gap-6 text-gray-500 mb-8">


          <span>
            👁 {post.views} vues
          </span>



          <span>

            📅{" "}

            {new Date(
              post.published_at
            ).toLocaleDateString(
              "fr-FR"
            )}

          </span>


        </div>





        <div className="relative w-full h-[520px] rounded-2xl overflow-hidden">


          <Image

            src={
              post.image ||
              "/placeholder.jpg"
            }

            alt={
              post.title
            }

            fill

            priority

            unoptimized

            className="object-cover"

          />


        </div>


      </section>





      <TableOfContents />





      <article

        className="
        prose 
        lg:prose-lg 
        max-w-none 
        prose-img:rounded-xl 
        prose-headings:scroll-mt-28
        "

        dangerouslySetInnerHTML={{

          __html:
            post.content,

        }}

      />



      <Comments slug={post.slug} />





      {post.tags &&
      post.tags.length > 0 && (

        <section className="mt-10">


          <h3 className="text-2xl font-bold mb-4">

            Tags

          </h3>




          <div className="flex flex-wrap gap-3">


            {post.tags.map(
              (tag:any)=>(

              <Link

                key={
                  tag.id
                }

                href={
                  `/tags/${tag.slug}`
                }

                className="
                px-4 py-2 
                rounded-full 
                bg-gray-100 
                text-gray-700 
                hover:bg-red-600 
                hover:text-white 
                transition
                "

              >

                #{tag.name}

              </Link>


            ))}


          </div>


        </section>

      )}






      <section className="mt-12 border-t pt-8">


        <h3 className="text-2xl font-bold mb-5">

          Partager cet article

        </h3>




        <div className="flex flex-wrap gap-4">


          <Link

            target="_blank"

            href={
              `https://www.facebook.com/sharer/sharer.php?u=${SITE_URL}/posts/${post.slug}`
            }

            className="
            bg-blue-600 
            hover:bg-blue-700 
            text-white 
            px-5 py-3 
            rounded-lg
            "

          >

            Facebook

          </Link>





          <Link

            target="_blank"

            href={
              `https://wa.me/?text=${SITE_URL}/posts/${post.slug}`
            }

            className="
            bg-green-600 
            hover:bg-green-700 
            text-white 
            px-5 py-3 
            rounded-lg
            "

          >

            WhatsApp

          </Link>





          <Link

            target="_blank"

            href={
              `https://twitter.com/intent/tweet?url=${SITE_URL}/posts/${post.slug}`
            }

            className="
            bg-black 
            hover:bg-gray-800 
            text-white 
            px-5 py-3 
            rounded-lg
            "

          >

            X

          </Link>


        </div>


      </section>






      <AuthorBox

        author={
          post.author
        }

        published_at={
          post.published_at
        }

      />







      {related.length > 0 && (

        <section className="mt-20">


          <h2 className="text-4xl font-bold mb-8">

            Articles similaires

          </h2>





          <div className="
          grid 
          md:grid-cols-2 
          lg:grid-cols-3 
          gap-8
          ">


            {related.map(
              (item:any)=>(

              <PostCard

                key={
                  item.id
                }

                post={
                  item
                }

              />

            ))}


          </div>


        </section>

      )}





    </main>

  );

}