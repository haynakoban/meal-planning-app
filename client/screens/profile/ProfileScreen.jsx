import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT } from '../../constants';
import styles from '../../styles/profile';
import { PlannerScreen, HomeScreen } from '../';

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
        {/* make this conditional */}
        <Avatar.Icon
          size={100}
          style={{ backgroundColor: COLORS.accent }}
          icon={() => (
            <Ionicons
              name='ios-person-outline'
              size={60}
              color={COLORS.primary}
            />
          )}
        />

        <View style={mv}>
          <Text style={[name, profileText]}>Bryan D. Cortez</Text>
          <Text multiline={true} style={[bio, profileText]}>
            This is my bio
          </Text>
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
