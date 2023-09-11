import { ScrollView } from 'react-native';

import HomeRecipeCard from '../../components/home/HomeRecipeCard';
import { HOMEDATA } from '../../constants';
import FilterProgressSteps from '../../components/modals/FilterProgressSteps';
import { useState } from 'react';

const HomeScreen = () => {
  const [filtered, setFiltered] = useState(false);

  return (
    <>
      {filtered ? (
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
      ) : (
        <FilterProgressSteps setFiltered={setFiltered} />
      )}
    </>
  );
};

export default HomeScreen;
