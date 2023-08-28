import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Avatar.Image
        size={150}
        style={{ backgroundColor: 'transparent' }}
        source={require('../../assets/images/logo.png')}
      />

      <View style={styles.loginWrapper}>
        <TextInput
          label='Email:'
          mode='outlined'
          style={styles.mb}
          theme={{
            colors: {
              primary: '#000000', // Border color on focus
              background: '#F5EBEB', // Background color
            },
            roundness: 999,
          }}
          // value={password}
          // onChangeText={handlePasswordChange}
        />
        <TextInput
          label='Password:'
          secureTextEntry
          mode='outlined'
          theme={{
            colors: {
              primary: '#000000', // Border color on focus
              background: '#F5EBEB', // Background color
            },
            roundness: 999,
          }}
          // value={password}
          // onChangeText={handlePasswordChange}
        />

        <Button
          mode='text'
          textColor='#000'
          style={[styles.forgotPassword]}
          // onPress={() => }
        >
          Forgot your password?
        </Button>

        <Button
          mode='contained'
          uppercase
          style={[styles.button]}
          labelStyle={styles.letterSpacing}
          textColor='#FFF'
          // onPress={() => }
        >
          Sign In
        </Button>

        <View style={styles.dividerWrapper}>
          <Divider style={styles.divider} bold />
          <Text style={styles.connectText}>or connect with</Text>
          <Divider style={styles.divider} bold />
        </View>
        <View style={styles.socialWrapper}>
          <Button
            icon={() => (
              <FontAwesome5 name='facebook' size={24} color='#000000' />
            )}
            mode='outlined'
            style={[styles.noBorderRadius, styles.mb, styles.socialButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            textColor='#000000'
          >
            Continue with Facebook
          </Button>
          <Button
            icon={() => (
              <FontAwesome5 name='google' size={24} color='#000000' />
            )}
            mode='outlined'
            style={[styles.noBorderRadius, styles.mb, styles.socialButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            textColor='#000000'
          >
            Continue with Google
          </Button>
          <Button
            icon={() => <FontAwesome5 name='apple' size={24} color='#000000' />}
            mode='outlined'
            style={[styles.noBorderRadius, styles.mb, styles.socialButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            textColor='#000000'
          >
            Continue with Apple
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Don't have an account?</Text>
          <Button
            mode='text'
            textColor='#00A8E8'
            style={{ marginLeft: -8 }}
            onPress={() => navigation.navigate('Sign Up')}
          >
            Sign Up
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5EBEB',
  },
  loginWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
  },
  mb: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#00A8E8',
    letterSpacing: '2px',
    paddingVertical: 3,
    borderRadius: 999,
  },
  letterSpacing: {
    letterSpacing: 1,
  },
  noBorderRadius: {
    borderRadius: 0,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  dividerWrapper: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  divider: {
    flex: 1,
  },
  connectText: {
    marginHorizontal: 8,
  },
  socialWrapper: {
    marginTop: 24,
  },
  socialButton: {
    paddingHorizontal: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonLabel: {
    paddingVertical: 4,
    flex: 1,
  },
});
export default LoginScreen;
