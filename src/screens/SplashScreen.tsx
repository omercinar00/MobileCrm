import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet, Alert, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Alert.alert(
          'İnternet Yok',
          'Lütfen internet bağlantınızı kontrol edin.',
        );
      }
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(onFinish);
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
      <Image
        source={require('../assets/logo.png')} // logo yolunu kendi dosyana göre değiştir
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.splashTitle}>BELSOFT CRM</Text>
      <Text style={styles.splashTitle2}>Proje Yönetim Sistemi</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  splashTitle: { fontSize: 36, color: '#fff', fontWeight: 'bold' },
  splashTitle2: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
});
