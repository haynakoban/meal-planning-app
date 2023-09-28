import { useEffect, useLayoutEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Text, ScrollView } from 'react-native';

import FavoriteCard from '../../components/favorites/FavoriteCard';
import styles from '../../styles/favorites';
import { COLORS, FONT, SIZES } from '../../constants';
import useAuthStore from '../../store/useAuthStore';
import { Button } from 'react-native-paper';
import LoadingScreen from '../loading/LoadingScreen';

function CustomHeader() {
  return <View style={{ width: 0 }} />;
}

const FavoritesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { container } = styles;
  const [refreshing, setRefreshing] = useState(false);
  const { userInfo, getUserInfo, setUserInfo, getFavorites, favorites } =
    useAuthStore();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

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

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {favorites?.length === 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  style={{ elevation: 9999 }}
                />
              }
            >
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
                  style={{
                    marginTop: 20,
                    backgroundColor: COLORS.accent,
                    padding: 4,
                  }}
                  textColor={COLORS.white}
                  labelStyle={{ fontFamily: FONT.medium, fontSize: SIZES.md }}
                  onPress={() => navigation.navigate('Recipes')}
                >
                  Check Recipes
                </Button>
              </View>
            </ScrollView>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  style={{ zIndex: 999 }}
                />
              }
              style={container}
              data={favorites}
              renderItem={({ item }) => {
                return (
                  <FavoriteCard
                    name={item?.recipes?.name}
                    username={item?.recipes?.user_id?.username || 'anon'}
                    reviews={item?.reviews || 0}
                    ratings={item?.ratings || 0}
                    image={item?.recipes?.image}
                    id={item?.recipes?._id}
                    key={item?._id}
                  />
                );
              }}
              numColumns={2}
            />
          )}
        </>
      )}
    </>
  );
};

export default FavoritesScreen;
