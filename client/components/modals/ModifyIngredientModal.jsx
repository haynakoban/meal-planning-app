import { useState, useEffect, useCallback } from 'react';
import { Text, TextInput, View, Pressable, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { COLORS, SIZES, FONT } from '../../constants';
import styles from '../../styles/recipeForm';
import useIngredientsStore from '../../store/useIngredientsStore';
import { measurement } from '../../constants';
import styles2 from '../../styles/recipeForm';

const ModifyIngredientModal = ({ visible, data, onClose }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(measurement);

  function convertMixedNumberToDecimal(input) {
    const cleanInput = input.replace(/[^\d\s/]/g, ''); // Remove all non-digit, non-space, non-slash characters
    return cleanInput;
  }

  const useIngredientsStoreSelected = useIngredientsStore((state) =>
    state.filteredData(data.id)
  );

  const filteredData = useIngredientsStoreSelected(
    useIngredientsStore.getState()
  );

  const setSelectedIngredients = useIngredientsStore(
    (state) => state.setSelectedIngredients
  );

  const [err, setErr] = useState({});

  const [ingredientInfo, setIngredientInfo] = useState({});

  useEffect(() => {
    setIngredientInfo({ ...ingredientInfo, measurement: value });
  }, [value]);

  useEffect(() => {
    setErr({
      amount: false,
      measurement: false,
    });

    setTimeout(() => {
      if (filteredData.length > 0) {
        setIngredientInfo({
          ingredients_id: data.id,
          amount: filteredData[0]?.amount,
          measurement: filteredData[0]?.measurement,
          description: filteredData[0]?.description,
        });

        setValue(filteredData[0]?.measurement);
      } else {
        setIngredientInfo({
          ingredients_id: data.id,
          amount: null,
          measurement: '',
          description: '',
        });
      }
    }, Math.floor(Math.random() * 1000));
  }, []);

  const handleSave = () => {
    let converted = convertMixedNumberToDecimal(ingredientInfo?.amount || '');
    let isAmountValid =
      ingredientInfo.amount !== null &&
      ingredientInfo.amount !== '' &&
      converted.length !== 0;
    let isMeasurementValid =
      ingredientInfo.measurement !== null && ingredientInfo.measurement !== '';

    if (!isAmountValid || !isMeasurementValid) {
      setErr({
        amount: !isAmountValid,
        measurement: !isMeasurementValid,
      });
      return;
    }

    setSelectedIngredients({
      ...ingredientInfo,
      amount: converted,
      ingredients_id: data.id,
    });
    onClose(false);
    setIngredientInfo({});
  };

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
            Edit Ingredient
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
              <Text style={[styles.addLabel, styles.mb]}>Amount/Quantity</Text>
              <TextInput
                placeholder='Amount/Quantity'
                value={ingredientInfo.amount}
                onChangeText={(text) =>
                  setIngredientInfo({
                    ...ingredientInfo,
                    amount: text,
                  })
                }
                style={[
                  styles.borderWidth,
                  {
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 999,
                    fontSize: SIZES.sm,
                    fontFamily: FONT.regular,
                  },
                ]}
              />
              {err.amount && (
                <Text
                  style={{
                    color: COLORS.danger,
                    fontFamily: FONT.regular,
                    fontSize: SIZES.sm,
                    textAlign: 'center',
                  }}
                >
                  This field is requried.
                </Text>
              )}
            </View>
            <View style={{ width: '48%' }}>
              <Text style={[styles.addLabel, styles.mb]}>Measurement</Text>
              <DropDownPicker
                placeholderStyle={styles2.ddPlaceholder}
                placeholder='Select measurement'
                searchPlaceholder='Search measurement'
                searchable={true}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                showBadgeDot={false}
                style={[
                  styles.borderWidth,
                  styles2.noBG,
                  {
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 999,
                    fontSize: SIZES.sm,
                    fontFamily: FONT.regular,
                  },
                ]}
              />
              {err.measurement && (
                <Text
                  style={{
                    color: COLORS.danger,
                    fontFamily: FONT.regular,
                    fontSize: SIZES.sm,
                    textAlign: 'center',
                  }}
                >
                  This field is requried.
                </Text>
              )}
            </View>
          </View>
          <Text style={[styles.addLabel, styles.mb]}>Description</Text>
          <TextInput
            placeholder='Description'
            value={ingredientInfo.description}
            onChangeText={(text) =>
              setIngredientInfo({ ...ingredientInfo, description: text })
            }
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
              backgroundColor: COLORS.accent,
              borderRadius: 999,
              marginTop: SIZES.lg,
            }}
            onPress={handleSave}
          >
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: FONT.medium,
                fontSize: SIZES.md,
              }}
            >
              Save
            </Text>
          </Pressable>
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
