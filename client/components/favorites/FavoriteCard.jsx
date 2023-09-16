import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../styles/favorites';

import { useNavigation } from '@react-navigation/native';
import { SIZES } from '../../constants';

const FavoriteCard = ({ name, username, reviews = 0, ratings = 0, image }) => {
  const navigation = useNavigation();

  const {
    card,
    cardAction,
    cardCover,
    icon,
    title,
    usernameStyle,
    cardBottom,
    mb,
    AvatarIcon,
  } = styles;
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <Pressable
      onPress={() => navigation.navigate('Recipe', { id: 1 })}
      style={card}
    >
      <Card>
        <Card.Cover source={{ uri: image }} style={[mb, cardCover]} />
        <Card.Content>
          <Text
            variant='titleLarge'
            style={title}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {name}
          </Text>
          <Text
            variant='bodyMedium'
            style={usernameStyle}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {username}
          </Text>
        </Card.Content>
        <View style={cardBottom}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RatingStars rating={ratings} />
            <Text> ({reviews})</Text>
          </View>
        </View>
        <Card.Actions style={cardAction}>
          <Pressable onPress={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? (
              <Avatar.Icon
                size={40}
                style={AvatarIcon}
                icon={() => <AntDesign name='heart' style={icon} color='red' />}
              />
            ) : (
              <Avatar.Icon
                size={40}
                style={AvatarIcon}
                icon={() => (
                  <AntDesign name='hearto' style={icon} color='red' />
                )}
              />
            )}
          </Pressable>
        </Card.Actions>
      </Card>
    </Pressable>
  );
};

const RatingStars = ({ rating }) => {
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

export default FavoriteCard;
