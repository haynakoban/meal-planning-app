const calculate = (fat, carbs, fiber, protein, sugars, sodium) => {
  let calories =
    9 * fat + 4 * carbs + 4 * protein + 4 * fiber + 4 * sugars + 0.01 * sodium;

  return {
    calories,
    fat,
    carbs,
    fiber,
    protein,
    sugars,
    sodium,
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

export const calculateCalorie = (
  fats,
  carbs,
  fibers,
  proteins,
  sugars,
  sodiums
) => {
  let nutritionObjects = [];

  for (let i = 0; i < fats.length; i++) {
    let nutritionObject = calculate(
      fats[i],
      carbs[i],
      fibers[i],
      proteins[i],
      sugars[i],
      sodiums[i]
    );
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
