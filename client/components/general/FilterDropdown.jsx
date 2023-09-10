import { useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, FONT, mealTypes } from '../../constants';
import styles from '../../styles/filterDropDown';
import useCuisinesStore from '../../store/useCuisinesStore';

const FilterDropdown = () => {
  const [page, setPage] = useState(1);
  // meal types state
  const [selectedMealType, setSelectedMealType] = useState([]);
  const [mealTypeVisible, setMealTypeVisible] = useState(false);

  const { listCuisines, cuisines } = useCuisinesStore();
  const {
    buttonContent,
    buttonLabel,
    pd,
    dropdown,
    dropdownButtonLabel,
    dropdownButtonContent,
  } = styles;
  // cuisines state
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [cuisinesVisible, setCuisinesVisible] = useState(false);

  useEffect(() => {
    listCuisines(page);
  }, [page]);

  const loadMoreData = () => {
    setPage(page + 1);
  };

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
    <ScrollView>
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
        <FlatList
          scrollEnabled={false}
          style={dropdown}
          keyExtractor={(item) => item}
          data={mealTypes}
          renderItem={({ item }) => (
            <Button
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
          )}
        />
      )}

      {/* cuisines */}
      <Button
        onPress={() =>
          toggleDropdownVisibility(cuisinesVisible, setCuisinesVisible)
        }
        textColor={COLORS.black}
        icon={() =>
          cuisinesVisible ? (
            <Ionicons name='chevron-up' size={24} color='black' />
          ) : (
            <Ionicons name='chevron-down' size={24} color='black' />
          )
        }
        labelStyle={dropdownButtonLabel}
        contentStyle={dropdownButtonContent}
      >
        Cuisines
      </Button>

      {cuisinesVisible && (
        <FlatList
          scrollEnabled={false}
          style={dropdown}
          keyExtractor={(item) => item?._id}
          data={cuisines}
          renderItem={({ item }) => (
            <Button
              onPress={() =>
                toggleItemSelection(
                  selectedCuisines,
                  setSelectedCuisines,
                  item._id
                )
              }
              icon={() =>
                selectedCuisines.includes(item._id) ? (
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
                  fontFamily: selectedCuisines.includes(item._id)
                    ? FONT.semiBold
                    : FONT.medium,
                },
              ]}
              textColor={COLORS.black}
            >
              {item.name}
            </Button>
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
        />
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
