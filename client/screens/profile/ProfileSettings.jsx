import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from '../../constants';

const ProfileSettings = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.p}>
        <View>
          <Text style={styles.headerText}>Manage Your Account</Text>
          <Text style={[styles.mt, styles.captionText]}>
            Explore and update your account information, including your password
            and post privacy settings for your delicious recipes.
          </Text>
        </View>

        <View style={styles.accountContainer}>
          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => navigation.navigate('AccountInformation')}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name='md-person-outline'
                size={SIZES.xxl}
                color={COLORS.lightBlack}
              />
            </View>
            <View style={[styles.ml, { flex: 1 }]}>
              <Text style={styles.headerText}>Account Information</Text>
              <Text
                numberOfLines={2}
                style={[styles.accountMarginTop, styles.captionText]}
              >
                View and manage your profile details, including name, username,
                and email.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.accountContainer}>
          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name='lock-closed-outline'
                size={SIZES.xxl}
                color={COLORS.lightBlack}
              />
            </View>
            <View style={[styles.ml, { flex: 1 }]}>
              <Text style={styles.headerText}>Change Password</Text>
              <Text
                numberOfLines={2}
                style={[styles.accountMarginTop, styles.captionText]}
              >
                Keep your account secure by updating your password.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.accountContainer}>
          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => navigation.navigate('PrivacySettings')}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name='shield-checkmark-outline'
                size={SIZES.xxl}
                color={COLORS.lightBlack}
              />
            </View>
            <View style={[styles.ml, { flex: 1 }]}>
              <Text style={styles.headerText}>Privacy Settings</Text>
              <Text
                numberOfLines={2}
                style={[styles.accountMarginTop, styles.captionText]}
              >
                Manage how your recipes and meals are shared.
              </Text>
            </View>
          </TouchableOpacity>
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
export default ProfileSettings;
