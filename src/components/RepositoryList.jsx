import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    backgroundColor: theme.colors.list,
  },

});



export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [selectedvalue, setValue] = useState('');
  const [searchkey, setSearchKey] = useState('');
  const [value] = useDebounce(searchkey, 500);
  const { data, loading, fetchMore } = useRepositories(selectedvalue, value);

  
  
  
  const onChangeSearch = query => setSearchKey(query);

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };



  return (
    <RepositoryListContainer data={data} loading={loading} setValue={setValue} searchkey={searchkey} onChangeSearch={onChangeSearch} onEndReach={onEndReach}
      // other props
    />
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    const items = [
      {label: 'Latest Repositories', value: ''},
      {label: 'Highest rated repositories', value: 'DESC'},
      {label: 'Lowest rated repositories', value: 'ASC'}
  ];
  
    return (
      <>
      <Searchbar placeholder='Search' onChangeText={props.onChangeSearch} value={props.searchkey} />
      <RNPickerSelect onValueChange={(value) => props.setValue(value)} items={items}/>
      </>
    );
  };
  


  render() {
      const props = this.props;

    const repositoryNodes = props.data
      ? props.data.repositories.edges.map(edge => edge.node)
      : [];

      if (props.loading) {
        return (
        <View>
            <Text>Loading...</Text>
        </View>
        );
    }
      
    return (
      <FlatList
        // ...
        ListHeaderComponent={this.renderHeader}
        style={styles.list}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem  item={item} style={styles.item} />
      )}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={props.onEndReach}
      onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryList;