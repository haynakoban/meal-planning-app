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
  searchHeaderTitleStyle: {
    width: 300,
    marginLeft: -SIZES.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.lightWhite,
    borderColor: COLORS.primary,
    borderWidth: 1,
    paddingHorizontal: SIZES.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  searchTextInput: {
    flex: 1,
    color: COLORS.black,
    paddingHorizontal: SIZES.sm,
    fontSize: SIZES.md,
    fontFamily: FONT.medium,
  },
});

export default styles;
