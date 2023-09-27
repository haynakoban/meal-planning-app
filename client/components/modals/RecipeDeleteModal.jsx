import { useState, useEffect } from 'react';
import { Text, TextInput, View, Pressable, Modal } from 'react-native';
import { Rating } from 'react-native-ratings';

import { COLORS, SIZES, FONT } from '../../constants';
import styles from '../../styles/recipeForm';
import useReviewsStore from '../../store/useReviewStore';
import axios from '../../lib/axiosConfig';
import { useNavigation } from '@react-navigation/native';
import useRecipeStore from '../../store/useRecipeStore';
import useAuthStore from '../../store/useAuthStore';

const RecipeDeleteModal = ({ visible, id, onClose }) => {
  const navigation = useNavigation();

  const userInfo = useAuthStore((state) => state.userInfo);
  const clearRecipe = useRecipeStore((state) => state.clearRecipe);
  const presonalRecipes = useRecipeStore((state) => state.presonalRecipes);

  const deleteRecipe = async (id) => {
    try {
      const result = axios.delete(`recipes/${id}`);
      clearRecipe();
      presonalRecipes(userInfo?._id);
      onClose(false);
    } catch (error) {
      console.error('Error deleting recipe: ', error);
    }
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          backgroundColor: 'rgba(0,0,0, .5)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: SIZES.lg,
            borderTopRightRadius: SIZES.lg,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontFamily: FONT.semiBold,
              fontSize: SIZES.xl,
            }}
          >
            Delete
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              marginBottom: 25,
              fontFamily: FONT.regular,
              fontSize: SIZES.lg,
            }}
          >
            Are you sure you want to delete this item?
          </Text>
          <Pressable
            style={{
              padding: 15,
              backgroundColor: COLORS.danger,
              borderRadius: 999,
              marginTop: SIZES.lg,
            }}
            onPress={() => deleteRecipe(id)}
          >
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: FONT.medium,
                fontSize: SIZES.md,
              }}
            >
              Delete
            </Text>
          </Pressable>
          <Pressable
            style={{
              padding: 15,
              backgroundColor: COLORS.secondary,
              borderRadius: 999,
              marginTop: SIZES.sm,
            }}
            onPress={() => onClose(false)}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: FONT.medium,
                fontSize: SIZES.md,
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default RecipeDeleteModal;
