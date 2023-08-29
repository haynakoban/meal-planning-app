import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import {
  HomeScreen,
  LoginScreen,
  SearchScreen,
  SignUpScreen,
  FavoritesScreen,
} from '../screens';
import { COLORS, FONT, SIZES } from '../constants';

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
        name='Dashboard'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Recipe',
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
      <Stack.Screen
        name='Favorites'
        component={FavoritesScreen}
        options={{
          headerTitleAlign: 'left',
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
