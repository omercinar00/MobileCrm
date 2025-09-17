import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DUPLICATE_KEY = 'lastNotificationIds';

// Bildirim daha önce gösterildi mi kontrol et
const isDuplicate = async (messageId: string) => {
  try {
    const stored = await AsyncStorage.getItem(DUPLICATE_KEY);
    const ids: string[] = stored ? JSON.parse(stored) : [];

    if (ids.includes(messageId)) {
      return true; // daha önce gösterilmiş
    }

    // Yeni id ekle (son 10 tanesini tutalım)
    const updated = [...ids, messageId].slice(-10);
    await AsyncStorage.setItem(DUPLICATE_KEY, JSON.stringify(updated));

    return false;
  } catch (err) {
    console.log('isDuplicate error:', err);
    return false;
  }
};

export const initFCM = async () => {
  await notifee.requestPermission();

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Token log
  const token = await messaging().getToken();
  console.log('FCM Token:', token);

  // Foreground listener
  messaging().onMessage(async remoteMessage => {
    if (!remoteMessage.messageId) return;

    const duplicate = await isDuplicate(remoteMessage.messageId);
    if (duplicate) {
      console.log('Duplicate notification skipped:', remoteMessage.messageId);
      return;
    }

    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'Yeni Talep/Hata!',
      body: remoteMessage.notification?.body || 'Yeni talep/hata geldi.',
      android: { channelId: 'default', smallIcon: 'ic_launcher' },
    });
  });
};
