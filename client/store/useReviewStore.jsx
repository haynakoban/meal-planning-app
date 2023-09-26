import { create } from 'zustand';
import axios from '../lib/axiosConfig';
import useRecipeStore from './useRecipeStore';

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

  removeReview: (userId, foodItem, rating) => {
    set((state) => ({
      reviews: state.reviews.filter(
        (review) =>
          review.user_id._id !== userId || review.foodItem !== foodItem
      ),
    }));
    const { recipe } = useRecipeStore.getState();

    const feedbacks = recipe?.feedbacks || [];
    const totalFeedbacks = feedbacks.length;
    const ratingsSum = feedbacks.reduce(
      (sum, feedback) => sum + (feedback.rating || 0),
      0
    );

    const newReviews = totalFeedbacks - 1;
    const newRatings = (ratingsSum - rating) / newReviews;

    useRecipeStore.setState((state) => ({
      recipe: {
        ...state.recipe,
        reviews: newReviews,
        ratings: newRatings,
      },
    }));
  },

  addReview: (review) => {
    set((state) => ({
      reviews: [review, ...state.reviews],
    }));

    const { recipe } = useRecipeStore.getState();

    const feedbacks = recipe?.feedbacks || [];
    const totalFeedbacks = feedbacks.length;
    const ratingsSum = feedbacks.reduce(
      (sum, feedback) => sum + (feedback.rating || 0),
      0
    );

    const newReviews = totalFeedbacks + 1;
    const newRatings = (ratingsSum - parseInt(review.rating)) / newReviews;

    useRecipeStore.setState((state) => ({
      recipe: {
        ...state.recipe,
        reviews: newReviews,
        ratings: newRatings,
      },
    }));
  },

  clearReviews: () =>
    set((state) => ({
      reviews: [],
    })),
}));

export default useReviewsStore;
