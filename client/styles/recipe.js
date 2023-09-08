import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'start',
  },
  fwb: { fontWeight: 'bold' },
  wrapper: {
    padding: SIZES.lg,
  },
  wrapperAccent: {
    padding: SIZES.lg,
    backgroundColor: COLORS.accent,
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  dividerBlue: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },
  bigDivider: {
    width: '100%',
    borderBottomWidth: 25,
    borderBottomColor: COLORS.secondary,
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
  },
  textSm: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
  },
  textBold: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xl,
  },
  textMedium: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xl,
  },
  textWhite: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xl,
    color: COLORS.white,
  },
  mb: { marginBottom: 5 },
  ratingsStyle: {
    fontSize: SIZES.lg,
  },
  reviewTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  nutritionWrapper: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xs,
    backgroundColor: COLORS.accent,
  },
  flexRowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.xs,
    backgroundColor: COLORS.primary,
  },
  flexRowBetweenInside: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.xs,
    backgroundColor: COLORS.secondary,
  },
});

export default styles;
