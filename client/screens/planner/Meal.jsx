import { Image, ScrollView, View, Text, Pressable } from 'react-native';
import styles from '../../styles/recipe';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import useAuthStore from '../../store/useAuthStore';
import LoadingScreen from '../loading/LoadingScreen';
import { useState, useEffect } from 'react';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import NotFound from '../../assets/images/image-not-found.jpg';
import { FONT } from '../../constants';

const Meal = ({ route }) => {
  // const id = route.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);
  const { meal, fetchSingleMeal, mealRecipes, getMealRecipes } =
    useMealPlanRecipe();

  const meal_id = route.params.id;

  useEffect(() => {
    fetchSingleMeal(meal_id);
  }, []);

  useEffect(() => {
    let ids = [];
    meal?.recipes?.map((recipe) => {
      ids.push(recipe?._id);
    });

    getMealRecipes(ids);
  }, [meal]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, Math.floor(Math.random() * (100 - 10 + 1)) + 1000);
  }, []);

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
          <Image
            source={meal?.image ? { uri: meal?.image } : NotFound}
            style={imageStyle}
          />
          <View style={wrapper}>
            <Text style={[textBold, { textTransform: 'capitalize' }]}>
              {meal?.name}
            </Text>
            <Text style={label}>
              Meal plan by:{' '}
              <Text style={[label, { fontFamily: FONT.semiBold }]}>You</Text>
            </Text>
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
            <Text style={[textMedium, { textTransform: 'capitalize' }]}>
              {meal?.day} ({meal?.time}) Meal Plan
            </Text>
          </View>
          <View style={divider}></View>
          <View style={[wrapper, { flexDirection: 'row', flexWrap: 'wrap' }]}>
            {mealRecipes?.map((item) => {
              let calculated = 0;
              for (let i = 0; i < item?.feedbacks.length; i++) {
                calculated += parseInt(item?.feedbacks[i]?.rating);
              }

              return (
                <View style={{ width: '50%' }} key={item?._id}>
                  <FavoriteCard
                    name={item?.name}
                    username={item?.user_id?.username || 'anon'}
                    reviews={item?.feedbacks.length || 0}
                    ratings={calculated / item?.feedbacks.length || 0}
                    image={item?.image}
                    id={item?._id}
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
            <Text style={text}>{meal?.description}</Text>
          </View>
        </View>
      ) : (
        <LoadingScreen />
      )}
    </ScrollView>
  );
};

export default Meal;
