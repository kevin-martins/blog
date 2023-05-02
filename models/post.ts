import { AuthorProps } from "./author"
import { CategoryProps } from "./category"

export type GetPostsResponse = {
    postsConnection: {
        edges: PostResponse
    }
}

export type PostResponse = {
    node: GetPostProps
}

export type GetPostProps = {
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

export type GetRelatedPostsResponse = {
    posts: GetRelatedPostProps[]
}

export type GetRelatedPostProps = {
    title: string,
    featuredImage: {
        url: string
    },
    createdAt: Date,
    slug: string
}
