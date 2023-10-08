import { Fragment } from 'react';
import { View } from 'react-native';
import { Text, Modal, Button, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/mealRecipeModal';

const CreateMealRecipeModal = () => {
  const {
    borderRadius,
    container,
    modal,
    modalButtonContent,
    modalButtonLabel,
    modalHeader,
    modalWrapper,
    mv,
  } = styles;
  const navigation = useNavigation();

  return (
    <Fragment>
      <View style={container}>
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
        style={modal}
      >
        <View style={modalWrapper}>
          <Text style={[modalHeader, { color: COLORS.black }]}>
            Craft Your Signature Dish
          </Text>

          <Button
            mode='outlined'
            icon={() => (
              <Ionicons
                name='book-outline'
                size={SIZES.xl}
                color={COLORS.black}
              />
            )}
            style={borderRadius}
            labelStyle={modalButtonLabel}
            contentStyle={modalButtonContent}
            textColor={COLORS.black}
            onPress={() => navigation.navigate('Recipe Form')}
          >
            Create a recipe
          </Button>
          <View style={mv} />
          <Button
            mode='outlined'
            icon={() => (
              <Ionicons
                name='restaurant-outline'
                size={SIZES.xl}
                color={COLORS.black}
              />
            )}
            style={borderRadius}
            labelStyle={modalButtonLabel}
            contentStyle={modalButtonContent}
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
