import { gql } from 'apollo-boost';
import { GET_REPOSITORIES_FRAG, GET_SINGLE_REPOSITORTY_FRAG } from './fragments';



export const GET_REPOSITORIES = gql`
query getrepositories($after: String $searchkey: String){
    repositories(first: 8 after: $after searchKeyword: $searchkey) {
        ...RepositoryNodeDetails
      
    }
    
  }
  ${GET_REPOSITORIES_FRAG}

`;

export const GET_REPOSITORIES_ORDERED = gql`
query orderedrepositories($direction: OrderDirection $searchkey: String $after: String){
    repositories(orderDirection: $direction orderBy: RATING_AVERAGE searchKeyword: $searchkey after: $after first: 8) {
        ...RepositoryNodeDetails
      
    }
    
  }
  ${GET_REPOSITORIES_FRAG}

`;


// could not use both @include and variables, appbar authorization control fails after writing $after variable
export const isAuthorized = gql`
query {
    authorizedUser {
      id
      username
    }
  }`;


export const isAuthorizedWithReviews = gql`
query getAuthorizedReviews($first: Int $after: String) {
    authorizedUser {
      id
      username
      reviews(first: $first after: $after)  {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              username
              id
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
    }
  }
`;  



export const GET_SINGLE_REPOSITORTY = gql`
query getRepository($id: ID! $first: Int $after: String) {
  repository(id: $id) {
    ...SingleRepositoryDetails
    
  }
}
${GET_SINGLE_REPOSITORTY_FRAG}
`;  