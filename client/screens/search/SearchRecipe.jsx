import { FlatList } from 'react-native';

import { DATA } from '../../constants';
import { Fragment, useEffect, useState } from 'react';
import SelectRecipe from '../../components/planner/SelectRecipe';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import useRecipeStore from '../../store/useRecipeStore';
import LoadingScreen from '../loading/LoadingScreen';

const SearchRecipe = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const listRecipes = useRecipeStore((state) => state.listRecipes);
  const clearRecipe = useRecipeStore((state) => state.clearRecipe);
  const searchRecipes = useRecipeStore((state) => state.searchRecipes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    searchRecipes('');
    clearRecipe();
    listRecipes();
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
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ padding: 8 }}
          data={recipes}
          keyboardShouldPersistTaps='always'
          renderItem={({ item }) => {
            return (
              <SelectRecipe
                data={item}
                id={item._id}
                addRecipe={addRecipe}
                removeRecipe={removeRecipe}
              />
            );
          }}
          numColumns={2}
        />
      )}
    </>
  );
};

export default SearchRecipe;
