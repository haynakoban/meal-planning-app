import { Fragment } from 'react';
import { View } from 'react-native';
import { Text, Modal, Button, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONT, SIZES } from '../../constants';

const CreateMealRecipeModal = () => {
  const navigation = useNavigation();

  return (
    <Fragment>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Avatar.Image
          size={250}
          style={{ backgroundColor: 'transparent' }}
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <Modal
        visible={true}
        onDismiss={() => {
          navigation.goBack();
        }}
        style={{ justifyContent: 'flex-end' }}
      >
        <View
          style={{
            backgroundColor: 'white',
            height: 200,
            padding: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
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
            icon={() => (
              <Ionicons name='book-outline' size={24} color='black' />
            )}
            style={{
              borderRadius: 999,
            }}
            labelStyle={{
              fontFamily: FONT.medium,
              fontSize: SIZES.md,
              paddingLeft: 10,
            }}
            contentStyle={{
              justifyContent: 'flex-start',
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
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
            style={{
              borderRadius: 999,
            }}
            labelStyle={{
              fontFamily: FONT.medium,
              fontSize: SIZES.md,
              paddingLeft: 10,
            }}
            contentStyle={{
              justifyContent: 'flex-start',
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
            textColor={COLORS.black}
            onPress={() => navigation.navigate('Meal Form')}
          >
            Create a meal
          </Button>
        </View>
      </Modal>
    </Fragment>
  );
};
export default CreateMealRecipeModal;
