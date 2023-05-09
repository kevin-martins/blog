import { CategoryProps, CategoryResponse } from "@/models/category";
import { request, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getCategories = async (): Promise<CategoryProps[]> => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result: CategoryResponse = await request(graphqlAPI!, query);

  return result.categories;
}