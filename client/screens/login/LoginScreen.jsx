import { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';
import { Avatar, Button, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// import * as Facebook from 'expo-auth-session/providers/facebook';
// import * as WebBrowser from 'expo-web-browser';

// WebBrowser.maybeCompleteAuthSession();

import styles from '../../styles/login';
import { COLORS } from '../../constants';

const LoginScreen = ({ navigation }) => {
  // const [user, setUser] = useState(null);
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
  } = styles;

  const [focusEmail, setFocusEmail] = useState(1);
  const [focusPassword, setFocusPassword] = useState(1);

  return (
    <SafeAreaView style={container}>
      <Avatar.Image
        size={150}
        style={{ backgroundColor: 'transparent' }}
        source={require('../../assets/images/logo.png')}
      />

      <View style={loginWrapper}>
        <TextInput
          placeholder='Email'
          onFocus={() => setFocusEmail(2)}
          onBlur={() => setFocusEmail(1)}
          style={[input, { borderWidth: focusEmail }]}
        />
        <TextInput
          secureTextEntry
          placeholder='Password'
          onFocus={() => setFocusPassword(2)}
          onBlur={() => setFocusPassword(1)}
          style={[input, { borderWidth: focusPassword }]}
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
            icon={() => <FontAwesome5 name='google' size={24} color={black} />}
            mode='outlined'
            style={[noBorderRadius, mb, socialButton]}
            contentStyle={buttonContent}
            labelStyle={buttonLabel}
            textColor={black}
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
  );
};

export default LoginScreen;
