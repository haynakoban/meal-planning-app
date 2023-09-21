import { create } from 'zustand';
import axios from '../lib/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set) => ({
  userInfo: {},
  isLoggedIn: false,
  favorites: [],

  getUserInfo: async () => {
    const user = await AsyncStorage.getItem('@user');

    if (user) {
      set({ userInfo: JSON.parse(user) });
      set({ isLoggedIn: true });
    }
  },

  getFavorites: (ids) => {
    axios
      .get('recipes/list', {
        params: { ids },
      })
      .then((res) => {
        if (res.data?.status === 'success') {
          const recipes = res.data?.data;

          const results = recipes.map((recipe) => {
            const r = recipe;
            const feedbacks = recipe.feedbacks || [];
            const totalFeedbacks = feedbacks.length;
            const ratingsSum = feedbacks.reduce(
              (sum, feedback) => sum + (feedback.rating || 0),
              0
            );
            return {
              recipes: r,
              reviews: totalFeedbacks,
              ratings: ratingsSum / totalFeedbacks,
            };
          });

          set({ favorites: results });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  setUserInfo: (id) => {
    axios
      .get(`users/${id}`)
      .then(async (res) => {
        if (res.data?.status === 'success') {
          const user = await AsyncStorage.getItem('@user');

          if (user) {
            AsyncStorage.removeItem('@user');
          }

          await AsyncStorage.setItem('@user', JSON.stringify(res.data?.data));
          set({ userInfo: res.data?.data });
          set({ isLoggedIn: true });
        }
      })
      .catch((e) => console.error(e));
  },

  reFetch: (id) => {
    const { favorites } = useAuthStore.getState();
    const newFavorites = favorites.filter((item) => item?.recipes?._id !== id);
    set({ favorites: newFavorites || [] });
  },

  login: () => set({ isLoggedIn: true }),
  logout: () => {
    set({ isLoggedIn: false });
    AsyncStorage.removeItem('@user');
  },
}));

export default useAuthStore;
