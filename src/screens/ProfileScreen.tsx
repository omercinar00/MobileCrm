import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import projectManagementAndCRMCore from '../core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate } from '../utils';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [currentUserInfo, setCurrentUserInfo] = useState<any>(null);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [title, setTitle] = useState('');
  const [gsm, setGsm] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const storedUserDetail = await AsyncStorage.getItem('userDetail');
        const parsedUser = storedUserDetail
          ? JSON.parse(storedUserDetail)
          : null;
        const titles =
          await projectManagementAndCRMCore.services.parameterServices.getTitleList();
        const userData =
          await projectManagementAndCRMCore.services.authServices.getUserInfoByUserOid(
            parsedUser?.Oid,
          );
        if (userData && userData.length > 0) {
          const currentUser = userData[0];
          setCurrentUserInfo(currentUser);
          setName(currentUser.Name);
          setSurname(currentUser.SurName);
          setBirthDate(formatDate(currentUser.Birthday?.toString() || ''));
          setTitle(
            titles.find(t => t.TitleCode === currentUser.TitleCode)
              ?.TitleName || '',
          );
          setGsm(currentUser.Gsm || '');
          setEmail(currentUser.Email || '');
          if (currentUser.ProfileImageUrl) {
            const profileFile =
              await projectManagementAndCRMCore.services.fileService.getFileByPath(
                currentUser.ProfileImageUrl,
              );
            setProfileImg(`data:image/jpeg;base64,${profileFile.Base64String}`);
          }
        }
      } catch (e: any) {
        Alert.alert('Hata', e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const onUpdateUserInfo = async () => {
    try {
      setLoading(true);

      // --- Zorunlu alan kontrolleri ---
      if (!name) {
        Alert.alert('Hata', 'Ad alanı zorunludur!');
        setLoading(false);
        return;
      }
      if (!surname) {
        Alert.alert('Hata', 'Soyad alanı zorunludur!');
        setLoading(false);
        return;
      }
      if (!birthDate) {
        Alert.alert('Hata', 'Doğum tarihi zorunludur!');
        setLoading(false);
        return;
      }
      if (!gsm) {
        Alert.alert('Hata', 'GSM alanı zorunludur!');
        setLoading(false);
        return;
      }
      if (!email) {
        Alert.alert('Hata', 'E-posta alanı zorunludur!');
        setLoading(false);
        return;
      }

      if (currentUserInfo) {
        if (newPassword && newPassword !== repeatPassword) {
          Alert.alert('Hata', 'Yeni şifre ve şifre tekrarı aynı olmalı!');
          setLoading(false);
          return;
        }

        const updatedData = {
          ...currentUserInfo,
          Name: name,
          SurName: surname,
          BirthDay: birthDate,
          Gsm: gsm,
          Email: email,
          Password: newPassword || currentUserInfo.Password,
          ProfileImageUrl: profileImg || currentUserInfo.ProfileImageUrl,
        };

        await projectManagementAndCRMCore.services.authServices.updateUser(
          updatedData,
        );
        Alert.alert('Başarılı', 'Profil bilgileri başarıyla güncellendi.');
      }

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      Alert.alert('Hata', e?.message || e);
    }
  };

  if (loading) {
    return (
      <View
        style={[styles.loaderContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            profileImg ? { uri: profileImg } : require('../assets/applogo.png')
          }
          style={styles.profileImage}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Adı"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Soyadı"
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Doğum Tarihi"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Ünvan"
          value={title}
          editable={false}
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Gsm"
          value={gsm}
          onChangeText={setGsm}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Yeni Şifre"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Şifre Tekrar"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
        />

        <Pressable
          onPress={onUpdateUserInfo}
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  formContainer: { gap: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
