import { getPosts } from "@/lib/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET() {
  const posts = await getPosts(1);

  const news = posts.data
    .map(
      (post: any) => `
<url>
  <loc>${SITE_URL}/posts/${post.slug}</loc>

  <news:news>
    <news:publication>
      <news:name>Clé d'Infos</news:name>
      <news:language>fr</news:language>
    </news:publication>

    <news:publication_date>
      ${new Date(post.published_at).toISOString()}
    </news:publication_date>

    <news:title><![CDATA[${post.title}]]></news:title>
  </news:news>

</url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

${news}

</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}