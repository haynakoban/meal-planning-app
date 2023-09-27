import { FlatList, View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import useRecipeStore from '../../store/useRecipeStore';
import LoadingScreen from '../loading/LoadingScreen';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import RecipeDeleteModal from '../../components/modals/RecipeDeleteModal';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { COLORS, FONT } from '../../constants';

const ProfileRecipes = ({ user_id, isEditable }) => {
  const recipes = useRecipeStore((state) => state.recipes);
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
                  {isEditable && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        marginHorizontal: 5,
                      }}
                    >
                      <Pressable
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 8,
                          backgroundColor: COLORS.secondary,
                          paddingHorizontal: 10,
                          width: '49%',
                          borderRadius: 3,
                          gap: 5,
                        }}
                        onPress={() => console.log('update')}
                      >
                        <Feather name='edit' size={20} color='black' />
                        <Text style={{ fontFamily: FONT.regular }}>Update</Text>
                      </Pressable>
                      <Pressable
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: COLORS.danger,
                          paddingVertical: 8,
                          paddingHorizontal: 10,
                          width: '49%',
                          borderRadius: 3,
                          gap: 5,
                        }}
                        onPress={() => openModal(item?.recipes._id)}
                      >
                        <MaterialIcons
                          name='delete'
                          size={20}
                          color={COLORS.white}
                        />
                        <Text
                          style={{
                            color: COLORS.white,
                            fontFamily: FONT.regular,
                          }}
                        >
                          Delete
                        </Text>
                      </Pressable>
                    </View>
                  )}
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
        <>
          {modalVisible && (
            <RecipeDeleteModal
              visible={modalVisible}
              id={recipe_id}
              type='recipe'
              onClose={closeModal}
            />
          )}
        </>
      </View>

      {!recipes.length > 0 && (
        <Text style={{ fontFamily: FONT.regular, textAlign: 'center' }}>
          Create new recipe
        </Text>
      )}
    </>
  );
};

export default ProfileRecipes;
