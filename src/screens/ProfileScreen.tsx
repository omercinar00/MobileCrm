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
import { convertDateToNumber, formatDate } from '../utils';
import { UpdateUserRequest } from '../core/Models/UserInterfaces';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnFileChangeMobile } from '../uploadFile';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);
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
  const [uploadedDocument, setUploadedDocument] = useState<any>(null);

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
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        Alert.alert('Hata', error?.message || error);
      }
    };
    loadUser();
  }, []);

  const handleChangeImageFile = () => {
    setLoading(true);
    OnFileChangeMobile(
      '', // fileExplanation
      { ActivityType: '', ActivitySubType: '', ModuleName: 'ProfileImages' }, // willAddObject
      (tempFile: any, willUploadFile: any) => {
        setUploadedDocument(tempFile); // mobilde Base64 saklanacak
        setProfileImg(`data:image/jpeg;base64,${tempFile.Base64String}`); // önizleme
        setLoading(false);
      },
    );
  };

  const onUpdateUserInfo = async () => {
    try {
      // Zorunlu alan kontrolleri
      if (!name) return Alert.alert('Hata', 'Ad alanı zorunludur!');
      if (!surname) return Alert.alert('Hata', 'Soyad alanı zorunludur!');
      if (!birthDate) return Alert.alert('Hata', 'Doğum tarihi zorunludur!');
      if (!gsm) return Alert.alert('Hata', 'GSM alanı zorunludur!');
      if (!email) return Alert.alert('Hata', 'E-posta alanı zorunludur!');
      if (newPassword && newPassword !== repeatPassword)
        return Alert.alert('Hata', 'Yeni şifre ve şifre tekrarı aynı olmalı!');

      setLoading(true);

      // Dosya yükleme
      console.log(
        '🚀 ~ onUpdateUserInfo ~ uploadedDocument:',
        uploadedDocument,
      );
      if (uploadedDocument) {
        await projectManagementAndCRMCore.services.fileService.uploadFile({
          UserName: currentUserInfo.UserName,
          Request: uploadedDocument,
        });
      }
      const year = new Date().getFullYear();

      const profielImg_ =
        uploadedDocument && Object.keys(uploadedDocument).length > 0
          ? `\\${year}\\ProfileImages\\${uploadedDocument.FileName}${uploadedDocument.FileExtension}`
          : null;
      const updatedData: UpdateUserRequest = {
        Oid: currentUserInfo.Oid,
        Name: name,
        SurName: surname,
        UserName: currentUserInfo.UserName,
        Password: newPassword,
        TitleCode: currentUserInfo.TitleCode,
        BirthDay: convertDateToNumber(birthDate),
        Email: email,
        Gender: currentUserInfo.Gender,
        IsActive: currentUserInfo.IsActive,
        CompanyOid: currentUserInfo.CompanyOid,
        UserOid: currentUserInfo.UserOid,
        RoleCode: currentUserInfo.RoleCode,
        Gsm: gsm,
        ProfileImageUrl: profielImg_ || currentUserInfo.ProfileImageUrl,
      };

      console.log('🚀 ~ onUpdateUserInfo ~ updatedData:', updatedData);
      await projectManagementAndCRMCore.services.authServices.updateUser(
        updatedData,
      );
      Alert.alert('Başarılı', 'Profil bilgileri başarıyla güncellendi.');
    } catch (e: any) {
      Alert.alert('Hata', e?.message || e);
    } finally {
      setLoading(false);
    }
  };

  // YÜKLENİYOR ekranı
  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 10, color: theme.text }}>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageContainer}>
        <Pressable onPress={handleChangeImageFile}>
          <Image
            source={
              profileImg
                ? { uri: profileImg }
                : require('../assets/applogo.png')
            }
            style={[styles.profileImage, { borderColor: theme.primary }]}
          />
          <View
            style={[
              styles.editIconContainer,
              { backgroundColor: theme.background + '80' },
            ]}
          >
            <MaterialIcons name="edit" size={24} color={theme.text} />
          </View>
        </Pressable>
      </View>

      <View style={styles.formContainer}>
        {[
          { placeholder: 'Adı', value: name, setter: setName },
          { placeholder: 'Soyadı', value: surname, setter: setSurname },
          {
            placeholder: 'Doğum Tarihi',
            value: birthDate,
            setter: setBirthDate,
          },
          {
            placeholder: 'Ünvan',
            value: title,
            setter: () => {},
            editable: false,
          },
          {
            placeholder: 'Gsm',
            value: gsm,
            setter: setGsm,
            keyboardType: 'phone-pad',
          },
          {
            placeholder: 'Email',
            value: email,
            setter: setEmail,
            keyboardType: 'email-address',
          },
          {
            placeholder: 'Yeni Şifre',
            value: newPassword,
            setter: setNewPassword,
            secureTextEntry: true,
          },
          {
            placeholder: 'Şifre Tekrar',
            value: repeatPassword,
            setter: setRepeatPassword,
            secureTextEntry: true,
          },
        ].map((field, idx) => (
          <TextInput
            key={idx}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.text },
            ]}
            placeholder={field.placeholder}
            placeholderTextColor={theme.placeholder}
            value={field.value}
            onChangeText={field.setter}
            editable={field.editable !== false}
            keyboardType={field.keyboardType}
            secureTextEntry={field.secureTextEntry}
          />
        ))}

        <Pressable
          onPress={onUpdateUserInfo}
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Güncelle</Text>
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
  },
  editIconContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: { gap: 15 },
  input: {
    borderWidth: 1,
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
});
