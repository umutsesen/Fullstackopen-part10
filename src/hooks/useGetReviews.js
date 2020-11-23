import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORTY } from '../graphql/queries';


const useReviews = (variables) => {
    const {data, loading, fetchMore, ...result } = useQuery(GET_SINGLE_REPOSITORTY, {variables} ,{
        fetchPolicy: 'cache-and-network'
      });
      const handleFetchMore = () => {    
        const canFetchMore =
          !loading && data && data.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
        fetchMore({
          query: GET_SINGLE_REPOSITORTY,
          variables: {
            after: data.repository.reviews.pageInfo.endCursor,
            ...variables
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const nextResult = {
              repository: {
                ...fetchMoreResult.repository,
                reviews: {
                    __typename: fetchMoreResult.repository.reviews.__typename,
                    edges: [
                  ...previousResult.repository.reviews.edges,
                  ...fetchMoreResult.repository.reviews.edges,
                ],
                pageInfo: fetchMoreResult.repository.reviews.pageInfo
            }
              },
            };
    
            return nextResult;
          },
        });
      };
      return { data: data ? data : undefined, loading, fetchMore: handleFetchMore, ...result };
      
};

export default useReviews;