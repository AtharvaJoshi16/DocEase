/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RegisterScreen } from './app/src/screens/RegisterScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RegisterScreen />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}

export default App;
