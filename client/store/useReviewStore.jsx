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
        feedbacks: feedbacks.filter(
          (fb) => fb.user_id?._id !== userId || fb.foodItem !== foodItem
        ),
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
    const ratingsSum =
      feedbacks.length > 0
        ? feedbacks.reduce((sum, feedback) => sum + (feedback.rating || 0), 0)
        : 0;

    const newReviews = totalFeedbacks + 1;
    const newRatings =
      ratingsSum === 0
        ? parseInt(review.rating)
        : (ratingsSum + parseInt(review.rating)) / newReviews;

    useRecipeStore.setState((state) => ({
      recipe: {
        ...state.recipe,
        feedbacks: [...feedbacks, review],
        reviews: newReviews,
        ratings: newRatings,
      },
    }));
  },

  updateRatings: ({ recipe_id, user_id, comment, ratings }) => {
    set((state) => ({
      reviews: state.reviews.map((review) => {
        if (review.user_id._id === user_id && review.foodItem === recipe_id) {
          return { ...review, comment, rating: ratings };
        } else {
          return review;
        }
      }),
    }));

    const { recipe } = useRecipeStore.getState();

    const feedbacks = recipe?.feedbacks || [];

    const totalFeedbacks = feedbacks.length;
    const newFeedbacks = feedbacks.map((feedback) => {
      if (feedback.user_id === user_id && recipe._id === recipe_id) {
        const data = { ...feedback, comment, rating: ratings };
        return data;
      } else {
        return feedback;
      }
    });

    const ratingsSum =
      newFeedbacks.length > 0
        ? newFeedbacks.reduce(
            (sum, feedback) => sum + (feedback.rating || 0),
            0
          )
        : 0;

    useRecipeStore.setState((state) => ({
      recipe: {
        ...state.recipe,
        feedbacks: newFeedbacks,
        reviews: totalFeedbacks,
        ratings: ratingsSum / totalFeedbacks,
      },
    }));
  },

  clearReviews: () =>
    set((state) => ({
      reviews: [],
    })),
}));

export default useReviewsStore;
