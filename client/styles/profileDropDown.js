import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: SIZES.md + 2,
  },
  bb: {
    borderColor: COLORS.gray2,
    borderBottomWidth: 1,
  },
  text: {
    flexGrow: 1,
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md + 1,
  },
  marginLeft: {
    marginLeft: SIZES.md,
  },
});

export default styles;
