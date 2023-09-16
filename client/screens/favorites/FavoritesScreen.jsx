import { useEffect, useLayoutEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';

import FavoriteCard from '../../components/favorites/FavoriteCard';
import styles from '../../styles/favorites';
import { COLORS, DATA, FONT, SIZES } from '../../constants';
import useAuthStore from '../../store/useAuthStore';
import axios from '../../lib/axiosConfig';
import { Button } from 'react-native-paper';

function CustomHeader() {
  return <View style={{ width: 0 }} />;
}

const FavoritesScreen = ({ navigation }) => {
  const { container } = styles;
  const [refreshing, setRefreshing] = useState(false);
  const { userInfo, getUserInfo, setUserInfo, getFavorites, favorites } =
    useAuthStore();

  // custom header/remove back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CustomHeader />,
    });
  }, [navigation]);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      getFavorites(userInfo?.favorites);
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);

    setUserInfo(userInfo?._id);
    getFavorites(userInfo?.favorites);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (favorites?.length === 0) {
    return (
      <View
        style={{
          paddingVertical: 4,
          paddingHorizontal: 20,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: SIZES.lg,
            textAlign: 'center',
            width: 250,
          }}
        >
          No favorites yet. Add some items to your favorites!
        </Text>

        <Button
          mode='contained'
          style={{ marginTop: 20, backgroundColor: COLORS.accent, padding: 4 }}
          textColor={COLORS.white}
          labelStyle={{ fontFamily: FONT.medium, fontSize: SIZES.md }}
          onPress={() => navigation.navigate('Recipes')}
        >
          Check Recipes
        </Button>
      </View>
    );
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      style={container}
      data={favorites}
      renderItem={({ item }) => {
        return (
          <FavoriteCard
            name={item?.name}
            username={item?.userinfo?.username || 'anon'}
            reviews={item?.totalReview || 0}
            ratings={item?.ratings || 0}
            image={item?.image}
            key={item?._id}
          />
        );
      }}
      numColumns={2}
    />
  );
};

export default FavoritesScreen;
