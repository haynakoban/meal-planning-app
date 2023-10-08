import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../constants';

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
      <ActivityIndicator animating={true} color={COLORS.accent} />
    </View>
  );
}

export default LoadingScreen;
