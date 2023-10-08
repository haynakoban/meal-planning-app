import { Image, ScrollView, View, Text, Pressable } from 'react-native';
import styles from '../../styles/recipe';
import FavoriteCard from '../../components/favorites/FavoriteCard';
import LoadingScreen from '../loading/LoadingScreen';
import { useState, useEffect } from 'react';
import useMealPlanRecipe from '../../store/useMealPlanRecipe';
import NotFound from '../../assets/images/image-not-found.jpg';
import { COLORS, FONT, SIZES } from '../../constants';
import { Calendar } from 'react-native-calendars';
import { formatDate } from '../../constants';

const Meal = ({ route }) => {
  const [minDate, setMinDate] = useState(null); // Example minimum date
  const [maxDate, setMaxDate] = useState(null); // Example maximum date
  const markedDates = {};

  let currentDate = new Date(minDate);
  const endDate = new Date(maxDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    markedDates[dateString] = { selected: true, color: COLORS.accent };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const [isLoading, setIsLoading] = useState(false);
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

    setMinDate(meal?.startDate);
    setMaxDate(meal?.endDate);

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
            <Text style={label}>{meal?.description}</Text>
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
              Meal Plan ({meal?.time})
            </Text>
          </View>
          <View style={{ paddingHorizontal: 10, marginBottom: -15 }}>
            <Text style={[text, { paddingHorizontal: 15, fontSize: SIZES.md }]}>
              Meal Plan Recipes
            </Text>
          </View>
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

          <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
            <Text
              style={[
                text,
                { paddingHorizontal: 15, fontSize: SIZES.md, marginBottom: 5 },
              ]}
            >
              Duration{' '}
              {minDate != null && maxDate != null
                ? `(${formatDate(minDate, maxDate)?.start} - ${
                    formatDate(minDate, maxDate)?.end
                  })`
                : '-'}
            </Text>
            <Calendar
              style={[
                styles.borderWidth,
                {
                  borderRadius: 15,
                  padding: 10,
                  marginHorizontal: 15,
                  marginBottom: 10,
                  elevation: 5,
                },
              ]}
              markedDates={markedDates}
            />
          </View>
        </View>
      ) : (
        <LoadingScreen />
      )}
    </ScrollView>
  );
};

export default Meal;
