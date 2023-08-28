import { View } from 'react-native';
import { Avatar, Button, Divider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from '../../styles/login';
import { COLORS } from '../../constants';

const LoginScreen = ({ navigation }) => {
  const { primary, black, white, accent } = COLORS;
  const theme = {
    colors: {
      primary: black,
      background: primary,
    },
    roundness: 999,
  };

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
  } = styles;

  return (
    <SafeAreaView style={container}>
      <Avatar.Image
        size={150}
        style={{ backgroundColor: 'transparent' }}
        source={require('../../assets/images/logo.png')}
      />

      <View style={loginWrapper}>
        <TextInput label='  Email:' mode='outlined' style={mb} theme={theme} />
        <TextInput
          label='  Password:'
          secureTextEntry
          mode='outlined'
          theme={theme}
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
