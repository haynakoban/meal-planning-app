import { FontAwesome5 } from '@expo/vector-icons';
import { View, TextInput, ScrollView } from 'react-native';
import { Avatar, Button, Divider, Text, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from '../../store/useAuthStore';
import axios from '../../lib/axiosConfig';
import { useEffect, useState } from 'react';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

import styles from '../../styles/login';
import { COLORS, FONT } from '../../constants';

const LoginScreen = ({ navigation }) => {
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const [verify, setVerify] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState(null);

  const handleCloseVerify = () => {
    setForgotError(null);
    setVerify(false);
    setForgotModal(false);
  };

  const handleForgot = async () => {
    try {
      setForgotError(null);
      if (forgotEmail == '') return setForgotError('please input valid email');
      if (!validateEmail(forgotEmail))
        return setForgotError('please input valid email');

      const response = await axios.post(`users/auth/forgot`, {
        email: forgotEmail,
      });

      if (response.data.status === 'success') {
        return setVerify(true);
      }
      setForgotError('email not registered');
    } catch (error) {
      setForgotError('email not registered');
    }
  };

  const { black, white, accent } = COLORS;

  const {
    container,
    mb,
    button,
    letterSpacing,
    footerWrapper,
    dividerWrapper,
    loginWrapper,
    divider,
    connectText,
    socialWrapper,
    socialButton,
    footerText,
    noBorderRadius,
    forgotPassword,
    buttonContent,
    buttonLabel,
    buttonText,
    signUpButton,
    input,
    error,
  } = styles;

  const { login } = useAuthStore();
  const [focusEmail, setFocusEmail] = useState(1);
  const [focusPassword, setFocusPassword] = useState(1);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');

  const handleLogin = () => {
    if (!email && !password) {
      setError('Username/email and password field is required');
      return;
    } else {
      axios
        .post('users/auth/login', {
          email,
          password,
        })
        .then(async (res) => {
          if (res.data?.status === 'success') {
            // Store the token in AsyncStorage
            await AsyncStorage.setItem('@user', JSON.stringify(res.data.data));
            login();
            setError('');
            navigation.navigate('BottomNavigation');
          }
        })
        .catch((e) => {
          if (e.response.status === 404 || e.response.status === 401) {
            setError('Invalid username/email or password');
          }
        });
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always'
        style={{
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <SafeAreaView style={[container, { backgroundColor: 'white' }]}>
          <Avatar.Image
            size={150}
            style={{ backgroundColor: 'transparent' }}
            source={require('../../assets/images/logo.png')}
          />

          <View style={loginWrapper}>
            <TextInput
              placeholder='Username or Email'
              onFocus={() => setFocusEmail(2)}
              onBlur={() => setFocusEmail(1)}
              style={[input, { borderWidth: focusEmail }]}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            {err ? <Text style={error}>{err}</Text> : null}

            <TextInput
              secureTextEntry
              placeholder='Password'
              onFocus={() => setFocusPassword(2)}
              onBlur={() => setFocusPassword(1)}
              style={[input, { borderWidth: focusPassword }]}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <Button
              mode='text'
              textColor={black}
              style={forgotPassword}
              labelStyle={footerText}
              onPress={() => setForgotModal(!forgotModal)}
            >
              Forgot your password?
            </Button>

            <Button
              mode='contained'
              uppercase
              style={button}
              labelStyle={[letterSpacing, buttonText]}
              textColor={white}
              onPress={() => handleLogin()}
            >
              Sign In
            </Button>

            <View style={footerWrapper}>
              <Text style={footerText}>Don't have an account?</Text>
              <Button
                mode='text'
                textColor={accent}
                style={signUpButton}
                labelStyle={footerText}
                onPress={() => navigation.navigate('Sign Up')}
              >
                Sign Up
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>

      {forgotModal && (
        <Modal
          visible={forgotModal}
          onDismiss={() => setForgotModal(!forgotModal)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 10,
            borderRadius: 15,
          }}
        >
          {verify ? (
            <>
              <Text
                style={[
                  buttonText,
                  { textAlign: 'center', color: COLORS.black },
                ]}
              >
                Email Sent
              </Text>
              <Text
                style={{
                  fontFamily: FONT.regular,
                  marginTop: 10,
                  textAlign: 'center',
                  color: COLORS.black,
                }}
              >
                An email with instructions to reset your password has been sent
                to your registered email address.
              </Text>
              <Button
                mode='contained'
                uppercase
                style={button}
                labelStyle={[letterSpacing, buttonText]}
                textColor={white}
                onPress={() => handleCloseVerify()}
              >
                Close
              </Button>
            </>
          ) : (
            <>
              <Text style={[buttonText, { textAlign: 'center' }]}>
                Forgot Password
              </Text>
              <TextInput
                placeholder='Email'
                style={[input, { borderWidth: focusPassword }]}
                onChangeText={(text) => setForgotEmail(text)}
                value={forgotEmail}
              />
              {forgotError && (
                <Text
                  style={{
                    fontFamily: FONT.regular,
                    marginTop: 10,
                    color: COLORS.danger,
                    textAlign: 'center',
                  }}
                >
                  {forgotError}
                </Text>
              )}
              <Button
                mode='contained'
                uppercase
                style={button}
                labelStyle={[letterSpacing, buttonText]}
                textColor={white}
                onPress={() => handleForgot()}
              >
                Submit
              </Button>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default LoginScreen;
