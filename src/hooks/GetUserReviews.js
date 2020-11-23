import { useQuery } from '@apollo/client';
import { isAuthorizedWithReviews } from '../graphql/queries';






const GetUserReviews = () => {
    const { data, loading, fetchMore, refetch } = useQuery(isAuthorizedWithReviews, {variables: {first: 3}});

    const handleFetchMore = () => {    
        const canFetchMore =
          !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
        fetchMore({
          query: isAuthorizedWithReviews,
          variables: {
            after: data.authorizedUser.reviews.pageInfo.endCursor,
            first: 3
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const nextResult = {
              repository: {
                ...fetchMoreResult.authorizedUser,
                reviews: {
                    __typename: fetchMoreResult.authorizedUser.reviews.__typename,
                    edges: [
                  ...previousResult.authorizedUser.reviews.edges,
                  ...fetchMoreResult.authorizedUser.reviews.edges,
                ],
                pageInfo: fetchMoreResult.authorizedUser.reviews.pageInfo
            }
              },
            };
    
            return nextResult;
          },
        });
      };

    return { data: data ? data : undefined, loading, fetchMore: handleFetchMore, refetch };



};

export default GetUserReviews;