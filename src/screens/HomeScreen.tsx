import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import projectManagementAndCRMCore from '../core';
import menuItems from './menuConfig.json';

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [userDetail, setUserDetail] = useState<any>(null);
  const [userName, setUserName] = useState<string>('');
  const [profileImageUri, setProfileImageUri] = useState<string>('');
  const [loadingImage, setLoadingImage] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState(
    menuItems.sort((a, b) => a.title.localeCompare(b.title)),
  );

  // Kullanıcıyı yükle
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUserDetail = await AsyncStorage.getItem('userDetail');
        const storedRememberMe = await AsyncStorage.getItem('rememberMe');
        const parsedUser = storedUserDetail
          ? JSON.parse(storedUserDetail)
          : null;

        if (!parsedUser) return;

        setRememberMe(storedRememberMe === 'true');
        setUserDetail(parsedUser);
        setUserName(`${parsedUser.Name} ${parsedUser.SurName}`);

        if (parsedUser.ProfileImageUrl) {
          if (parsedUser.ProfileImageUrl) {
            const profileFile =
              await projectManagementAndCRMCore.services.fileService.getFileByPath(
                parsedUser.ProfileImageUrl,
              );
            setProfileImageUri(
              `data:image/jpeg;base64,${profileFile.Base64String}`,
            );
          }
        }
      } catch (error) {
        console.log('❌ loadUser error:', error);
      } finally {
        setLoadingImage(false);
      }
    };

    loadUser();
  }, []);

  // Arama ile filtreleme
  useEffect(() => {
    const filtered = menuItems.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredMenu(filtered);
  }, [searchText]);

  const renderMenuItem = ({ item }: any) => (
    <Pressable
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Icon name={item.icon} size={36} color="#fff" />
      <Text style={styles.cardText}>{item.title}</Text>
    </Pressable>
  );

  const handleLogout = async () => {
    if (!rememberMe) {
      await AsyncStorage.removeItem('userDetail');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('rememberMe');
    }
    setMenuVisible(false);
    navigation.replace('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Üst Header */}
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        {/* Sol Hamburger */}
        {/* <Pressable
          onPress={() => console.log('Hamburger açıldı')}
          style={styles.icon}
        >
          <Icon name="menu" size={28} color={theme.text} />
        </Pressable> */}

        {/* Arama */}
        <View
          style={[
            styles.searchWrapper,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.primary,
            },
          ]}
        >
          <Icon
            name="magnify"
            size={20}
            color={theme.text + '99'}
            style={{ marginHorizontal: 8 }}
          />
          <TextInput
            placeholder="Menülerde ara..."
            placeholderTextColor={
              theme.text === '#fff'
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(0,0,0,0.6)'
            }
            value={searchText}
            onChangeText={setSearchText}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>

        {/* Sağ Üç Nokta */}
        {/* Sağ Profil Resmi */}
        <Pressable onPress={() => setMenuVisible(true)} style={styles.icon}>
          {loadingImage ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <Image
              source={
                profileImageUri
                  ? { uri: profileImageUri }
                  : require('../assets/applogo.png')
              }
              style={{ width: 36, height: 36, borderRadius: 18 }}
            />
          )}
        </Pressable>
      </View>

      {/* Menü Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View />
        </Pressable>

        <View style={[styles.menuModal, { backgroundColor: theme.background }]}>
          <Pressable
            style={styles.modalItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('Profile');
            }}
          >
            <Icon
              name="account-circle"
              size={20}
              color={theme.text}
              style={styles.modalIcon}
            />
            <Text style={[styles.modalText, { color: theme.text }]}>
              Profil
            </Text>
          </Pressable>

          <Pressable
            style={styles.modalItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('Settings');
            }}
          >
            <Icon
              name="cog"
              size={20}
              color={theme.text}
              style={styles.modalIcon}
            />
            <Text style={[styles.modalText, { color: theme.text }]}>
              Ayarlar
            </Text>
          </Pressable>

          <Pressable style={styles.modalItem} onPress={handleLogout}>
            <Icon
              name="logout"
              size={20}
              color={theme.errorText}
              style={styles.modalIcon}
            />
            <Text style={[styles.modalText, { color: theme.errorText }]}>
              Çıkış Yap
            </Text>
          </Pressable>
        </View>
      </Modal>

      {/* Kullanıcı Bilgisi */}
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: theme.text }]}>{userName}</Text>
      </View>

      {/* Ana Menü */}
      <FlatList
        data={filteredMenu}
        renderItem={renderMenuItem}
        keyExtractor={item => item.title}
        numColumns={2}
        columnWrapperStyle={styles.menuContainer}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      />
      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: theme.cardBackground }]}>
        <Pressable
          style={[styles.footerButton, { backgroundColor: '#C62828' }]}
          onPress={() => navigation.navigate('ErrorCreate')}
        >
          <Text style={styles.footerButtonText}>Hata Gir</Text>
        </Pressable>
        <Pressable
          style={[styles.footerButton, { backgroundColor: '#2E7D32' }]}
          onPress={() => navigation.navigate('TaskCreate')}
        >
          <Text style={styles.footerButtonText}>Talep Gir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    height: 36,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  icon: { padding: 5 },
  menuContainer: { justifyContent: 'space-between', marginTop: 15 },
  card: {
    flex: 1,
    height: 140,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardText: { color: '#fff', fontSize: 18, fontWeight: '600', marginTop: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  menuModal: {
    position: 'absolute',
    top: 70,
    right: 10,
    width: 150,
    borderRadius: 8,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  modalIcon: {
    marginRight: 10,
  },
  modalText: { fontSize: 16 },
  userInfo: {
    alignItems: 'center',
    marginVertical: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  userName: { fontSize: 18, fontWeight: '600' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
