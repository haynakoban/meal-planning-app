import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import FavoriteCard from '../../components/favorites/FavoriteCard';

export const data = [
  {
    id: '1',
    name: 'Adobong Manok',
    username: '@juanluna',
    ratings: 65,
    image:
      'https://yummyfood.ph/wp-content/uploads/2021/08/Chicken-Adobo-Recipe.jpg',
  },
  {
    id: '2',
    name: 'Sinigang na Baboy',
    username: '@semicolon',
    ratings: 231,
    image:
      'https://www.kawalingpinoy.com/wp-content/uploads/2013/01/sinigang-baboy-7.jpg',
  },
  {
    id: '3',
    name: 'Tortang Isda',
    username: '@juandelacruz',
    ratings: 12,
    image:
      'https://i0.wp.com/www.angsarap.net/wp-content/uploads/2020/09/Tortang-Dulong-Wide.jpg?fit=1080%2C720&ssl=1',
  },
  {
    id: '4',
    name: 'Kare-kare',
    username: '@xenonxenon',
    ratings: 654,
    image:
      'https://api.lifegetsbetter.ph/uploads/recipes/featured/Kare-KAre.jpg',
  },
  {
    id: '5',
    name: 'Lumpiang Shanghai',
    username: '@semicolon',
    ratings: 132,
    image:
      'https://images.aws.nestle.recipes/resized/8fa4b6a13f1d904c77b6f6da0cfe5c21_nks-b3-d02_640_944_531.jpg',
  },
  {
    id: '6',
    name: 'Lumpiang Shanghai',
    username: '@semicolon',
    ratings: 132,
    image:
      'https://images.aws.nestle.recipes/resized/8fa4b6a13f1d904c77b6f6da0cfe5c21_nks-b3-d02_640_944_531.jpg',
  },
];

function CustomHeader() {
  return <View style={{ width: 0 }} />;
}

const FavoritesScreen = ({ navigation }) => {
  // custom header/remove back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CustomHeader />,
    });
  }, [navigation]);

  return (
    <>
      {/* loop favorite card */}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    elevation: 5,
  },
});

export default FavoritesScreen;
