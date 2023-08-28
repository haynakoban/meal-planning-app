import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, LoginScreen, SignUpScreen } from '../screens';
import { COLORS, FONT } from '../constants';

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
      <Stack.Screen name='Home' component={HomeScreen} />
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
