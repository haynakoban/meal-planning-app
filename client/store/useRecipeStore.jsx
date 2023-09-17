import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useRecipeStore = create((set) => ({
  open: false,
  recipes: [],
  recipe: {},
  // breakfast: [],
  // snacks: [],
  // lunch: [],
  // dinner: [],

  listRecipes: async () => {
    try {
      const response = await axios.get(`recipes`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          set((state) => ({
            recipes: [...state.recipes, ...newData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  singleRecipes: async (id) => {
    try {
      const response = await axios.get(`recipes/${id}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        set((state) => ({
          recipe: newData,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  // multipleBreakfastRecipes: async (id) => {
  //   try {
  //     let ids = '';
  //     for (let i = 0; i < id.length; i++) {
  //       if (i > 0) {
  //         id += '&&';
  //       }
  //       ids += 'ids=' + id[i] + '';
  //     }

  //     console.log(ids);

  //     const response = await axios.get(`recipes/list?${ids}`);

  //     if (response && response.data && response.data) {
  //       const newData = response.data.data;

  //       if (Array.isArray(newData) && newData.length > 0) {
  //         set((state) => ({
  //           breakfast: [...state.breakfast, ...newData],
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // },

  // multipleSnacksRecipes: async (id) => {
  //   try {
  //     let ids = '';
  //     for (let i = 0; i < id.length; i++) {
  //       ids += 'ids=' + id[i] + '&&';
  //     }

  //     const response = await axios.get(`recipes/list?${ids}`);

  //     if (response && response.data && response.data) {
  //       const newData = response.data.data;

  //       if (Array.isArray(newData) && newData.length > 0) {
  //         set((state) => ({
  //           snacks: [...state.snacks, ...newData],
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // },

  // multipleLunchRecipes: async (id) => {
  //   try {
  //     let ids = '';
  //     for (let i = 0; i < id.length; i++) {
  //       ids += 'ids=' + id[i] + '&&';
  //     }

  //     const response = await axios.get(`recipes/list?${ids}`);

  //     if (response && response.data && response.data) {
  //       const newData = response.data.data;

  //       if (Array.isArray(newData) && newData.length > 0) {
  //         set((state) => ({
  //           lunch: [...state.lunch, ...newData],
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // },

  // multipleDinnerRecipes: async (id) => {
  //   try {
  //     let ids = '';
  //     for (let i = 0; i < id.length; i++) {
  //       ids += 'ids=' + id[i] + '&&';
  //     }

  //     const response = await axios.get(`recipes/list?${ids}`);

  //     if (response && response.data && response.data) {
  //       const newData = response.data.data;

  //       if (Array.isArray(newData) && newData.length > 0) {
  //         set((state) => ({
  //           dinner: [...state.dinner, ...newData],
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // },

  clearRecipe: () =>
    set((state) => ({
      recipes: [],
      breakfast: [],
      snacks: [],
      lunch: [],
      dinner: [],
    })),
}));

export default useRecipeStore;
