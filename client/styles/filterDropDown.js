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
  buttonNextTextStyle: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.xs,
    borderRadius: 999,
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
  },
  buttonNextStyle: {
    margin: 0,
    padding: 0,
    textAlign: 'right',
  },
  buttonPreviousTextStyle: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.xs,
    borderRadius: 999,
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
  },
  buttonPreviousStyle: {
    margin: 0,
    padding: 0,
    textAlign: 'left',
  },
});

export default styles;
