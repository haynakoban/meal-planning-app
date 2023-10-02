import { Routes, Route } from 'react-router-dom';

// views
import {
  PageNotFound,
  Allergies,
  Cuisines,
  Home,
  Ingredients,
  Meals,
  MealTypes,
  Preferences,
  Recipes,
  Users,
  UsersOutlet,
  UsersUpdate,
} from '../views';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='allergies' element={<Allergies />} />
      <Route path='cuisines' element={<Cuisines />} />
      <Route path='ingredients' element={<Ingredients />} />
      <Route path='meals' element={<Meals />} />
      <Route path='mealtypes' element={<MealTypes />} />
      <Route path='preferences' element={<Preferences />} />
      <Route path='recipes' element={<Recipes />} />

      <Route path='users' element={<UsersOutlet />}>
        <Route index element={<Users />} />
        <Route path=':id' element={<UsersUpdate />} />
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};
export default AppRoutes;
