import { useState } from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../styles/favorites';

import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, FONT, SIZES } from '../../constants';
const SelectRecipe = ({ name, username, ratings, image, id, addRecipe }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [type] = useState(route.params.type);

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
    <Pressable
      onPress={() => navigation.navigate('Recipe', { id: 1 })}
      style={card}
    >
      <Pressable
        onPress={() => addRecipe({ id, type })}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.accent,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.md,
            fontFamily: FONT.semiBold,
            color: COLORS.white,
          }}
        >
          Add Recipe
        </Text>
      </Pressable>
      <Card>
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

export default SelectRecipe;
