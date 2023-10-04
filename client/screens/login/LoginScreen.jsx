import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TextInput, ScrollView } from 'react-native';
import { Avatar, Button, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from '../../store/useAuthStore';
import axios from '../../lib/axiosConfig';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// import * as Facebook from 'expo-auth-session/providers/facebook';

WebBrowser.maybeCompleteAuthSession();

import styles from '../../styles/login';
import { COLORS } from '../../constants';

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [resquest, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '1081573021974-d8rectvr7ssg5eksinrtl29gmiv8vpdg.apps.googleusercontent.com',
    webClientId:
      '1081573021974-d8rectvr7ssg5eksinrtl29gmiv8vpdg.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    const user = await AsyncStorage.getItem('@user');

    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;

    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();

      // user variable meron siyang email and name jan na pwedeng gamitin for sign up
      // make a request from axios and after request store the data from axios in asyncstorage

      // await AsyncStorage.setItem('@user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  // const [resquest, response, promptAsync] = Facebook.useAuthRequest({
  //   clientId: '1646439895855834',
  // });

  // useEffect(() => {
  //   if (response && response.type == 'success' && response.authentication) {
  //     async () => {
  //       const userInfoResponse = await fetch(
  //         `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
  //       );
  //       const userInfo = await userInfoResponse.json();
  //       setUser(userInfo);
  //     };
  //   }
  // }, [response]);

  const handlePressAsync = async () => {
    // const result = await promptAsync();
    // if (result.type !== 'success') {
    //   alert('Uh oh, something went wrong!');
    //   return;
    // }

    console.log('fb login');
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
  const [focusEmail, setFocusEmail] = React.useState(1);
  const [focusPassword, setFocusPassword] = React.useState(1);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [err, setError] = React.useState('');

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='always'
    >
      <SafeAreaView style={container}>
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

          <View style={dividerWrapper}>
            <Divider style={divider} bold />
            <Text style={[connectText, footerText]}>or connect with</Text>
            <Divider style={divider} bold />
          </View>
          <View style={socialWrapper}>
            <Button
              onPress={handlePressAsync}
              icon={() => (
                <FontAwesome5 name='facebook' size={24} color={black} />
              )}
              mode='outlined'
              style={[noBorderRadius, mb, socialButton]}
              contentStyle={buttonContent}
              labelStyle={buttonLabel}
              textColor={black}
            >
              Continue with Facebook
            </Button>
            <Button
              icon={() => (
                <FontAwesome5 name='google' size={24} color={black} />
              )}
              mode='outlined'
              style={[noBorderRadius, mb, socialButton]}
              contentStyle={buttonContent}
              labelStyle={buttonLabel}
              textColor={black}
              onPress={() => promptAsync()}
            >
              Continue with Google
            </Button>
            <Button
              icon={() => <FontAwesome5 name='apple' size={24} color={black} />}
              mode='outlined'
              style={[noBorderRadius, mb, socialButton]}
              contentStyle={buttonContent}
              labelStyle={buttonLabel}
              textColor={black}
            >
              Continue with Apple
            </Button>
          </View>
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
  );
};

export default LoginScreen;
