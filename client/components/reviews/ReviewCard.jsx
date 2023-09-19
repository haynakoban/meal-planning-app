import { Image, View, Text, Pressable, Fragment } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../../styles/recipe';
import { COLORS } from '../../constants';
import RatingCard from '../../components/ratings/RatingCard';
import useAuthStore from '../../store/useAuthStore';

const ReviewCard = ({ reviewsToRender }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { mb, text, wrapper, divider } = styles;

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
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    const formattedDate = `${month} ${day}, ${year}`;
    const formattedTime = `${hours}:${minutes} ${period}`;

    return formattedDate + ' ' + formattedTime;
  }

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
                <FontAwesome
                  name='user-circle'
                  size={50}
                  color={COLORS.gray2}
                />
                <View>
                  <Text style={text}>@{item?.user_id?.username}</Text>
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
              <Text>{item?.user_id?._id == userInfo._id ? 'Delete' : ''}</Text>
            </View>
          </View>

          <View style={divider}></View>
        </View>
      ))}
    </>
  );
};

export default ReviewCard;
