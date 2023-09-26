import { Image, ScrollView, View, Text, Pressable } from 'react-native';
import styles from '../../styles/recipe';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import useAuthStore from '../../store/useAuthStore';
import LoadingScreen from '../loading/LoadingScreen';
import { useState, useEffect } from 'react';

const Meal = ({ route }) => {
  // const id = route.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, Math.floor(Math.random() * (100 - 10 + 1)) + 1000);
  }, []);

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

  const id = 'daw231awe9';

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
      {isLoading ? (
        <View style={container}>
          <Image src={meal_plan_recipes[0].image} style={imageStyle} />
          <View style={wrapper}>
            <Text style={textBold}>{meal_plan_recipes[0].name}</Text>
            <Text style={label}>Daily meal plan</Text>
          </View>
          <View style={divider}></View>
          <View style={bigDivider}></View>
          <View style={wrapper}>
            <Text style={textMedium}>How it works?</Text>
          </View>
          <View style={divider}></View>
          <View style={wrapper}>
            <Text style={[text, mb]}>
              This meal plan is delivered to you in the Prepear app. Prepear
              lets you interact with your meal plan at every stage of the
              cooking process.
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
            <Text style={textMedium}>Monday (Breakfast) Meal Plan</Text>
          </View>
          <View style={divider}></View>
          <View style={[wrapper, { flexDirection: 'row', flexWrap: 'wrap' }]}>
            {meal_plan_recipes.map((item) => {
              return (
                <View style={{ width: '50%' }} key={item.id}>
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
            <Text style={text}>{meal_plan_recipes[0].description}</Text>
          </View>
        </View>
      ) : (
        <LoadingScreen />
      )}
    </ScrollView>
  );
};

export default Meal;
