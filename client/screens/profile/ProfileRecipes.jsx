import { FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';
import useRecipeStore from '../../store/useRecipeStore';
import LoadingScreen from '../loading/LoadingScreen';
import FavoriteCard from '../../components/favorites/FavoriteCard';

const ProfileRecipes = ({ user_id }) => {
  const recipes = useRecipeStore((state) => state.recipes);
  const presonalRecipes = useRecipeStore((state) => state.presonalRecipes);
  const clearRecipe = useRecipeStore((state) => state.clearRecipe);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    clearRecipe();
    presonalRecipes(user_id);
  }, []);

  return (
    <View
      style={{
        marginTop: 5,
        marginHorizontal: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        // <FlatList
        //   showsVerticalScrollIndicator={false}
        //   style={{ padding: 8 }}
        //   data={recipes}
        //   keyboardShouldPersistTaps='always'
        //   renderItem={({ item }) => {
        //     return (
        //       <FavoriteCard
        //         name={item?.recipes.name}
        //         username={item?.recipes.user_id?.username || 'anon'}
        //         reviews={item?.reviews || 0}
        //         ratings={item?.ratings || 0}
        //         image={item?.recipes.image}
        //         id={item?.recipes._id}
        //       />
        //     );
        //   }}
        //   numColumns={2}
        //   keyExtractor={(item) => item._id}
        // />

        <>
          {recipes.map((item, index) => {
            return (
              <View key={index} style={{ width: '50%' }}>
                <FavoriteCard
                  name={item?.recipes.name}
                  username={item?.recipes.user_id?.username || 'anon'}
                  reviews={item?.reviews || 0}
                  ratings={item?.ratings || 0}
                  image={item?.recipes.image}
                  id={item?.recipes._id}
                />
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

export default ProfileRecipes;
