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

  getFavorites: (favorites) => {
    axios
      .get('recipes/list', {
        params: { ids: favorites },
      })
      .then((res) => {
        if (res.data?.status === 'success') {
          if (res.data?.feedbacks) {
            const recipes = res.data?.data;
            const feedbacks = res.data?.feedbacks;

            for (let i = 0; i < recipes.length; i++) {
              const totalReview = [];
              let ratings = 0;
              for (let j = 0; j < feedbacks.length; j++) {
                if (recipes[i]._id === feedbacks[j].foodItem) {
                  totalReview.push(feedbacks[j]);
                  ratings += feedbacks[j].rating;
                }
              }

              recipes[i].ratings = ratings / totalReview?.length;
              recipes[i].totalReview = totalReview?.length;

              set({ favorites: recipes });
            }
          } else {
            set({ favorites: res.data.data });
          }
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
  login: () => set({ isLoggedIn: true }),
  logout: () => {
    set({ isLoggedIn: false });
    AsyncStorage.removeItem('@user');
  },
}));

export default useAuthStore;
