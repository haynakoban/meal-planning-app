export const data = [
  {
    id: '1',
    name: 'Adobong Manok',
    username: '@juanluna',
    ratings: 65,
    image:
      'https://yummyfood.ph/wp-content/uploads/2021/08/Chicken-Adobo-Recipe.jpg',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '2',
    name: 'Sinigang na Baboy',
    username: '@semicolon',
    ratings: 231,
    image:
      'https://www.kawalingpinoy.com/wp-content/uploads/2013/01/sinigang-baboy-7.jpg',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '3',
    name: 'Tortang Isda',
    username: '@juandelacruz',
    ratings: 12,
    image:
      'https://i0.wp.com/www.angsarap.net/wp-content/uploads/2020/09/Tortang-Dulong-Wide.jpg?fit=1080%2C720&ssl=1',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '4',
    name: 'Kare-kare',
    username: '@xenonxenon',
    ratings: 654,
    image:
      'https://api.lifegetsbetter.ph/uploads/recipes/featured/Kare-KAre.jpg',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '5',
    name: 'Lumpiang Shanghai',
    username: '@semicolon',
    ratings: 132,
    image:
      'https://images.aws.nestle.recipes/resized/8fa4b6a13f1d904c77b6f6da0cfe5c21_nks-b3-d02_640_944_531.jpg',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '6',
    name: 'Lumpiang Shanghai',
    username: '@semicolon',
    ratings: 132,
    image:
      'https://images.aws.nestle.recipes/resized/8fa4b6a13f1d904c77b6f6da0cfe5c21_nks-b3-d02_640_944_531.jpg',
    description: 'This is a description for this meal plan.',
  },
];

export const homeData = [
  {
    id: 1,
    headerTitle: 'Recommended Recipes',
    subTitle: 'Recommended',
  },
  {
    id: 2,
    headerTitle: 'Breakfast',
    subTitle: 'Breakfast',
  },
  {
    id: 3,
    headerTitle: 'Lunch',
    subTitle: 'Lunch',
  },
  {
    id: 4,
    headerTitle: 'Dinner',
    subTitle: 'Dinner',
  },
];

let desc =
  'Heat oil in pan and sauté garlic and onions. Then add chicken to the pan and sear on all sides, until you have a little browning in the chicken skin._Pour in vinegar, soy sauce and water. Add bay leaves, pepper and Knorr Chicken Cubes. Bring to a boil over high heat then reduce heat to simmer, but do not cover the pan. Continue to simmer for 10 mins._Remove chicken pieces from sauce and fry in another pan until nicely browned._Put back fried chicken pieces into sauce. Add sugar and let simmer again for another 10 minutes or until sauce has thickened. Serve warm.';
export const recipe = {
  username: 'semicolon101010',
  name: 'Adobong Manok',
  description:
    'Adobong manok is a method of marinating and stewing for any cut of meat or fish in a briny mixture of vinegar, soy sauce, and spices',
  image:
    'https://yummyfood.ph/wp-content/uploads/2021/08/Chicken-Adobo-Recipe.jpg',
  procedure: desc.split('_'),
  type: ['Lunch', 'Dinner'],
  preferences: ['Sweet', 'Savory', 'Salted'],
  cuisine: 'Ilocano',
  privacy: 'public',
  ratings: 4.5,
  reviews: 187,
  cookingTime: 60,
  ingredients: [
    {
      id: 1,
      ingredient: 'sugar',
      measurement: 'teasepoon',
      amount: '1/3',
      description: 'this is description',
    },
    {
      id: 2,
      ingredient: 'carrot/s',
      measurement: 'pound',
      amount: '1',
      description: '',
    },
    {
      id: 3,
      ingredient: 'chicken',
      measurement: 'kg',
      amount: '3',
      description: 'description',
    },
  ],
  facts: [
    {
      name: 'Calories',
      value: 349,
      measurement: '',
      daily: 17.45,
    },
    {
      name: 'Fat',
      value: 19,
      measurement: 'g',
      daily: 29.23,
    },
    {
      name: 'Carbs',
      value: 4,
      measurement: 'g',
      daily: 1.33,
    },
    {
      name: 'Fiber',
      value: 1,
      measurement: 'g',
      daily: 4,
    },
    {
      name: 'Protein',
      value: 33,
      measurement: 'g',
      daily: 66,
    },
    {
      name: 'Sugars',
      value: 2,
      measurement: 'g',
      daily: 0,
    },
    {
      name: 'Sodium',
      value: 335,
      measurement: 'mg',
      daily: 13.96,
    },
  ],
};

export const ingredients = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Egg Plant', value: 'eggplant' },
  { label: 'Egg', value: 'egg' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Ampalaya', value: 'ampalaya' },
];

export const CT = [
  { t: 5, s: 'minutes' },
  { t: 10, s: 'minutes' },
  { t: 20, s: 'minutes' },
  { t: 30, s: 'minutes' },
  { t: 60, s: 'hour' },
  { t: 120, s: 'hours' },
];

export const privacyData = [
  {
    privacy: 'public',
    title: 'Public',
    description: 'Anyone can see this recipe.',
  },
  {
    privacy: 'private',
    title: 'Private',
    description: 'Only you can see this recipe.',
  },
];

export const people = [
  { key: 1, i: 'BC', name: 'Bryan Cortez' },
  { key: 2, i: 'XV', name: 'Xenon Vergara' },
  { key: 3, i: 'JA', name: 'Jeorge Agustin Jr.' },
  { key: 4, i: 'RS', name: 'Rizza Mia Servanda' },
  { key: 5, i: 'TR', name: 'Thea Mae Rirao' },
  { key: 6, i: 'JL', name: 'Jeremy Roie Laxamana' },
  { key: 7, i: 'AQ', name: 'Aaron Quesada' },
  { key: 8, i: 'BE', name: 'Bien Enriquez' },
];

export const searchesScreens = [
  { icon: 'book', label: 'Recipes', screen: 'Recipes' },
  { icon: 'calendar', label: 'Meal Plans', screen: 'Planner' },
  { icon: 'heart', label: 'Favorites', screen: 'Favorites' },
];

export const recipeSearchData = [
  {
    id: 1,
    search: 'carbonara pasta recipe',
  },
  {
    id: 2,
    search: 'chicken Alfredo recipe',
  },
  {
    id: 3,
    search: 'vegetable stir-fry recipe',
  },
  {
    id: 4,
    search: 'chocolate chip cookie recipe',
  },
  {
    id: 5,
    search: 'Caesar salad recipe',
  },
  {
    id: 6,
    search: 'homemade pizza recipe',
  },
  {
    id: 7,
    search: 'spicy chicken curry recipe',
  },
  {
    id: 8,
    search: 'blueberry pancake recipe',
  },
  {
    id: 9,
    search: 'grilled steak recipe',
  },
  {
    id: 10,
    search: 'vegetarian lasagna recipe',
  },
];

export const mealTypes = [
  'Dinner',
  'Breakfast',
  'Lunch',
  'Snacks',
  'Desserts',
  'Appetizers',
  'Sides',
  'Salads',
  'Soups',
];

export const allergies = [
  'Milk (Dairy)',
  'Egg',
  'Peanut',
  'Tree Nut',
  'Soy',
  'Wheat (Gluten)',
  'Fish',
  'Shellfish',
  'Sesame',
  'Mustard',
  'Sulfite',
  'Celery',
  'Lupin',
  'Mollusk',
  'Corn',
  'Meat',
  'Nightshade',
];
