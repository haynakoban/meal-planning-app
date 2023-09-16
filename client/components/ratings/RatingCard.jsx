import React from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SIZES } from '../../constants';
import styles from '../../styles/favorites';

const RatingCard = ({ rating }) => {
  const totalStars = 5; // Total number of stars
  const filledStars = Math.round(rating); // Number of filled stars

  // Create an array of star components
  const stars = Array(totalStars)
    .fill()
    .map((_, index) => (
      <AntDesign
        key={index}
        name={index < filledStars ? 'star' : 'staro'}
        style={[styles.ratingsStyle, { marginLeft: 2 }]}
        color='orange'
        size={SIZES.md}
      />
    ));

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default RatingCard;
