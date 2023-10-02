import { FlatList, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import useRecipeStore from '../../store/useRecipeStore';
import { debounce } from '../../constants/debounce';

import {
  COLORS,
  SHADOWS,
  SIZES,
  recipeSearchData,
  searchesScreens,
} from '../../constants';
import styles from '../../styles/search';

const SearchScreen = () => {
  const navigation = useNavigation();
  const recipes = useRecipeStore((state) => state.recipes);
  const listRecipes = useRecipeStore((state) => state.listRecipes);
  const searchRecipes = useRecipeStore((state) => state.searchRecipes);
  const { recipeText, setRecipeText } = useRecipeStore();

  const delayedSearch = debounce((text) => {
    searchRecipes(text);
  });

  // search recipe
  const searchRecipeText = (text) => {
    setRecipeText(text);
    delayedSearch(text);
  };

  useEffect(() => {
    listRecipes();
  }, []);

  return (
    <>
      {recipeText != '' ? (
        <>
          {recipes.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ padding: 8 }}
              data={recipes}
              keyboardShouldPersistTaps='always'
              renderItem={({ item }) => {
                let calculated = 0;
                for (let i = 0; i < item?.feedbacks.length; i++) {
                  calculated += parseInt(item?.feedbacks[i]?.rating);
                }

                return (
                  <View key={item?._id} style={{ width: '50%' }}>
                    <FavoriteCard
                      name={item?.name}
                      username={item?.user_id?.username || 'anon'}
                      reviews={item?.feedbacks.length || 0}
                      ratings={calculated / item?.feedbacks.length || 0}
                      image={item?.image}
                      id={item?._id}
                    />
                  </View>
                );
              }}
              numColumns={2}
            />
          ) : (
            <View>
              <Text style={[styles.headerTitle, { textAlign: 'center' }]}>
                No recipe found
              </Text>
            </View>
          )}
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[SHADOWS.small, styles.bg]}>
            <Text style={styles.headerTitle}>Recently searches</Text>
            {recipeSearchData.map((_, i) => {
              return (
                <Button
                  key={i}
                  icon={() => (
                    <Ionicons
                      name='search'
                      size={SIZES.lg}
                      color={COLORS.lightBlack}
                    />
                  )}
                  style={styles.buttonStyle}
                  textColor={COLORS.black}
                  labelStyle={styles.buttonLabelStyle}
                  contentStyle={styles.buttonContentStyle}
                  onPress={() => searchRecipeText(_.search)}
                >
                  {_.search}
                </Button>
              );
            })}
          </View>

          <View style={styles.divider} />
          <View style={[SHADOWS.small, styles.bg]}>
            {searchesScreens.map((_, i) => {
              return (
                <Button
                  key={i}
                  icon={() => (
                    <Ionicons
                      name={_.icon}
                      size={SIZES.lg}
                      color={COLORS.lightBlack}
                    />
                  )}
                  style={[styles.buttonStyle, styles.border]}
                  textColor={COLORS.black}
                  labelStyle={styles.buttonLabelStyle}
                  contentStyle={styles.buttonContentStyle}
                  onPress={() => navigation.navigate(_.screen)}
                >
                  {_.label}
                </Button>
              );
            })}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default SearchScreen;
