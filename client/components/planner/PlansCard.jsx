import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import styles from '../../styles/planner';

const PlansCard = ({ name, username, image, description }) => {
  const { card, cardCover, title, descriptionStyle, usernameStyle, mb } =
    styles;
  return (
    <Card style={card}>
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
  );
};

export default PlansCard;
