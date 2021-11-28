import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_MATBLOGS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
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
              excerpt
              slug
              title
              categories {
                name
                slug
              }
              featuredImage {
                url
                createdAt
                fileName
              }
            }
          }
        }
      }      
    `
  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      post(
        orderBy: createdAt_ASC
        last:3
      ){
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query);

  return result.posts;
}