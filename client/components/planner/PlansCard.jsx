import { Text, Pressable, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/planner';
import { COLORS, formatDate } from '../../constants';

const PlansCard = ({
  name,
  image,
  type = 'breakfast',
  startDate = null,
  endDate = null,
  expired = false,
  id,
}) => {
  const navigation = useNavigation();
  const selectedDate = formatDate(startDate, endDate);

  return (
    <Pressable
      onPress={() => navigation.navigate('Meal', { id })}
      style={styles.mealButton}
    >
      <View style={styles.mealContainer}>
        <Image
          source={
            image
              ? { uri: image }
              : require('../../assets/images/image-not-found.jpg')
          }
          style={styles.mealImage}
        />
        <View style={styles.mealContent}>
          <Text
            variant='titleLarge'
            numberOfLines={2}
            ellipsizeMode='tail'
            style={styles.mealName}
          >
            {name}
          </Text>
          <Text variant='bodyMedium' style={styles.mealTypes}>
            {type}
          </Text>
          {startDate != null && endDate != null && (
            <Text variant='bodyMedium' style={styles.mealTypes}>
              {selectedDate.start} - {selectedDate.end}
            </Text>
          )}

          {expired && (
            <Text
              variant='bodyMedium'
              style={[styles.mealTypes, { color: COLORS.danger }]}
            >
              Meal Plan Ended
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default PlansCard;
