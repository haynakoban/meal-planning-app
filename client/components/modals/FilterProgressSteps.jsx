import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFilterStore from '../../store/useFilterStore';
import useAuthStore from '../../store/useAuthStore';
import { COLORS, FONT } from '../../constants';
import styles from '../../styles/filterDropDown';
import axios from '../../lib/axiosConfig';

const FilterProgressSteps = ({ filters }) => {
  const { userInfo, setUserInfo } = useAuthStore();
  const { filteredData, setFilteredData } = useFilterStore();

  const {
    buttonNextStyle,
    buttonNextTextStyle,
    buttonPreviousStyle,
    buttonPreviousTextStyle,
    buttonContent,
    buttonLabel,
    pd,
  } = styles;

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  // callback props of progress step
  const onNextStep = () => {};

  // callback props of progress step
  const onPrevStep = () => {};

  const onSubmitSteps = async () => {
    await AsyncStorage.setItem('filtersData', JSON.stringify(filteredData));

    const response = await axios.patch('users/auth/filters', {
      id: userInfo._id,
      filtered: true,
    });

    if (response.data.status === 'success') {
      setUserInfo(userInfo._id);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <ProgressSteps
        progressBarColor={COLORS.gray2}
        completedProgressBarColor={COLORS.accent}
        activeStepIconColor={COLORS.accent}
        completedStepIconColor={COLORS.accent}
        activeStepIconBorderColor={COLORS.accent}
        disabledStepIconColor={COLORS.gray2}
        labelFontFamily={FONT.regular}
        labelColor={COLORS.gray}
        activeLabelColor={COLORS.black}
        completedLabelColor={COLORS.black}
        activeStepNumColor={COLORS.white}
      >
        <ProgressStep
          label='Ingredients'
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextTextStyle}
          nextBtnStyle={buttonNextStyle}
        >
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            {filters[0]?.data.length > 0 ? (
              filters[0]?.data.map((item) => {
                return (
                  <Button
                    key={item._id}
                    icon={() => {
                      if (filteredData['Ingredients']?.includes(item._id)) {
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
                        fontFamily: filteredData['Ingredients']?.includes(
                          item._id
                        )
                          ? FONT.semiBold
                          : FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => setFilteredData('Ingredients', item._id)}
                  >
                    {item?.time || item.name}
                  </Button>
                );
              })
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: 8,
                  fontFamily: FONT.medium,
                }}
              >
                If no content available, please reload
              </Text>
            )}
          </View>
        </ProgressStep>
        <ProgressStep
          label='Meal Type'
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextTextStyle}
          nextBtnStyle={buttonNextStyle}
          previousBtnTextStyle={buttonPreviousTextStyle}
          previousBtnStyle={buttonPreviousStyle}
        >
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            {filters[1]?.data.length > 0 ? (
              filters[1]?.data.map((item) => {
                return (
                  <Button
                    key={item._id}
                    icon={() => {
                      if (filteredData['MealTypes']?.includes(item._id)) {
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
                        fontFamily: filteredData['MealTypes']?.includes(
                          item._id
                        )
                          ? FONT.semiBold
                          : FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => setFilteredData('MealTypes', item._id)}
                  >
                    {item?.time || item.name}
                  </Button>
                );
              })
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: 8,
                  fontFamily: FONT.medium,
                }}
              >
                If no content available, please reload
              </Text>
            )}
          </View>
        </ProgressStep>
        <ProgressStep
          label='Preferences'
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextTextStyle}
          nextBtnStyle={buttonNextStyle}
          previousBtnTextStyle={buttonPreviousTextStyle}
          previousBtnStyle={{ margin: 0, padding: 0, textAlign: 'left' }}
        >
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            {filters[3]?.data.length > 0 ? (
              filters[3]?.data.map((item) => {
                return (
                  <Button
                    key={item._id}
                    icon={() => {
                      if (filteredData['Preferences']?.includes(item._id)) {
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
                        fontFamily: filteredData['Preferences']?.includes(
                          item._id
                        )
                          ? FONT.semiBold
                          : FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => setFilteredData('Preferences', item._id)}
                  >
                    {item?.time || item.name}
                  </Button>
                );
              })
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: 8,
                  fontFamily: FONT.medium,
                }}
              >
                If no content available, please reload
              </Text>
            )}
          </View>
        </ProgressStep>
        <ProgressStep
          label='Allergy'
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextTextStyle}
          nextBtnStyle={buttonNextStyle}
          previousBtnTextStyle={buttonPreviousTextStyle}
          previousBtnStyle={{ margin: 0, padding: 0, textAlign: 'left' }}
        >
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 8,
            }}
          >
            {filters[5]?.data.length > 0 ? (
              filters[5]?.data.map((item) => {
                return (
                  <Button
                    key={item._id}
                    icon={() => {
                      if (filteredData['Allergies']?.includes(item._id)) {
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
                        fontFamily: filteredData['Allergies']?.includes(
                          item._id
                        )
                          ? FONT.semiBold
                          : FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => setFilteredData('Allergies', item._id)}
                  >
                    {item?.time || item.name}
                  </Button>
                );
              })
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: 8,
                  fontFamily: FONT.medium,
                }}
              >
                If no content available, please reload
              </Text>
            )}
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default FilterProgressSteps;
