import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES, mealTypes, allergies } from '../../constants';

const FilterDropdown = () => {
  // meal types state
  const [selectedMealType, setSelectedMealType] = useState([]);
  const [mealTypeVisible, setMealTypeVisible] = useState(false);

  // allergies state
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [allergiesVisible, setAllergiesVisible] = useState(false);

  // handle dropdown toggle visibility
  const toggleDropdownVisibility = (stateItems, stateFunction) => {
    stateFunction(!stateItems);
  };

  // handle toggle selection
  const toggleItemSelection = (stateItems, stateFunction, value) => {
    if (stateItems.includes(value)) {
      stateFunction(stateItems.filter((selected) => selected !== value));
    } else {
      stateFunction([...stateItems, value]);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Button
        onPress={() =>
          toggleDropdownVisibility(mealTypeVisible, setMealTypeVisible)
        }
        textColor={COLORS.black}
        icon={() =>
          mealTypeVisible ? (
            <Ionicons name='chevron-up' size={24} color='black' />
          ) : (
            <Ionicons name='chevron-down' size={24} color='black' />
          )
        }
        labelStyle={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}
        contentStyle={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        Meal Type
      </Button>

      {mealTypeVisible && (
        <View style={styles.dropdown}>
          {mealTypes.map((item) => (
            <Button
              key={item}
              onPress={() =>
                toggleItemSelection(selectedMealType, setSelectedMealType, item)
              }
              icon={() =>
                selectedMealType.includes(item) ? (
                  <Ionicons name='checkbox' size={24} color='black' />
                ) : (
                  <MaterialCommunityIcons
                    name='checkbox-blank-outline'
                    size={24}
                    color='black'
                  />
                )
              }
              contentStyle={[styles.buttonContent, styles.pd]}
              labelStyle={[
                styles.buttonLabel,
                {
                  fontFamily: selectedMealType.includes(item)
                    ? FONT.semiBold
                    : FONT.medium,
                },
              ]}
              textColor={COLORS.black}
            >
              {item}
            </Button>
          ))}
        </View>
      )}

      {/* allergies */}
      <Button
        onPress={() =>
          toggleDropdownVisibility(allergiesVisible, setAllergiesVisible)
        }
        textColor={COLORS.black}
        icon={() =>
          allergiesVisible ? (
            <Ionicons name='chevron-up' size={24} color='black' />
          ) : (
            <Ionicons name='chevron-down' size={24} color='black' />
          )
        }
        labelStyle={{ fontFamily: FONT.semiBold, fontSize: SIZES.md }}
        contentStyle={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        Allergies
      </Button>

      {allergiesVisible && (
        <View style={styles.dropdown}>
          {allergies.map((item) => (
            <Button
              key={item}
              onPress={() =>
                toggleItemSelection(
                  selectedAllergies,
                  setSelectedAllergies,
                  item
                )
              }
              icon={() =>
                selectedAllergies.includes(item) ? (
                  <Ionicons name='checkbox' size={24} color='black' />
                ) : (
                  <MaterialCommunityIcons
                    name='checkbox-blank-outline'
                    size={24}
                    color='black'
                  />
                )
              }
              contentStyle={[styles.buttonContent, styles.pd]}
              labelStyle={[
                styles.buttonLabel,
                {
                  fontFamily: selectedAllergies.includes(item)
                    ? FONT.semiBold
                    : FONT.medium,
                },
              ]}
              textColor={COLORS.black}
            >
              {item}
            </Button>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export const FilterModal = ({ visible, hideModal }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <FilterDropdown />
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.md,
    width: '80%',
    marginLeft: 'auto',
    flex: 1,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pd: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonContent: {
    justifyContent: 'flex-start',
  },
  buttonLabel: {
    fontSize: SIZES.md,
    paddingLeft: SIZES.xs,
    width: '100%',
    textAlign: 'left',
  },
});

export default FilterDropdown;
