import { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import { Avatar, Text, Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '../../constants';
import useAuthStore from '../../store/useAuthStore';
import styles from '../../styles/profile';
import { formatNumber } from '../../lib/formatNumber';
import ProfileRecipes from './ProfileRecipes';
import ProfileMeals from './ProfileMeals';
import useRecipeStore from '../../store/useRecipeStore';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';

const ProfileScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('meals');
  const [refreshing, setRefreshing] = useState(false);
  const { userInfo, getUserInfo, setUserInfo } = useAuthStore();
  const recipes = useRecipeStore((state) => state.recipes);
  const clearRecipe = useRecipeStore((state) => state.clearRecipe);
  const presonalRecipes = useRecipeStore((state) => state.presonalRecipes);
  const personalMeals = useMealPlanRecipe((state) => state.personalMeals);
  const fetchPersonalMeals = useMealPlanRecipe(
    (state) => state.fetchPersonalMeals
  );
  const [isRecipeEditable, setIsRecipeEditable] = useState(false);
  const [isMealEditable, setIsMealEditable] = useState(false);

  useEffect(() => {
    clearRecipe();
    presonalRecipes(userInfo?._id);
    fetchPersonalMeals(userInfo?._id);
  }, []);

  const {
    profileContainer,
    profileText,
    mv,
    bio,
    name,
    groupButton,
    groupButtonView,
    groupButtonViewNumber,
    groupButtonViewText,
    groupButtonWrapper,
  } = styles;

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);

    setUserInfo(userInfo?._id);

    clearRecipe();
    presonalRecipes(userInfo?._id);
    fetchPersonalMeals(userInfo?._id);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={profileContainer}>
        <View
          style={{
            justifyContentL: 'center',
            alignItems: 'center',
            paddingHorizontal: SIZES.md,
            width: '100%',
          }}
        >
          {/* make this conditional */}
          <View style={{ marginVertical: SIZES.md }}>
            {userInfo?.image ? (
              <Avatar.Image
                size={80}
                style={{
                  backgroundColor: COLORS.accent,
                }}
                source={{ uri: userInfo?.image }}
              />
            ) : (
              <Avatar.Icon
                size={80}
                style={{
                  backgroundColor: COLORS.accent,
                }}
                icon={() => (
                  <Ionicons
                    name='ios-person-outline'
                    size={40}
                    color={COLORS.primary}
                  />
                )}
              />
            )}
          </View>

          <View style={[profileText, { alignItems: 'center' }]}>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[name, profileText]}
            >
              {userInfo?.fullname}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <TouchableOpacity
                style={[
                  groupButton,
                  {
                    width: 'auto',
                    alignItems: 'flex-start',
                  },
                ]}
                activeOpacity={1}
                onPress={() => console.log('hello')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Text
                    style={[
                      groupButtonViewText,
                      {
                        fontFamily: FONT.bold,
                        color: COLORS.black,
                        marginRight: 4,
                      },
                    ]}
                  >
                    {formatNumber(userInfo?.public_metrics?.following?.length)}
                  </Text>
                  <Text
                    style={[
                      groupButtonViewText,
                      {
                        fontFamily: FONT.semiBold,
                        color: COLORS.black,
                      },
                    ]}
                  >
                    Following
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  groupButton,
                  {
                    width: 'auto',
                    alignItems: 'flex-start',
                  },
                ]}
                activeOpacity={1}
                onPress={() => console.log('hello')}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Text
                    style={[
                      groupButtonViewText,
                      {
                        fontFamily: FONT.bold,
                        color: COLORS.black,
                        marginRight: 4,
                      },
                    ]}
                  >
                    {formatNumber(userInfo?.public_metrics?.followers?.length)}
                  </Text>
                  <Text
                    style={[
                      groupButtonViewText,
                      {
                        fontFamily: FONT.semiBold,
                        color: COLORS.black,
                      },
                    ]}
                  >
                    Followers
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text
              multiline={true}
              style={[
                bio,
                profileText,
                {
                  marginTop: 4,
                  textAlign: 'center',
                  width: '75%',
                },
              ]}
            >
              {userInfo?.bio || 'this is my bio'}
            </Text>
          </View>
        </View>

        {/* group button */}
        <View style={groupButtonWrapper}>
          <TouchableOpacity
            style={[
              groupButton,
              {
                backgroundColor:
                  currentScreen === 'meals' ? COLORS.lightWhite : 'transparent',
              },
            ]}
            activeOpacity={1}
            onPress={() => setCurrentScreen('meals')}
          >
            <View style={groupButtonView}>
              <Text
                style={[
                  groupButtonViewNumber,
                  {
                    fontFamily:
                      currentScreen === 'meals' ? FONT.bold : FONT.medium,
                    color:
                      currentScreen === 'meals'
                        ? COLORS.accent
                        : COLORS.primary,
                  },
                ]}
              >
                {personalMeals?.length || 0}
              </Text>
              <Text
                style={[
                  groupButtonViewText,
                  {
                    fontFamily:
                      currentScreen === 'meals' ? FONT.bold : FONT.medium,
                    color:
                      currentScreen === 'meals'
                        ? COLORS.accent
                        : COLORS.primary,
                  },
                ]}
              >
                Meal Plans
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              groupButton,
              {
                backgroundColor:
                  currentScreen === 'recipes'
                    ? COLORS.lightWhite
                    : 'transparent',
              },
            ]}
            activeOpacity={1}
            onPress={() => setCurrentScreen('recipes')}
          >
            <View style={groupButtonView}>
              <Text
                style={[
                  groupButtonViewNumber,
                  {
                    fontFamily:
                      currentScreen === 'recipes' ? FONT.bold : FONT.medium,
                    color:
                      currentScreen === 'recipes'
                        ? COLORS.accent
                        : COLORS.primary,
                  },
                ]}
              >
                {recipes?.length || 0}
              </Text>
              <Text
                style={[
                  groupButtonViewText,
                  {
                    fontFamily:
                      currentScreen === 'recipes' ? FONT.bold : FONT.medium,
                    color:
                      currentScreen === 'recipes'
                        ? COLORS.accent
                        : COLORS.primary,
                  },
                ]}
              >
                Recipes
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* content here */}
      <View style={mv}>
        {currentScreen === 'meals' ? (
          <>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 10,
                alignItems: 'flex-end',
              }}
            >
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.secondary,
                  paddingLeft: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setIsMealEditable(!isMealEditable);
                }}
              >
                <Text style={{ fontFamily: FONT.medium }}>
                  {/* {isMealEditable ? 'Unedit Meal' : 'Edit Meal'} */}
                  Edit Meals
                </Text>
                <Checkbox status={isMealEditable ? 'checked' : 'unchecked'} />
              </Pressable>
            </View>
            <ProfileMeals user_id={userInfo?._id} isEditable={isMealEditable} />
          </>
        ) : (
          <>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 10,
                alignItems: 'flex-end',
              }}
            >
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.secondary,
                  paddingLeft: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setIsRecipeEditable(!isRecipeEditable);
                }}
              >
                <Text style={{ fontFamily: FONT.medium }}>
                  {/* {isRecipeEditable ? 'Unedit Recipe' : 'Edit Recipe'} */}
                  Edit Recipes
                </Text>
                <Checkbox status={isRecipeEditable ? 'checked' : 'unchecked'} />
              </Pressable>
            </View>
            <ProfileRecipes
              user_id={userInfo?._id}
              isEditable={isRecipeEditable}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
