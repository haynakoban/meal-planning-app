import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useIngredientsStore = create((set) => ({
  open: false,
  value: [],
  items: [],
  selected: [],

  setOpen: (open) => set({ open }),
  setValue: (callback) =>
    set((state) => ({
      value: callback(state.value),
      selected: callback(state.value),
    })),
  setItems: (callback) => set((state) => ({ items: callback(state.items) })),
  clearValue: () => set({ value: [], items: [], selected: [] }),

  listIngredients: async () => {
    try {
      const response = await axios.get(`ingredients`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          // Transform the data to use '_id' as 'value' and 'name' as 'label'
          const transformedData = newData.map((item) => ({
            value: [item._id, item.name],
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

export default useIngredientsStore;
