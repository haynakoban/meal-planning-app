import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useMealPlanRecipe = create((set) => ({
  breakfast: [],
  snacks: [],
  lunch: [],
  dinner: [],

  breakfastObj: [],
  snacksObj: [],
  lunchObj: [],
  dinnerObj: [],

  recipeMeal: '',

  setRecipeMeal: (text) =>
    set((state) => ({
      recipeMeal: text,
    })),

  multipleBreakfastRecipes: async (id) => {
    try {
      let num = id?.length;
      let ids = id[num - 1] || [];

      const response = await axios.get(`recipes/list?ids=${ids}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          const { breakfastObj } = useMealPlanRecipe.getState();
          const itHas = breakfastObj?.some((item) => item._id === newData?._id);
          if (itHas) return;

          set((state) => ({
            breakfastObj: [...state.breakfastObj, ...newData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  multipleSnacksRecipes: async (id) => {
    try {
      let num = id?.length;
      let ids = id[num - 1] || [];

      const response = await axios.get(`recipes/list?ids=${ids}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          const { snacksObj } = useMealPlanRecipe.getState();
          const itHas = snacksObj?.some((item) => item._id === newData?._id);
          if (itHas) return;

          set((state) => ({
            snacksObj: [...state.snacksObj, ...newData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  multipleLunchRecipes: async (id) => {
    try {
      let num = id?.length;
      let ids = id[num - 1] || [];

      const response = await axios.get(`recipes/list?ids=${ids}`);

      if (response && response.data && response.data) {
        const { lunchObj } = useMealPlanRecipe.getState();
        const itHas = lunchObj?.some((item) => item._id === newData?._id);
        if (itHas) return;
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          set((state) => ({
            lunchObj: [...state.lunchObj, ...newData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  multipleDinnerRecipes: async (id) => {
    try {
      let num = id?.length;
      let ids = id[num - 1] || [];

      const response = await axios.get(`recipes/list?ids=${ids}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          const { dinnerObj } = useMealPlanRecipe.getState();
          const itHas = dinnerObj?.some((item) => item._id === newData?._id);
          if (itHas) return;

          set((state) => ({
            dinnerObj: [...state.dinnerObj, ...newData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

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
      breakfastObj: state.breakfastObj.filter((item) => item._id !== id),
    })),

  removeSnacks: (id) =>
    set((state) => ({
      snacks: state.snacks.filter((item) => item !== id),
      snacksObj: state.snacksObj.filter((item) => item._id !== id),
    })),

  removeLunch: (id) =>
    set((state) => ({
      lunch: state.lunch.filter((item) => item !== id),
      lunchObj: state.lunchObj.filter((item) => item._id !== id),
    })),

  removeDinner: (id) =>
    set((state) => ({
      dinner: state.dinner.filter((item) => item !== id),
      dinnerObj: state.dinnerObj.filter((item) => item._id !== id),
    })),

  clearMeal: () =>
    set((state) => ({
      breakfastObj: [],
      snacksObj: [],
      lunchObj: [],
      dinnerObj: [],
    })),
}));

export default useMealPlanRecipe;
