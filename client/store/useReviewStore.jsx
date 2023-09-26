import { create } from 'zustand';
import axios from '../lib/axiosConfig';

const useReviewsStore = create((set) => ({
  reviews: [],
  personal: {},

  fetchReviewsData: async (id) => {
    try {
      const response = await axios.get(`feedbacks/reviews/${id}`);

      const results = response?.data?.data;

      if (results) {
        set({ reviews: results });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  fetchPersonalReview: async (id, user_id) => {
    try {
      const response = await axios.get(`feedbacks/${id}/${user_id}`);

      const results = response?.data?.data;

      if (results) {
        set({ personal: results });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  removeReview: (userId, foodItem) => {
    set((state) => ({
      reviews: state.reviews.filter(
        (review) =>
          review.user_id._id !== userId || review.foodItem !== foodItem
      ),
    }));
  },
  clearReviews: () =>
    set((state) => ({
      reviews: [],
    })),
}));

export default useReviewsStore;
