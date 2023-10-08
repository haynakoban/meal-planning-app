import { FlatList, View, Text, Pressable } from 'react-native';
import { Fragment, useEffect, useState } from 'react';
import useRecipeStore from '../../store/useRecipeStore';
import LoadingScreen from '../loading/LoadingScreen';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import RecipeDeleteModal from '../../components/modals/RecipeDeleteModal';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { COLORS, FONT } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../store/useAuthStore';

const UserRecipes = ({ user_id }) => {
  const navigation = useNavigation();
  const recipes = useRecipeStore((state) => state.recipes);
  const userInfo = useAuthStore((state) => state.userInfo);
  const presonalRecipes = useRecipeStore((state) => state.presonalRecipes);
  const clearRecipe = useRecipeStore((state) => state.clearRecipe);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [recipe_id, setRecipeId] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const openModal = (id) => {
    setRecipeId(id);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    clearRecipe();
    presonalRecipes(user_id);
  }, []);

  return (
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
            {recipes.map((item, index) => {
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
        <>
          {modalVisible && (
            <RecipeDeleteModal
              visible={modalVisible}
              id={recipe_id}
              onClose={closeModal}
            />
          )}
        </>
      </View>

      {!recipes.length > 0 && (
        <Text style={{ fontFamily: FONT.regular, textAlign: 'center' }}>
          No recipes
        </Text>
      )}
    </>
  );
};

export default UserRecipes;
