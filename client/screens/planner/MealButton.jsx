import { Text, View, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const MealButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Search Recipe')}
      style={{ width: '100%' }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: COLORS.primary,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Ionicons name='add-circle-outline' size={24} color='black' />
        <Text style={{ fontFamily: FONT.regular }}>Add Recipe</Text>
      </View>
    </Pressable>
  );
};

export default MealButton;
