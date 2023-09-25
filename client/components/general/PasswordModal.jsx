import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/accInfo';

const PasswordModal = ({ modalVisible, closeModal, update, id }) => {
  const [focusPassword, setFocusPassword] = useState(1);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(1);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError(['Password is required']);
    } else {
      const errors = [];
      if (password.length < 8 || password.length > 16) {
        errors.push('Password must be 8-16 characters long');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (!/[@$!%*?&]/.test(password)) {
        errors.push(
          'Password must contain at least one special character (@$!%*?&)'
        );
      }

      setPasswordError(errors);
    }
  };

  const validatePasswordOnBlur = () => {
    if (!password) {
      setPasswordError(['Password is required']);
    } else {
      const errors = [];
      if (password.length < 8 || password.length > 16) {
        errors.push('Password must be 8-16 characters long');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (!/[@$!%*?&]/.test(password)) {
        errors.push(
          'Password must contain at least one special character (@$!%*?&)'
        );
      }

      setPasswordError(errors);
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validateConfirmPasswordOnBlur = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleChangePassword = () => {
    if (fullName && !fullNameError) {
      // update(id, 'fullname', fullName);
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

          <Text style={styles.headerTitle}>Change Password</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.p}>
            <View style={[styles.mt, styles.pv]}>
              <Text style={[styles.headerText]}>New Password</Text>
              <TextInput
                secureTextEntry
                placeholder='Password'
                autoFocus={true}
                onFocus={() => setFocusPassword(2)}
                onBlur={() => {
                  setFocusPassword(1);
                  validatePasswordOnBlur();
                }}
                style={[input, { borderWidth: focusPassword }]}
                onChangeText={(text) => {
                  setPassword(text);
                  validatePassword(text);
                }}
              />
              {passwordError.length > 0
                ? passwordError.map((errorMessage) => (
                    <Text key={errorMessage} style={error}>
                      * {errorMessage}
                    </Text>
                  ))
                : null}

              <TextInput
                secureTextEntry
                placeholder='Confirm Password'
                onFocus={() => setFocusConfirmPassword(2)}
                onBlur={() => {
                  setFocusConfirmPassword(1);
                  validateConfirmPasswordOnBlur();
                }}
                style={[input, { borderWidth: focusConfirmPassword }]}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  validateConfirmPassword(text);
                }}
              />
              {confirmPasswordError ? (
                <Text style={error}>{confirmPasswordError}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.btmWrapper}>
          <TouchableOpacity
            style={styles.btmButton}
            onPress={() => handleChangePassword()}
          >
            <Text style={styles.btmText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordModal;
