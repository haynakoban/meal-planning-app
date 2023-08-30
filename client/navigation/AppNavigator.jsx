import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SearchScreen, SignUpScreen } from '../screens';
import { COLORS, FONT } from '../constants';
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
