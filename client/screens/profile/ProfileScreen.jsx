import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '../../constants';
import styles from '../../styles/profile';
import PlannerScreen from '../planner/PlannerScreen';
import HomeScreen from '../home/HomeScreen';

const ProfileScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('meals');

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={profileContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingHorizontal: SIZES.md,
            width: '100%',
          }}
        >
          {/* make this conditional */}
          <View style={{ marginVertical: SIZES.md }}>
            <Avatar.Icon
              size={100}
              style={{
                backgroundColor: COLORS.accent,
              }}
              icon={() => (
                <Ionicons
                  name='ios-person-outline'
                  size={60}
                  color={COLORS.primary}
                />
              )}
            />
          </View>

          <View style={[mv, profileText, { marginLeft: SIZES.sm }]}>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[name, profileText]}
            >
              Bryan D. Cortez
            </Text>

            <Text
              multiline={true}
              style={[bio, profileText, { marginBottom: SIZES.sm + 2 }]}
            >
              this is my bio
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={[
                  groupButton,
                  {
                    width: 100,
                    alignItems: 'flex-start',
                    marginRight: 8,
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
                    394
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
                    width: 100,
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
                    2.5k
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
                0
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
            colo
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
                0
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

        {/* content here */}
        <View style={mv}>
          {currentScreen === 'meals' ? <PlannerScreen /> : <HomeScreen />}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
