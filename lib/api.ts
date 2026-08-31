type PostsResponse = {
  data: any[];
  meta?: any;
};

type NewsletterResponse = {
  message?: string;
  success?: boolean;
};

type BreakingNewsResponse = {
  data: BreakingNewsItem[];
};

type BreakingNewsItem = {
  id: number;
  title: string;
  link?: string | null;
  active?: boolean;
  starts_at?: string | null;
  ends_at?: string | null;
};

const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

/*
|--------------------------------------------------------------------------
| API FETCH
|--------------------------------------------------------------------------
*/

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
  revalidate = 5
): Promise<T> {

  const method =
    options?.method?.toUpperCase() ?? "GET";

  const headers = new Headers(
    options?.headers
  );

  headers.set(
    "Accept",
    "application/json"
  );

  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  */

  if (method === "GET") {

    const res = await fetch(
      `${API}${endpoint}`,
      {
        ...options,
        headers,

        next: {
          revalidate,
        },
      }
    );

    return handleResponse<T>(res);
  }

  /*
  |--------------------------------------------------------------------------
  | POST / PUT / PATCH / DELETE
  |--------------------------------------------------------------------------
  */

  const res = await fetch(
    `${API}${endpoint}`,
    {
      ...options,
      headers,
      cache: "no-store",
    }
  );

  return handleResponse<T>(res);
}


/*
|--------------------------------------------------------------------------
| RESPONSE
|--------------------------------------------------------------------------
*/

async function handleResponse<T>(
  res: Response
): Promise<T> {

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    throw new Error(
      "Le serveur a retourné une réponse invalide."
    );
  }

  if (!res.ok) {
    throw new Error(
      data?.message ||
      data?.errors?.email?.[0] ||
      data?.errors?.message?.[0] ||
      "Une erreur est survenue"
    );
  }

  return data;
}


/*
|--------------------------------------------------------------------------
| POSTS
|--------------------------------------------------------------------------
*/

export async function getPosts(
  page = 1
): Promise<PostsResponse> {

  return apiFetch<PostsResponse>(
    `/posts?page=${page}`,
    undefined,
    5
  );
}


export async function getPost(
  slug: string
) {

  const data: any = await apiFetch(
    `/posts/${encodeURIComponent(slug)}`,
    undefined,
    5
  );

  return data.data ?? data;
}


export async function getRelatedPosts(
  slug: string
) {

  const data: any = await apiFetch(
    `/posts/${encodeURIComponent(slug)}/related`,
    undefined,
    5
  );

  return data.data ?? data;
}


export async function getFeaturedPosts() {

  const data: any = await apiFetch(
    `/featured-posts`,
    undefined,
    5
  );

  return data.data ?? data;
}


export async function getMostReadPosts() {

  const data: any = await apiFetch(
    `/most-read`,
    undefined,
    5
  );

  return data.data ?? data;
}


export async function getLatestPosts() {

  const data: any = await apiFetch(
    `/posts`,
    undefined,
    5
  );

  return data.data ?? data;
}


/*
|--------------------------------------------------------------------------
| CATEGORIES
|--------------------------------------------------------------------------
*/

export async function getCategories() {

  const data: any = await apiFetch(
    "/categories",
    undefined,
    5
  );

  return data.data ?? data;
}


export async function getPostsByCategory(
  slug: string
) {

  const data: any = await apiFetch(
    `/categories/${encodeURIComponent(slug)}/posts`,
    undefined,
    5
  );

  return data.data ?? data;
}


/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

export async function searchPosts(
  query: string
) {

  const data: any = await apiFetch(
    `/search?q=${encodeURIComponent(query)}`,
    undefined,
    2
  );

  return data.data ?? data;
}


/*
|--------------------------------------------------------------------------
| HOME
|--------------------------------------------------------------------------
*/

export async function getHomeData(
  page = 1
) {

  const data: any = await apiFetch(
    `/home?page=${page}`,
    undefined,
    5
  );

  return data.data ?? data;
}


/*
|--------------------------------------------------------------------------
| SETTINGS
|--------------------------------------------------------------------------
*/

export async function getSettings() {

  const data: any = await apiFetch(
    `/settings`,
    undefined,
    5
  );

  return data.data ?? data;
}


/*
|--------------------------------------------------------------------------
| NEWSLETTER
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| POST VIEWS
|--------------------------------------------------------------------------
*/

export async function incrementPostView(
  slug: string
) {

  const res = await fetch(
    `${API}/posts/${encodeURIComponent(slug)}/view`,
    {
      method: "POST",
      cache: "no-store",

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

  return res.json();
}


/*
|--------------------------------------------------------------------------
| TAGS
|--------------------------------------------------------------------------
*/

export async function getTags() {

  const data: any = await apiFetch(
    `/tags`,
    undefined,
    5
  );

  return data.data ?? data;
}


export async function getTag(
  slug: string
) {

  const data: any = await apiFetch(
    `/tags/${encodeURIComponent(slug)}`,
    undefined,
    5
  );

  return data.data ?? data;
}


/*
|--------------------------------------------------------------------------
| AUTHORS
|--------------------------------------------------------------------------
*/

export async function getAuthors() {

  const data: any = await apiFetch(
    `/authors`,
    undefined,
    5
  );

  return data.data ?? data;
}


export async function getAuthor(
  slug: string
) {

  const data: any = await apiFetch(
    `/authors/${encodeURIComponent(slug)}`,
    undefined,
    5
  );

  return data.data ?? data;
}


/*
|--------------------------------------------------------------------------
| BREAKING NEWS
|--------------------------------------------------------------------------
*/

export async function getBreakingNews(
  locale: string
): Promise<BreakingNewsResponse> {

  return apiFetch<BreakingNewsResponse>(
    `/breaking-news?locale=${encodeURIComponent(locale)}`,
    undefined,
    2
  );
}


/*
|--------------------------------------------------------------------------
| TRENDING POSTS
|--------------------------------------------------------------------------
*/

export async function getTrendingPosts() {

  const data: any = await apiFetch(
    `/trending`,
    undefined,
    5
  );

  return data.data ?? data;
}


/*
|--------------------------------------------------------------------------
| ADS
|--------------------------------------------------------------------------
*/

export async function getAds(
  position?: string
) {

  const url = position
    ? `/ads?position=${encodeURIComponent(position)}`
    : "/ads";

  const data: any = await apiFetch(
    url,
    undefined,
    5
  );

  return data.data ?? [];
}