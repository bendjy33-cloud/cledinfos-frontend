type PostsResponse = {
  data: any[];
  meta?: any;
};
const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}


async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {

  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...options?.headers,
    },
  });


  const data = await res.json();


  if (!res.ok) {
    throw new Error(
      data.message ||
      data.errors?.email?.[0] ||
      "Une erreur est survenue"
    );
  }


  return data;
}


// POSTS

export async function getPosts(page = 1): Promise<PostsResponse> {
  return apiFetch<PostsResponse>(`/posts?page=${page}`);
}


export async function getPost(slug: string) {

  const data: any = await apiFetch(
    `/posts/${slug}`
  );

  return data.data;
}


export async function getRelatedPosts(slug: string) {

  const data: any = await apiFetch(
    `/posts/${slug}/related`
  );

  return data.data;
}


export async function getFeaturedPosts() {

  const data: any = await apiFetch(
    `/featured-posts`
  );

  return data.data;
}


export async function getMostReadPosts() {

  const data: any = await apiFetch(
    `/most-read`
  );

  return data.data;
}


export async function getLatestPosts() {

  return apiFetch(
    `/posts`
  );
}



// CATEGORIES

export async function getCategories() {

  const data: any = await apiFetch(
    `/categories`
  );

  return data.data;
}


export async function getPostsByCategory(
  slug: string
) {

  const data: any = await apiFetch(
    `/categories/${slug}/posts`
  );

  return data.data;
}



// SEARCH

export async function searchPosts(
  query: string
) {

  const data: any = await apiFetch(
    `/search?q=${encodeURIComponent(query)}`
  );

  return data.data;
}



// HOME

export async function getHomeData(page = 1) {

  const data: any = await apiFetch(
    `/home?page=${page}`
  );

  return data.data ?? data;
}



// SETTINGS

export async function getSettings() {

  const data: any = await apiFetch(
    `/settings`
  );

  return data.data ?? data;
}


// NEWSLETTER

type NewsletterResponse = {
  message?: string;
  success?: boolean;
};


export async function subscribeNewsletter(
  email: string
): Promise<NewsletterResponse> {

  return apiFetch<NewsletterResponse>(
    `/newsletter`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    }
  );
}

export async function incrementPostView(slug: string) {

  const res = await fetch(
    `${API}/posts/${slug}/view`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );


  if (!res.ok) {
    throw new Error(
      "Failed to increment view"
    );
  }


  return await res.json();
}

// TAGS

export async function getTags() {

  const data:any = await apiFetch(
    `/tags`
  );

  return data.data ?? data;

}


export async function getTag(slug:string) {

  const data:any = await apiFetch(
    `/tags/${slug}`
  );

  return data.data ?? data;

}

// AUTHORS

export async function getAuthors() {

  const data: any = await apiFetch(
    `/authors`
  );

  return data.data ?? data;
}


export async function getAuthor(slug: string) {

  const data: any = await apiFetch(
    `/authors/${slug}`
  );

  return data.data ?? data;
}

export async function getBreakingNews(){

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/breaking-news`,
    {
      next:{
        revalidate:60,
      },
    }
  );

  return res.json();

}

export async function getTrendingPosts(){

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trending`,
    {
      next:{
        revalidate:60,
      },
    }
  );


  return res.json();

}

export async function getAds(position?: string) {
  const url = position
    ? `/ads?position=${position}`
    : "/ads";

  const data: any = await apiFetch(url);

  return data.data ?? [];
}