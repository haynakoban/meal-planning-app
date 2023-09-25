import { Fragment, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import useAuthStore from '../../store/useAuthStore';
import axios from '../../lib/axiosConfig';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [verify, setVerify] = useState(false);
  const [visible, setVisible] = useState(false);

  const [focusVPassword, setFocusVPassword] = useState(1);
  const [passwordV, setPasswordV] = useState('');
  const [passwordVError, setPasswordVError] = useState('');
  const { userInfo, update } = useAuthStore();

  const [focusPassword, setFocusPassword] = useState(1);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(1);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const showSnackbar = () => {
    setVisible(true);
  };

  const hideSnackbar = () => {
    setVisible(false);
  };

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
    if (
      password &&
      confirmPassword &&
      passwordError.length === 0 &&
      !confirmPasswordError
    ) {
      update(userInfo?._id, 'password', password);
      showSnackbar();
      setTimeout(() => {
        navigation.navigate('ProfileSettings');
      }, 3000);
    }
  };

  const handlePassword = async () => {
    const response = await axios.post('users/auth/password', {
      id: userInfo?._id,
      password: passwordV,
    });

    if (response.data?.status === 'success') {
      setPasswordVError('');
      setVerify(true);
    } else {
      setPasswordVError('Incorrect password');
      setVerify(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      >
        <View style={[styles.p]}>
          {!verify ? (
            <Fragment>
              <Text style={styles.headerText}>Verify your password</Text>
              <Text style={[styles.mt, styles.captionText]}>
                Re-enter your password to continue.
              </Text>
              <TextInput
                secureTextEntry
                placeholder='Password'
                onFocus={() => setFocusVPassword(2)}
                onBlur={() => setFocusVPassword(1)}
                style={[styles.input, { borderWidth: focusVPassword }]}
                onChangeText={(text) => setPasswordV(text)}
              />
              {passwordVError ? (
                <Text style={styles.error}>{passwordVError}</Text>
              ) : null}
            </Fragment>
          ) : (
            <View style={[styles.pv]}>
              <Text style={[styles.headerText]}>New Password</Text>
              <Text style={[styles.captionText]}>
                Set up a new password for your account.
              </Text>
              <TextInput
                secureTextEntry
                placeholder='Password'
                autoFocus={true}
                onFocus={() => setFocusPassword(2)}
                onBlur={() => {
                  setFocusPassword(1);
                  validatePasswordOnBlur();
                }}
                style={[styles.input, { borderWidth: focusPassword }]}
                onChangeText={(text) => {
                  setPassword(text);
                  validatePassword(text);
                }}
              />
              {passwordError.length > 0
                ? passwordError.map((errorMessage) => (
                    <Text key={errorMessage} style={styles.error}>
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
                style={[styles.input, { borderWidth: focusConfirmPassword }]}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  validateConfirmPassword(text);
                }}
              />
              {confirmPasswordError ? (
                <Text style={styles.error}>{confirmPasswordError}</Text>
              ) : null}
            </View>
          )}
        </View>
      </ScrollView>

      {!verify ? (
        <View style={styles.btmWrapper}>
          <TouchableOpacity
            style={styles.btmButton}
            onPress={() => handlePassword()}
          >
            <Text style={styles.btmText}>Done</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Fragment>
          {visible ? (
            <View style={styles.snackbarContainer}>
              <Snackbar
                visible={visible}
                onDismiss={hideSnackbar}
                duration={3000}
                action={{
                  label: 'OK',
                  onPress: () => {
                    hideSnackbar();

                    navigation.goBack();
                  },
                }}
                style={styles.snackbar}
              >
                <Text style={{ color: COLORS.white }}>
                  Password changed successfully!
                </Text>
              </Snackbar>
            </View>
          ) : (
            <View style={styles.btmWrapper}>
              <TouchableOpacity
                style={styles.btmButton}
                onPress={() => handleChangePassword()}
              >
                <Text style={styles.btmText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  p: { padding: SIZES.sm },
  mt: { marginTop: SIZES.xs - 2 },
  headerText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.black,
  },
  captionText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm + 2,
    color: COLORS.lightBlack,
  },
  input: {
    height: 50,
    marginTop: 8,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 12,
    fontFamily: FONT.regular,
  },
  btmButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: COLORS.accent,
    borderRadius: 999,
  },
  btmText: {
    color: COLORS.primary,
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
  },
  btmWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#00000020',
  },
  error: {
    color: 'red',
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    paddingLeft: SIZES.xs,
    marginTop: 4,
  },
  snackbar: {
    backgroundColor: 'green',
  },
  snackbarContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ChangePassword;
