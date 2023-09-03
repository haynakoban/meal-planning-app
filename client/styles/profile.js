import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  profileContainer: {
    paddingVertical: SIZES.md,
    alignItems: 'center',
  },
  profileText: {
    width: 250,
    textAlign: 'center',
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    marginBottom: 8,
  },
  bio: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm + 2,
    lineHeight: SIZES.lg,
  },
  mv: {
    marginVertical: SIZES.md,
  },
  groupButtonWrapper: {
    marginTop: SIZES.xs,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    padding: 2,
    borderRadius: SIZES.sm,
  },
  groupButton: {
    width: 140,
    paddingTop: 2,
    paddingBottom: 6,
    borderRadius: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupButtonViewNumber: {
    fontSize: SIZES.lg,
  },
  groupButtonViewText: {
    fontSize: SIZES.sm,
  },
});

export default styles;
