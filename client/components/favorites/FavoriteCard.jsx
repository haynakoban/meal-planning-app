import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../styles/favorites';
import axios from '../../lib/axiosConfig';

import { useNavigation } from '@react-navigation/native';

import { SIZES } from '../../constants';
import useAuthStore from '../../store/useAuthStore';

const FavoriteCard = ({
  name,
  username,
  reviews = 0,
  ratings = 0,
  image = '',
  id,
}) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const [isFavorite, setIsFavorite] = useState(true);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const reFetch = useAuthStore((state) => state.reFetch);

  useState(() => {
    const itHas = userInfo?.favorites.some((item) => item === id);
    setIsFavorite(itHas);
  }, [userInfo]);

  const navigation = useNavigation();

  const handleSetFavorite = async () => {
    const type = isFavorite ? 'delete' : 'add';
    const data = {
      id: userInfo._id,
      itemId: id,
      type,
    };

    setIsFavorite(!isFavorite);
    await axios.post(`users/manage`, data);
    reFetch(id);
    setUserInfo(userInfo?._id);
  };

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

  return (
    <Pressable
      onPress={() => navigation.navigate('Recipe', { id })}
      style={card}
    >
      <Card>
        <Card.Cover
          source={
            image
              ? {
                  uri: image,
                }
              : require('../../assets/images/image-not-found.jpg')
          }
          style={[mb, cardCover]}
        />
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
          <Pressable onPress={handleSetFavorite}>
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
