import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Avatar,
  Card,
  Text,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import projectManagementAndCRMCore from '../core';
import { TitleListResponse } from '../core/Models/ParameterInterfaces';
import { useTheme } from '../theme/ThemeContext';

const GeneralInfoScreen = () => {
  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const { theme } = useTheme(); // ✅ aktif tema
  const isDarkMode = theme.background === '#121212';

  interface UserDetail {
    Oid: number;
    Createdate: number;
    LastUpdatedDate: number;
    Name: string;
    SurName: string;
    UserName: string;
    Password: string;
    TitleCode: number;
    Birthday: number;
    Email: string;
    Gender: string;
    Gsm: string;
    IsActive: boolean;
    IsLocked: boolean | null;
    IsDelete: boolean | null;
    CompanyOid: number;
    UserOid: number;
    RoleCode: number;
    ProfileImageUrl: string | null;
  }

  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [titleList, setTitleList] = useState<TitleListResponse[]>([]);

  const stats = [
    { title: 'Toplam Hata', value: [1, 2, 3].length },
    { title: 'Toplam Talep', value: [1, 2].length },
    { title: 'Çözülen Hata', value: [1].length },
    { title: 'Çözülen Talep', value: [1, 2, 3, 4].length },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserDetail = await AsyncStorage.getItem('userDetail');
        if (storedUserDetail) {
          const parsedDetail = JSON.parse(storedUserDetail);
          setUserDetail(parsedDetail);
          const titles =
            await projectManagementAndCRMCore.services.parameterServices.getTitleList();
          setTitleList(titles);

          if (parsedDetail.profileImg) {
            setProfileImg(parsedDetail.profileImg);
          }
        }
      } catch (err) {
        console.log('AsyncStorage error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Profil */}
      <View style={styles.profileContainer}>
        <Avatar.Image
          size={120}
          source={
            profileImg ? { uri: profileImg } : require('../assets/applogo.png')
          }
          style={{
            backgroundColor: isDarkMode
              ? 'rgba(255,255,255,0.1)' // koyu tema için hafif açık gri
              : 'rgba(0,0,0,0.05)', // açık tema için çok hafif gri
          }}
        />
        <Text style={[styles.userName, { color: theme.text }]}>
          {userDetail
            ? `${userDetail.Name} ${userDetail.SurName}`
            : 'Kullanıcı'}
        </Text>
        <Text style={[styles.userTitle, { color: theme.text }]}>
          {userDetail && titleList.length
            ? titleList.find(t => t.TitleCode === userDetail.TitleCode)
                ?.TitleName
            : 'Unvan yok'}
        </Text>
      </View>

      {/* Kartlar */}
      <View style={styles.cardsContainer}>
        {stats.map((item, index) => (
          <Card
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: theme.cardBackground,
                shadowColor: theme.shadowColor,
              },
            ]}
          >
            <Card.Content>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.cardValue, { color: theme.primary }]}>
                {item.value}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button textColor={theme.primary}>Detay</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userTitle: {
    fontSize: 14,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 12,
  },
  cardTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardValue: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default GeneralInfoScreen;
