import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../styles/favorites';

const FavoriteCard = ({ name, username, ratings, image }) => {
  const {
    card,
    cardAction,
    cardCover,
    ratingsStyle,
    icon,
    title,
    usernameStyle,
    cardBottom,
    mb,
    AvatarIcon,
  } = styles;
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <Card style={card}>
      <Card.Cover source={{ uri: image }} style={[mb, cardCover]} />
      <Card.Content>
        <Text variant='titleLarge' style={title}>
          {name}
        </Text>
        <Text variant='bodyMedium' style={usernameStyle}>
          {username}
        </Text>
      </Card.Content>
      <View style={cardBottom}>
        <Text>
          <AntDesign name='star' style={ratingsStyle} color='orange' />
          <AntDesign name='star' style={ratingsStyle} color='orange' />
          <AntDesign name='star' style={ratingsStyle} color='orange' />
          <AntDesign name='star' style={ratingsStyle} color='orange' />
          <AntDesign name='star' style={ratingsStyle} color='orange' />
          <Text> ({ratings})</Text>
        </Text>
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
              icon={() => <AntDesign name='hearto' style={icon} color='red' />}
            />
          )}
        </Pressable>
      </Card.Actions>
    </Card>
  );
};

export default FavoriteCard;
