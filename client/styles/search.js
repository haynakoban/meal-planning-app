import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  bg: { backgroundColor: COLORS.primary },
  buttonStyle: {
    padding: 8,
    borderRadius: 0,
  },
  border: {
    borderColor: COLORS.lightWhite,
    borderTopWidth: 1,
  },
  buttonLabelStyle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm + 2,
    marginLeft: SIZES.lg,
  },
  buttonContentStyle: {
    justifyContent: 'flex-start',
    borderRadius: 0,
  },
  divider: {
    width: '100%',
    height: SIZES.sm,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    textAlign: 'left',
    paddingHorizontal: SIZES.md,
    marginTop: SIZES.xs,
    fontFamily: FONT.semiBold,
  },
  itemWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.xs,
    width: 75,
    height: 100,
  },
  avatar: {
    fontSize: SIZES.md,
  },
  itemText: {
    paddingTop: 2,
    color: COLORS.black,
    fontSize: SIZES.xs,
    fontFamily: FONT.medium,
    textAlign: 'center',
  },
});

export default styles;
