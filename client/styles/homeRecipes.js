import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: SIZES.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleStyle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md + 2,
    textTransform: 'capitalize',
  },
  headerButtonContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  headerButtonStyle: { alignItems: 'center' },
  headerButtonLabel: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm,
    paddingTop: 1,
  },
});

export default styles;
