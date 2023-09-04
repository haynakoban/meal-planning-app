import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import {
  LoginScreen,
  MealFormScreen,
  RecipesFormScreen,
  RecipesScreen,
  SearchScreen,
  SignUpScreen,
  Recipe,
} from '../screens';
import AppBottomNavigation from './AppBottomNavigation';

import { COLORS, FONT, SIZES } from '../constants';
import styles from '../styles/appNavigation';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.navigatorHeaderStyle,
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
          headerTitleStyle: styles.arHeaderTitleStyle,
          headerTitleContainerStyle: styles.arHeaderTitleContainerStyle,
          headerRight: () => (
            <View style={styles.arHeaderRightView}>
              <Ionicons
                name='search'
                size={26}
                color={COLORS.white}
                style={styles.mr}
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
          headerTitleStyle: styles.signUpHeaderTitleStyle,
        }}
      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerTitle: () => (
            <View style={styles.searchHeaderTitleStyle}>
              <Ionicons name='search' size={SIZES.lg} color={COLORS.black} />
              <TextInput
                style={styles.searchTextInput}
                placeholder='Search...'
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name='Recipe Form' component={RecipesFormScreen} />
      <Stack.Screen name='Meal Form' component={MealFormScreen} />
      <Stack.Screen
        name='Recipe'
        component={Recipe}
        options={{
          headerTitle: 'About',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
