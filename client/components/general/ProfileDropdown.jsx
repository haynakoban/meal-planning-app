import { Modal, Portal } from 'react-native-paper';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/profileDropDown';
import useAuthStore from '../../store/useAuthStore';

const ProfileDropdown = ({ hideModal, navigation }) => {
  const { logout } = useAuthStore();
  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => {
            hideModal();
            navigation.navigate('ProfileSettings');
          }}
        >
          <View style={[styles.container, styles.bb]}>
            <Feather name='user' size={SIZES.lg + 1} color={COLORS.black} />
            <Text style={[styles.text, styles.marginLeft]}>Profile</Text>
            <Feather
              name='chevron-right'
              size={SIZES.xl}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('hello')}>
          <View style={[styles.container, styles.bb]}>
            <Feather name='lock' size={SIZES.lg + 1} color={COLORS.black} />
            <Text style={[styles.text, styles.marginLeft]}>Privacy</Text>
            <Feather
              name='chevron-right'
              size={SIZES.xl}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            hideModal();
            logout();
          }}
        >
          <View style={[styles.container, styles.bb]}>
            <Feather name='log-out' size={SIZES.lg + 1} color={COLORS.black} />
            <Text style={[styles.text, { marginLeft: SIZES.sm + 1 }]}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => hideModal()}>
          <View style={[styles.container]}>
            <Feather name='x' size={SIZES.lg + 1} color={COLORS.black} />
            <Text style={[styles.text, { marginLeft: SIZES.sm + 1 }]}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const ProfileModal = ({ visible, hideModal }) => {
  const navigation = useNavigation();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        overlayBackgroundColor='transparent'
        contentContainerStyle={{
          backgroundColor: COLORS.primary,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '80%',
          borderRadius: 8,
        }}
      >
        <ProfileDropdown hideModal={hideModal} navigation={navigation} />
      </Modal>
    </Portal>
  );
};

export default ProfileDropdown;
