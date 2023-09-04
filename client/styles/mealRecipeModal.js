import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modal: { justifyContent: 'flex-end' },
  modalButtonContent: {
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  modalButtonLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    paddingLeft: SIZES.xs,
  },
  modalHeader: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    paddingBottom: SIZES.xl,
  },
  modalWrapper: {
    backgroundColor: COLORS.white,
    height: 200,
    padding: SIZES.md,
    borderTopLeftRadius: SIZES.md,
    borderTopRightRadius: SIZES.md,
  },
  borderRadius: { borderRadius: 999 },
  mv: { marginVertical: 8 },
});

export default styles;
