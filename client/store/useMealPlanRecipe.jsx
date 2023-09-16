import { create } from 'zustand';

const useMealPlanRecipe = create((set) => ({
  breakfast: [],
  snacks: [],
  lunch: [],
  dinner: [],
  // fetchRecipes: async () => {
  //     const res = 'link'
  // }
  addBreakfast: (id) =>
    set((state) => ({
      breakfast: [...state.breakfast, id],
    })),

  addSnacks: (id) =>
    set((state) => ({
      snacks: [...state.snacks, id],
    })),

  addLunch: (id) =>
    set((state) => ({
      lunch: [...state.lunch, id],
    })),

  addDinner: (id) =>
    set((state) => ({
      dinner: [...state.dinner, id],
    })),

  removeBreakfast: (id) =>
    set((state) => ({
      breakfast: state.breakfast.filter((item) => item !== id),
    })),

  removeSnacks: (id) =>
    set((state) => ({
      snacks: state.snacks.filter((item) => item !== id),
    })),

  removeLunch: (id) =>
    set((state) => ({
      lunch: state.lunch.filter((item) => item !== id),
    })),

  removeDinner: (id) =>
    set((state) => ({
      dinner: state.dinner.filter((item) => item !== id),
    })),
}));

export default useMealPlanRecipe;
