import { gql } from 'apollo-boost';

export const GET_REPOSITORIES_FRAG = gql`
fragment RepositoryNodeDetails on RepositoryConnection {
    edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
        }
        cursor
    }
    pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
    }
}
`;

export const GET_SINGLE_REPOSITORTY_FRAG = gql`
fragment SingleRepositoryDetails on Repository {
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          id
          reviews(first: $first after: $after) {
            edges {
              node {
                id
                text
                rating
                createdAt
                user {
                  id
                  username
                }
              }
              cursor
            }
            pageInfo {
              endCursor
              startCursor
              totalCount
              hasNextPage
            }
            }
         

}`;