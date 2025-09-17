import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext';
import projectManagementAndCRMCore from '../core';

export default function LoginScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      const savedPass = await AsyncStorage.getItem('password');
      const savedRememberMe = await AsyncStorage.getItem('rememberMe');

      if (savedUser && savedPass && savedRememberMe === 'true') {
        setUsername(savedUser);
        setPassword(savedPass);
        setRememberMe(true);
      } else {
        setUsername('');
        setPassword('');
        setRememberMe(false);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMsg('Lütfen kullanıcı adı ve şifre girin.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const userDetail =
        await projectManagementAndCRMCore.services.authServices.login(
          username,
          password,
        );

      if (rememberMe) {
        await AsyncStorage.setItem('user', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('userDetail', JSON.stringify(userDetail));
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('userDetail');
        await AsyncStorage.setItem('rememberMe', 'false'); // unutma!
      }
      if (userDetail) {
        navigation.replace('Home');
      } else {
        setErrorMsg('Giriş başarısız. Bilgilerinizi kontrol edin.');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={[styles.title, { color: theme.primary }]}>Giriş Yap</Text>

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <TextInput
        placeholder="Kullanıcı Adı"
        placeholderTextColor={theme.text + '99'}
        value={username}
        onChangeText={setUsername}
        style={[
          styles.input,
          { borderColor: theme.primary, color: theme.text },
        ]}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Şifre"
        placeholderTextColor={theme.text + '99'}
        value={password}
        onChangeText={setPassword}
        style={[
          styles.input,
          { borderColor: theme.primary, color: theme.text },
        ]}
        secureTextEntry
      />

      <View style={styles.rememberContainer}>
        <Text style={{ color: theme.text, fontSize: 16 }}>Beni Hatırla</Text>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          thumbColor={rememberMe ? theme.primary : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      <Pressable
        style={[
          styles.button,
          { backgroundColor: loading ? theme.primary + '88' : theme.primary },
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Giriş Yapılıyor...' : 'Giriş'}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 15,
  },
});
