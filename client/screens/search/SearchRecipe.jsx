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

  const setBreakfast = useMealPlanRecipe((state) => state.addBreakfast);
  const setSnacks = useMealPlanRecipe((state) => state.addSnacks);
  const setLunch = useMealPlanRecipe((state) => state.addLunch);
  const setDinner = useMealPlanRecipe((state) => state.addDinner);

  const removeBreakfast = useMealPlanRecipe((state) => state.removeBreakfast);
  const removeSnacks = useMealPlanRecipe((state) => state.removeSnacks);
  const removeLunch = useMealPlanRecipe((state) => state.removeLunch);
  const removeDinner = useMealPlanRecipe((state) => state.removeDinner);

  const addRecipe = ({ id, type }) => {
    if (type === 'breakfast') return setBreakfast(id);
    if (type === 'snacks') return setSnacks(id);
    if (type === 'lunch') return setLunch(id);
    if (type === 'dinner') return setDinner(id);
  };

  const removeRecipe = ({ id, type }) => {
    if (type === 'breakfast') return removeBreakfast(id);
    if (type === 'snacks') return removeSnacks(id);
    if (type === 'lunch') return removeLunch(id);
    if (type === 'dinner') return removeDinner(id);
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
