/* eslint-disable no-undef */
import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from "react-router-native";
import { isAuthorized } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appbar,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
    // ...
  },
  text: {
      margin: 10,
      color: 'white',
      fontWeight: 'bold'
  }
  // ...
});

const AppBarTab = ({ style, link, ...props }) => {

    return <TouchableHighlight><View><Link to={link}><Text style={style} {...props}/></Link></View></TouchableHighlight>;
};

const AppBar = () => {


  const { loading, data } = useQuery(isAuthorized); 
 
  
  return <View style={styles.container}>
    <ScrollView horizontal>
    <AppBarTab style={styles.text} link='/'>Repositories</AppBarTab>
    {loading === false ? data.authorizedUser === null ? <><AppBarTab style={styles.text} link='/SignIn'>Sign in</AppBarTab><AppBarTab link='Signup' style={styles.text}>Sign up</AppBarTab></>: <><AppBarTab style={styles.text} link='createReview'>Create Review</AppBarTab><AppBarTab style={styles.text} link='myreviews'>My reviews</AppBarTab><AppBarTab style={styles.text} link='/SignOut'>Log Out</AppBarTab></>: <Text></Text>}
    </ScrollView>
      

      </View>;
};

export default AppBar;