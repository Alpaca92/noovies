import React, { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([
    /* require('path/to/other.png') */
  ]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Root />
    </NavigationContainer>
  );
}
