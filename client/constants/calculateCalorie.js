const calculate = (ingredient) => {
  const {
    fat_total_g,
    carbohydrates_total_g,
    fiber_g,
    protein_g,
    sugar_g,
    sodium_mg,
  } = ingredient;

  const calories =
    9 * fat_total_g +
    4 * carbohydrates_total_g +
    4 * protein_g +
    4 * fiber_g +
    4 * sugar_g +
    0.01 * sodium_mg;

  return {
    calories: Math.round(calories * 100) / 100,
    fat: fat_total_g,
    carbs: carbohydrates_total_g,
    fiber: fiber_g,
    protein: protein_g,
    sugars: sugar_g,
    sodium: sodium_mg,
  };
};

const calculateDailyValue = (nutritionObject) => {
  const dailyCalories = 2000; // Recommended daily calorie intake
  const dv = {
    calories: {
      value: nutritionObject.calories,
      dailyValue: Math.round((nutritionObject.calories / dailyCalories) * 100),
    },
    fat: {
      value: nutritionObject.fat,
      dailyValue: Math.round((nutritionObject.fat / 65) * 100),
    },
    carbs: {
      value: nutritionObject.carbs,
      dailyValue: Math.round((nutritionObject.carbs / 300) * 100),
    },
    fiber: {
      value: nutritionObject.fiber,
      dailyValue: Math.round((nutritionObject.fiber / 25) * 100),
    },
    protein: {
      value: nutritionObject.protein,
      dailyValue: Math.round((nutritionObject.protein / 50) * 100),
    },
    sugars: {
      value: nutritionObject.sugars,
      dailyValue: 0,
    },
    sodium: {
      value: nutritionObject.sodium,
      dailyValue: Math.round((nutritionObject.sodium / 2400) * 100),
    },
  };

  return dv;
};

export const calculateCalorie = (ingredients) => {
  let nutritionObjects = [];

  for (const ingredient of ingredients) {
    let nutritionObject = calculate(ingredient);
    nutritionObjects.push(nutritionObject);
  }

  let total = {
    calories: 0,
    fat: 0,
    carbs: 0,
    fiber: 0,
    protein: 0,
    sugars: 0,
    sodium: 0,
  };

  for (const obj of nutritionObjects) {
    total.calories += obj.calories;
    total.fat += obj.fat;
    total.carbs += obj.carbs;
    total.fiber += obj.fiber;
    total.protein += obj.protein;
    total.sugars += obj.sugars;
    total.sodium += obj.sodium;
  }

  let nutritionFacts = calculateDailyValue(total);
  return nutritionFacts;
};
