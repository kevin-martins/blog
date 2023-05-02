import { PostResponse } from '@/models/post';
import { request, gql } from 'graphql-request';

type Props = {
    postsConnection: {
        edges: PostResponse
    }
}

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

    const result: Props = await request(graphqlAPI!, query);

    return result.postsConnection.edges;
}