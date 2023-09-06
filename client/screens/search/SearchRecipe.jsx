import { FlatList } from 'react-native';

import { DATA } from '../../constants';

import SelectRecipe from '../../components/planner/SelectRecipe';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';

const SearchRecipe = () => {
  const setBreakfast = useMealPlanRecipe((state) => state.addBreakfast);
  const setSnacks = useMealPlanRecipe((state) => state.addSnacks);
  const setLunch = useMealPlanRecipe((state) => state.addLunch);
  const setDinner = useMealPlanRecipe((state) => state.addDinner);

  const addRecipe = ({ id, type }) => {
    if (type === 'breakfast') return setBreakfast(id);
    if (type === 'snacks') return setSnacks(id);
    if (type === 'lunch') return setLunch(id);
    if (type === 'dinner') return setDinner(id);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ padding: 8 }}
      data={DATA}
      renderItem={({ item }) => {
        const { name, username, ratings, image, id } = item;
        return (
          <SelectRecipe
            name={name}
            username={username}
            ratings={ratings}
            image={image}
            id={id}
            addRecipe={addRecipe}
          />
        );
      }}
      numColumns={2}
    />
  );
};

export default SearchRecipe;
