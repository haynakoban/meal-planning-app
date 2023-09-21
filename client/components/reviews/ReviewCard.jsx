import { PanResponder, Animated, View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../../styles/recipe';
import { COLORS, FONT, SIZES } from '../../constants';
import RatingCard from '../../components/ratings/RatingCard';
import useAuthStore from '../../store/useAuthStore';
import React, { useRef } from 'react';
import useRecipeStore from '../../store/useRecipeStore';

const ReviewCard = ({ reviewsToRender, onRemoveItem }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { mb, text, wrapper, divider } = styles;

  const pan = useRef(new Animated.ValueXY()).current;
  const gestureProgress = useRef(new Animated.Value(0)).current;
  const { fetchRecipesData } = useRecipeStore();

  function removeItem() {
    fetchRecipesData();
    onRemoveItem();
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        gestureProgress.setValue(gesture.dx);

        Animated.event(
          [
            null,
            {
              dx: pan.x,
              dy: pan.y,
            },
          ],
          { useNativeDriver: false }
        )(e, gesture);
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx > 120) {
          removeItem(userInfo?._id);
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start(() => gestureProgress.setValue(0));
      },
    })
  ).current;

  const backgroundColor = gestureProgress.interpolate({
    inputRange: [0, 120],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 96, 92, 1)'],
  });

  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month = months[dateObject.getMonth()];
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  }

  return (
    <>
      {reviewsToRender.map((item, index) => (
        <View key={index}>
          {item?.user_id?._id == userInfo._id ? (
            <Animated.View
              style={{
                transform: [{ translateX: pan.x }],
                backgroundColor,
              }}
              {...panResponder.panHandlers}
            >
              <View style={wrapper}>
                <View
                  style={[
                    mb,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  ]}
                >
                  <Pressable
                    style={{ flexDirection: 'row', gap: 10 }}
                    onPress={() => console.log('visit profile')}
                  >
                    <FontAwesome
                      name='user-circle'
                      size={50}
                      color={COLORS.gray2}
                    />
                    <View>
                      <Text style={text}>{item?.user_id?.fullname}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <RatingCard rating={item?.rating} />
                        <Text style={text}>({item?.rating})</Text>
                      </View>
                    </View>
                  </Pressable>
                  <Text style={text}>{formatDate(item?.updatedAt)}</Text>
                </View>
                <View>
                  <Text style={text}>{item?.comment}</Text>
                  <Text
                    style={{
                      fontFamily: FONT.light,
                      fontSize: SIZES.sm,
                      marginTop: 5,
                      textAlign: 'right',
                    }}
                  >
                    Slide to right to delete...
                  </Text>
                </View>
              </View>
            </Animated.View>
          ) : (
            <View style={wrapper}>
              <View
                style={[
                  mb,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}
              >
                <Pressable
                  style={{ flexDirection: 'row', gap: 10 }}
                  onPress={() => console.log('visit profile')}
                >
                  <FontAwesome
                    name='user-circle'
                    size={50}
                    color={COLORS.gray2}
                  />
                  <View>
                    <Text style={text}>{item?.user_id?.fullname}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <RatingCard rating={item?.rating} />
                      <Text style={text}>({item?.rating})</Text>
                    </View>
                  </View>
                </Pressable>
                <Text style={text}>{formatDate(item?.updatedAt)}</Text>
              </View>
              <View>
                <Text style={text}>{item?.comment}</Text>
              </View>
            </View>
          )}

          <View style={divider}></View>
        </View>
      ))}
    </>
  );
};

export default ReviewCard;
