import { create } from 'zustand';
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
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;
