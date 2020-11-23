import { LOGIN } from '../graphql/mutations';
import {  useApolloClient, useMutation } from '@apollo/client';
import { useContext } from 'react';
import { useHistory } from "react-router-native";

// ...

import AuthStorageContext from '../contexts/AuthStorageContext';



const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
    const authStorage = useContext(AuthStorageContext);
    const client = useApolloClient();
    const history = useHistory();
  
    const signIn = async ({ username, password }) => {
        const {data} = await mutate({variables: {credentials: {username, password}}});
        if (data.authorize.accessToken) {
        await authStorage.setAccessToken(data.authorize.accessToken);
        await client.resetStore();
        history.push('/');
        }
        return data;
    };
    
    return [signIn, result];
  };

export default useSignIn;  