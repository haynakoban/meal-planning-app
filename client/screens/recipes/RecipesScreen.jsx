import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const RecipesScreen = () => {
  const route = useRoute();
  const { title } = route.params;

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
export default RecipesScreen;
