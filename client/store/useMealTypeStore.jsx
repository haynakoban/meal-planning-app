import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useMealTypeStore = create((set) => ({
  open: false,
  value: [],
  items: [],

  mealTypesData: [],
  mealTypesTitle: '',

  fetchMealTypes: async (title, page) => {
    try {
      const res = await axios.get('meals/types/list', {
        params: { title: title, page: page },
      });

      if (res.data?.status === 'success') {
        const recipes = res.data?.data;

        set((state) => {
          if (state.mealTypesTitle === title) {
            return {
              mealTypesTitle: state.mealTypesTitle,
              mealTypesData: [...state.mealTypesData, ...recipes],
            };
          } else {
            return {
              mealTypesTitle: title,
              mealTypesData: recipes,
            };
          }
        });
      }
    } catch (error) {
      // Handle errors when loading cached data
      console.error('Error loading cached filters:', error);
    }
  },

  setOpen: (open) => set({ open }),
  setValue: (callback) =>
    set((state) => ({
      value: callback(state.value),
    })),
  setItems: (callback) => set((state) => ({ items: callback(state.items) })),
  addMealTypeValue: (meal_types) =>
    set({
      value: meal_types,
    }),
  clearMealType: () => set({ value: [], items: [] }),

  listMealTypes: async () => {
    try {
      const response = await axios.get(`meals/types`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          const transformedData = newData.map((item) => ({
            value: item._id,
            label: item.name,
          }));

          set((state) => ({
            items: [...state.items, ...transformedData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}));

export default useMealTypeStore;
