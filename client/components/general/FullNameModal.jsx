import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/accInfo';

const FullNameModal = ({ modalVisible, closeModal, fullname, update, id }) => {
  const [focusName, setFocusName] = useState(1);
  const [fullName, setFullName] = useState(fullname);
  const [fullNameError, setFullNameError] = useState('');

  const validateFullName = (name) => {
    if (!name) {
      setFullNameError('Full name is required');
    } else if (name.length < 4) {
      setFullNameError('Full name must be at least 4 characters long');
    } else {
      setFullNameError('');
    }
  };

  const validateFullNameOnBlur = () => {
    if (!fullName) {
      setFullNameError('Full name is required');
    } else if (fullName.length < 4) {
      setFullNameError('Full name must be at least 4 characters long');
    } else {
      setFullNameError('');
    }
  };

  const handleChangeFullName = () => {
    if (fullName && !fullNameError) {
      update(id, 'fullname', fullName);
      closeModal();
    }
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal}>
            <Ionicons name='arrow-back' size={SIZES.xl} color={COLORS.black} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Change Full Name</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.p}>
            <Text style={[styles.headerText, { color: '#00000050' }]}>
              Current
            </Text>
            <Text style={[styles.captionText, { color: '#00000050' }]}>
              {fullname}
            </Text>

            <View style={[styles.mt, styles.pv]}>
              <Text style={[styles.headerText]}>New</Text>
              <TextInput
                placeholder='Full Name'
                autoFocus={true}
                value={fullName}
                onFocus={() => setFocusName(2)}
                onBlur={() => {
                  setFocusName(1);
                  validateFullNameOnBlur();
                }}
                style={[styles.input, { borderWidth: focusName }]}
                onChangeText={(text) => {
                  setFullName(text);
                  validateFullName(text);
                }}
              />

              {fullNameError ? (
                <Text style={styles.error}>{fullNameError}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.btmWrapper}>
          <TouchableOpacity
            style={styles.btmButton}
            onPress={() => handleChangeFullName()}
          >
            <Text style={styles.btmText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FullNameModal;
