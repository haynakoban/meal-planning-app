import {
  Image,
  ScrollView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '../../constants';
import styles from '../../styles/recipe';

import ReviewCard from '../../components/reviews/ReviewCard';

import { useState, useEffect } from 'react';
import ReviewModal from '../../components/modals/ReviewModal';
import useRecipeStore from '../../store/useRecipeStore';
import useReviewsStore from '../../store/useReviewStore';
import NotFound from '../../assets/images/image-not-found.jpg';
import RatingCard from '../../components/ratings/RatingCard';
import useAuthStore from '../../store/useAuthStore';
import { calculateCalorie } from '../../constants';
import { API } from '../../constants/API';
import axios from '../../lib/axiosConfig';
import LoadingScreen from '../loading/LoadingScreen';

const Recipe = ({ route }) => {
  function customToFixed(number) {
    const decimalPlaces = (number?.toString().split('.')[1] || []).length;
    return decimalPlaces > 3 ? number?.toFixed(2) : number;
  }

  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);
  const recipe_id = route.params.id;
  const recipe = useRecipeStore((state) => state.recipe);
  const singleRecipe = useRecipeStore((state) => state.singleRecipes);
  const [nutritionFacts, setNutritionFacts] = useState({});
  const reviews = useReviewsStore((state) => state.reviews);
  const fetchReviewsData = useReviewsStore((state) => state.fetchReviewsData);
  const clearReviews = useReviewsStore((state) => state.clearReviews);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, Math.floor(Math.random() * (100 - 10 + 1)) + 1000);
  }, []);

  const fetchNutrition = async () => {
    try {
      let query = '';
      for (let i = 0; i < recipe?.ingredients?.length; i++) {
        query +=
          recipe?.ingredients[i].amount +
          recipe?.ingredients[i].measurement +
          ' ' +
          recipe?.ingredients[i].ingredients_id[0]?.name +
          ' ' +
          recipe?.ingredients[i].description +
          ' ';
      }

      const response = await axios.get(
        `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
        {
          headers: {
            'X-Api-Key': API,
            'Content-Type': 'application/json',
          },
        }
      );
      setNutritionFacts(calculateCalorie(response.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setNutritionFacts({});
    const fetchData = async () => {
      singleRecipe(recipe_id);
      fetchReviewsData(recipe_id);

      setTimeout(() => {
        fetchNutrition();
      }, Math.floor(Math.random() * (100 - 10 + 1)) + 1000);
    };

    fetchData();
  }, [recipe_id]);

  const [reviewsToShow, setReviewsToShow] = useState([]);
  const [reviewsPerPage, setReviewsPerPage] = useState(0);
  const loopThroughReviews = (count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
      if (reviews[i] !== undefined) {
        arr.push(reviews[i]);
      }
    }
    setReviewsToShow(arr);
  };

  const handleShowMoreReviews = () => {
    setReviewsPerPage((prev) => prev + 4);
    loopThroughReviews(reviewsPerPage + 4);
  };

  const handleShowLessReviews = () => {
    setReviewsPerPage(0);
    loopThroughReviews(0);
  };

  const onRemoveItem = async () => {
    await axios.delete(`feedbacks/${recipe_id}/${userInfo?._id}`);
    clearReviews();
    fetchReviewsData(recipe_id);
    setReviewsPerPage(0);
    loopThroughReviews(0);
  };

  const {
    bigDivider,
    container,
    divider,
    dividerBlue,
    flexRow,
    flexRowBetween,
    flexRowBetweenInside,
    fwb,
    imageStyle,
    label,
    mb,
    nutritionWrapper,
    reviewTab,
    text,
    textSm,
    textBold,
    textMedium,
    textWhite,
    wrapper,
    wrapperAccent,
  } = styles;

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = (data) => {
    if (data) {
      clearReviews();
      fetchReviewsData(recipe_id);
      singleRecipe(recipe_id);
      setReviewsPerPage(0);
      loopThroughReviews(0);
    }
    setModalVisible(false);
  };

  let calculated = 0;
  for (let i = 0; i < recipe?.feedbacks?.length; i++) {
    calculated += parseInt(recipe?.feedbacks[i].rating);
  }

  if (!recipe) {
    return (
      <View style={{ paddingTop: 8 }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='always'
    >
      {isLoading ? (
        <View style={container}>
          <Image
            source={recipe?.image ? { uri: recipe?.image } : NotFound}
            style={imageStyle}
          />
          <View style={wrapper}>
            <Text style={textBold}>{recipe?.name}</Text>
            <Text
              style={[label, { fontSize: SIZES.md, fontFamily: FONT.semiBold }]}
            >
              {recipe?.user_id?.fullname}
            </Text>
            <Text style={label}>@{recipe?.user_id?.username}</Text>
          </View>
          <View style={divider}></View>
          <View style={wrapper}>
            <View style={reviewTab}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RatingCard rating={calculated / recipe?.feedbacks?.length} />
                <Text style={text}>
                  {recipe?.feedbacks?.length == 0
                    ? 0
                    : (calculated / recipe?.feedbacks?.length).toFixed(1)}
                </Text>
              </View>
              <View style={flexRow}>
                <Ionicons
                  name='timer-outline'
                  size={SIZES.xl}
                  color={COLORS.black}
                />
                <Text>{recipe?.cooking_time} minutes</Text>
              </View>
            </View>
          </View>
          <View style={bigDivider}></View>
          <View style={wrapper}>
            <Text style={textMedium}>Description</Text>
          </View>
          <View style={divider}></View>
          <View style={wrapper}>
            <Text style={text}>{recipe?.description}</Text>
          </View>
          <View style={bigDivider}></View>
          <View style={wrapper}>
            <Text style={textMedium}>Ingredients</Text>
          </View>
          <View style={divider}></View>
          <View style={wrapper}>
            {recipe?.ingredients?.map((item, index) => {
              return (
                <Text key={index} style={text}>
                  - {item.amount} {item.measurement}{' '}
                  {item.ingredients_id[0]?.name}
                  {item?.description == '' ? '' : ' (' + item.description + ')'}
                </Text>
              );
            })}
          </View>
          <View style={bigDivider}></View>
          <View style={wrapper}>
            <Text style={textMedium}>Procedure</Text>
          </View>
          <View style={divider}></View>
          <View style={wrapper}>
            {recipe?.procedure?.map((item, index) => {
              return (
                <Text key={index} style={[text, mb]}>
                  {index + 1}. {item}
                </Text>
              );
            })}
          </View>
          <View style={bigDivider}></View>
          <View style={wrapperAccent}>
            <Text style={textWhite}>Nutrition Facts</Text>
          </View>
          <View style={nutritionWrapper}>
            <View style={flexRowBetween}>
              <Text style={textSm}>AMMOUNT PER SERVING</Text>
              <Text style={textSm}>% DAILY VALUE</Text>
            </View>
            <View style={dividerBlue}></View>
            {nutritionFacts && (
              <View>
                <View style={flexRowBetweenInside}>
                  <Text style={text}>
                    <Text style={fwb}>Calories</Text>:{' '}
                    {customToFixed(nutritionFacts?.calories?.value)}
                  </Text>
                  <Text style={text}>
                    {nutritionFacts?.calories?.dailyValue}%
                  </Text>
                </View>
                <View style={dividerBlue}></View>

                <View style={flexRowBetweenInside}>
                  <Text style={text}>
                    <Text style={fwb}>Fat</Text>:{' '}
                    {customToFixed(nutritionFacts?.fat?.value)} g
                  </Text>
                  <Text style={text}>{nutritionFacts?.fat?.dailyValue}%</Text>
                </View>
                <View style={dividerBlue}></View>

                <View style={flexRowBetweenInside}>
                  <Text style={text}>
                    <Text style={fwb}>Carbs</Text>:{' '}
                    {customToFixed(nutritionFacts?.carbs?.value)} g
                  </Text>
                  <Text style={text}>{nutritionFacts?.carbs?.dailyValue}%</Text>
                </View>
                <View style={dividerBlue}></View>

                <View style={flexRowBetweenInside}>
                  <Text style={text}>
                    <Text style={fwb}>Fiber</Text>:{' '}
                    {customToFixed(nutritionFacts?.fiber?.value)} g
                  </Text>
                  <Text style={text}>{nutritionFacts?.fiber?.dailyValue}%</Text>
                </View>
                <View style={dividerBlue}></View>

                <View style={flexRowBetweenInside}>
                  <Text style={text}>
                    <Text style={fwb}>Protein</Text>:{' '}
                    {customToFixed(nutritionFacts?.protein?.value)} g
                  </Text>
                  <Text style={text}>
                    {nutritionFacts?.protein?.dailyValue}%
                  </Text>
                </View>
                <View style={dividerBlue}></View>

                <View style={flexRowBetweenInside}>
                  <Text style={text}>
                    <Text style={fwb}>Sugars</Text>:{' '}
                    {customToFixed(nutritionFacts?.sugars?.value)} g
                  </Text>
                  <Text style={text}></Text>
                </View>
                <View style={dividerBlue}></View>

                <View style={flexRowBetweenInside}>
                  <Text style={text}>
                    <Text style={fwb}>Sodium</Text>:{' '}
                    {customToFixed(nutritionFacts?.sodium?.value)} mg
                  </Text>
                  <Text style={text}>
                    {nutritionFacts?.sodium?.dailyValue}%
                  </Text>
                </View>
                <View style={dividerBlue}></View>
              </View>
            )}
          </View>
          <View style={bigDivider}></View>
          <View style={wrapper}>
            <Text style={textMedium}>Reviews ({reviews?.length || 0})</Text>
          </View>
          <View style={divider}></View>
          <View style={wrapper}>
            <Pressable
              style={[textMedium, { justifyContent: 'center' }]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={text}>
                <Feather name='edit' size={24} color='black' /> Write a Review
              </Text>
            </Pressable>
          </View>
          <View style={divider}></View>
          <ReviewCard
            reviewsToRender={reviewsToShow}
            onRemoveItem={onRemoveItem}
          />
          {reviews?.length == 0 ? (
            <Text style={[text, { textAlign: 'center', paddingVertical: 20 }]}>
              No Reviews
            </Text>
          ) : reviewsPerPage < reviews?.length ? (
            <Pressable
              onPress={handleShowMoreReviews}
              style={{ paddingVertical: 20 }}
            >
              <Text style={[text, { textAlign: 'center' }]}>
                {reviewsPerPage == 0 ? 'Show Reviews' : 'Show  More'}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleShowLessReviews}
              style={{ paddingVertical: 20 }}
            >
              <Text style={[text, { textAlign: 'center' }]}>Show Less</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <LoadingScreen />
      )}
      {modalVisible && (
        <ReviewModal
          visible={modalVisible}
          data={{ user_id: userInfo?._id, foodItem: recipe_id }}
          type='recipe'
          onClose={closeModal}
        />
      )}
    </ScrollView>
  );
};

export default Recipe;
