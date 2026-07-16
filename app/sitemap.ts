import type { MetadataRoute } from "next";
import { getPosts, getCategories } from "@/lib/api";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";


  const postsResponse: any = await getPosts();

  const posts =
    postsResponse.data ?? [];


  const categories =
    await getCategories();



  const postUrls = posts.map((post:any)=>({

    url: `${SITE_URL}/posts/${post.slug}`,

    lastModified:
      new Date(post.published_at),

    changeFrequency:
      "weekly" as const,

    priority:
      0.8,

  }));



  const categoryUrls = categories.map((category:any)=>({

    url:
      `${SITE_URL}/categories/${category.slug}`,

    changeFrequency:
      "weekly" as const,

    priority:
      0.6,

  }));



  return [

    {
      url: SITE_URL,

      changeFrequency:
        "daily",

      priority:
        1,
    },


    {
      url:
        `${SITE_URL}/actualites`,

      changeFrequency:
        "daily",

      priority:
        0.9,
    },


    ...categoryUrls,

    ...postUrls,

  ];

}