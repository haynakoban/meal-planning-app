import { View, Text } from 'react-native';
import { Fragment, useEffect, useState } from 'react';
import useRecipeStore from '../../store/useRecipeStore';
import LoadingScreen from '../loading/LoadingScreen';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import { FONT } from '../../constants';

const UserRecipes = ({ user_id }) => {
  const otherRecipes = useRecipeStore((state) => state.otherRecipes);
  const setOtherRecipes = useRecipeStore((state) => state.setOtherRecipes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setOtherRecipes(user_id);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
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
              <>
                {otherRecipes.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {item?.recipes?.privacy == 'public' && (
                        <View key={index} style={{ width: '100%' }}>
                          <FavoriteCard
                            name={item?.recipes.name}
                            username={item?.recipes.user_id?.username || 'anon'}
                            reviews={item?.reviews || 0}
                            ratings={item?.ratings || 0}
                            image={item?.recipes.image}
                            id={item?.recipes._id}
                          />
                        </View>
                      )}
                    </Fragment>
                  );
                })}
              </>
            )}
          </View>

          {!otherRecipes.length > 0 && (
            <Text style={{ fontFamily: FONT.regular, textAlign: 'center' }}>
              No recipes
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default UserRecipes;
