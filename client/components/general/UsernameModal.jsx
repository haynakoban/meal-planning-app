import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/accInfo';
import axios from '../../lib/axiosConfig';

const UsernameModal = ({ modalVisible, closeModal, _username, update, id }) => {
  const [focusUsername, setFocusUsername] = useState(1);
  const [username, setUsername] = useState(_username);
  const [usernameError, setUsernameError] = useState('');

  const validateUsername = (u) => {
    if (!u) {
      setUsernameError('username is required');
    } else if (u.length < 8) {
      setUsernameError('username must be at least 8 characters long');
    } else {
      (async () => {
        const response = await axios.post(`users/validate/${id}`, {
          property: 'username',
          username: u,
        });

        if (response.data?.status == 'invalid') {
          setUsernameError('Username is already taken');
        } else {
          setUsernameError('');
        }
      })();
    }
  };

  const handleChangeUsername = () => {
    if (username && !usernameError) {
      update(id, 'username', username);
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

          <Text style={styles.headerTitle}>Change Username</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.p}>
            <Text style={[styles.headerText, { color: '#00000050' }]}>
              Current
            </Text>
            <Text style={[styles.captionText, { color: '#00000050' }]}>
              @{_username}
            </Text>

            <View style={[styles.mt, styles.pv]}>
              <Text style={[styles.headerText]}>New</Text>
              <TextInput
                placeholder='Username'
                autoFocus={true}
                value={username}
                onFocus={() => setFocusUsername(2)}
                onBlur={() => setFocusUsername(1)}
                style={[styles.input, { borderWidth: focusUsername }]}
                onChangeText={(text) => {
                  setUsername(text);
                  validateUsername(text);
                }}
              />

              {usernameError ? (
                <Text style={styles.error}>{usernameError}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.btmWrapper}>
          <TouchableOpacity
            style={styles.btmButton}
            onPress={() => handleChangeUsername()}
          >
            <Text style={styles.btmText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UsernameModal;
