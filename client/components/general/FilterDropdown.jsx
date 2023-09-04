import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, FONT, mealTypes } from '../../constants';
import styles from '../../styles/filterDropDown';

const FilterDropdown = () => {
  // meal types state
  const [selectedMealType, setSelectedMealType] = useState([]);
  const [mealTypeVisible, setMealTypeVisible] = useState(false);

  const {
    buttonContent,
    buttonLabel,
    pd,
    dropdown,
    dropdownButtonLabel,
    dropdownButtonContent,
  } = styles;
  // allergies state
  // const [selectedAllergies, setSelectedAllergies] = useState([]);
  // const [allergiesVisible, setAllergiesVisible] = useState(false);

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
        labelStyle={dropdownButtonLabel}
        contentStyle={dropdownButtonContent}
      >
        Meal Type
      </Button>

      {mealTypeVisible && (
        <View style={dropdown}>
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
              contentStyle={[buttonContent, pd]}
              labelStyle={[
                buttonLabel,
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
    </ScrollView>
  );
};

export const FilterModal = ({ visible, hideModal }) => {
  const { modalContainer } = styles;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={modalContainer}
      >
        <FilterDropdown />
      </Modal>
    </Portal>
  );
};

export default FilterDropdown;
