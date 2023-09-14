import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const usePreferencesStore = create((set) => ({
  open: false,
  value: [],
  items: [],

  setOpen: (open) => set({ open }),
  setValue: (callback) =>
    set((state) => ({
      value: callback(state.value),
    })),
  setItems: (callback) => set((state) => ({ items: callback(state.items) })),
  clearPreferences: () => set({ value: [], items: [] }),

  listPreferences: async () => {
    try {
      const response = await axios.get(`preferences`);

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

export default usePreferencesStore;
