import { GetCategoryResponse } from "@/models/category";
import { request, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories: {
                name
                slug
            }
        }
    `
    const result: GetCategoryResponse = await request(graphqlAPI!, query);

    return result.categories;
}