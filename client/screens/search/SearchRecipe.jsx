import { FlatList, ScrollView, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import SelectRecipe from '../../components/planner/SelectRecipe';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import useRecipeStore from '../../store/useRecipeStore';
import LoadingScreen from '../loading/LoadingScreen';
import styles from '../../styles/search';
import { COLORS } from '../../constants';

const SearchRecipe = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const allRecipes = useRecipeStore((state) => state.allRecipes);
  const clearRecipe = useRecipeStore((state) => state.clearRecipe);
  const searchRecipes = useRecipeStore((state) => state.searchRecipes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    clearRecipe();
    searchRecipes('');
    allRecipes();

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const setRecipe = useMealPlanRecipe((state) => state.addRecipes);
  const removeRecipes = useMealPlanRecipe((state) => state.removeRecipes);

  const addRecipe = (id) => {
    return setRecipe(id);
  };

  const removeRecipe = (id) => {
    return removeRecipes(id);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{ padding: 8 }}>
          {recipes?.length > 0 ? (
            <>
              {recipes?.map((item, index) => {
                return (
                  <View key={index} style={{ width: '100%', marginBottom: 8 }}>
                    <SelectRecipe
                      data={item}
                      id={item._id}
                      addRecipe={addRecipe}
                      removeRecipe={removeRecipe}
                    />
                  </View>
                );
              })}
            </>
          ) : (
            <Text
              style={[
                styles.headerTitle,
                { textAlign: 'center', color: COLORS.black },
              ]}
            >
              No recipe found
            </Text>
          )}
        </ScrollView>
      )}
    </>
  );
};

export default SearchRecipe;
