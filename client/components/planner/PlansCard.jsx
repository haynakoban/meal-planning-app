import { Text, Pressable, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/planner';

const PlansCard = ({ name, image, type = 'breakfast', id }) => {
  const navigation = useNavigation();
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
        </View>
      </View>
    </Pressable>
  );
};

export default PlansCard;
