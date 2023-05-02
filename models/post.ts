import { AuthorProps } from "./author"
import { CategoryProps } from "./category"

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