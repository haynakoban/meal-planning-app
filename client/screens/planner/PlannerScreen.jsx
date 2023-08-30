import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import PlansCard from '../../components/planner/PlansCard';
import { Button } from 'react-native-paper';
import { COLORS, FONT, SIZES } from '../../constants';

const data = [
  {
    id: '1',
    name: 'Diet Meal',
    username: '@juanluna',
    ratings: 65,
    image:
      'https://yummyfood.ph/wp-content/uploads/2021/08/Chicken-Adobo-Recipe.jpg',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '2',
    name: 'All Calories',
    username: '@semicolon',
    ratings: 231,
    image:
      'https://www.kawalingpinoy.com/wp-content/uploads/2013/01/sinigang-baboy-7.jpg',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '3',
    name: 'Personal Meal',
    username: '@juandelacruz',
    ratings: 12,
    image:
      'https://i0.wp.com/www.angsarap.net/wp-content/uploads/2020/09/Tortang-Dulong-Wide.jpg?fit=1080%2C720&ssl=1',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '4',
    name: 'Workout Meal',
    username: '@xenonxenon',
    ratings: 654,
    image:
      'https://api.lifegetsbetter.ph/uploads/recipes/featured/Kare-KAre.jpg',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '5',
    name: 'Normal Meal',
    username: '@semicolon',
    ratings: 132,
    image:
      'https://images.aws.nestle.recipes/resized/8fa4b6a13f1d904c77b6f6da0cfe5c21_nks-b3-d02_640_944_531.jpg',
    description: 'This is a description for this meal plan.',
  },
  {
    id: '6',
    name: 'Family Meal',
    username: '@semicolon',
    ratings: 132,
    image:
      'https://images.aws.nestle.recipes/resized/8fa4b6a13f1d904c77b6f6da0cfe5c21_nks-b3-d02_640_944_531.jpg',
    description: 'This is a description for this meal plan.',
  },
];

const PlannerScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 4,
            marginTop: 8,
          }}
        >
          {data.map((item) => (
            <View
              key={item.id}
              style={{
                width: '100%',
              }}
            >
              <PlansCard
                name={item.name}
                username={item.username}
                ratings={item.ratings}
                image={item.image}
                key={item.id}
                description={item.description}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default PlannerScreen;
