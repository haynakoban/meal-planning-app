import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CreateMealScreen,
  FavoritesScreen,
  HomeScreen,
  PlannerScreen,
  ProfileScreen,
} from '../screens';
import { COLORS, FONT, SIZES } from '../constants';

const Tab = createBottomTabNavigator();

const AppBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.accent,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.primary,
        },
        headerTintColor: COLORS.primary,
        tabBarLabel: () => {
          return route.name === 'Create Meal' ? (
            ''
          ) : (
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.sm }}>
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Recipes') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Planner') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Create Meal') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
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
              <Ionicons name='filter' size={26} color={COLORS.white} />
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
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: SIZES.md }}>
              <Ionicons
                name='search'
                size={26}
                color={COLORS.white}
                style={{ marginRight: SIZES.sm }}
                onPress={() => navigation.navigate('Search')}
              />
              <Ionicons name='filter' size={26} color={COLORS.white} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name='Create Meal'
        component={CreateMealScreen}
        options={{
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: FONT.bold,
          },
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
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: FONT.bold,
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default AppBottomNavigation;
