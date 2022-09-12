import { gql } from 'apollo-boost'

const reposQuery = gql`
query RepositoryNameQuery($first: Int!, $query: String!) {
    search(query: $query, type: REPOSITORY, first: $first) {
        edges {
            node {
              ... on Repository {
              id
              name
              description
              stargazerCount
              databaseId
              viewerHasStarred
              }
            }
        }
    }
}
`;

export { reposQuery }