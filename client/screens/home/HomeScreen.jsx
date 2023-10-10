import { useState, useEffect } from 'react';
import {
  RefreshControl,
  ScrollView,
  SectionList,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import FilterProgressSteps from '../../components/modals/FilterProgressSteps';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import useFilterStore from '../../store/useFilterStore';
import useAuthStore from '../../store/useAuthStore';
import useRecipeStore from '../../store/useRecipeStore';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/homeRecipes';
import LoadingScreen from '../loading/LoadingScreen';

const HomeScreen = ({ navigation }) => {
  const {
    headerContainer,
    headerTitleStyle,
    headerButtonContent,
    headerButtonStyle,
    headerButtonLabel,
  } = styles;

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userInfo = useAuthStore((state) => state.userInfo);
  const homeRecipes = useRecipeStore((state) => state.homeRecipes);
  const fetchRecipesData = useRecipeStore((state) => state.fetchRecipesData);
  const setFilteredRecipe = useRecipeStore((state) => state.setFilteredRecipe);
  const added = useRecipeStore((state) => state.added);
  const filters = useFilterStore((state) => state.filters);
  const loadCachedFilters = useFilterStore((state) => state.loadCachedFilters);
  const { filteredData } = useFilterStore();
  useEffect(() => {
    if (
      filteredData.Allergies.length === 0 &&
      filteredData.CookingTimes.length === 0 &&
      filteredData.Cuisines.length === 0 &&
      filteredData.Ingredients.length === 0 &&
      filteredData.MealTypes.length === 0 &&
      filteredData.Preferences.length === 0
    ) {
      fetchRecipesData();
    } else {
      setFilteredRecipe();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [added]);

  const handleRefresh = () => {
    setRefreshing(true);

    loadCachedFilters();
    if (
      filteredData.Allergies.length === 0 &&
      filteredData.CookingTimes.length === 0 &&
      filteredData.Cuisines.length === 0 &&
      filteredData.Ingredients.length === 0 &&
      filteredData.MealTypes.length === 0 &&
      filteredData.Preferences.length === 0
    ) {
      fetchRecipesData();
    } else {
      setFilteredRecipe();
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='always'
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {userInfo?.filtered ? (
            homeRecipes[0]?.data?.length === 0 ? (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[headerTitleStyle]}>
                  No content available, please reload
                </Text>
              </View>
            ) : (
              <SectionList
                style={{ flex: 1, backgroundColor: 'white' }}
                scrollEnabled={false}
                sections={homeRecipes}
                keyExtractor={(item, index) =>
                  `${item?.recipes?._id.toString()}-${index}`
                }
                renderItem={({ item }) => {
                  return (
                    <>
                      {item?.recipes?.privacy == 'public' ||
                      item?.recipes?.user_id._id == userInfo?._id ? (
                        <FavoriteCard
                          name={item?.recipes?.name}
                          username={item?.recipes?.user_id?.username || 'anon'}
                          reviews={item?.reviews || 0}
                          ratings={item?.ratings || 0}
                          image={item?.recipes?.image}
                          id={item?.recipes?._id}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }}
                renderSectionHeader={({ section: { title } }) => (
                  <View
                    style={[
                      headerContainer,
                      {
                        marginTop:
                          title === 'new recipes' || 'Recommended Recipes'
                            ? 0
                            : 30,
                      },
                    ]}
                  >
                    <Text style={[headerTitleStyle]}>{title}</Text>
                    <Button
                      mode='text'
                      icon={() => (
                        <FontAwesome
                          name='angle-right'
                          size={SIZES.lg}
                          color={COLORS.black}
                        />
                      )}
                      contentStyle={headerButtonContent}
                      style={headerButtonStyle}
                      textColor={COLORS.black}
                      labelStyle={headerButtonLabel}
                      onPress={() => {
                        navigation.navigate('Show All Recipes', {
                          title: title,
                        });
                      }}
                    >
                      See all
                    </Button>
                  </View>
                )}
              />
            )
          ) : (
            <FilterProgressSteps filters={filters} />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
