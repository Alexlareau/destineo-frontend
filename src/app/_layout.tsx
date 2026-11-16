import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { getOrCreateInstallationToken } from '@/services/installation-profile';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  useEffect(() => {
    getOrCreateInstallationToken()
    .then((token) => {
      console.log('Installation token:', token);
    })
    .catch((error) => {
      console.error('Error getting or creating installation token:', error);
    });
  }, []);

  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
