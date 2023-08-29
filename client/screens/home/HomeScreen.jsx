import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { data } from '../favorites/FavoritesScreen';
import FavoriteCard from '../favorites/FavoriteCard';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={data}
        renderItem={({ item }) => (
          <FavoriteCard
            name={item.name}
            username={item.username}
            ratings={item.ratings}
            image={item.image}
            key={item.id}
          />
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    elevation: 5,
  },
});

export default HomeScreen;
