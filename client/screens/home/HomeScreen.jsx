import React from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [password, setPassword] = React.useState('');

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };
  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label='Password'
        secureTextEntry
        mode='outlined'
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Button
        style={{ margin: 2 }}
        mode='contained'
        uppercase
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>
      <Button
        style={{ margin: 2 }}
        mode='contained'
        uppercase
        onPress={() => navigation.navigate('Sign Up')}
      >
        Sign Up
      </Button>
    </View>
  );
};

export default HomeScreen;
