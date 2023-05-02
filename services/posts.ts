import { GetPostsResponse, GetRelatedPostProps, GetRelatedPostsResponse } from '@/models/post';
import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query Assets {
            assets {
                createdAt
                id
                publishedAt
                fileName
                url
                updatedAt
            }
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `
    const result: GetPostsResponse = await request(graphqlAPI!, query);

    return result.postsConnection.edges;
}

export const getRecentPosts = async (): Promise<GetRelatedPostProps[]> => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result: GetRelatedPostsResponse = await request(graphqlAPI!, query);

    return result.posts;
}

export const getSimilarPosts = async (categories?: string[], slug?: string) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: String[]!) {
            posts(
                where: {
                    slug_not: $slug, AND: {
                        categories_some: {
                            slug_in: $categories
                        }
                    }
                }
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result: GetRelatedPostsResponse = await request(graphqlAPI!, query);

    return result.posts;
}