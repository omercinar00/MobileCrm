import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }: any) {
  const handleLogout = async () => {
    const rememberMe = await AsyncStorage.getItem('rememberMe');
    if (rememberMe !== 'true') {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('password');
    }
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Hoşgeldiniz!</Text>
      <Pressable
        style={styles.button}
        onPress={() => Alert.alert('Yeni Müşteri')}
      >
        <Text style={styles.buttonText}>Yeni Müşteri Ekle</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => Alert.alert('Raporlar')}>
        <Text style={styles.buttonText}>Raporlar</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => Alert.alert('Ayarlar')}>
        <Text style={styles.buttonText}>Ayarlar</Text>
      </Pressable>
      <Pressable
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e90ff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
