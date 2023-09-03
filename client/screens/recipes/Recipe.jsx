import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View, Text } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Recipe = ({ navigation, route }) => {
  const [id] = useState(route.params.id);
  let desc =
    'Heat oil in pan and sauté garlic and onions. Then add chicken to the pan and sear on all sides, until you have a little browning in the chicken skin._Pour in vinegar, soy sauce and water. Add bay leaves, pepper and Knorr Chicken Cubes. Bring to a boil over high heat then reduce heat to simmer, but do not cover the pan. Continue to simmer for 10 mins._Remove chicken pieces from sauce and fry in another pan until nicely browned._Put back fried chicken pieces into sauce. Add sugar and let simmer again for another 10 minutes or until sauce has thickened. Serve warm.';
  const data = {
    username: 'semicolon101010',
    name: 'Adobong Manok',
    description:
      'Adobong manok is a method of marinating and stewing for any cut of meat or fish in a briny mixture of vinegar, soy sauce, and spices',
    image:
      'https://yummyfood.ph/wp-content/uploads/2021/08/Chicken-Adobo-Recipe.jpg',
    procedure: desc.split('_'),
    type: ['Lunch', 'Dinner'],
    preferences: ['Sweet', 'Savory', 'Salted'],
    cuisine: 'Ilocano',
    privacy: 'public',
    ratings: 4.5,
    reviews: 187,
    cookingTime: 60,
    ingredients: [
      {
        id: 1,
        ingredient: 'sugar',
        measurement: 'teasepoon',
        amount: '1/3',
        description: 'this is description',
      },
      {
        id: 2,
        ingredient: 'carrot/s',
        measurement: 'pound',
        amount: '1',
        description: '',
      },
      {
        id: 3,
        ingredient: 'chicken',
        measurement: 'kg',
        amount: '3',
        description: 'description',
      },
    ],
    facts: [
      {
        name: 'Calories',
        value: 349,
        measurement: '',
        daily: 17.45,
      },
      {
        name: 'Fat',
        value: 19,
        measurement: 'g',
        daily: 29.23,
      },
      {
        name: 'Carbs',
        value: 4,
        measurement: 'g',
        daily: 1.33,
      },
      {
        name: 'Fiber',
        value: 1,
        measurement: 'g',
        daily: 4,
      },
      {
        name: 'Protein',
        value: 33,
        measurement: 'g',
        daily: 66,
      },
      {
        name: 'Sugars',
        value: 2,
        measurement: 'g',
        daily: 0,
      },
      {
        name: 'Sodium',
        value: 335,
        measurement: 'mg',
        daily: 13.96,
      },
    ],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image src={data.image} style={styles.imageStyle} />
        <View style={styles.wrapper}>
          <Text style={styles.textBold}>{data.name}</Text>
          <Text style={styles.label}>@{data.username}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.wrapper}>
          <View style={styles.reviewTab}>
            <View>
              <Text>
                <AntDesign
                  name='star'
                  style={styles.ratingsStyle}
                  color='orange'
                />
                <AntDesign
                  name='star'
                  style={styles.ratingsStyle}
                  color='orange'
                />
                <AntDesign
                  name='star'
                  style={styles.ratingsStyle}
                  color='orange'
                />
                <AntDesign
                  name='star'
                  style={styles.ratingsStyle}
                  color='orange'
                />
                <AntDesign
                  name='star'
                  style={styles.ratingsStyle}
                  color='orange'
                />
              </Text>
              <Text style={styles.text}>{data.reviews} Reviews</Text>
            </View>
            <View style={styles.flexRow}>
              <Ionicons name='timer-outline' size={24} color='black' />
              <Text>{data.cookingTime} minutes</Text>
            </View>
          </View>
        </View>
        <View style={styles.bigDivider}></View>
        <View style={styles.wrapper}>
          <Text style={styles.textMedium}>Ingredients</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.wrapper}>
          {data.ingredients.map((item) => {
            return (
              <Text key={item.id} style={styles.text}>
                - {item.amount} {item.measurement} {item.ingredient}
                {item.description == '' ? '' : ' (' + item.description + ')'}
              </Text>
            );
          })}
        </View>
        <View style={styles.bigDivider}></View>
        <View style={styles.wrapper}>
          <Text style={styles.textMedium}>Procedure</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.wrapper}>
          {data.procedure.map((item, index) => {
            return (
              <Text key={index} style={[styles.text, { marginBottom: 5 }]}>
                {index + 1}. {item}
              </Text>
            );
          })}
        </View>
        <View style={styles.bigDivider}></View>
        <View style={styles.wrapperAccent}>
          <Text style={styles.textWhite}>Nutrition Facts</Text>
        </View>
        <View style={styles.nutritionWrapper}>
          <View style={styles.flexRowBetween}>
            <Text style={styles.text}>AMMOUNT PER SERVING</Text>
            <Text style={styles.text}>% DAILY VALUE</Text>
          </View>
          <View style={styles.dividerBlue}></View>
          <View>
            {data.facts.map((item) => {
              return (
                <>
                  <View style={styles.flexRowBetweenInside}>
                    <Text style={styles.text}>
                      <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>:{' '}
                      {item.value}
                      {item.measurement}
                    </Text>
                    <Text style={styles.text}>{item.daily}%</Text>
                  </View>
                  <View style={styles.dividerBlue}></View>
                </>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'start',
  },
  wrapper: {
    padding: 20,
  },
  wrapperAccent: {
    padding: 20,
    backgroundColor: COLORS.accent,
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  dividerBlue: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },
  bigDivider: {
    width: '100%',
    borderBottomWidth: 25,
    borderBottomColor: COLORS.secondary,
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
  },
  textBold: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xl,
  },
  textMedium: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xl,
  },
  textWhite: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xl,
    color: COLORS.white,
  },
  mt: {
    marginTop: SIZES.sm,
  },
  mtxl: {
    marginTop: SIZES.xl,
  },
  ratingsStyle: {
    fontSize: SIZES.lg,
  },
  reviewTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  nutritionWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.accent,
  },
  flexRowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.primary,
  },
  flexRowBetweenInside: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.secondary,
  },
});

export default Recipe;
