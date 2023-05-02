import { AuthorProps } from "./author"
import { CategoryProps } from "./category"

export type GetPostsResponse = {
    postsConnection: {
        edges: PostResponse
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
    categories: CategoryProps
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
