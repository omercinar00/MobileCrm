import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/theme/ThemeContext';
import projectManagementAndCRMCore from './src/core';
import notifee from '@notifee/react-native';

import screensConfig from './screensAppConfig.json';
// Screens importları
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AllListScreen from './src/screens/AllListScreen';
import RequestsScreen from './src/screens/RequestsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ErrorDetailScreen from './src/screens/ErrorDetailScreen';
import RequestDetailScreen from './src/screens/RequestDetailScreen';
import GeneralInfoScreen from './src/screens/GeneralInfoScreen';
import UsersScreen from './src/screens/UsersScreen';
import { initFCM } from './src/notifications/notifications';
import { BackHandler, ToastAndroid } from 'react-native';

const Stack = createNativeStackNavigator();

const componentMap: Record<string, any> = {
  LoginScreen,
  HomeScreen,
  ProfileScreen,
  AllListScreen,
  RequestsScreen,
  SettingsScreen,
  ErrorDetailScreen,
  RequestDetailScreen,
  GeneralInfoScreen,
  UsersScreen,
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');

  // --- APP INIT ---
  useEffect(() => {
    const initApp = async () => {
      const user = await AsyncStorage.getItem('user');
      setInitialRoute(user ? 'Home' : 'Login');

      // FCM başlat
      await initFCM();

      setIsLoading(false);
    };

    initApp();
  }, []);

  // --- BACK BUTTON HANDLER ---
  useEffect(() => {
    let backPressed = 0;

    const backAction = () => {
      // Navigation state al
      const currentRouteIndex = useNavigationState?.index ?? 0;

      // Eğer HomeScreen'deyse
      if (currentRouteIndex === 0 && initialRoute === 'Home') {
        if (backPressed === 0) {
          backPressed++;
          ToastAndroid.show('Çıkmak için tekrar basın', ToastAndroid.SHORT);
          setTimeout(() => (backPressed = 0), 2000); // 2 saniye içinde tekrar basılırsa çıkış
          return true; // uygulamayı hemen kapatma
        }
        BackHandler.exitApp(); // ikinci basışta kapat
        return true;
      }

      return false; // normal navigasyon çalışsın
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [initialRoute]);

  // --- FOREGROUND POLLING FOR NEW TASK/ERROR ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let previousCount = 0;

    const startPolling = async () => {
      try {
        const storedUserDetail = await AsyncStorage.getItem('userDetail');
        if (!storedUserDetail) return;
        const parsedDetail = JSON.parse(storedUserDetail);
        const queryRequest: any = { UserOid: parsedDetail.Oid };

        // İlk fetch
        if (previousCount === 0) {
          const initialList =
            await projectManagementAndCRMCore.services.taskAndErrorService.getUserTaskAndErrorListByCriteria(
              queryRequest,
            );
          previousCount = initialList.length;
        }

        const list =
          await projectManagementAndCRMCore.services.taskAndErrorService.getUserTaskAndErrorListByCriteria(
            queryRequest,
          );

        if (previousCount != null && list.length > previousCount) {
          const newCount = list.length - previousCount;

          // Foreground bildirimi
          await notifee.displayNotification({
            title: 'Yeni Talep/Hata!',
            body: `${newCount} yeni talep veya hata eklendi.`,
            android: { channelId: 'default', smallIcon: 'ic_launcher' },
          });
        }

        previousCount = list.length;
      } catch (err) {
        console.log('Polling error:', err);
      }
    };

    interval = setInterval(startPolling, 10000); // 10 saniyede bir kontrol

    return () => clearInterval(interval);
  }, []);

  // --- RENDER ---
  if (isLoading)
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <SplashScreen onFinish={() => setIsLoading(false)} />
        </ThemeProvider>
      </SafeAreaProvider>
    );

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            {screensConfig.map(screen => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                component={componentMap[screen.component]}
                options={{
                  headerShown: screen.headerShown,
                  headerTitle: screen.headerTitle || screen.name,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
