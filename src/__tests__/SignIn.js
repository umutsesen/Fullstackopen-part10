import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

// ...
const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexWrap: 'nowrap',
    padding: 15,
  },
  inputs: {
    padding: 10,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4e4e4',
    borderRadius: 5
  },
  button: {
    textAlign: 'center',
    flexGrow: 0,
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  separator: {
    height: 10,
  },

});

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().min(4,'Username is too short').max(16, 'Username must be shorter than 16 characters!').required('Username is required'),
  password: yup.string().min(6,'Password is too short').max(16, 'Password must be shorter than 16 characters!').required('Password is required'),

});

const SignIn = ({onSubmit}) => {

  const handleSubmit = async (values) => {
    const { username, password } = values;
    onSubmit({username, password});
    
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    
  );
};

const SignInForm = ({onSubmit}) => {
  return (
    <View style={styles.box}>
      <FormikTextInput testID='username' name='username'placeholder='Username' style={styles.inputs}/>
      <FormikTextInput testID='password' name='password' placeholder='Password' secureTextEntry={true} style={styles.inputs}/>
      <TouchableWithoutFeedback testID='submit' name='submit' onPress={onSubmit} >
        <Text color='primary' style={styles.button} >Sign in</Text>
      </TouchableWithoutFeedback>

      </View>
  );};


describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const {getByTestId} = render(<SignIn onSubmit={onSubmit} />);
        fireEvent.changeText(getByTestId('username'), 'kalle');
      fireEvent.changeText(getByTestId('password'), 'password');
      fireEvent.press(getByTestId('submit'));
      await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
      });
      
    
    

    });
    
    

  });
});