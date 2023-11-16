import { COLORS, FONT, SIZES, SHADOWS } from './theme';
import Logo from './images';
import { calculateCalorie } from './calculateCalorie';
import { formatDate } from './formatDate';
import {
  data as DATA,
  homeData as HOMEDATA,
  mealTypes,
  allergies,
  recipe,
  ingredients,
  CT,
  privacyData,
  people,
  searchesScreens,
  recipeSearchData,
  reviews,
  measurement,
} from './data';
import { API } from './API';
import { useWeeks } from './week';

export {
  DATA,
  HOMEDATA,
  mealTypes,
  allergies,
  recipe,
  ingredients,
  CT,
  privacyData,
  people,
  searchesScreens,
  recipeSearchData,
  Logo,
  COLORS,
  FONT,
  SIZES,
  SHADOWS,
  reviews,
  API,
  useWeeks,
  calculateCalorie,
  formatDate,
  measurement,
};
