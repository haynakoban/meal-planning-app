import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    MThin: require('./assets/fonts/Montserrat-Thin.ttf'),
    MExtraLight: require('./assets/fonts/Montserrat-ExtraLight.ttf'),
    MLight: require('./assets/fonts/Montserrat-Light.ttf'),
    MRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    MBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MExtraBold: require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    MBlack: require('./assets/fonts/Montserrat-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer fallback={<></>}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
