import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useMealPlanRecipe = create((set) => ({
  recipesArray: [],
  recipesObj: [],
  meals: [],
  mealsWithDays: [],
  personalMeals: [],
  meal: {},
  recipeMeal: '',
  mealRecipes: [],

  fetchMealsDays: async (time, user_id) => {
    try {
      set({ mealsWithDays: [] });
      const response = await axios.get(
        `meals/list/time?time=${time}&&user_id=${user_id}`
      );

      if (response && response.data?.status === 'success') {
        const newData = response.data.data;

        set({ mealsWithDays: newData });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return Promise.resolve();
  },

  fetchSingleMeal: async (meal_id) => {
    try {
      set({ meal: {} });
      const response = await axios.get(`meals/${meal_id}`);

      if (response && response.data?.status === 'success') {
        const newData = response.data.data;

        set({ meal: newData });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return Promise.resolve();
  },

  fetchPersonalMeals: async (user_id) => {
    try {
      set({ personalMeals: [] });
      const response = await axios.get(`meals/personal/${user_id}`);

      if (response && response.data?.status === 'success') {
        const newData = response.data.data;

        set({ personalMeals: newData });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return Promise.resolve();
  },

  addMealPlan: (meal) => {
    set((state) => ({
      mealsWithDays: [meal, ...state.mealsWithDays],
    }));
  },

  updateMealPlan: (meal) => {
    set({ mealsWithDays: [] });

    set((state) => ({
      mealsWithDays: meal,
    }));
  },

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

  getMealRecipes: async (id) => {
    try {
      set({ mealRecipes: [] });

      let num = id?.length;
      let ids = '';
      for (let i = 0; i < num; i++) {
        if (i == 0) {
          ids += id[i];
        } else {
          ids += '&&ids=' + id[i];
        }
      }

      const response = await axios.get(`recipes/list?ids=${ids}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          set((state) => ({
            mealRecipes: newData,
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  setMealRecipes: async (id) => {
    try {
      set({ recipesObj: [] });

      let num = id?.length;
      let ids = '';
      for (let i = 0; i < num; i++) {
        if (i == 0) {
          ids += id[i];
        } else {
          ids += '&&ids=' + id[i];
        }
      }

      const response = await axios.get(`recipes/list?ids=${ids}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          set((state) => ({
            recipesObj: newData,
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

  setRecipesArray: (id) =>
    set((state) => ({
      recipesArray: id,
    })),

  removeRecipes: (id) =>
    set((state) => ({
      recipesArray: state.recipesArray.filter((item) => item !== id),
      recipesObj: state.recipesObj.filter((item) => item._id !== id),
    })),

  clearRecipes: () => {
    set({ recipesArray: [] });
  },

  clearMeal: () =>
    set((state) => ({
      recipesObj: [],
    })),

  clearMealWithDay: () =>
    set((state) => ({
      mealsWithDays: [],
    })),
}));

export default useMealPlanRecipe;
