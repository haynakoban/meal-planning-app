import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '../constants';

const styles = StyleSheet.create({
  recipeContainer: {
    marginBottom: SIZES.md,
  },
  headerContainer: {
    paddingHorizontal: SIZES.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleStyle: { fontFamily: FONT.semiBold, fontSize: SIZES.md },
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
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  cardContentWrapper: { width: '50%' },
});

export default styles;
