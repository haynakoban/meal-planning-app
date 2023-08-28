import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  bannerWrapper: {
    alignItems: 'center',
  },
  bannerHeader: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xl,
  },
  bannerDescription: { fontFamily: FONT.regular, fontSize: SIZES.sm },
  registerWrapper: {
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    width: '100%',
    marginTop: 8,
  },
  mb: {
    marginBottom: SIZES.sm,
  },
  button: {
    marginTop: SIZES.sm,
    backgroundColor: COLORS.accent,
    paddingVertical: 3,
    borderRadius: 999,
  },
  letterSpacing: {
    letterSpacing: 1,
  },
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontFamily: FONT.semiBold,
  },
  buttonText: {
    fontFamily: FONT.extraBold,
    fontSize: SIZES.md,
  },
  signUpButton: {
    marginLeft: -8,
  },
});

export default styles;
