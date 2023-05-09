import { CommentProps, CommentResponse } from "@/models/comment";
import request, { gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const submitComment  = async (obj: any) => {
  const res  = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return res.json()
}

export const getComments = async (slug: string): Promise<CommentProps[]> => {
  const query = gql`
    query GetComments($slug: String) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `
  const result: CommentResponse = await request(graphqlAPI!, query, { slug });

  return result.comments;
}