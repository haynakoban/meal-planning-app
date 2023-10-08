import { useState } from 'react';
import { View, TextInput, ScrollView, Linking, Pressable } from 'react-native';
import { Button, Text, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../styles/signup';
import { COLORS, FONT, SIZES } from '../../constants';
import axios from '../../lib/axiosConfig';
import useAuthStore from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const handleOpenTerms = async () => {
    const url =
      'https://nutri-smart.vercel.app/terms-and-condition-privacy-policy.html';
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn(`Don't know how to open URL: ${url}`);
    }
  };

  const navigation = useNavigation();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const { white, accent } = COLORS;
  const {
    container,
    bannerWrapper,
    bannerHeader,
    bannerDescription,
    registerWrapper,
    button,
    letterSpacing,
    footerWrapper,
    footerText,
    buttonText,
    signUpButton,
    input,
    error,
  } = styles;

  const [focusName, setFocusName] = useState(1);
  const [isAgreed, setIsAgreed] = useState(false);
  const [focusEmail, setFocusEmail] = useState(1);
  const [focusPassword, setFocusPassword] = useState(1);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(1);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateFullName = (fullName) => {
    if (!fullName) {
      setFullNameError('Full name is required');
    } else if (fullName.length < 4) {
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

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validateEmailOnBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
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

  const handleRegistration = () => {
    if (
      fullName &&
      email &&
      password &&
      confirmPassword &&
      !fullNameError &&
      !emailError &&
      passwordError.length === 0 &&
      !confirmPasswordError
    ) {
      axios
        .post('users', {
          fullname: fullName,
          email,
          password,
          registrationMethod: 'email',
        })
        .then((res) => {
          if (res.data?.data) {
            setUserInfo(res.data?.data._id);
            navigation.navigate('Loading');
          }
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='always'
      style={{ backgroundColor: 'white' }}
    >
      <SafeAreaView style={[container, { backgroundColor: 'white' }]}>
        <View style={bannerWrapper}>
          <Text style={bannerHeader}>Create Your Account</Text>
          <Text style={bannerDescription}>
            Please enter info to create account
          </Text>
        </View>

        <View style={registerWrapper}>
          <TextInput
            placeholder='Full Name'
            onFocus={() => setFocusName(2)}
            onBlur={() => {
              setFocusName(1);
              validateFullNameOnBlur();
            }}
            style={[input, { borderWidth: focusName }]}
            onChangeText={(text) => {
              setFullName(text);
              validateFullName(text);
            }}
          />
          {fullNameError ? <Text style={error}>{fullNameError}</Text> : null}

          <TextInput
            placeholder='Email'
            onFocus={() => setFocusEmail(2)}
            onBlur={() => {
              setFocusEmail(1);
              validateEmailOnBlur();
            }}
            style={[input, { borderWidth: focusEmail }]}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
          />
          {emailError ? <Text style={error}>{emailError}</Text> : null}

          <TextInput
            secureTextEntry
            placeholder='Password'
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
            style={[
              input,
              { borderWidth: focusConfirmPassword, marginBottom: 10 },
            ]}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validateConfirmPassword(text);
            }}
          />
          {confirmPasswordError ? (
            <Text style={error}>{confirmPasswordError}</Text>
          ) : null}

          <Pressable
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setIsAgreed(!isAgreed)}
          >
            <Checkbox status={isAgreed ? 'checked' : 'unchecked'} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: FONT.regular }}>I agree to the </Text>
              <Pressable onPress={() => handleOpenTerms()}>
                <Text
                  style={{ fontFamily: FONT.regular, color: COLORS.accent }}
                >
                  terms & policy.
                </Text>
              </Pressable>
            </View>
          </Pressable>

          <Button
            uppercase
            style={
              isAgreed
                ? button
                : {
                    backgroundColor: COLORS.secondary,
                    marginTop: SIZES.sm,
                    paddingVertical: 3,
                    borderRadius: 999,
                  }
            }
            labelStyle={[letterSpacing, buttonText]}
            textColor={white}
            onPress={() => handleRegistration()}
            disabled={!isAgreed}
          >
            Submit
          </Button>
          <View style={footerWrapper}>
            <Text style={[footerText, { color: COLORS.black }]}>
              Already have an account?
            </Text>
            <Button
              mode='text'
              textColor={accent}
              style={signUpButton}
              labelStyle={footerText}
              onPress={() => navigation.navigate('Login')}
            >
              Sign In
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RegisterScreen;
