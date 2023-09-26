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

const HomeScreen = ({ navigation }) => {
  const {
    headerContainer,
    headerTitleStyle,
    headerButtonContent,
    headerButtonStyle,
    headerButtonLabel,
  } = styles;

  const [refreshing, setRefreshing] = useState(false);

  const userInfo = useAuthStore((state) => state.userInfo);
  const favorites = useAuthStore((state) => state.favorites);
  const homeRecipes = useRecipeStore((state) => state.homeRecipes);
  const clearRecipe = useRecipeStore((state) => state.clearRecipe);
  const fetchRecipesData = useRecipeStore((state) => state.fetchRecipesData);
  const filters = useFilterStore((state) => state.filters);
  const loadCachedFilters = useFilterStore((state) => state.loadCachedFilters);

  useEffect(() => {
    fetchRecipesData();
  }, []);

  useEffect(() => {
    fetchRecipesData();
  }, [favorites]);

  const handleRefresh = () => {
    setRefreshing(true);

    loadCachedFilters();
    fetchRecipesData();

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
      {userInfo?.filtered ? (
        homeRecipes[0]?.data?.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[headerTitleStyle]}>
              No content available, please reload
            </Text>
          </View>
        ) : (
          <SectionList
            scrollEnabled={false}
            sections={homeRecipes}
            keyExtractor={(item, index) =>
              `${item?.recipes?._id.toString()}-${index}`
            }
            renderItem={({ item }) => {
              return (
                <FavoriteCard
                  name={item?.recipes?.name}
                  username={item?.recipes?.user_id?.username || 'anon'}
                  reviews={item?.reviews || 0}
                  ratings={item?.ratings || 0}
                  image={item?.recipes?.image}
                  id={item?.recipes?._id}
                />
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View
                style={[
                  headerContainer,
                  { marginTop: title === 'new recipes' ? 0 : 30 },
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
    </ScrollView>
  );
};

export default HomeScreen;
