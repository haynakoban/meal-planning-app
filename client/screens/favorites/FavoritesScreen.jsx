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
    <>
      {/* loop favorite card */}
      <FlatList
        style={container}
        data={DATA}
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

export default FavoritesScreen;
