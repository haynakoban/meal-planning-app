import { useState, useEffect } from 'react';
import { Text, TextInput, View, Pressable, Modal } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';

import { COLORS, SIZES, CT, privacyData, FONT } from '../../constants';
import styles from '../../styles/recipeForm';
// import useIngredientsStore from '../../store/useIngredientsStore';

const ReviewModal = ({ visible, data, onClose, type }) => {
  const [form, setForm] = useState({
    type: type,
    user_id: data.user_id,
    id: data.id,
    ratings: 5,
    comment: '',
  });

  function ratingCompleted(rating) {
    setForm({ ...form, ratings: rating });
  }

  function submitReview() {
    console.log(form);
  }

  return (
    <Modal
      animationType='slide' // You can change this to 'fade', 'slide', or 'none'
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
            Ratings: {form.ratings}/5
          </Text>
          <Rating
            type='custom'
            count={5}
            defaultRating={5}
            imageSize={30}
            ratingColor='orange'
            startingValue={5}
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
