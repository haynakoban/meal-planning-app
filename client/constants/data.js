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
    headerTitle: 'New Recipes',
    subTitle: 'New Recipes',
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
  {
    id: 5,
    headerTitle: 'Snacks',
    subTitle: 'Snacks',
  },
  {
    id: 6,
    headerTitle: 'Desserts',
    subTitle: 'desserts',
  },
  {
    id: 7,
    headerTitle: 'Appetizers',
    subTitle: 'Appetizers',
  },
  {
    id: 8,
    headerTitle: 'Sides',
    subTitle: 'Sides',
  },
  {
    id: 9,
    headerTitle: 'Salads',
    subTitle: 'Salads',
  },
  {
    id: 10,
    headerTitle: 'Soups',
    subTitle: 'Soups',
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
  { key: 1, i: 'BC', name: 'Benjamin Carter' },
  { key: 2, i: 'XV', name: 'Xander Vincent' },
  { key: 3, i: 'JA', name: 'Juliana Anderson' },
  { key: 4, i: 'RS', name: 'Rebecca Stevens' },
  { key: 5, i: 'TR', name: 'Theodore Roberts' },
  { key: 6, i: 'JL', name: 'Jonathan Lawson' },
  { key: 7, i: 'AQ', name: 'Alexander Quinn' },
  { key: 8, i: 'BE', name: 'Evelyn Bennett' },
];

export const searchesScreens = [
  { icon: 'book', label: 'Recipes', screen: 'Recipes' },
  { icon: 'heart', label: 'Favorites', screen: 'Favorites' },
];

export const recipeSearchData = [
  {
    id: 1,
    search: 'carbonara pasta',
  },
  {
    id: 2,
    search: 'chicken adobo',
  },
  {
    id: 3,
    search: 'vegetable salad',
  },
  {
    id: 4,
    search: 'chocolate',
  },
  {
    id: 5,
    search: 'buko salad',
  },
  {
    id: 6,
    search: 'homemade pizza',
  },
  {
    id: 7,
    search: 'spicy chicken curry',
  },
  {
    id: 8,
    search: 'blueberry pancake',
  },
  {
    id: 9,
    search: 'grilled steak',
  },
  {
    id: 10,
    search: 'lasagna',
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

export const reviews = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    comment: 'dawdawdawdawd,awdjbagaw kj kjdajd adawdj dahawdkjdhawdawdkawdk',
    username: 'semicolon101010',
    date: new Date().toDateString(),
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    comment: 'dawdawdawdawd,awdjbagaw kj kjdajd adawdj dahawdkjdhawdawdkawdk',
    username: 'semicolon101010',
    date: new Date().toDateString(),
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    comment: 'dawdawdawdawd,awdjbagaw kj kjdajd adawdj dahawdkjdhawdawdkawdk',
    username: 'semicolon101010',
    date: new Date().toDateString(),
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    comment: 'dawdawdawdawd,awdjbagaw kj kjdajd adawdj dahawdkjdhawdawdkawdk',
    username: 'semicolon101010',
    date: new Date().toDateString(),
  },
];
