import { Fragment, useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { COLORS, SIZES, calculateCalorie, API } from '../../constants';
import styles from '../../styles/recipe';
import axios from '../../lib/axiosConfig';
import ReviewCard from '../../components/reviews/ReviewCard';
import ReviewModal from '../../components/modals/ReviewModal';
import RatingCard from '../../components/ratings/RatingCard';
import LoadingScreen from '../loading/LoadingScreen';

import useRecipeStore from '../../store/useRecipeStore';
import useReviewsStore from '../../store/useReviewStore';
import useAuthStore from '../../store/useAuthStore';

const SingleRecipeScreen = ({ route, navigation }) => {
  const recipe_id = route.params.id;
  const { userInfo, setUserInfo, reFetch } = useAuthStore();
  const { recipe, singleRecipes } = useRecipeStore();
  const { reviews, fetchReviewsData, removeReview } = useReviewsStore();

  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [nutritionFacts, setNutritionFacts] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState([]);
  const [reviewsPerPage, setReviewsPerPage] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      if (recipe_id) {
        singleRecipes(recipe_id);
        fetchReviewsData(recipe_id);
        const fav = userInfo?.favorites.includes(recipe_id) || false;
        fav ? setIsFavorite(true) : setIsFavorite(false);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }, [recipe_id])
  );

  useFocusEffect(
    useCallback(() => {
      if (recipe) {
        fetchNutrition();
      }
    }, [recipe])
  );

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

  const closeModal = () => {
    handleShowLessReviews();
    setModalVisible(false);
  };

  const onRemoveItem = async () => {
    await axios.delete(`feedbacks/${recipe_id}/${userInfo?._id}`);
    const { reviews } = useReviewsStore.getState();
    const myReview = reviews?.filter((_) => _.user_id._id === userInfo?._id);
    removeReview(userInfo?._id, recipe_id, parseInt(myReview[0]?.rating));
    handleShowLessReviews();
  };

  const handleShowMoreReviews = () => {
    setReviewsPerPage((prev) => prev + 4);
    loopThroughReviews(reviewsPerPage + 4);
  };

  const handleShowLessReviews = () => {
    setReviewsPerPage(0);
    loopThroughReviews(0);
  };

  const loopThroughReviews = (count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
      if (reviews[i] !== undefined) {
        arr.push(reviews[i]);
      }
    }
    setReviewsToShow(arr);
  };

  const handleSetFavorite = async () => {
    const type = isFavorite ? 'delete' : 'add';
    const data = {
      id: userInfo._id,
      itemId: recipe_id,
      type,
    };
    await axios.post(`users/manage`, data);
    setIsFavorite(!isFavorite);
    reFetch(recipe_id);
    setUserInfo(userInfo?._id);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='always'
    >
      {!loading ? (
        <Fragment>
          <View style={styles.container}>
            <Image
              source={
                recipe?.image
                  ? { uri: recipe?.image }
                  : require('../../assets/images/image-not-found.jpg')
              }
              style={styles.imageStyle}
            />

            <View style={styles.wrapper}>
              <Text
                style={styles.textBold}
                numberOfLines={3}
                ellipsizeMode='tail'
              >
                {recipe?.name}
              </Text>
              <View style={styles.authorContainer}>
                <View style={styles.authorWrapper}>
                  <Text style={styles.authorText}>Recipe by:</Text>

                  <TouchableOpacity
                    style={styles.authorButton}
                    onPress={() => {
                      userInfo?._id === recipe?.user_id?._id
                        ? navigation.navigate('Profile')
                        : navigation.navigate('OtherUserProfile', {
                            id: recipe?.user_id?._id,
                          });
                    }}
                  >
                    <Text
                      style={styles.authorButtonText}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {recipe?.user_id?.fullname}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Pressable
                  style={styles.flexRow}
                  onPress={() => handleSetFavorite()}
                >
                  {isFavorite ? (
                    <Fragment>
                      <Ionicons
                        name='ios-bookmark-sharp'
                        size={SIZES.lg}
                        color={COLORS.danger}
                      />
                      <Text style={styles.text}>Saved</Text>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Ionicons
                        name='ios-bookmark-outline'
                        size={SIZES.lg}
                        color={COLORS.black}
                      />
                      <Text style={styles.text}>Save</Text>
                    </Fragment>
                  )}
                </Pressable>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.wrapper}>
              <View style={styles.reviewTab}>
                <View style={styles.ratingsWrapper}>
                  <RatingCard rating={recipe?.ratings} />
                  <Text style={styles.text}>
                    ({(recipe?.ratings).toFixed(1) || 0})
                  </Text>
                </View>
                <View style={styles.flexRow}>
                  <Ionicons
                    name='timer-outline'
                    size={SIZES.xl}
                    color={COLORS.black}
                  />
                  <Text style={styles.text}>
                    {recipe?.cooking_time} minutes
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.bigDivider} />
            <View style={styles.wrapper}>
              <Text style={styles.textMedium}>Description</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.wrapper}>
              <Text style={styles.text}>{recipe?.description}</Text>
            </View>

            <View style={styles.bigDivider} />
            <View style={styles.wrapper}>
              <Text style={styles.textMedium}>Ingredients</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.wrapper}>
              {recipe?.ingredients?.map((_, index) => {
                return (
                  <View key={index} style={styles.ingredientsWrapper}>
                    <Text style={[styles.bullet, styles.text]}>{`\u25CF`}</Text>
                    <Text style={styles.text}>
                      {_.amount} {_.measurement} {_.ingredients_id[0]?.name}
                      {_?.description == '' ? '' : ' (' + _.description + ')'}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.bigDivider} />
            <View style={styles.wrapper}>
              <Text style={styles.textMedium}>Procedure</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.wrapper}>
              {recipe?.procedure?.map((text, index) => {
                return (
                  <View key={index} style={styles.ingredientsWrapper}>
                    <Text style={[styles.bullet, styles.text]}>{`\u25CF`}</Text>
                    <Text style={[styles.text, styles.mb]}>{text}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.bigDivider} />
            <View style={styles.wrapperAccent}>
              <Text style={styles.textWhite}>Nutrition Facts</Text>
            </View>
            <View style={styles.nutritionWrapper}>
              <View style={styles.flexRowBetween}>
                <Text style={styles.textSm}>AMMOUNT PER SERVING</Text>
                <Text style={styles.textSm}>% DAILY VALUE</Text>
              </View>
              <View style={styles.dividerBlue} />
              <View>
                {Object.keys(nutritionFacts).map((key) => {
                  const nutrient = nutritionFacts[key];
                  return (
                    <NutritionFactsData
                      name={key}
                      value={nutrient.value}
                      dailyValue={nutrient.dailyValue}
                      key={key}
                    />
                  );
                })}
              </View>
            </View>

            <View style={styles.bigDivider} />
            <View style={styles.wrapper}>
              <Text style={styles.textMedium}>
                Reviews ({reviews?.length || 0})
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.wrapper}>
              <Pressable
                style={[styles.textMedium, { justifyContent: 'center' }]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.text}>
                  <Feather name='edit' size={24} color='black' /> Write a Review
                </Text>
              </Pressable>
            </View>
            <View style={styles.divider} />
            <ReviewCard
              reviewsToRender={reviewsToShow}
              onRemoveItem={onRemoveItem}
            />

            {reviews?.length == 0 ? (
              <Text
                style={[
                  styles.text,
                  { textAlign: 'center', paddingVertical: 20 },
                ]}
              >
                No Reviews
              </Text>
            ) : reviewsPerPage < reviews?.length ? (
              <Pressable
                onPress={handleShowMoreReviews}
                style={{ paddingVertical: 20 }}
              >
                <Text style={[styles.text, { textAlign: 'center' }]}>
                  {reviewsPerPage == 0 ? 'Show Reviews' : 'Show  More'}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleShowLessReviews}
                style={{ paddingVertical: 20 }}
              >
                <Text style={[styles.text, { textAlign: 'center' }]}>
                  Show Less
                </Text>
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
        </Fragment>
      ) : (
        <View style={{ paddingTop: 8 }}>
          <LoadingScreen />
        </View>
      )}
    </ScrollView>
  );
};

const NutritionFactsData = ({ name, value, dailyValue }) => {
  const customToFixed = (number) => {
    const decimalPlaces = (number?.toString().split('.')[1] || []).length;
    return decimalPlaces > 3 ? number?.toFixed(2) : number;
  };

  return (
    <Fragment>
      <View style={styles.flexRowBetweenInside}>
        <Text style={styles.text}>
          <Text style={[styles.fwb, styles.tc]}>{name}</Text>:{' '}
          {customToFixed(value)}
        </Text>
        <Text style={styles.text}>{dailyValue}%</Text>
      </View>
      <View style={styles.dividerBlue} />
    </Fragment>
  );
};
export default SingleRecipeScreen;
