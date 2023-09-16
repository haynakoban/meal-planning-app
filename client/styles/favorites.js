import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    elevation: 5,
    paddingTop: SIZES.md,
  },
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
  cardAction: {
    position: 'absolute',
    top: 170,
    right: 0,
  },
  ratingsStyle: {
    fontSize: SIZES.md,
  },
  icon: {
    fontSize: SIZES.xl,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
  },
  usernameStyle: {
    fontFamily: FONT.regular,
    fontSize: 14,
  },
  cardBottom: {
    padding: 14,
  },
  mb: {
    borderTopLeftRadius: SIZES.xs,
    borderTopRightRadius: SIZES.xs,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: SIZES.sm,
  },
  AvatarIcon: {
    backgroundColor: COLORS.primary,
  },
});

export default styles;
