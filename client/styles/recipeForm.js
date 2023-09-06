import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'start',
    padding: 8,
  },
  borderWidth: { borderWidth: 1 },
  noBorderWidth: { borderWidth: 0 },
  noBG: { backgroundColor: 'none' },
  fffs: { fontFamily: FONT.semiBold, fontSize: SIZES.md },
  privactDescription: { fontFamily: FONT.regular, fontSize: SIZES.sm },
  input: {
    height: 50,
    borderRadius: 30,
    padding: 15,
    paddingLeft: SIZES.lg,
    paddingRight: SIZES.lg,
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
  },
  smallLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
  },
  textarea: {
    height: 150,
    justifyContent: 'flex-start',
    borderRadius: 15,
    padding: 15,
    paddingLeft: SIZES.lg,
    paddingRight: SIZES.lg,
    fontFamily: FONT.regular,
    textAlignVertical: 'top',
    fontSize: SIZES.sm,
  },
  select: {
    borderRadius: 30,
    fontFamily: FONT.regular,
    borderWidth: 1,
    paddingLeft: SIZES.xs,
    paddingRight: SIZES.xs,
  },
  ddPlaceholder: {
    fontFamily: FONT.regular,
    color: 'grey',
    borderRadius: 3,
    borderWidth: 0,
    fontSize: SIZES.sm,
  },
  dd: { borderWidth: 0, backgroundColor: 'none' },
  mb: {
    marginBottom: SIZES.sm,
  },
  mtxl: {
    marginTop: SIZES.xl,
  },
  mtlg: {
    marginTop: SIZES.lg,
  },
  mt: {
    marginTop: SIZES.sm,
  },
  highlights: {
    fontSize: SIZES.sm,
    fontFamily: FONT.medium,
    marginBottom: SIZES.sm,
  },
  labels: {
    fontSize: SIZES.md,
    fontFamily: FONT.semiBold,
    marginBottom: SIZES.sm,
  },
  addLabel: {
    fontSize: SIZES.sm,
    fontFamily: FONT.regular,
    marginTop: SIZES.sm,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'cover',
    width: '100%',
    borderWidth: 1,
    height: 250,
    borderRadius: 15,
  },
  hasImage: {
    width: '100%',
    objectFit: 'cover',
    height: 250,
    borderRadius: 15,
    borderWidth: 1,
  },
  privacyStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  cookingTime: { flexDirection: 'row', alignItems: 'center' },
  submitButton: {
    borderRadius: 999,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
  },
  submitText: {
    fontSize: SIZES.lg,
    fontFamily: FONT.semiBold,
    color: COLORS.white,
  },
});

export default styles;
