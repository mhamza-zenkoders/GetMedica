import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RootStack from './src/navigation/RootStack';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigationRef} from './src/utils/navigation';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/theme';

const App = () => {
  // const {bottom}=useSafeAreaInsets()
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
      <NavigationContainer ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
      <Toast config={toastConfig(100)}/>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
