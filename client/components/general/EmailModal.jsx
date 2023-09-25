import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/accInfo';
import axios from '../../lib/axiosConfig';

const EmailModal = ({ modalVisible, closeModal, _email, update, id }) => {
  const [focusEmail, setFocusEmail] = useState(1);
  const [email, setEmail] = useState(_email);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!e) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(e)) {
      setEmailError('Please enter a valid email address');
    } else {
      (async () => {
        const response = await axios.post(`users/validate/${id}`, {
          property: 'email',
          email: e,
        });

        if (response.data?.status == 'invalid') {
          setEmailError('Email address is already used');
        } else {
          setEmailError('');
        }
      })();
    }
  };

  const handleChangeEmail = () => {
    if (email && !emailError) {
      update(id, 'email', email);
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

          <Text style={styles.headerTitle}>Change Email</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.p}>
            <Text style={[styles.headerText, { color: '#00000050' }]}>
              Current
            </Text>
            <Text style={[styles.captionText, { color: '#00000050' }]}>
              {_email}
            </Text>

            <View style={[styles.mt, styles.pv]}>
              <Text style={[styles.headerText]}>New</Text>
              <TextInput
                placeholder='Email'
                autoFocus={true}
                value={email}
                onFocus={() => setFocusEmail(2)}
                onBlur={() => setFocusEmail(1)}
                style={[styles.input, { borderWidth: focusEmail }]}
                onChangeText={(text) => {
                  setEmail(text);
                  validateEmail(text);
                }}
              />

              {emailError ? (
                <Text style={styles.error}>{emailError}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.btmWrapper}>
          <TouchableOpacity
            style={styles.btmButton}
            onPress={() => handleChangeEmail()}
          >
            <Text style={styles.btmText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EmailModal;
