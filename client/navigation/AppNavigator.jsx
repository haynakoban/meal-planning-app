import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  LoginScreen,
  RecipesFormScreen,
  RecipesScreen,
  SearchScreen,
  SignUpScreen,
} from '../screens';
import { COLORS, FONT, SIZES } from '../constants';
import AppBottomNavigation from './AppBottomNavigation';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.accent,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.primary,
        },
        headerTintColor: COLORS.primary,
      }}
    >
      <Stack.Screen
        name='BottomNavigation'
        component={AppBottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='Show All Recipes'
        component={RecipesScreen}
        options={({ navigation, route }) => ({
          headerTitle: route.params.title,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: FONT.medium,
            color: COLORS.primary,
            letterSpacing: 0.1,
            marginLeft: -16,
          },
          headerTitleContainerStyle: {
            alignItems: 'flex-start',
          },
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

      <Stack.Screen
        name='Sign Up'
        component={SignUpScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FONT.bold,
          },
        }}
      />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='Recipe Form' component={RecipesFormScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
