import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 12,
    borderRadius: 999,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: FONT.regular,
  },
  error: {
    color: 'red',
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    paddingLeft: SIZES.xs,
    marginTop: 4,
  },
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
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
  },
  signUpButton: {
    marginLeft: -8,
  },
});

export default styles;
