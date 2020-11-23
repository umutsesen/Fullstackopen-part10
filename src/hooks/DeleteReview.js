import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';




const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const DeleteReview = async (id) => {
        const { data } = await mutate({variables: { id: id }});
        return data;

    };

    return [DeleteReview, result];
};

export default useDeleteReview;