import React from 'react';
import * as yup from 'yup';
import { Text } from './Text';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

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
    password: '',
    passwordconfirmation: ``
  };
  
  const validationSchema = yup.object().shape({
    username: yup.string().min(1,'Username is too short').max(30, 'Username must be shorter than 30 characters!').required('Username is required'),
    password: yup.string().min(5,'Password is too short').max(50, 'Password must be shorter than 50 characters!').required('Password is required'),
    passwordconfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

const Signup = () => {
    const [signup] = useSignUp();
    const [signIn] = useSignIn();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signup({username, password});
            await signIn({username, password});
       
            

        } catch (e) {
            console.log(e);

        }
    };



    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <SignupForm onSubmit={handleSubmit} />}
        </Formik>

    );

};


const SignupForm = ({onSubmit}) => {
    return (
        <View>
        <FormikTextInput name='username' placeholder='Username' style={styles.inputs}/>
        <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} style={styles.inputs}/>
        <FormikTextInput name='passwordconfirmation' placeholder='Password confirmation' secureTextEntry={true} style={styles.inputs}/>
            <TouchableWithoutFeedback onPress={onSubmit} >
                <Text color='primary' style={styles.button} >Sign up</Text>
            </TouchableWithoutFeedback>
        </View>
        

    );
};
export default Signup;