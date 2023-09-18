import { create } from 'zustand';
import axios from '../lib/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFilterStore = create((set) => ({
  lastModified: null,
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
  filteredData: {
    'Meal Types': [],
    Cuisines: [],
    Preferences: [],
    'Cooking Times': [],
    Allergies: [],
  },

  fetchApiData: async () => {
    try {
      const { lastModified, filters } = useFilterStore.getState();

      const response = await axios.get('users/auth/filters', {
        headers: {
          'If-Modified-Since': lastModified
            ? lastModified.toUTCString()
            : undefined,
        },
      });

      if (
        response.status === 200 &&
        filters[0].data.length === 0 &&
        filters[1].data.length === 0 &&
        filters[2].data.length === 0 &&
        filters[3].data.length === 0 &&
        filters[4].data.length === 0
      ) {
        const mergedFilters = response.data.data;

        if (mergedFilters) {
          set({ filters: mergedFilters, lastModified: new Date() });

          // Store the updated data in AsyncStorage
          await AsyncStorage.setItem('filters', JSON.stringify(mergedFilters));
          await AsyncStorage.setItem(
            'lastModified',
            JSON.stringify(new Date())
          );
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  loadCachedFilters: async () => {
    try {
      const cachedFilters = await AsyncStorage.getItem('filters');
      const cachedLastModified = await AsyncStorage.getItem('lastModified');

      if (cachedFilters && cachedLastModified) {
        set({
          filters: JSON.parse(cachedFilters),
          lastModified: new Date(JSON.parse(cachedLastModified)),
        });
      }
    } catch (error) {
      // Handle errors when loading cached data
      console.error('Error loading cached filters:', error);
    }
  },
  setFilteredData: (title, id) => {
    set((state) => {
      const type = state.filteredData[title] || [];

      if (type.includes(id)) {
        return {
          filteredData: {
            ...state.filteredData,
            [title]: type.filter((_id) => _id !== id),
          },
        };
      } else {
        return {
          filteredData: {
            ...state.filteredData,
            [title]: [...type, id],
          },
        };
      }
    });
  },
  loadCachedFilteredData: async () => {
    try {
      const cachedFilteredData = await AsyncStorage.getItem('filtersData');

      if (cachedFilteredData) {
        set({
          filteredData: JSON.parse(cachedFilteredData),
        });
      }
    } catch (error) {
      // Handle errors when loading cached data
      console.error('Error loading cached filters:', error);
    }
  },
}));

export default useFilterStore;
