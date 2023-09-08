import { Image, ScrollView, View, Text, Pressable } from 'react-native';

import styles from '../../styles/recipe';
import styles2 from '../../styles/homeRecipes';
import { COLORS, SIZES, recipe as data } from '../../constants';
import { Feather } from '@expo/vector-icons';

import FavoriteCard from '../../components/favorites/FavoriteCard';
import PlansCard from '../../components/planner/PlansCard';
import ReviewCard from '../../components/reviews/ReviewCard';

import { DATA, reviews } from '../../constants';
import { useEffect, useState } from 'react';

const Meal = ({ route }) => {
  // const [id] = useState(route.params.id);

  const [reviewsToShow, setReviewsToShow] = useState([]);
  const reviewsPerPage = 2;
  const [count, setCount] = useState(1);
  const loopThroughReviews = (count) => {
    for (
      let i = count * reviewsPerPage - reviewsPerPage;
      i < reviewsPerPage * count;
      i++
    ) {
      if (reviews[i] !== undefined) {
        setReviewsToShow((prev) => [...prev, reviews[i]]);
      }
    }
  };

  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
    loopThroughReviews(count);
  }, []);
  const handleShowMoreReviews = () => {
    setCount((prevCount) => prevCount + 1);
    loopThroughReviews(count);
  };

  const { cardWrapper, cardContentWrapper } = styles2;

  const meal_plan_recipes = [
    {
      id: 1,
      name: 'Adobong Manok',
      username: 'semicolon101010',
      meal_time: 'Breakfast',
      ratings: 224,
      image:
        'https://yummyfood.ph/wp-content/uploads/2021/08/Chicken-Adobo-Recipe.jpg',
    },
    {
      id: 2,
      name: 'Adobong Manok',
      username: 'xenonnn',
      meal_time: 'Lunch',
      ratings: 21,
      image:
        'https://yummyfood.ph/wp-content/uploads/2021/08/Chicken-Adobo-Recipe.jpg',
    },
    {
      id: 3,
      name: 'Adobong Manok',
      username: 'xxx123',
      meal_time: 'Dinner',
      ratings: 147,
      image:
        'https://yummyfood.ph/wp-content/uploads/2021/08/Chicken-Adobo-Recipe.jpg',
    },
  ];

  const {
    bigDivider,
    container,
    divider,
    imageStyle,
    label,
    mb,
    text,
    textBold,
    textMedium,
    wrapper,
  } = styles;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={container}>
        <Image src={data.image} style={imageStyle} />
        <View style={wrapper}>
          <Text style={textBold}>{data.name}</Text>
          <Text style={label}>@{data.username}</Text>
        </View>
        <View style={divider}></View>
        <View style={bigDivider}></View>
        <View style={wrapper}>
          <Text style={textMedium}>How it works?</Text>
        </View>
        <View style={divider}></View>
        <View style={wrapper}>
          <Text style={[text, mb]}>
            This meal plan is delivered to you in the Prepear app. Prepear lets
            you interact with your meal plan at every stage of the cooking
            process.
          </Text>
          <Text style={[text, mb]}>
            {'    '}1. Customize your plan to match your life.
          </Text>
          <Text style={[text, mb]}>
            {'    '}2. Store and organize all your recipes in one place.
          </Text>
          <Text style={[text, mb]}>
            {'    '}3. Check off ingredients and directions as you cook.
          </Text>
        </View>
        <View style={bigDivider}></View>
        <View style={wrapper}>
          <Text style={textMedium}>Monday Plan</Text>
        </View>
        <View style={divider}></View>
        <View style={[wrapper, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {meal_plan_recipes.map((item) => {
            return (
              <View style={{ width: '50%' }} key={item.id}>
                <Text
                  style={[
                    text,
                    {
                      paddingHorizontal: 20,
                      backgroundColor: COLORS.accent,
                      paddingVertical: 8,
                      marginHorizontal: 4,
                      textAlign: 'center',
                      borderTopLeftRadius: SIZES.sm,
                      borderTopRightRadius: SIZES.sm,
                      color: COLORS.white,
                    },
                  ]}
                >
                  {item.meal_time}
                </Text>
                <FavoriteCard
                  name={item.name}
                  username={item.username}
                  ratings={item.ratings}
                  image={item.image}
                />
              </View>
            );
          })}
        </View>
        <View style={bigDivider}></View>
        <View style={wrapper}>
          <Text style={textMedium}>Description</Text>
        </View>
        <View style={divider}></View>
        <View style={wrapper}>
          <Text style={text}>{data.description}</Text>
        </View>
        <View style={bigDivider}></View>
        <View style={wrapper}>
          <Text style={textMedium}>Recommended Meal Plan</Text>
        </View>
        <View style={bigDivider}></View>
        <View style={wrapper}>
          <Text style={textMedium}>Reviews</Text>
        </View>
        <View style={divider}></View>
        <View style={wrapper}>
          <Pressable
            style={[textMedium, { justifyContent: 'center' }]}
            onPress={() => console.log('write a review')}
          >
            <Text style={text}>
              <Feather name='edit' size={24} color='black' /> Write a Review
            </Text>
          </Pressable>
        </View>
        <View style={divider}></View>
        <ReviewCard reviewsToRender={reviewsToShow} />
        <Pressable
          onPress={handleShowMoreReviews}
          style={{ paddingVertical: 20 }}
        >
          <Text style={[text, { textAlign: 'center' }]}>Show more</Text>
        </Pressable>
      </View>
      <View style={bigDivider}></View>
      <View style={cardWrapper}>
        {DATA.map(({ id, name, description, username, image }) => (
          <View key={id} style={cardContentWrapper}>
            <PlansCard
              name={name}
              username={username}
              description={description}
              image={image}
              key={id}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Meal;
