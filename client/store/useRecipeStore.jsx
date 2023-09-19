import { create } from 'zustand';
import axios from '../lib/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useRecipeStore = create((set) => ({
  open: false,
  recipes: [],
  recipe: {},
  // breakfast: [],
  // snacks: [],
  // lunch: [],
  // dinner: [],
  lastModified: null,
  homeRecipes: [],

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

  fetchRecipesData: async () => {
    try {
      const { lastModified } = useRecipeStore.getState();

      const response = await axios.get('recipes/list/types', {
        headers: {
          'If-Modified-Since': lastModified
            ? lastModified.toUTCString()
            : undefined,
        },
      });

      const results = response.data.data;

      if (results) {
        set({ homeRecipes: results, lastModified: new Date() });

        // Store the updated data in AsyncStorage
        await AsyncStorage.setItem('homeRecipes', JSON.stringify(results));
        await AsyncStorage.setItem(
          'homeRecipesLastModified',
          JSON.stringify(new Date())
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  loadCachedRecipes: async () => {
    try {
      const cachedRecipes = await AsyncStorage.getItem('homeRecipes');
      const cachedLastModified = await AsyncStorage.getItem(
        'homeRecipesLastModified'
      );

      if (cachedRecipes && cachedLastModified) {
        set({
          homeRecipes: JSON.parse(cachedRecipes),
          lastModified: new Date(JSON.parse(cachedLastModified)),
        });
      }
    } catch (error) {
      // Handle errors when loading cached data
      console.error('Error loading cached filters:', error);
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
