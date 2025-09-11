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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/ThemeContext'; // theme context yolu

export default function LoginScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Kaydedilmiş kullanıcı bilgilerini yükle
  useEffect(() => {
    const loadCredentials = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      const savedPass = await AsyncStorage.getItem('password');
      if (savedUser && savedPass) {
        setUsername(savedUser);
        setPassword(savedPass);
        setRememberMe(true);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMsg('Lütfen kullanıcı adı ve şifre girin.');
      return;
    }

    try {
      const user = 'aaa';
      // await projectManagementAndCRMCore.services.authServices.login(
      //   username,
      //   password,
      // );
      console.log('🚀 ~ handleLogin ~ user:', user);

      if (rememberMe) {
        await AsyncStorage.setItem('user', username);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('password');
      }

      // Kullanıcı bilgilerini saklayabiliriz (token yoksa userId vs.)
      //   await AsyncStorage.setItem('userOid', user.userOid.toString());

      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'Giriş başarısız');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={[styles.mainTitle, { color: theme.primary }]}>
        Giriş Yap
      </Text>
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

      {/* Remember Me Switch */}
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
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Giriş</Text>
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
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  input: {
    borderWidth: 1,
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: { color: 'red', marginBottom: 10 },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 12,
  },
});
