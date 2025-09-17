/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

// --- Background FCM handler ---
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background FCM message received:', remoteMessage);

  // Android kanalı oluştur (yalnızca ilk seferde)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Bildirim göster
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Yeni Talep/Hata!',
    body: remoteMessage.notification?.body || 'Yeni talep/hata geldi.',
    android: { channelId, smallIcon: 'ic_launcher' },
  });
});

// App'i kaydet
AppRegistry.registerComponent(appName, () => App);
