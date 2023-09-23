import { Fragment, useEffect, useState } from 'react';
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
  Meal,
  SearchRecipe,
  LoadingScreen,
} from '../screens';
import AppBottomNavigation from './AppBottomNavigation';
import useFilterStore from '../store/useFilterStore';
import useAuthStore from '../store/useAuthStore';
import useRecipeStore from '../store/useRecipeStore';

import { COLORS, SIZES } from '../constants';
import styles from '../styles/appNavigation';
import { FilterModal } from '../components/general/FilterDropdown';
import useMealPlanRecipe from '../store/useMealPlanRecipe';
const Stack = createStackNavigator();
import { debounce } from '../constants/debounce';

const AppNavigator = () => {
  const { fetchApiData, loadCachedFilters, loadCachedFilteredData } =
    useFilterStore();
  const { isLoggedIn, getUserInfo } = useAuthStore();
  const { fetchRecipesData, searchRecipes } = useRecipeStore();

  const [searchText, setSearchText] = useState('');
  const { recipeMeal, setRecipeMeal } = useMealPlanRecipe();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const delayedSearch = debounce((text) => {
    searchRecipes(text);
  });

  const setSearchRecipe = (text) => {
    setRecipeMeal(text);
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
              headerRight: () => (
                <View style={styles.arHeaderRightView}>
                  <Ionicons
                    name='search'
                    size={26}
                    color={COLORS.white}
                    style={styles.mr}
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
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
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
          <Stack.Screen name='Meal Form' component={MealFormScreen} />
          <Stack.Screen
            name='Recipe'
            component={Recipe}
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
