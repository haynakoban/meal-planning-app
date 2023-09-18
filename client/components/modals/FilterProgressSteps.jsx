import { View, Text } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { COLORS, FONT } from '../../constants';
import styles from '../../styles/filterDropDown';
import useFilterStore from '../../store/useFilterStore';
import { Button } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const FilterProgressSteps = ({ filters }) => {
  // const { filters, filteredData, setFilteredData } = useFilterStore();
  // const fats = [10, 15, 20];
  // const carbs = [30, 35, 40];
  // const fibers = [5, 7, 9];
  // const proteins = [25, 30, 35];
  // const sugars = [8, 10, 12];
  // const sodiums = [300, 400, 500];

  // const nutritionObjects = calculateCalorie(
  //   fats,
  //   carbs,
  //   fibers,
  //   proteins,
  //   sugars,
  //   sodiums
  // );
  // console.log(`Nutrition Objects:`, nutritionObjects);

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

  const onSubmitSteps = () => {
    // setFiltered(true);
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
          label='Meal Type'
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
                      return (
                        <Ionicons name='checkbox' size={24} color='black' />
                      );
                    }}
                    contentStyle={[buttonContent, pd]}
                    labelStyle={[
                      buttonLabel,
                      {
                        fontFamily: FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => console.log('yo')}
                  >
                    {item.name}
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
          label='Cuisine'
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
                      return (
                        <Ionicons name='checkbox' size={24} color='black' />
                      );
                    }}
                    contentStyle={[buttonContent, pd]}
                    labelStyle={[
                      buttonLabel,
                      {
                        fontFamily: FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => console.log('yo')}
                  >
                    {item.name}
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
          label='Preference'
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
            {filters[2]?.data.length > 0 ? (
              filters[2]?.data.map((item) => {
                return (
                  <Button
                    key={item._id}
                    icon={() => {
                      return (
                        <Ionicons name='checkbox' size={24} color='black' />
                      );
                    }}
                    contentStyle={[buttonContent, pd]}
                    labelStyle={[
                      buttonLabel,
                      {
                        fontFamily: FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => console.log('yo')}
                  >
                    {item.name}
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
            {filters[4]?.data.length > 0 ? (
              filters[4]?.data.map((item) => {
                return (
                  <Button
                    key={item._id}
                    icon={() => {
                      return (
                        <Ionicons name='checkbox' size={24} color='black' />
                      );
                    }}
                    contentStyle={[buttonContent, pd]}
                    labelStyle={[
                      buttonLabel,
                      {
                        fontFamily: FONT.medium,
                      },
                    ]}
                    textColor={COLORS.black}
                    onPress={() => console.log('yo')}
                  >
                    {item.name}
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
