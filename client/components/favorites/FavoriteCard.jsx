import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';
import { COLORS, FONT } from '../../constants';

const FavoriteCard = ({ name, username, ratings, image }) => {
  const [isFavorite, setIsFavorite] = React.useState(true);

  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: image }}
        style={[styles.mb, { position: 'relative', objectFit: 'cover' }]}
      />
      <Card.Content>
        <Text variant='titleLarge' style={styles.title}>
          {name}
        </Text>
        <Text variant='bodyMedium' style={styles.username}>
          {username}
        </Text>
      </Card.Content>
      <View style={styles.cardBottom}>
        <Text>
          <AntDesign name='star' style={styles.ratings} color='orange' />
          <AntDesign name='star' style={styles.ratings} color='orange' />
          <AntDesign name='star' style={styles.ratings} color='orange' />
          <AntDesign name='star' style={styles.ratings} color='orange' />
          <AntDesign name='star' style={styles.ratings} color='orange' />
          <Text> ({ratings})</Text>
        </Text>
      </View>
      <Card.Actions
        style={{
          position: 'absolute',
          top: 170,
          right: 0,
        }}
      >
        <Pressable onPress={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? (
            <Avatar.Icon
              size={40}
              style={{ backgroundColor: COLORS.primary }}
              icon={() => (
                <AntDesign name='heart' style={styles.icon} color='red' />
              )}
            />
          ) : (
            <Avatar.Icon
              size={40}
              style={{ backgroundColor: COLORS.primary }}
              icon={() => (
                <AntDesign name='hearto' style={styles.icon} color='red' />
              )}
            />
          )}
        </Pressable>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 12,
  },
  ratings: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 16,
  },
  username: {
    fontFamily: FONT.regular,
    fontSize: 14,
  },
  cardBottom: {
    padding: 14,
  },
  mb: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 12,
  },
});

export default FavoriteCard;
