import { View, Text } from 'react-native';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { COLORS, FONT, SIZES } from '../../constants';
import styles from '../../styles/filterDropDown';

const FilterProgressSteps = ({ setFiltered }) => {
  const { buttonNextStyle, buttonPreviousStyle } = styles;

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
    setFiltered(true);
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
          label='Meal Types'
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextStyle}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>Meal Types Check Box</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label='Cuisines'
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextStyle}
          previousBtnTextStyle={buttonPreviousStyle}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>Cuisine Check Box</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label='Preferences'
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextStyle}
          previousBtnTextStyle={buttonPreviousStyle}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>Preferences Check Box</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label='Cooking Time'
          onNext={onNextStep}
          onPrevious={onPrevStep}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextStyle}
          previousBtnTextStyle={buttonPreviousStyle}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>Cooking Time Check Box</Text>
          </View>
        </ProgressStep>
        <ProgressStep
          label='Allergies'
          onPrevious={onPrevStep}
          onSubmit={onSubmitSteps}
          scrollViewProps={defaultScrollViewProps}
          nextBtnTextStyle={buttonNextStyle}
          previousBtnTextStyle={buttonPreviousStyle}
        >
          <View style={{ alignItems: 'center' }}>
            <Text>Allergies Check Box</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default FilterProgressSteps;
