import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        alignItems: 'center',
      }}
    >
      <ActivityIndicator animating={true} />
    </View>
  );
}

export default LoadingScreen;
