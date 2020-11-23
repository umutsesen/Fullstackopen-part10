import React from 'react';
import { FlatList, View, TouchableHighlight, Alert } from 'react-native';
import { format } from 'date-fns';
import { Text } from './Text';
import { styles } from './RepositoryItem';
import { ItemSeparator } from './RepositoryList';
import GetUserReviews from '../hooks/GetUserReviews';
import useDeleteReview from '../hooks/DeleteReview';
import { useHistory } from "react-router-native";


const MyReviews = () => {
    const { loading, data, fetchMore, refetch } = GetUserReviews();
    refetch();
    // need to learn how to refetch after creating a new review.

    if (loading) {
        return (
            <View><Text>Loading...</Text></View>
        );
    }

    const onEndReach = () => {
        fetchMore();

    };
    

    const reviews = data.authorizedUser.reviews.edges;
    return (
        <FlatList style={styles.list} data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => <ReviewItem review={item} refetch={refetch}/>}
    onEndReached={onEndReach}
    onEndReachedThreshold={0.5}/>
    );
};
const ReviewItem = ({ review, refetch }) => {
    const [DeleteReview] = useDeleteReview();
    const history = useHistory();

    const deleteReview = () => {
        Alert.alert(
            "Delete review",
            "This action is irreversible",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Delete", onPress: () => {
                DeleteReview(review.node.id);
                refetch();
              } }
            ],
            { cancelable: false }
          );

    };
    const RedirectToRepository = () => {
        history.push(`/${review.node.repositoryId}`);

    };

    const date = format(new Date(review.node.createdAt), "yyyy.MM.dd"); 



    return (
        <View style={styles.item}>
            <View style={styles.box}>
            <View style={styles.ReviewScore}>
                <Text fontWeight='bold' color='blue' style={styles.align}>{review.node.rating}</Text>
            </View>
            <View style={styles.dateyusername} >
            <Text fontWeight='bold'>{review.node.user.username}</Text>   
            <Text color='textSecondary'>{date}</Text>
            </View>
            <View  style={styles.description}>
                <Text>{review.node.text}</Text>
            </View>
            <View style={styles.scores}>
            <TouchableHighlight onPress={RedirectToRepository}><Text color='primary' style={styles.textalign}>View Repository</Text></TouchableHighlight>
            <TouchableHighlight onPress={deleteReview} ><Text color='red' style={styles.textalignRed}>Delete Review</Text></TouchableHighlight>
            </View>
            </View>
        </View>
    );
  };
  
  


export default MyReviews;