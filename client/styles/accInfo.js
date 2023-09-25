import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  p: { padding: SIZES.sm },
  mt: { marginTop: SIZES.lg },
  accountButton: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  pv: { paddingVertical: 6 },
  headerText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md + 1,
    color: COLORS.black,
    letterSpacing: 0.15,
  },
  captionText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm + 2,
    color: COLORS.lightBlack,
    letterSpacing: 0.15,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#00000020',
  },
  headerTitle: {
    fontSize: SIZES.md + 1,
    marginLeft: 24,
    fontFamily: FONT.semiBold,
  },
  input: {
    height: 50,
    marginTop: 4,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 12,
    fontFamily: FONT.regular,
  },
  btmButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: COLORS.accent,
    borderRadius: 999,
  },
  btmText: {
    color: COLORS.primary,
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
  },
  btmWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#00000020',
  },
  error: {
    color: 'red',
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    paddingLeft: SIZES.xs,
    marginTop: 4,
  },
});

export default styles;
