import React from 'react';
import { Text } from './Text';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';


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
      }});


const initialValues = {
    ownerName: '',
    RepositoryName: '',
    rating: '',
    text: ''
};      

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().integer('Must be integer').min(0, 'Rating value must be between 0 - 100').max(100, 'Rating value must be between 0 - 100'),
    text: yup.string()
});  

const CreateReviewForm = () => {
    const [createReview] = useCreateReview();

    const onSubmit = async (values, {resetForm}) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            await createReview({ repositoryName, ownerName, rating: +rating, text});

        } catch (e) {
            alert(`You have already made review of the repository named ${repositoryName}`);
            resetForm({});
        }

    };

    return( <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}

    </Formik>

    );
};

const ReviewForm = ({onSubmit}) => {

    return (
        <View style={styles.box} >
        <FormikTextInput name='ownerName' placeholder='Repository Owner Name' style={styles.inputs} />
        <FormikTextInput name='repositoryName' placeholder='Repository Name' style={styles.inputs}/>
        <FormikTextInput name='rating'  placeholder='Rating between 0 and 100' style={styles.inputs}/>
        <FormikTextInput name='text' placeholder='Review Comment' multiline={true} style={styles.inputs}/>
        <TouchableWithoutFeedback  onPress={onSubmit}><Text color='primary' style={styles.button}>Create a review</Text></TouchableWithoutFeedback>
        </View>
    );

};

export default CreateReviewForm;