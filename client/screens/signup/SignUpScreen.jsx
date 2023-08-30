import { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../styles/signup';
import { COLORS } from '../../constants';

const RegisterScreen = ({ navigation }) => {
  const { primary, black, white, accent } = COLORS;
  const {
    container,
    bannerWrapper,
    bannerHeader,
    bannerDescription,
    registerWrapper,
    mb,
    button,
    letterSpacing,
    footerWrapper,
    footerText,
    buttonText,
    signUpButton,
    input,
  } = styles;
  const theme = {
    colors: {
      primary: black,
      background: primary,
    },
    roundness: 999,
  };

  const [focusName, setFocusName] = useState(1);
  const [focusEmail, setFocusEmail] = useState(1);
  const [focusPassword, setFocusPassword] = useState(1);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(1);

  return (
    <SafeAreaView style={container}>
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
          onBlur={() => setFocusName(1)}
          style={[input, { borderWidth: focusName }]}
        />
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
        <TextInput
          secureTextEntry
          placeholder='Confirm Password'
          onFocus={() => setFocusConfirmPassword(2)}
          onBlur={() => setFocusConfirmPassword(1)}
          style={[input, { borderWidth: focusConfirmPassword }]}
        />
        <Button
          uppercase
          style={button}
          labelStyle={[letterSpacing, buttonText]}
          textColor={white}
        >
          Submit
        </Button>
        <View style={footerWrapper}>
          <Text style={footerText}>Already have an account?</Text>
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
  );
};

export default RegisterScreen;
