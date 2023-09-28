import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import LoadingScreen from '../loading/LoadingScreen';
import MealDeleteModal from '../../components/modals/MealDeleteModal';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { COLORS, FONT } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import PlansCard from '../../components/planner/PlansCard';

const ProfileMeals = ({ user_id, isEditable }) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const { personalMeals, fetchPersonalMeals } = useMealPlanRecipe();
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
    setIsLoading(true);

    async function fetchData() {
      await fetchPersonalMeals(user_id);

      if (useMealPlanRecipe.getState(personalMeals)) {
        setIsLoading(false);
      }
    }

    fetchData();
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
            {personalMeals.map((item, index) => {
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
                        onPress={() =>
                          navigation.navigate('Update Recipe', {
                            id: item?._id,
                          })
                        }
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
                        onPress={() => openModal(item?._id)}
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
                  <PlansCard
                    name={item?.name}
                    image={item?.image}
                    type={item?.time}
                  />
                </View>
              );
            })}
          </>
        )}
        <>
          {modalVisible && (
            <MealDeleteModal
              visible={modalVisible}
              id={recipe_id}
              onClose={closeModal}
            />
          )}
        </>
      </View>

      {!personalMeals?.length > 0 && (
        <Text style={{ fontFamily: FONT.regular, textAlign: 'center' }}>
          Create new meal
        </Text>
      )}
    </>
  );
};

export default ProfileMeals;
