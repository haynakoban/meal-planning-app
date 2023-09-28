import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.sm,
    elevation: 5,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: SIZES.sm,
  },
  cardCover: {
    position: 'relative',
    objectFit: 'cover',
  },
  cardWrapper: { width: '100%' },
  plannerContainer: { marginBottom: SIZES.md },
  plannerWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 8,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
  },
  descriptionStyle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
  },
  usernameStyle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
  },
  mb: {
    borderTopLeftRadius: SIZES.xs,
    borderTopRightRadius: SIZES.xs,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: SIZES.sm,
  },
  mealView: { flex: 1 },
  weeksView: {
    backgroundColor: COLORS.primary,
    elevation: 2,
    paddingVertical: 8,
  },
  weeksScrollView: {
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  mealPlanScrollView: { flexGrow: 1, paddingVertical: 8 },
  dayButton: {
    paddingVertical: 16,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    marginBottom: 8,
  },
  mealButton: { marginBottom: 10, paddingHorizontal: 5 },
  mealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00000020',
    borderRadius: 12,
  },
  mealImage: { width: 100, height: 100, borderRadius: 12 },
  mealContent: { marginLeft: 10, flex: 1, paddingHorizontal: 10 },
  mealName: {
    textTransform: 'capitalize',
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    marginBottom: 4,
  },
  mealTypes: {
    textTransform: 'uppercase',
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm + 1,
    letterSpacing: 0.2,
    color: COLORS.lightBlack,
  },
  noMealPlan: { fontFamily: FONT.medium, fontSize: SIZES.md },
  growView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default styles;
