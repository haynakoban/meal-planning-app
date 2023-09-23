import { useRef } from 'react';
import { Text, View, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const MealButton = ({ type, label }) => {
  const navigation = useNavigation();

  const pressableRef = useRef(null);

  const handlePressIn = () => {
    pressableRef.current.setNativeProps({
      style: { backgroundColor: COLORS.gray2 },
    });
  };

  const handlePressOut = () => {
    pressableRef.current.setNativeProps({
      style: { backgroundColor: COLORS.secondary },
    });
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('Search Recipe', { type })}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width: '24%' }}
    >
      <View
        ref={pressableRef}
        style={{
          alignItems: 'center',
          backgroundColor: COLORS.secondary,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Ionicons name='add-circle-outline' size={24} color='black' />
        <Text>{label}</Text>
      </View>
    </Pressable>
  );
};

export default MealButton;
