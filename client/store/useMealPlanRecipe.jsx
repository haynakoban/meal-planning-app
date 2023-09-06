import { create } from 'zustand';

const useMealPlanRecipe = create((set) => ({
  breakfast: [],
  snacks: [],
  lunch: [],
  dinner: [],
  // fetchRecipes: async () => {
  //     const res = 'link'
  // }
  addBreakfast: (val) =>
    set((state) => ({
      breakfast: [...state.breakfast, val],
    })),

  addSnacks: (val) =>
    set((state) => ({
      snacks: [...state.snacks, val],
    })),

  addLunch: (val) =>
    set((state) => ({
      lunch: [...state.lunch, val],
    })),

  addDinner: (val) =>
    set((state) => ({
      dinner: [...state.dinner, val],
    })),
}));

export default useMealPlanRecipe;
