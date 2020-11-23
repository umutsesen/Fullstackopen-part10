
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORIES_ORDERED } from '../graphql/queries';

// could have written cleaner code, unneccessary if / else
const useRepositories = (selectedvalue, searchkey) => {
  if (selectedvalue === '') { // if we do not have orderDirection, get the latests
  const {loading, data, fetchMore, ...result} = useQuery(GET_REPOSITORIES, {variables: {searchkey}}, {
    fetchPolicy: 'cache-and-network'
  });
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: {searchkey}
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };
        return nextResult;
      },
    });
  };
  return { data, loading, fetchMore: handleFetchMore, ...result };
}
else {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES_ORDERED, {variables: { direction: selectedvalue, searchkey }}, {
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    
    fetchMore({
      query: GET_REPOSITORIES_ORDERED,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: { direction: selectedvalue, searchkey }
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return { data, loading, fetchMore: handleFetchMore, ...result  };
}
};

export default useRepositories;