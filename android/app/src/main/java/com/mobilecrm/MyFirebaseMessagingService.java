package com.mobilecrm;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.util.Log;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    // Uygulama background veya kill state’de mesaj geldiğinde tetiklenir
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d("FCM", "Message received: " + remoteMessage.getData());

        // Burada istersen local notification gösterme kodu da ekleyebilirsin
        // Ama Notifee JS tarafında zaten setBackgroundMessageHandler ile handle ediyor
    }

    // FCM token yenilendiğinde tetiklenir
    @Override
    public void onNewToken(String token) {
        Log.d("FCM", "Yeni token: " + token);
        // Token'ı backend’e kaydet
    }
}
