import React from 'react';
import { ScrollView } from 'react-native';

import HomeRecipeCard from '../../components/home/HomeRecipeCard';

const data = [
  {
    id: 1,
    headerTitle: 'Recommended Recipes',
    subTitle: 'Recommended',
  },
  {
    id: 2,
    headerTitle: 'Breakfast',
    subTitle: 'Breakfast',
  },
  {
    id: 3,
    headerTitle: 'Lunch',
    subTitle: 'Lunch',
  },
  {
    id: 4,
    headerTitle: 'Dinner',
    subTitle: 'Dinner',
  },
];
const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data.map(({ id, headerTitle, subTitle }) => {
        return (
          <HomeRecipeCard
            key={id}
            headerTitle={headerTitle}
            subTitle={subTitle}
          />
        );
      })}
    </ScrollView>
  );
};

export default HomeScreen;
