import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  navigatorHeaderStyle: {
    backgroundColor: COLORS.accent,
  },
  arHeaderTitleStyle: {
    fontFamily: FONT.medium,
    color: COLORS.primary,
    letterSpacing: 0.1,
    marginLeft: -16,
  },
  arHeaderTitleContainerStyle: {
    alignItems: 'flex-start',
  },
  arHeaderRightView: { flexDirection: 'row', marginRight: SIZES.md },
  mr: { marginRight: SIZES.sm },
  signUpHeaderTitleStyle: {
    fontFamily: FONT.bold,
  },
});

export default styles;
