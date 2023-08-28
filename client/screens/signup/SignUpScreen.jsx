import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
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
  } = styles;
  const theme = {
    colors: {
      primary: black,
      background: primary,
    },
    roundness: 999,
  };
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
          label='  Full Name'
          mode='outlined'
          style={mb}
          theme={theme}
        />
        <TextInput label='  Email' mode='outlined' style={mb} theme={theme} />
        <TextInput
          label='  Password'
          secureTextEntry
          mode='outlined'
          style={mb}
          theme={theme}
        />
        <TextInput
          label='  Confirm Password'
          secureTextEntry
          mode='outlined'
          style={mb}
          theme={theme}
        />
        <Button
          mode='contained'
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
