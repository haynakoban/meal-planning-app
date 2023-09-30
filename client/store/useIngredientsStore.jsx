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
    })),
  setItems: (callback) => set((state) => ({ items: callback(state.items) })),
  clearValue: () => set({ value: [], items: [], selected: [] }),
  addIngredientsValue: (ingredients) =>
    set({
      value: ingredients,
    }),
  addIngredientsSelected: (data) => set({ selected: data }),
  listIngredients: async () => {
    try {
      const response = await axios.get(`ingredients`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          // Transform the data to use '_id' as 'value' and 'name' as 'label'
          const transformedData = newData.map((item) => ({
            value: JSON.stringify([item._id, item.name]),
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

  setSelectedIngredients: (data) => {
    set((state) => {
      const updatedSelected = (state.selected || []).map((item) =>
        item.ingredients_id === data.ingredients_id ? data : item
      );

      if (
        !updatedSelected.some(
          (item) => item.ingredients_id === data.ingredients_id
        )
      ) {
        return { selected: [...state.selected, data] };
      }
      return { selected: updatedSelected };
    });
  },

  removeSelected: (ingredients_id) =>
    set((state) => ({
      selected: state.selected.filter(
        (selected) => selected.ingredients_id !== ingredients_id
      ),
    })),

  filteredData: (filter) => (state) => {
    return (
      state.selected?.filter((item) => item.ingredients_id == filter) || []
    );
  },
}));

export default useIngredientsStore;
