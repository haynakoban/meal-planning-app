import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useRecipeStore = create((set) => ({
  open: false,
  recipes: [],
  recipe: {},
  lastModified: null,
  homeRecipes: [],

  searchRecipes: async (text) => {
    try {
      const response = await axios.get(`recipes?search=${text}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          set((state) => ({
            recipes: newData,
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

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

  presonalRecipes: async (user_id) => {
    try {
      const response = await axios.get(`recipes/personal/${user_id}`);

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
      set({ recipe: {} });

      const response = await axios.get(`recipes/${id}`);

      if (response && response.data) {
        const newData = response.data.data;

        set({ recipe: newData });
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
      } else {
        set({ homeRecipes: [], lastModified: new Date() });
      }
    } catch (error) {
      console.error('Error fetching data2:', error);
    }
  },

  clearRecipe: () =>
    set((state) => ({
      recipes: [],
    })),
}));

export default useRecipeStore;
