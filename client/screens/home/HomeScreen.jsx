import React from 'react';
import { ScrollView } from 'react-native';

import HomeRecipeCard from '../../components/home/HomeRecipeCard';
import { HOMEDATA } from '../../constants';

const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {HOMEDATA.map(({ id, headerTitle, subTitle }) => {
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
