import { useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native';

import FavoriteCard from '../../components/favorites/FavoriteCard';
import styles from '../../styles/favorites';
import { DATA } from '../../constants';

function CustomHeader() {
  return <View style={{ width: 0 }} />;
}

const FavoritesScreen = ({ navigation }) => {
  const { container } = styles;

  // custom header/remove back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CustomHeader />,
    });
  }, [navigation]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={container}
      data={DATA}
      renderItem={({ item }) => {
        const { name, username, ratings, image, id } = item;
        return (
          <FavoriteCard
            name={name}
            username={username}
            ratings={ratings}
            image={image}
            key={id}
          />
        );
      }}
      numColumns={2}
    />
  );
};

export default FavoritesScreen;
