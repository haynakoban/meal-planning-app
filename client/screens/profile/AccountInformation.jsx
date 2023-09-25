import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants';
import useAuthStore from '../../store/useAuthStore';
import styles from '../../styles/accInfo';
import FullNameModal from '../../components/general/FullNameModal';
import UsernameModal from '../../components/general/UsernameModal';
import EmailModal from '../../components/general/EmailModal';

const AccountInformation = () => {
  const [FNModalVisible, setFNModalVisible] = useState(false);
  const [UNModalVisible, setUNModalVisible] = useState(false);
  const [EModalVisible, setEModalVisible] = useState(false);
  const { userInfo, logout, update } = useAuthStore();

  const openFNModal = () => {
    setFNModalVisible(true);
  };
  const closeFNModal = () => {
    setFNModalVisible(false);
  };

  const openUNModal = () => {
    setUNModalVisible(true);
  };
  const closeUNModal = () => {
    setUNModalVisible(false);
  };

  const openEModal = () => {
    setEModalVisible(true);
  };
  const closeEModal = () => {
    setEModalVisible(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='always'
    >
      <View style={styles.p}>
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => openFNModal()}
        >
          <Text style={styles.headerText}>Full Name</Text>
          <Text style={[styles.captionText]}>
            {userInfo?.fullname || 'Loading...'}
          </Text>
          <FullNameModal
            modalVisible={FNModalVisible}
            closeModal={closeFNModal}
            fullname={userInfo?.fullname}
            update={update}
            id={userInfo?._id}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.accountButton, styles.mt]}
          onPress={() => openUNModal()}
        >
          <Text style={styles.headerText}>Username</Text>
          <Text style={[styles.captionText]}>
            @{userInfo?.username || 'Loading...'}
          </Text>
          <UsernameModal
            modalVisible={UNModalVisible}
            closeModal={closeUNModal}
            _username={userInfo?.username}
            update={update}
            id={userInfo?._id}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.accountButton, styles.mt]}
          onPress={() => openEModal()}
        >
          <Text style={styles.headerText}>Email</Text>
          <Text style={[styles.captionText]}>
            {userInfo?.email || 'Loading...'}
          </Text>
          <EmailModal
            modalVisible={EModalVisible}
            closeModal={closeEModal}
            _email={userInfo?.email}
            update={update}
            id={userInfo?._id}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.accountButton, styles.mt]}
          onPress={() => logout()}
        >
          <Text style={[styles.headerText, { color: COLORS.danger }]}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountInformation;
