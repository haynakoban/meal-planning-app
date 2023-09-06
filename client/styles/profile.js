import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  profileContainer: {
    paddingVertical: SIZES.md,
    alignItems: 'center',
  },
  profileText: {
    width: 220,
    textAlign: 'left',
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    marginBottom: 8,
  },
  bio: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
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
