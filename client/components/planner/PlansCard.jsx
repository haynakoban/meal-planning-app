import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Card } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';
import { FONT } from '../../constants';

const PlansCard = ({ name, username, ratings, image, description }) => {
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
        <Text variant='bodyMedium' style={styles.description}>
          {description}
        </Text>
        <Text variant='bodyMedium' style={styles.username}>
          {username}
        </Text>
      </Card.Content>
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
  title: {
    fontFamily: FONT.bold,
    fontSize: 16,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: 14,
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

export default PlansCard;
