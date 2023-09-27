import { useState, useEffect } from 'react';
import { Text, TextInput, View, Pressable, Modal } from 'react-native';
import { Rating } from 'react-native-ratings';

import { COLORS, SIZES, FONT } from '../../constants';
import styles from '../../styles/recipeForm';
import useReviewsStore from '../../store/useReviewStore';
import axios from '../../lib/axiosConfig';

const ReviewModal = ({ visible, data, onClose, type }) => {
  const { personal, addReview, fetchPersonalReview, updateRatings } =
    useReviewsStore();

  const [ratings, setRatings] = useState(5);
  const [form, setForm] = useState({
    type: type,
    user_id: data.user_id,
    foodItem: data.foodItem,
    comment: '',
  });

  useEffect(() => {
    fetchPersonalReview(data?.foodItem, data?.user_id);
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      comment: personal[0]?.comment || '',
    });
    setRatings(personal[0]?.rating || 5);
  }, [personal]);

  function ratingCompleted(rating) {
    setRatings(rating);
  }

  const submitReview = async () => {
    try {
      if (personal?.length > 0) {
        let data = {
          comment: form.comment,
          rating: ratings,
        };

        await axios.post(`feedbacks/${form.foodItem}/${form.user_id}`, data);

        updateRatings({
          recipe_id: form.foodItem,
          user_id: form.user_id,
          comment: data.comment,
          ratings: data.rating,
        });
      } else {
        let data = {
          user_id: form.user_id,
          foodItem: form.foodItem,
          foodItemType: type === 'recipe' ? 'Recipes' : 'Meals',
          comment: form.comment,
          rating: ratings,
        };

        const response = await axios.post(`feedbacks`, data);

        if (response.data.data) {
          addReview(response.data.data);
        }
      }

      onClose(true);
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          backgroundColor: 'rgba(0,0,0, .5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: SIZES.lg,
            borderTopRightRadius: SIZES.lg,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              marginBottom: 25,
              fontFamily: FONT.semiBold,
              fontSize: SIZES.lg,
            }}
          >
            Write a review
          </Text>
          <Text
            style={{
              fontFamily: FONT.medium,
              textAlign: 'center',
              fontSize: SIZES.md,
              marginBottom: SIZES.sm,
              color: 'orange',
            }}
          >
            Ratings: {ratings}/5
          </Text>
          <Rating
            type='custom'
            count={5}
            defaultRating={5}
            imageSize={30}
            ratingColor='orange'
            startingValue={personal[0]?.rating || 5}
            onStartRating={ratingCompleted}
            onSwipeRating={ratingCompleted}
            onFinishRating={ratingCompleted}
            style={{
              paddingVertical: 5,
              fontFamily: FONT.medium,
            }}
          />

          <Text style={[styles.addLabel, styles.mb]}>Comment</Text>
          <TextInput
            placeholder='Write a comment'
            value={form.comment}
            onChangeText={(text) => setForm({ ...form, comment: text })}
            style={[
              styles.textarea,
              styles.borderWidth,
              { padding: 15, borderRadius: 8 },
            ]}
            multiline={true}
            numberOfLines={10}
          />
          <Pressable
            style={{
              padding: 15,
              backgroundColor: COLORS.accent,
              borderRadius: 999,
              marginTop: SIZES.lg,
            }}
            onPress={submitReview}
          >
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: FONT.medium,
                fontSize: SIZES.md,
              }}
            >
              Submit
            </Text>
          </Pressable>
          <Pressable
            style={{
              padding: 15,
              backgroundColor: COLORS.danger,
              borderRadius: 999,
              marginTop: SIZES.lg,
            }}
            onPress={() => onClose(false)}
          >
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: FONT.medium,
                fontSize: SIZES.md,
              }}
            >
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModal;
