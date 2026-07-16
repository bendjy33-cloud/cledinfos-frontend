import { getLatestPosts } from "@/lib/api";

export const revalidate = 3600;


export async function GET() {

  const postsResponse: any = await getLatestPosts();


  const posts =
    postsResponse.data?.data ??
    postsResponse.data ??
    postsResponse ??
    [];


  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";



  const items = posts.map((post: any) => `

    <item>

      <title><![CDATA[
        ${post.title}
      ]]></title>


      <link>
        ${SITE_URL}/posts/${post.slug}
      </link>


      <guid>
        ${SITE_URL}/posts/${post.slug}
      </guid>


      <description><![CDATA[
        ${post.meta_description || ""}
      ]]></description>


      <content:encoded><![CDATA[
        ${post.content || ""}
      ]]></content:encoded>


      ${
        post.category
          ?
          `<category>
            ${post.category.name}
          </category>`
          :
          ""
      }


      <pubDate>
        ${
          new Date(
            post.published_at
          ).toUTCString()
        }
      </pubDate>


    </item>

  `).join("");



  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<rss 
version="2.0"
xmlns:content="http://purl.org/rss/1.0/modules/content/"
>


<channel>


<title>
Clé d'Infos
</title>


<link>
${SITE_URL}
</link>


<description>
Actualités nationales et internationales
</description>


<language>
fr-FR
</language>


${items}


</channel>


</rss>
`;



  return new Response(
    xml,
    {
      headers: {
        "Content-Type":
          "application/xml; charset=utf-8",
      },
    }
  );

}