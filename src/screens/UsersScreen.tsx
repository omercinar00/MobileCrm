import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import projectManagementAndCRMCore from '../core';
import { UserResponse } from '../core/Models/UserInterfaces';

export default function UsersScreen() {
  const { theme } = useTheme();
  const isDarkMode = theme.background === '#121212';

  const [users, setUsers] = useState<UserResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // loading state eklendi

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse =
          await projectManagementAndCRMCore.services.authServices.getUserList();

        const usersWithAvatars = await Promise.all(
          userResponse.map(async (user: UserResponse) => {
            let avatar = null;
            if (user.ProfileImageUrl) {
              try {
                const profileFile =
                  await projectManagementAndCRMCore.services.fileService.getFileByPath(
                    user.ProfileImageUrl,
                  );
                if (profileFile?.Base64String) {
                  avatar = `data:image/jpeg;base64,${profileFile.Base64String}`;
                }
              } catch (err: any) {
                Alert.alert(`Profil resmi yüklenemedi: ${user.Name}`, err);
              }
            }
            return { ...user, avatar };
          }),
        );

        const sortedUsers = sortUsersAlphabetically(usersWithAvatars);
        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      } catch (error) {
        Alert.alert('Hata', 'Kullanıcıları alırken bir hata oluştu.');
      } finally {
        setLoading(false); // veri yüklenince loading false
      }
    };

    fetchUsers();
  }, []);

  const sortUsersAlphabetically = (usersList: UserResponse[]) =>
    [...usersList].sort((a, b) => {
      const nameA = `${a.Name} ${a.SurName}`.toLowerCase();
      const nameB = `${b.Name} ${b.SurName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

  const handleCall = (phoneNumber?: string) => {
    if (!phoneNumber) {
      Alert.alert('Hata', 'Telefon numarası bulunamadı.');
      return;
    }
    const formattedNumber = phoneNumber.startsWith('0')
      ? phoneNumber
      : `0${phoneNumber}`;
    Linking.openURL(`tel:${formattedNumber}`).catch(() =>
      Alert.alert('Hata', 'Arama başlatılamadı'),
    );
  };

  const normalizeNumber = (num?: string) => {
    if (!num) return '';
    return num.replace(/^0+/, '');
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const lowerText = text.toLowerCase();
    const normalizedText = normalizeNumber(text);

    const filtered = users.filter(user => {
      const fullName = `${user.Name} ${user.SurName}`.toLowerCase();
      const gsm = normalizeNumber(user.Gsm);
      return fullName.includes(lowerText) || gsm.includes(normalizedText);
    });

    setFilteredUsers(filtered);
  };

  const renderUser = ({
    item,
  }: {
    item: UserResponse & { avatar?: string };
  }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? '#2C2C2C' : '#F9F9F9' },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          if (item.avatar) {
            setSelectedImage(item.avatar);
            setModalVisible(true);
          }
        }}
      >
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <Image
            source={require('../assets/applogo.png')}
            style={styles.avatar}
          />
        )}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#1E1E1E' }]}>
          {item.Name} {item.SurName}
        </Text>
        {item.Gsm && (
          <Text style={[styles.phone, { color: isDarkMode ? '#CCC' : '#555' }]}>
            {item.Gsm.startsWith('0') ? item.Gsm : `0${item.Gsm}`}
          </Text>
        )}
        {item.Email && (
          <Text style={[styles.email, { color: isDarkMode ? '#CCC' : '#555' }]}>
            {item.Email}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => handleCall(item.Gsm)}>
        <MaterialIcons name="call" size={28} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );

  // YÜKLENİYOR ekranı
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 10, color: theme.text }}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDarkMode ? '#2C2C2C' : '#F0F0F0' },
        ]}
      >
        <MaterialIcons
          name="search"
          size={22}
          color={isDarkMode ? '#CCC' : '#555'}
        />
        <TextInput
          style={[styles.searchInput, { color: isDarkMode ? '#FFF' : '#000' }]}
          placeholder="İsim veya numara ara"
          placeholderTextColor={theme.placeholder}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.Oid.toString()}
        renderItem={renderUser}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          />
          <Image
            source={{ uri: selectedImage || '' }}
            style={styles.modalImage}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 15,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: '600' },
  phone: { fontSize: 14, marginTop: 2 },
  email: { fontSize: 14, marginTop: 2, fontStyle: 'italic' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000088',
  },
  modalImage: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
