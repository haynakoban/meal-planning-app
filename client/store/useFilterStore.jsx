import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useFilterStore = create((set) => ({
  filters: [
    {
      title: 'Meal Types',
      data: [],
    },
    {
      title: 'Cuisines',
      data: [],
    },
    {
      title: 'Preferences',
      data: [],
    },
    {
      title: 'Cooking Times',
      data: [],
    },
    {
      title: 'Allergies',
      data: [],
    },
  ],

  fetchApiData: async () => {
    try {
      const mealTypesResponse = await axios.get('meals/types');
      const cuisinesResponse = await axios.get('cuisines');
      const preferencesResponse = await axios.get('preferences');
      const cookingTimesResponse = await axios.get('cooking/times');
      const allergiesResponse = await axios.get('allergies');

      // if one is empty or missing the result return false, otherwise true.
      const canSave = [
        mealTypesResponse,
        cuisinesResponse,
        preferencesResponse,
        cookingTimesResponse,
        allergiesResponse,
        mealTypesResponse.data,
        cuisinesResponse.data,
        preferencesResponse.data,
        cookingTimesResponse.data,
        allergiesResponse.data,
      ].every(Boolean);

      if (canSave) {
        set((state) => ({
          filters: state.filters.map((filter) => {
            switch (filter.title) {
              case 'Meal Types':
                return {
                  ...filter,
                  data: mealTypesResponse.data.data || [],
                };
              case 'Cuisines':
                return {
                  ...filter,
                  data: cuisinesResponse.data.data || [],
                };
              case 'Preferences':
                return {
                  ...filter,
                  data: preferencesResponse.data.data || [],
                };
              case 'Cooking Times':
                return {
                  ...filter,
                  data: cookingTimesResponse.data.data || [],
                };
              case 'Allergies':
                return {
                  ...filter,
                  data: allergiesResponse.data.data || [],
                };
              default:
                return filter;
            }
          }),
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}));

export default useFilterStore;
