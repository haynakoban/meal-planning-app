import { create } from 'zustand';
import axios from '../lib/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set) => ({
  userInfo: {},
  isLoggedIn: false,

  getUserInfo: async () => {
    const user = await AsyncStorage.getItem('@user');

    if (user) {
      set({ userInfo: JSON.parse(user) });
      set({ isLoggedIn: true });
    }
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
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;
