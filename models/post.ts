import { AuthorProps } from "./author"
import { CategoryProps } from "./category"

export type GetPostsResponse = {
  assets: {
    createdAt: Date
    id: string
    publishedAt: Date
    fileName: string
    url: string
    updatedAt: Date
  }
  postsConnection: {
    edges: PostResponse[]
  }
}

export type PostResponse = {
  node: PostProps
}

export type PostProps = {
  author: AuthorProps,
  createdAt: Date,
  slug: string,
  title: string,
  excerpt: string,
  featuredImage: {
    url: string,
  }
  categories: CategoryProps[]
}

export type RelatedPostsResponse = {
  posts: RelatedPostProps[]
}

export type RelatedPostProps = {
  title: string,
  featuredImage: {
    url: string
  },
  createdAt: Date,
  slug: string
}

export type DetailPostResponse = {
  post: DetailPostProps
}

export type DetailPostProps = {
  author: AuthorProps,
  createdAt: Date,
  slug: string,
  title: string,
  excerpt: string,
  featuredImage: {
    url: string,
  }
  categories: CategoryProps[]
  content: any
}
