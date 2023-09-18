import React, { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === 'dark';
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
