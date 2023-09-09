import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useCuisinesStore = create((set) => ({
  cuisines: [],

  listCuisines: async (page) => {
    try {
      const response = await axios.get(`cuisines?page=${page}`);

      if (response && response.data && response.data) {
        const newData = response.data.data;

        if (Array.isArray(newData) && newData.length > 0) {
          set((state) => ({
            cuisines: [...state.cuisines, ...newData],
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}));

export default useCuisinesStore;
