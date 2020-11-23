
import {  useApolloClient  } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-native";
import AuthStorageContext from '../contexts/AuthStorageContext';






const LogOut = () => {

    const authStorage = useContext(AuthStorageContext);
    const client = useApolloClient();
    const history = useHistory();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        await client.resetStore();
        history.push('/');
        alert('Logged Out');
      };
    
      useEffect(() => {
          signOut();
          
      }, []);

    return (<></>);  
};

export default LogOut;