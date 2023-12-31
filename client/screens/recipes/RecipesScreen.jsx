import { FlatList, View, ActivityIndicator } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';

import { SIZES } from '../../constants';
import useMealTypeStore from '../../store/useMealTypeStore';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import useRecipeStore from '../../store/useRecipeStore';
import useAuthStore from '../../store/useAuthStore';

const RecipesScreen = () => {
  const route = useRoute();
  const { title } = route.params;
  const userInfo = useAuthStore((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isFetching = useRef(false);
  const { homeRecipes } = useRecipeStore();

  const { mealTypesData, fetchMealTypes, clearMealTypeData } =
    useMealTypeStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (isFetching.current || isLoading) {
      return;
    }

    isFetching.current = true;
    setIsLoading(true);

    try {
      if (title != 'Filtered Recipes') {
        fetchMealTypes(title, page);
        setPage(page + 1);
      } else {
        clearMealTypeData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isFetching.current = false;
      setIsLoading(false);
    }
  };

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator animating size='large' />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 4, elevation: 5, paddingTop: SIZES.md }}
      data={mealTypesData.length > 0 ? mealTypesData : homeRecipes[0]?.data}
      renderItem={({ item }) => {
        return (
          <>
            {item?.recipes?.privacy == 'public' &&
              item?.recipes?.user_id?.username === 'default' && (
                <View key={item?._id} style={{ width: '50%' }}>
                  <FavoriteCard
                    name={item?.recipes?.name}
                    username={item?.recipes?.user_id?.username || 'anon'}
                    reviews={item?.reviews || 0}
                    ratings={item?.ratings || 0}
                    image={item?.recipes?.image}
                    id={item?.recipes?._id}
                  />
                </View>
              )}
          </>
        );
      }}
      numColumns={2}
      onEndReached={fetchData}
      onEndReachedThreshold={0.2}
      ListFooterComponent={renderFooter}
    />
  );
};

export default RecipesScreen;
