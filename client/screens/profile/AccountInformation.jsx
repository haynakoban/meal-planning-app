import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from '../../constants';

const AccountInformation = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.p}>
        <View>
          <Text style={styles.headerText}>Account Information</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  p: { padding: SIZES.sm },
  mt: { marginTop: SIZES.xs - 2 },
  accountMarginTop: { marginTop: SIZES.xs - 6 },
  accountContainer: { marginTop: SIZES.xl },
  ml: { marginLeft: SIZES.md + 2 },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  iconContainer: { justifyContent: 'center', alignItems: 'center', width: 34 },
  headerText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md + 2,
    color: COLORS.lightBlack,
  },
  captionText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm + 2,
    color: COLORS.lightBlack,
  },
});
export default AccountInformation;
