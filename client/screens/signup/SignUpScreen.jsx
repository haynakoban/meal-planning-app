import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 700 }}>
          Create Your Account
        </Text>
        <Text>Please enter info to create account</Text>
      </View>

      <View style={styles.registerWrapper}>
        <TextInput
          label='Full Name:'
          mode='outlined'
          style={styles.mb}
          theme={{
            colors: {
              primary: '#000000',
              background: '#F5EBEB',
            },
            roundness: 999,
          }}
          // value={password}
          // onChangeText={handlePasswordChange}
        />
        <TextInput
          label='Email:'
          mode='outlined'
          style={styles.mb}
          theme={{
            colors: {
              primary: '#000000',
              background: '#F5EBEB',
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
          style={styles.mb}
          theme={{
            colors: {
              primary: '#000000',
              background: '#F5EBEB',
            },
            roundness: 999,
          }}
          // value={password}
          // onChangeText={handlePasswordChange}
        />
        <TextInput
          label='Confirm Password:'
          secureTextEntry
          mode='outlined'
          style={styles.mb}
          theme={{
            colors: {
              primary: '#000000',
              background: '#F5EBEB',
            },
            roundness: 999,
          }}
          // value={password}
          // onChangeText={handlePasswordChange}
        />
        <Button
          mode='contained'
          uppercase
          style={[styles.button]}
          labelStyle={styles.letterSpacing}
          textColor='#FFF'
          // onPress={() => }
        >
          Submit
        </Button>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Already have an account?</Text>
          <Button
            mode='text'
            textColor='#00A8E8'
            style={{ marginLeft: -8 }}
            onPress={() => navigation.navigate('Login')}
          >
            Sign In
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
    backgroundColor: '#F5EBEB',
  },
  registerWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
    marginTop: 8,
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
});
export default RegisterScreen;
