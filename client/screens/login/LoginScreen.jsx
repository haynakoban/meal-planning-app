import { StyleSheet, View } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
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
          style={styles.textInput}
          // value={password}
          // onChangeText={handlePasswordChange}
        />
        <TextInput
          label='Password:'
          secureTextEntry
          mode='outlined'
          style={[styles.textInput, { marginTop: 4 }]}
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
          // onPress={() => }
        >
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loginWrapper: {
    padding: 24,
    width: '100%',
  },
  textInput: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    width: '45%',
    borderRadius: 0,
    alignSelf: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
});
export default LoginScreen;
