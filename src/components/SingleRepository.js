import React from 'react';
import { Image, View, TouchableHighlight, FlatList } from 'react-native';
import { useParams } from "react-router-dom";
import { Text, Subheading } from './Text';
import { styles } from './RepositoryItem';
import abbrNum from '../utils/abbreviateNumber';
import { format } from 'date-fns';
import { ItemSeparator } from './RepositoryList';
import useReviews from '../hooks/useGetReviews';


const RepositoryInfo = ({ item }) => {
    // item = repository

    return (
        <View style={styles.item}>
          <View style={styles.box}>
          <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl}}/>
          <View style={styles.info}>
          <Subheading color='primary'>{item.fullName}</Subheading>
          <Text >{item.description}</Text>
          <Text color='primary'>{item.language}</Text>
          </View>
          </View>
          <View style={styles.scores}>
            <View>
          <Text color='textThird' fontWeight='bold' style={styles.block} >{abbrNum(item.ratingAverage, 1)}</Text>
          <Text color='textSecondary' style={styles.block}>Rating</Text>
          </View>
          <View>
          <Text color='textThird' fontWeight='bold' style={styles.block} >{abbrNum(item.reviewCount, 1)}</Text>
          <Text color='textSecondary'style={styles.block}>Reviews</Text>
          </View>
          <View>
          <Text color='textThird' fontWeight='bold' style={styles.block}>{abbrNum(item.stargazersCount, 1)}</Text>
          <Text color='textSecondary'style={styles.block}>Stars</Text>
          </View>
          <View>
          <Text color='textThird' fontWeight='bold' style={styles.block} >{abbrNum(item.forksCount, 1)}</Text>
          <Text color='textSecondary'style={styles.block}>Forks</Text>
          </View>
          </View>
          <TouchableHighlight ><Text color='primary' style={styles.textalign}>Go to Github Profile</Text></TouchableHighlight>

          </View>
          
      );
  };
  
export const ReviewItem = ({ review }) => {
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
            </View>
        </View>
    );
  };
  
  

const SingleRepository = () => {
    const { id } = useParams();
    const {data, loading, fetchMore } = useReviews({first: 3, id});



    const onEndReach = () => {
        console.log('You have reached the end of the list');
        fetchMore();
      };

    if (loading) {
        return (
            <View><Text>Loading...</Text></View>
        );
    }

    const repository = data.repository;
    const reviews = repository.reviews.edges;
    return (
        <FlatList  style={styles.list} data={reviews}
        ItemSeparatorComponent={ItemSeparator}
    renderItem={({  item }) => <ReviewItem review={item} />}
    keyExtractor={(item, index) => index.toString()}
    onEndReached={onEndReach}
    onEndReachedThreshold={0.5}
    
    ListHeaderComponent={() => <RepositoryInfo item={repository} />} />
      
    );
};

export default SingleRepository;