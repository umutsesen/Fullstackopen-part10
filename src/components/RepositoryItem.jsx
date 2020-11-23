import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Subheading } from './Text';
import theme from '../theme';
import abbrNum from '../utils/abbreviateNumber';
import { useHistory } from "react-router-dom";


export const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: theme.colors.item,
    
  },
  tinyLogo: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection : 'row',
  },
  scores: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center'
  },
  textalign: {
    textAlign: 'center',
    padding: 15,
    paddingLeft: 27.5,
    paddingRight: 27.5,
    marginRight: 1
  },
  textalignRed: {
    textAlign: 'center',
    padding: 15,
    paddingLeft: 35,
    paddingRight: 35,
    marginLeft: 1
  },
  block: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 20,
    flexGrow: 0,
    textAlign: 'center'
  },
  info: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1
  },
  ReviewScore: {
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
  
  },
  align: {
    textAlign: 'center'
  },
  dateyusername: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    paddingLeft: 10
  },
  description: {
    paddingLeft: 60,
  },
  list: {
    backgroundColor: theme.colors.list,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.list,
  },

});


const RepositoryItem = ({ item }) => {
    const history = useHistory();
    return (
      
      <View style={styles.item}>
        <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
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
        </TouchableOpacity>
        </View>
        
    );
};

export default RepositoryItem;