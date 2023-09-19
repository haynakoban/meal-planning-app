import { Image, ScrollView, View, Text, Pressable } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { COLORS, SIZES } from '../../constants';
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

const Recipe = ({ route }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const recipe_id = route.params.id;
  const recipe = useRecipeStore((state) => state.recipe);
  const singleRecipe = useRecipeStore((state) => state.singleRecipes);
  const [nutritionFacts, setNutritionFacts] = useState({});
  const reviews = useReviewsStore((state) => state.reviews);
  const fetchReviewsData = useReviewsStore((state) => state.fetchReviewsData);

  useEffect(() => {
    singleRecipe(recipe_id);
    fetchReviewsData(recipe_id);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let query = '';
      for (let i = 0; i < recipe?.ingredients?.length; i++) {
        query +=
          recipe?.ingredients[i].amount +
          recipe?.ingredients[i].measurement +
          ' ' +
          recipe?.ingredients[i].ingredients_id[i]?.name +
          ' ' +
          recipe?.ingredients[i].description +
          ' ';
      }
      const fetchData = async () => {
        try {
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
      fetchData();
    }, 500);
  }, [recipe]);

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

  const closeModal = () => {
    setModalVisible(false);
  };

  let calculated = 0;
  for (let i = 0; i < recipe?.feedbacks?.length; i++) {
    calculated += parseInt(recipe?.feedbacks[i].rating);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='always'
    >
      <View style={container}>
        {/* {recipe?.image ? (
          <Image src={recipe?.image} style={imageStyle} />
        ) : (
        )} */}
        <Image source={NotFound} style={imageStyle} />
        <View style={wrapper}>
          <Text style={textBold}>{recipe?.name}</Text>
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
                {(calculated / recipe?.feedbacks?.length).toFixed(1)}
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
          <Text style={text}>{recipe.description}</Text>
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
                {item.ingredients_id[index]?.name}
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
                  {nutritionFacts?.calories?.value}
                </Text>
                <Text style={text}>
                  {nutritionFacts?.calories?.dailyValue}%
                </Text>
              </View>
              <View style={dividerBlue}></View>

              <View style={flexRowBetweenInside}>
                <Text style={text}>
                  <Text style={fwb}>Fat</Text>: {nutritionFacts?.fat?.value}g
                </Text>
                <Text style={text}>{nutritionFacts?.fat?.dailyValue}%</Text>
              </View>
              <View style={dividerBlue}></View>

              <View style={flexRowBetweenInside}>
                <Text style={text}>
                  <Text style={fwb}>Carbs</Text>: {nutritionFacts?.carbs?.value}
                  g
                </Text>
                <Text style={text}>{nutritionFacts?.carbs?.dailyValue}%</Text>
              </View>
              <View style={dividerBlue}></View>

              <View style={flexRowBetweenInside}>
                <Text style={text}>
                  <Text style={fwb}>Fiber</Text>: {nutritionFacts?.fiber?.value}
                  g
                </Text>
                <Text style={text}>{nutritionFacts?.fiber?.dailyValue}%</Text>
              </View>
              <View style={dividerBlue}></View>

              <View style={flexRowBetweenInside}>
                <Text style={text}>
                  <Text style={fwb}>Protein</Text>:{' '}
                  {nutritionFacts?.protein?.value}g
                </Text>
                <Text style={text}>{nutritionFacts?.protein?.dailyValue}%</Text>
              </View>
              <View style={dividerBlue}></View>

              <View style={flexRowBetweenInside}>
                <Text style={text}>
                  <Text style={fwb}>Sugars</Text>:{' '}
                  {nutritionFacts?.sugars?.value}g
                </Text>
                <Text style={text}></Text>
              </View>
              <View style={dividerBlue}></View>

              <View style={flexRowBetweenInside}>
                <Text style={text}>
                  <Text style={fwb}>Sodium</Text>:{' '}
                  {nutritionFacts?.sodium?.value}
                  mg
                </Text>
                <Text style={text}>{nutritionFacts?.sodium?.dailyValue}%</Text>
              </View>
              <View style={dividerBlue}></View>
            </View>
          )}
        </View>
        <View style={bigDivider}></View>
        <View style={wrapper}>
          <Text style={textMedium}>
            Reviews ({recipe?.feedbacks?.length || 0})
          </Text>
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
        <ReviewCard reviewsToRender={reviewsToShow} />
        {reviewsPerPage < reviews?.length ? (
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
