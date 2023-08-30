import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';
import { Avatar, Button, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../styles/login';
import { COLORS } from '../../constants';

const LoginScreen = ({ navigation }) => {
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
