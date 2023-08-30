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
});

export default styles;
