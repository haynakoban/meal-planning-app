import { Fragment } from 'react';
import { Image, ScrollView, View, Text, Pressable } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/recipe';
import styles2 from '../../styles/homeRecipes';
import { recipe as data, reviews, DATA } from '../../constants';

import FavoriteCard from '../../components/favorites/FavoriteCard';
import ReviewCard from '../../components/reviews/ReviewCard';

import { useState, useEffect } from 'react';
import ReviewModal from '../../components/modals/ReviewModal';
import useRecipeStore from '../../store/useRecipeStore';
import NotFound from '../../assets/images/image-not-found.jpg';
import RatingCard from '../../components/ratings/RatingCard';
import useAuthStore from '../../store/useAuthStore';

const Recipe = ({ route }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const recipe_id = route.params.id;
  const recipe = useRecipeStore((state) => state.recipe);
  const singleRecipe = useRecipeStore((state) => state.singleRecipes);

  useEffect(() => {
    singleRecipe(recipe_id);
  }, []);

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
    ratingsStyle,
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
    <ScrollView showsVerticalScrollIndicator={false}>
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
            <View>
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
              <Text style={text}>{recipe?.feedbacks?.length} Reviews</Text>
            </View>
            <View style={flexRow}>
              <Ionicons
                name='timer-outline'
                size={SIZES.xl}
                color={COLORS.black}
              />
              <Text>{recipe.cooking_time} minutes</Text>
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
                - {item.amount} {item.measurement} {item.ingredient}
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
          <View>
            {data?.facts?.map((item, i) => {
              return (
                <Fragment key={i}>
                  <View style={flexRowBetweenInside}>
                    <Text style={text}>
                      <Text style={fwb}>{item.name}</Text>: {item.value}
                      {item.measurement}
                    </Text>
                    <Text style={text}>{item.daily}%</Text>
                  </View>
                  <View style={dividerBlue}></View>
                </Fragment>
              );
            })}
          </View>
        </View>
        <View style={bigDivider}></View>
        <View style={wrapper}>
          <Text style={textMedium}>Reviews</Text>
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
        <Pressable
          onPress={handleShowMoreReviews}
          style={{ paddingVertical: 20 }}
        >
          <Text style={[text, { textAlign: 'center' }]}>Show more</Text>
        </Pressable>
      </View>
      <ReviewModal
        visible={modalVisible}
        data={{ user_id: userInfo?._id, recipe_id }}
        type='recipe'
        onClose={closeModal}
      />
    </ScrollView>
  );
};

export default Recipe;
