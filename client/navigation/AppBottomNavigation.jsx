import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FavoritesScreen,
  HomeScreen,
  MealRecipeModalScreen,
  PlannerScreen,
  ProfileScreen,
} from '../screens';
import { COLORS, FONT, SIZES } from '../constants';
import { FilterModal } from '../components/general/FilterDropdown';
import useAuthStore from '../store/useAuthStore';
import { ProfileModal } from '../components/general/ProfileDropdown';

const Tab = createBottomTabNavigator();

const AppBottomNavigation = () => {
  const [visible, setVisible] = useState(false);
  const [pVisible, setPVisible] = useState(false);
  const { userInfo, getUserInfo } = useAuthStore();

  useEffect(() => {
    getUserInfo();
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const pShowModal = () => setPVisible(true);
  const pHideModal = () => setPVisible(false);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.accent,
        },
        headerTintColor: COLORS.primary,
        tabBarLabel: () => {
          return route.name === 'Meal Recipe Modal' ? (
            ''
          ) : (
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: SIZES.xs,
                color: '#222',
              }}
            >
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Recipes') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Planner') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Meal Recipe Modal') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={
                route.name === 'Meal Recipe Modal' ? SIZES.xxl + 8 : SIZES.lg
              }
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name='Recipes'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Recipes',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: FONT.semiBold,
            color: COLORS.primary,
            letterSpacing: 0.1,
          },
          headerLeft: () => (
            <View style={{ marginLeft: SIZES.md }}>
              <Avatar.Image
                size={32}
                style={{ backgroundColor: COLORS.primary }}
                source={require('../assets/images/logo.png')}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: SIZES.md }}>
              <Ionicons
                name='search'
                size={26}
                color={COLORS.white}
                style={{ marginRight: SIZES.sm }}
                onPress={() => navigation.navigate('Search')}
              />
              <Ionicons
                name='filter'
                size={26}
                color={COLORS.white}
                onPress={showModal}
              />
              <FilterModal visible={visible} hideModal={hideModal} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name='Planner'
        component={PlannerScreen}
        options={({ navigation }) => ({
          headerTitle: 'Planner',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: FONT.semiBold,
            color: COLORS.primary,
            letterSpacing: 0.1,
          },
          headerLeft: () => (
            <View style={{ marginLeft: SIZES.md }}>
              <Avatar.Image
                size={32}
                style={{ backgroundColor: COLORS.primary }}
                source={require('../assets/images/logo.png')}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name='Meal Recipe Modal'
        component={MealRecipeModalScreen}
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: FONT.bold,
          },
          headerShown: false,
        }}
      />

      <Tab.Screen
        name='Favorites'
        component={FavoritesScreen}
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: FONT.bold,
          },
        }}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerTitle: userInfo?.username,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FONT.bold,
            fontSize: SIZES.sm + 2,
            color: COLORS.primary,
          },
          headerLeft: () => (
            <View style={{ marginLeft: SIZES.md }}>
              <Avatar.Image
                size={32}
                style={{ backgroundColor: COLORS.primary }}
                source={require('../assets/images/logo.png')}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: SIZES.md }}>
              <Ionicons
                name='settings-outline'
                size={SIZES.xl + 2}
                color={COLORS.white}
                onPress={pShowModal}
              />
              <ProfileModal visible={pVisible} hideModal={pHideModal} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppBottomNavigation;
