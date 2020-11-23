import React from 'react';

import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './SignIn';
import LogOut from './SignOut';
import SingleRepository from './SingleRepository';
import CreateReviewForm from './CreateReview';
import Signup from './Signup';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
    <AppBar />
    <Switch>
    <Route path='/Signup' exact>
      <Signup />
      </Route>  
    <Route path='/SignIn' exact>
        <SignIn />
      </Route>

    <Route path='/SignOut'exact>
      <LogOut />
      </Route>
      <Route path='/createReview' exact>
        <CreateReviewForm />
      </Route>
      <Route path='/myreviews' exact>
      <MyReviews />
      </Route>
      <Route path='/:id' exact>
        <SingleRepository />
      </Route>  
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>

    </View>
  );
};

export default Main;