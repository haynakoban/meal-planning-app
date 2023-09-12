import { ScrollView, Text, Pressable } from 'react-native';

import HomeRecipeCard from '../../components/home/HomeRecipeCard';
import { HOMEDATA } from '../../constants';
import FilterProgressSteps from '../../components/modals/FilterProgressSteps';
import { useState } from 'react';

const HomeScreen = ({ navigation }) => {
  const [filtered, setFiltered] = useState(false);

  return (
    <>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </Pressable>
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
