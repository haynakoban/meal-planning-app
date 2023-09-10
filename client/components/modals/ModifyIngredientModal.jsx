import { useState, useEffect } from 'react';
import { Text, TextInput, View, Pressable, Modal } from 'react-native';

import { COLORS, SIZES, CT, privacyData, FONT } from '../../constants';
import styles from '../../styles/recipeForm';
import useIngredientsStore from '../../store/useIngredientsStore';

const ModifyIngredientModal = ({ visible, data, onClose }) => {
  return (
    <Modal
      animationType='slide' // You can change this to 'fade', 'slide', or 'none'
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
            style={[
              styles.labels,
              { textAlign: 'center', marginTop: 10, marginBottom: 25 },
            ]}
          >
            Edit Ingrediet
          </Text>
          <Text
            style={[
              styles.mb,
              {
                textAlign: 'left',
                backgroundColor: COLORS.primary,
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 999,
                fontSize: SIZES.sm,
                fontFamily: FONT.medium,
              },
            ]}
          >
            {data.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ width: '48%' }}>
              <Text style={[styles.addLabel, styles.mb]}>Ammount</Text>
              <TextInput
                placeholder='Ammount'
                value=''
                // onChangeText={(text) => setForm({ ...form, name: text })}
                style={[
                  styles.mb,
                  styles.borderWidth,
                  {
                    padding: 15,
                    borderRadius: 999,
                    fontSize: SIZES.sm,
                    fontFamily: FONT.regular,
                  },
                ]}
              />
            </View>
            <View style={{ width: '48%' }}>
              <Text style={[styles.addLabel, styles.mb]}>Measurement</Text>
              <TextInput
                placeholder='Measurement'
                value=''
                // onChangeText={(text) => setForm({ ...form, name: text })}
                style={[
                  styles.mb,
                  styles.borderWidth,
                  {
                    padding: 15,
                    borderRadius: 999,
                    fontSize: SIZES.sm,
                    fontFamily: FONT.regular,
                  },
                ]}
              />
            </View>
          </View>
          <Text style={[styles.addLabel, styles.mb]}>Description</Text>
          <TextInput
            placeholder='Description'
            value=''
            // onChangeText={(text) => setForm({ ...form, name: text })}
            style={[
              styles.textarea,
              styles.borderWidth,
              { padding: 15, borderRadius: 8 },
            ]}
            multiline={true}
            numberOfLines={10}
          />
          <Pressable
            style={{
              padding: 15,
              backgroundColor: COLORS.danger,
              borderRadius: 999,
              marginTop: SIZES.lg,
            }}
            onPress={() => onClose(false)}
          >
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: FONT.medium,
                fontSize: SIZES.md,
              }}
            >
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModifyIngredientModal;
