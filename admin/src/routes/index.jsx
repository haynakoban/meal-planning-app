import { Routes, Route } from 'react-router-dom';

// views
import {
  PageNotFound,
  Allergies,
  AllergiesOutlet,
  AllergiesUpdate,
  Cuisines,
  CuisinesOutlet,
  CuisinesUpdate,
  Home,
  Ingredients,
  IngredientsOutlet,
  IngredientsUpdate,
  Meals,
  MealTypes,
  MealTypesOutlet,
  MealTypesUpdate,
  Preferences,
  PreferencesOutlet,
  PreferencesUpdate,
  Recipes,
  RecipesOutlet,
  RecipesUpdate,
  Users,
  UsersOutlet,
  UsersUpdate,
} from '../views';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path='allergies' element={<AllergiesOutlet />}>
        <Route index element={<Allergies />} />
        <Route path=':id' element={<AllergiesUpdate />} />
      </Route>

      <Route path='cuisines' element={<CuisinesOutlet />}>
        <Route index element={<Cuisines />} />
        <Route path=':id' element={<CuisinesUpdate />} />
      </Route>

      <Route path='ingredients' element={<IngredientsOutlet />}>
        <Route index element={<Ingredients />} />
        <Route path=':id' element={<IngredientsUpdate />} />
      </Route>

      <Route path='meals' element={<Meals />} />

      <Route path='mealtypes' element={<MealTypesOutlet />}>
        <Route index element={<MealTypes />} />
        <Route path=':id' element={<MealTypesUpdate />} />
      </Route>

      <Route path='preferences' element={<PreferencesOutlet />}>
        <Route index element={<Preferences />} />
        <Route path=':id' element={<PreferencesUpdate />} />
      </Route>

      <Route path='recipes' element={<RecipesOutlet />}>
        <Route index element={<Recipes />} />
        <Route path=':id' element={<RecipesUpdate />} />
      </Route>

      <Route path='users' element={<UsersOutlet />}>
        <Route index element={<Users />} />
        <Route path=':id' element={<UsersUpdate />} />
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};
export default AppRoutes;
