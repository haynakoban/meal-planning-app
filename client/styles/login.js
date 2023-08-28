import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  loginWrapper: {
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    width: '100%',
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
  noBorderRadius: {
    borderRadius: 0,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  dividerWrapper: {
    marginTop: SIZES.xl,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  divider: {
    flex: 1,
  },
  connectText: {
    marginHorizontal: 8,
  },
  socialWrapper: {
    marginTop: SIZES.xl,
  },
  socialButton: {
    paddingHorizontal: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonLabel: {
    paddingVertical: 4,
    flex: 1,
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
