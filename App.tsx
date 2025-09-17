import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/theme/ThemeContext';
import projectManagementAndCRMCore from './src/core';
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

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
      // Kullanıcı kontrolü
      const user = await AsyncStorage.getItem('user');
      setInitialRoute(user ? 'Home' : 'Login');

      // Notifee izin iste
      await notifee.requestPermission();

      // Android kanal oluştur
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // FCM token al
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // Backend’e token kaydet

      // Foreground FCM listener
      messaging().onMessage(async remoteMessage => {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'Yeni Talep/Hata!',
          body: remoteMessage.notification?.body || 'Yeni talep/hata geldi.',
          android: { channelId: 'default', smallIcon: 'ic_launcher' },
        });
      });

      setIsLoading(false);
    };

    initApp();
  }, []);

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
