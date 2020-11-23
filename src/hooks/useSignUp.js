
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';


const useSignUp = () => {

    const [mutate, result] = useMutation(CREATE_USER);
    const signup = async ({username, password}) => {
        const { data } = await mutate({variables: {user: {username, password}}});
        return data;
    };

    return [signup, result];

};

export default useSignUp;