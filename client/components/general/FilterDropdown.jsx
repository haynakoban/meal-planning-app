import { useEffect, useState } from 'react';
import { ScrollView, SectionList } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, FONT } from '../../constants';
import styles from '../../styles/filterDropDown';
import useFilterStore from '../../store/useFilterStore';

const FilterDropdown = () => {
  const [openSections, setOpenSections] = useState(['Meal Types']);
  const [selectedButtons, setSelectedButtons] = useState({});
  const { fetchApiData, filters } = useFilterStore();
  const {
    buttonContent,
    buttonLabel,
    pd,
    dropdownButtonLabel,
    dropdownButtonContent,
  } = styles;

  useEffect(() => {
    fetchApiData();
  }, []);

  // Function to toggle section open/close
  const toggleSection = (sectionTitle) => {
    if (openSections.includes(sectionTitle)) {
      setOpenSections(openSections.filter((title) => title !== sectionTitle));
    } else {
      setOpenSections([...openSections, sectionTitle]);
    }
  };

  // handle toggle button selection
  const toggleButtonSelection = (title, id) => {
    setSelectedButtons((prevSelectedButtons) => {
      const sectionButtons = prevSelectedButtons[title] || [];

      if (sectionButtons.includes(id)) {
        return {
          ...prevSelectedButtons,
          [title]: sectionButtons.filter((_id) => _id !== id),
        };
      } else {
        return {
          ...prevSelectedButtons,
          [title]: [...sectionButtons, id],
        };
      }
    });
  };

  return (
    <ScrollView>
      <SectionList
        scrollEnabled={false}
        sections={filters}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, section }) => {
          if (openSections.includes(section.title)) {
            return (
              <Button
                icon={() => {
                  if (selectedButtons[section.title]?.includes(item._id)) {
                    return <Ionicons name='checkbox' size={24} color='black' />;
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
                    fontFamily: selectedButtons[section.title]?.includes(
                      item._id
                    )
                      ? FONT.semiBold
                      : FONT.medium,
                  },
                ]}
                textColor={COLORS.black}
                onPress={() => toggleButtonSelection(section.title, item._id)}
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
                return <Ionicons name='chevron-down' size={24} color='black' />;
              } else {
                return <Ionicons name='chevron-up' size={24} color='black' />;
              }
            }}
            labelStyle={dropdownButtonLabel}
            contentStyle={dropdownButtonContent}
            onPress={() => toggleSection(title)}
          >
            {title}
          </Button>
        )}
      />
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
