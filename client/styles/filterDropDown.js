import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
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
    textTransform: 'capitalize',
  },
  dropdownButtonLabel: { fontFamily: FONT.semiBold, fontSize: SIZES.md },
  dropdownButtonContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonNextStyle: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SIZES.xxl,
    paddingVertical: SIZES.sm,
    borderRadius: 999,
    color: COLORS.white,
  },
  buttonPreviousStyle: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.xxl,
    paddingVertical: SIZES.sm,
    borderRadius: 999,
    color: COLORS.white,
  },
});

export default styles;
