import { View } from 'react-native';
import { Text, Modal, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONT, SIZES } from '../../constants';

const CreateMealRecipeModal = ({ visible, hideModal }) => {
  const navigation = useNavigation();

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      style={{ justifyContent: 'flex-end' }}
    >
      <View
        style={{
          backgroundColor: 'white',
          height: 200,
          padding: 16,
          borderTopLeftRadius: 999,
          borderTopRightRadius: 999,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: SIZES.md,
            paddingBottom: SIZES.xl,
          }}
        >
          Craft Your Signature Dish
        </Text>

        <Button
          mode='outlined'
          icon={() => <Ionicons name='book-outline' size={24} color='black' />}
          style={{ paddingHorizontal: 8, paddingVertical: 4 }}
          labelStyle={{
            fontFamily: FONT.medium,
            fontSize: SIZES.md,
            paddingLeft: 10,
          }}
          contentStyle={{ justifyContent: 'flex-start' }}
          textColor={COLORS.black}
          onPress={() => navigation.navigate('Recipe Form')}
        >
          Create a recipe
        </Button>
        <View style={{ marginVertical: 8 }} />
        <Button
          mode='outlined'
          icon={() => (
            <Ionicons name='restaurant-outline' size={24} color='black' />
          )}
          style={{ paddingHorizontal: 8, paddingVertical: 4 }}
          labelStyle={{
            fontFamily: FONT.medium,
            fontSize: SIZES.md,
            paddingLeft: 10,
          }}
          contentStyle={{ justifyContent: 'flex-start' }}
          textColor={COLORS.black}
          onPress={() => navigation.navigate('Meal Form')}
        >
          Create a meal
        </Button>
      </View>
    </Modal>
  );
};
export default CreateMealRecipeModal;
