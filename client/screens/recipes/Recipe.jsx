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

const Recipe = ({ route }) => {
  // const [id] = useState(route.params.id);
  // useEffect(() => {
  //   console.log(id);
  // }, []);

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
  const user_id = 123;
  const id = 'daw231awe9';

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={container}>
        <Image src={data.image} style={imageStyle} />
        <View style={wrapper}>
          <Text style={textBold}>{data.name}</Text>
          <Text style={label}>@{data.username}</Text>
        </View>
        <View style={divider}></View>
        <View style={wrapper}>
          <View style={reviewTab}>
            <View>
              <Text>
                {[0, 1, 2, 3, 4].map((_, i) => {
                  <AntDesign
                    key={i}
                    name='star'
                    style={ratingsStyle}
                    color='orange'
                  />;
                })}
              </Text>
              <Text style={text}>{data.reviews} Reviews</Text>
            </View>
            <View style={flexRow}>
              <Ionicons
                name='timer-outline'
                size={SIZES.xl}
                color={COLORS.black}
              />
              <Text>{data.cookingTime} minutes</Text>
            </View>
          </View>
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
          <Text style={textMedium}>Ingredients</Text>
        </View>
        <View style={divider}></View>
        <View style={wrapper}>
          {data.ingredients.map((item) => {
            return (
              <Text key={item.id} style={text}>
                - {item.amount} {item.measurement} {item.ingredient}
                {item.description == '' ? '' : ' (' + item.description + ')'}
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
          {data.procedure.map((item, index) => {
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
            {data.facts.map((item, i) => {
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
        <View style={divider}></View>

        <View style={bigDivider}></View>
        <View style={wrapper}>
          <Text style={textMedium}>Recommended Recipe</Text>
        </View>
      </View>
      <View style={cardWrapper}>
        {DATA.map(({ id, name, username, ratings, image }) => (
          <View key={id} style={cardContentWrapper}>
            <FavoriteCard
              name={name}
              username={username}
              ratings={ratings}
              image={image}
              key={id}
            />
          </View>
        ))}
      </View>
      <ReviewModal
        visible={modalVisible}
        data={{ user_id, id }}
        type='recipe'
        onClose={closeModal}
      />
    </ScrollView>
  );
};

export default Recipe;
