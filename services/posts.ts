import { request, gql } from 'graphql-request';
import {
  DetailPostProps,
  GetPostsResponse,
  PostResponse,
  RelatedPostProps,
  RelatedPostsResponse
} from '@/models/post';
import { CategoryProps } from '@/models/category';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async (): Promise<PostResponse[]> => {
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

export const getPostDetails = async (slug: string): Promise<DetailPostProps> => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `
  const result: any = await request(graphqlAPI!, query, { slug });

  return result.post;
}

export const getRecentPosts = async (): Promise<RelatedPostProps[]> => {
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
  const result: RelatedPostsResponse = await request(graphqlAPI!, query);

  return result.posts;
}

export const getSimilarPosts = async (
  categories: string[],
  slug: string
): Promise<RelatedPostProps[]> => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String]!) {
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
  const result: RelatedPostsResponse = await request(graphqlAPI!, query, { categories, slug });

  return result.posts;
}