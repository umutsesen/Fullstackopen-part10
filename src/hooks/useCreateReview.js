import { CREATE_REVIEW } from '../graphql/mutations';
import {  useMutation } from '@apollo/client';
import { useHistory } from "react-router-native";



const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const history = useHistory();

    const createReview = async ({ownerName, repositoryName, rating, text}) => {
        const { data } = await mutate({variables: {review: {repositoryName, ownerName,  rating, text}}});
        history.push(`/${data.createReview.repositoryId}`);
        return data;
    };

    return [createReview, result];

};

export default useCreateReview;