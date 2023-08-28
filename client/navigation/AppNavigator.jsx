import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, LoginScreen, SignUpScreen } from '../screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00A8E8',
          borderBottomWidth: 1,
          borderBottomColor: '#F5EBEB',
        },
        headerTintColor: '#F5EBEB',
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
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
