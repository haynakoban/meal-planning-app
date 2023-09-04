import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.md,
    width: '80%',
    marginLeft: 'auto',
    flex: 1,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pd: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonContent: {
    justifyContent: 'flex-start',
  },
  buttonLabel: {
    fontSize: SIZES.md,
    paddingLeft: SIZES.xs,
    width: '100%',
    textAlign: 'left',
  },
  dropdownButtonLabel: { fontFamily: FONT.semiBold, fontSize: SIZES.md },
  dropdownButtonContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default styles;
