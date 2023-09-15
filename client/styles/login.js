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
    paddingHorizontal: 0,
    borderRadius: 999,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonLabel: {
    paddingVertical: 4,
    flex: 1,
    fontFamily: FONT.regular,
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
