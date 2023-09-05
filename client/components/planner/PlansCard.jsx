import { Text, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import styles from '../../styles/planner';
import { useNavigation } from '@react-navigation/native';

const PlansCard = ({ name, username, image, description }) => {
  const navigation = useNavigation();
  const { card, cardCover, title, descriptionStyle, usernameStyle, mb } =
    styles;
  return (
    <Pressable
      onPress={() => navigation.navigate('Meal', { id: 1 })}
      style={card}
    >
      <Card>
        <Card.Cover source={{ uri: image }} style={[mb, cardCover]} />
        <Card.Content>
          <Text variant='titleLarge' style={title}>
            {name}
          </Text>
          <Text variant='bodyMedium' style={descriptionStyle}>
            {description}
          </Text>
          <Text variant='bodyMedium' style={usernameStyle}>
            {username}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default PlansCard;
