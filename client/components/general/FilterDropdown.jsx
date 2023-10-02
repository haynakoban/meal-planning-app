import { useEffect, useState } from 'react';
import {
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '../../constants';
import styles from '../../styles/filterDropDown';
import useFilterStore from '../../store/useFilterStore';
import useRecipeStore from '../../store/useRecipeStore';
import LoadingScreen from '../../screens/loading/LoadingScreen';

const FilterDropdown = ({ hideModal }) => {
  const [openSections, setOpenSections] = useState(['Meal Types']);
  const { filters, filteredData, setFilteredData, clearFilter } =
    useFilterStore();
  const {
    buttonContent,
    buttonLabel,
    pd,
    dropdownButtonLabel,
    dropdownButtonContent,
  } = styles;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [filters]);

  // Function to toggle section open/close
  const toggleSection = (sectionTitle) => {
    if (openSections.includes(sectionTitle)) {
      setOpenSections(openSections.filter((title) => title !== sectionTitle));
    } else {
      setOpenSections([...openSections, sectionTitle]);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 12,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderColor: COLORS.lightBlack,
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity onPress={hideModal}>
              <Ionicons name='close' size={SIZES.xl + 4} color={COLORS.black} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: SIZES.md + 1,
                marginHorizontal: 8,
                flexGrow: 1,
              }}
            >
              Filter Recipes
            </Text>
            <Button
              mode='contained-tonal'
              style={{
                paddingHorizontal: 6,
                borderRadius: 12,
              }}
              labelStyle={{
                fontFamily: FONT.bold,
                fontSize: SIZES.sm - 1,
              }}
              compact={true}
              onPress={() => clearFilter()}
            >
              Clear All
            </Button>
          </View>
          <SectionList
            scrollEnabled={false}
            sections={filters}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item, section }) => {
              if (openSections.includes(section.title)) {
                return (
                  <Button
                    icon={() => {
                      if (filteredData[section.title]?.includes(item._id)) {
                        return (
                          <Ionicons name='checkbox' size={24} color='black' />
                        );
                      } else {
                        return (
                          <MaterialCommunityIcons
                            name='checkbox-blank-outline'
                            size={24}
                            color='black'
                          />
                        );
                      }
                    }}
                    contentStyle={[buttonContent, pd]}
                    labelStyle={[
                      buttonLabel,
                      {
                        fontFamily: filteredData[section.title]?.includes(
                          item._id
                        )
                          ? FONT.semiBold
                          : FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => setFilteredData(section.title, item._id)}
                  >
                    {item?.time || item.name}
                  </Button>
                );
              } else {
                return null;
              }
            }}
            renderSectionHeader={({ section: { title } }) => (
              <Button
                textColor={COLORS.black}
                icon={() => {
                  if (openSections.includes(title)) {
                    return (
                      <Ionicons name='chevron-down' size={24} color='black' />
                    );
                  } else {
                    return (
                      <Ionicons name='chevron-up' size={24} color='black' />
                    );
                  }
                }}
                labelStyle={dropdownButtonLabel}
                contentStyle={dropdownButtonContent}
                onPress={() => toggleSection(title)}
              >
                {title === 'CookingTimes'
                  ? 'Cooking Times'
                  : title === 'MealTypes'
                  ? 'Meal Types'
                  : title}
              </Button>
            )}
          />
        </ScrollView>
      )}
    </>
  );
};

export const FilterModal = ({ visible, hideModal }) => {
  const { modalContainer } = styles;

  const { setFilteredRecipe, fetchRecipesData } = useRecipeStore();
  const { filteredData } = useFilterStore();
  const handleFilter = () => {
    if (
      filteredData.Allergies.length === 0 &&
      filteredData.CookingTimes.length === 0 &&
      filteredData.Cuisines.length === 0 &&
      filteredData.Ingredients.length === 0 &&
      filteredData.MealTypes.length === 0 &&
      filteredData.Preferences.length === 0
    ) {
      fetchRecipesData();
    } else {
      setFilteredRecipe();
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={modalContainer}
      >
        <FilterDropdown hideModal={hideModal} />
        <Pressable
          style={{ paddingHorizontal: 20, paddingTop: 20 }}
          onPress={() => handleFilter()}
        >
          <Text
            style={{
              paddingVertical: 10,
              textAlign: 'center',
              backgroundColor: COLORS.accent,
              fontFamily: FONT.semiBold,
              borderRadius: 5,
            }}
          >
            Show recipes
          </Text>
        </Pressable>
      </Modal>
    </Portal>
  );
};

export default FilterDropdown;
