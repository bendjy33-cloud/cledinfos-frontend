export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  photo: string | null;
  job_title: string | null;
  bio: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  image: string;
  content: string;
  meta_description: string;
  keywords: string;
  featured: boolean;
  views: number;
  published_at: string;

  category: Category;

  author: Author;

  tags: Tag[];
}