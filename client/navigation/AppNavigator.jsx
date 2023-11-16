import { Fragment, useEffect } from 'react';
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
  Meal,
  SearchRecipe,
  LoadingScreen,
  UserProfile,
  ProfileSettings,
  AccountInformation,
  ChangePassword,
  SingleRecipeScreen,
  UpdateRecipe,
  UpdateMeal,
  CustomizeRecipe,
} from '../screens';
import AppBottomNavigation from './AppBottomNavigation';
import useFilterStore from '../store/useFilterStore';
import useAuthStore from '../store/useAuthStore';
import useRecipeStore from '../store/useRecipeStore';

import { COLORS, FONT, SIZES } from '../constants';
import styles from '../styles/appNavigation';

import useMealPlanRecipe from '../store/useMealPlanRecipe';
const Stack = createStackNavigator();
import { debounce } from '../constants/debounce';

const AppNavigator = () => {
  const { fetchApiData, loadCachedFilters, loadCachedFilteredData } =
    useFilterStore();
  const { isLoggedIn, getUserInfo } = useAuthStore();
  const { fetchRecipesData, searchRecipes } = useRecipeStore();

  const { recipeText, setRecipeText } = useRecipeStore();
  const { recipeMeal, setRecipeMeal } = useMealPlanRecipe();

  const delayedSearch = debounce((text) => {
    searchRecipes(text);
  });

  // search recipe for meal
  const setSearchRecipe = (text) => {
    setRecipeMeal(text);
    delayedSearch(text);
  };

  // search recipe
  const searchRecipeText = (text) => {
    setRecipeText(text);
    delayedSearch(text);
  };

  useEffect(() => {
    loadCachedFilters();
    fetchApiData();
    fetchRecipesData();
    loadCachedFilteredData();
    getUserInfo();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.navigatorHeaderStyle,
        headerTintColor: COLORS.primary,
      }}
    >
      {isLoggedIn ? (
        <Fragment>
          <Stack.Screen
            name='BottomNavigation'
            component={AppBottomNavigation}
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
            })}
          />
          <Stack.Screen
            name='OtherUserProfile'
            component={UserProfile}
            options={{
              headerTitle: 'User Profile',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontFamily: FONT.bold,
                fontSize: SIZES.sm + 2,
                color: COLORS.primary,
              },
            }}
          />
          <Stack.Screen
            name='ProfileSettings'
            component={ProfileSettings}
            options={{
              headerTitle: 'Your Account',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontFamily: FONT.bold,
              },
            }}
          />

          <Stack.Screen
            name='AccountInformation'
            component={AccountInformation}
            options={{
              headerTitle: 'Account Information',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontFamily: FONT.bold,
              },
            }}
          />

          <Stack.Screen
            name='ChangePassword'
            component={ChangePassword}
            options={{
              headerTitle: 'Change Password',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontFamily: FONT.bold,
              },
            }}
          />

          <Stack.Screen
            name='Search'
            component={SearchScreen}
            options={{
              headerTitle: () => (
                <View style={styles.searchHeaderTitleStyle}>
                  <Ionicons
                    name='search'
                    size={SIZES.lg}
                    color={COLORS.black}
                  />
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder='Search...'
                    onChangeText={(text) => searchRecipeText(text)}
                    value={recipeText}
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name='Search Recipe'
            component={SearchRecipe}
            options={{
              headerTitle: () => (
                <View style={styles.searchHeaderTitleStyle}>
                  <Ionicons
                    name='search'
                    size={SIZES.lg}
                    color={COLORS.black}
                  />
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder='Search...'
                    onChangeText={(text) => setSearchRecipe(text)}
                    value={recipeMeal}
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen name='Recipe Form' component={RecipesFormScreen} />
          <Stack.Screen name='Update Recipe' component={UpdateRecipe} />
          <Stack.Screen name='Customize Recipe' component={CustomizeRecipe} />
          <Stack.Screen name='Meal Form' component={MealFormScreen} />
          <Stack.Screen name='Update Meal' component={UpdateMeal} />
          <Stack.Screen
            name='Recipe'
            component={SingleRecipeScreen}
            options={{
              headerTitle: 'About',
              headerTitleAlign: 'left',
              headerTitleStyle: styles.signUpHeaderTitleStyle,
            }}
          />
          <Stack.Screen
            name='Meal'
            component={Meal}
            options={{
              headerTitle: 'About',
              headerTitleAlign: 'left',
              headerTitleStyle: styles.signUpHeaderTitleStyle,
            }}
          />
        </Fragment>
      ) : (
        <Fragment>
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
              headerTitleStyle: styles.signUpHeaderTitleStyle,
            }}
          />
          <Stack.Screen
            name='Loading'
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        </Fragment>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
