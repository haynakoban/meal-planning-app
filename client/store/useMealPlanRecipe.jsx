import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useMealPlanRecipe = create((set) => ({
  recipesArray: [],
  recipesObj: [],
  meals: [],

  recipeMeal: '',

  setRecipeMeal: (text) =>
    set((state) => ({
      recipeMeal: text,
    })),

  multipleRecipes: async (id) => {
    try {
      let num = id?.length;
      let ids = id[num - 1] || [];

      const response = await axios.get(`recipes/list?ids=${ids}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          const { recipesObj } = useMealPlanRecipe.getState();
          const itHas = recipesObj?.some((item) => item._id === newData?._id);
          if (itHas) return;

          set((state) => ({
            recipesObj: [...state.recipesObj, ...newData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  personalMeals: async (user_id) => {
    try {
      const response = await axios.get(`meals/personal/${user_id}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          set((state) => ({
            meals: [...state.meals, ...newData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  addRecipes: (id) =>
    set((state) => ({
      recipesArray: [...state.recipesArray, id],
    })),

  removeRecipes: (id) =>
    set((state) => ({
      recipesArray: state.recipesArray.filter((item) => item !== id),
      recipesObj: state.recipesObj.filter((item) => item._id !== id),
    })),

  clearMeal: () =>
    set((state) => ({
      recipesObj: [],
    })),
}));

export default useMealPlanRecipe;
