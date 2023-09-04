import { Fragment } from 'react';
import { Image, ScrollView, View, Text } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/recipe';
import { recipe as data } from '../../constants';

const Recipe = () => {
  // const [id] = useState(route.params.id);
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
    textBold,
    textMedium,
    textWhite,
    wrapper,
    wrapperAccent,
  } = styles;

  return (
    <ScrollView>
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
            <Text style={text}>AMMOUNT PER SERVING</Text>
            <Text style={text}>% DAILY VALUE</Text>
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
      </View>
    </ScrollView>
  );
};

export default Recipe;
