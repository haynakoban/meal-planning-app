import { Image, View, Text, Pressable, Fragment } from 'react-native';
import styles from '../../styles/recipe';

const ReviewCard = ({ reviewsToRender }) => {
  const { mb, text, textMedium, wrapper, divider } = styles;

  return (
    <>
      {reviewsToRender.map((item, index) => (
        <View key={index}>
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
                <Image
                  style={{
                    width: 50,
                    objectFit: 'cover',
                    height: 50,
                  }}
                  src={item.image}
                />
                <View>
                  <Text style={text}>@{item.username}</Text>
                  <Text style={textMedium}>★★★★★</Text>
                </View>
              </Pressable>
              <Text style={text}>{item.date}</Text>
            </View>
            <View>
              <Text style={text}>{item.comment}</Text>
            </View>
          </View>

          <View style={divider}></View>
        </View>
      ))}
    </>
  );
};

export default ReviewCard;
