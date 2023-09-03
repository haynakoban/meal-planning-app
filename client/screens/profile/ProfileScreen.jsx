import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '../../constants';
import { PlannerScreen, HomeScreen } from '../';

const ProfileScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('meals');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingVertical: SIZES.md,
          alignItems: 'center',
        }}
      >
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

        <View
          style={{
            marginVertical: SIZES.md,
          }}
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: SIZES.md,
              width: 250,
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            Bryan D. Cortez
          </Text>
          <Text
            multiline={true}
            style={{
              fontFamily: FONT.regular,
              fontSize: SIZES.sm + 2,
              lineHeight: SIZES.lg,
              width: 250,
              textAlign: 'center',
            }}
          >
            This is my bio
          </Text>
        </View>

        {/* group button */}
        <View
          style={{
            marginTop: SIZES.xs,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.accent,
            padding: 2,
            borderRadius: SIZES.sm,
          }}
        >
          <TouchableOpacity
            style={{
              width: 140,
              paddingTop: 2,
              paddingBottom: 6,
              borderRadius: SIZES.sm,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                currentScreen === 'meals' ? COLORS.lightWhite : 'transparent',
            }}
            activeOpacity={1}
            onPress={() => setCurrentScreen('meals')}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily:
                    currentScreen === 'meals' ? FONT.bold : FONT.medium,
                  fontSize: SIZES.lg,
                  color:
                    currentScreen === 'meals' ? COLORS.accent : COLORS.primary,
                }}
              >
                0
              </Text>
              <Text
                style={{
                  fontFamily:
                    currentScreen === 'meals' ? FONT.bold : FONT.medium,
                  fontSize: SIZES.sm,
                  color:
                    currentScreen === 'meals' ? COLORS.accent : COLORS.primary,
                }}
              >
                Meal Plans
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 140,
              paddingTop: 2,
              paddingBottom: 6,
              borderRadius: SIZES.sm,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                currentScreen === 'recipes' ? COLORS.lightWhite : 'transparent',
            }}
            colo
            activeOpacity={1}
            onPress={() => setCurrentScreen('recipes')}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily:
                    currentScreen === 'recipes' ? FONT.bold : FONT.medium,
                  fontSize: SIZES.lg,
                  color:
                    currentScreen === 'recipes'
                      ? COLORS.accent
                      : COLORS.primary,
                }}
              >
                0
              </Text>
              <Text
                style={{
                  fontFamily:
                    currentScreen === 'recipes' ? FONT.bold : FONT.medium,
                  fontSize: SIZES.sm,
                  color:
                    currentScreen === 'recipes'
                      ? COLORS.accent
                      : COLORS.primary,
                }}
              >
                Recipes
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* content here */}
        <View style={{ marginTop: SIZES.xs }}>
          {currentScreen === 'meals' ? <PlannerScreen /> : <HomeScreen />}
        </View>
      </View>
    </ScrollView>
  );
};
export default ProfileScreen;
