import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'start',
  },
  fwb: { fontWeight: 'bold' },
  tc: { textTransform: 'capitalize' },
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
    objectFit: 'cover',
    height: 'auto',
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm + 2,
  },
  bullet: {
    marginRight: 8,
  },
  ingredientsWrapper: { flexDirection: 'row' },
  textSm: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
  },
  textBold: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg + 2,
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
  authorWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  authorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 2,
  },
  authorText: {
    fontSize: SIZES.sm + 2,
    fontFamily: FONT.regular,
    marginRight: 8,
  },
  authorButton: {
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  authorButtonText: {
    color: COLORS.black,
    fontSize: SIZES.sm + 2,
    fontFamily: FONT.medium,
  },
  ratingsWrapper: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
