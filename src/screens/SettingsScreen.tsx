import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import packageJson from '../../package.json';

interface SettingItemProps {
  title: string;
  description?: string;
  icon: string;
  type: 'switch' | 'button';
  value?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
}

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme.background === '#121212';
  const [sliderValue, setSliderValue] = useState(isDarkMode ? 1 : 0);

  const handleChangePassword = () => {
    Alert.alert('Şifre Değiştir', 'Şifre değiştirme sayfası açılacak.');
  };

  const handleProfileEdit = () => {
    Alert.alert('Profil Düzenle', 'Profil düzenleme sayfası açılacak.');
  };

  const settingsData: SettingItemProps[] = [
    {
      title: 'Tema',
      description: 'Light / Dark Mod',
      icon: 'dark-mode',
      type: 'switch',
      value: isDarkMode,
      onToggle: toggleTheme,
    },
    {
      title: 'Profil Düzenle',
      icon: 'account-circle',
      type: 'button',
      onPress: handleProfileEdit,
    },
    {
      title: 'Şifre Değiştir',
      icon: 'lock',
      type: 'button',
      onPress: handleChangePassword,
    },
    {
      title: 'Uygulama Versiyonu',
      icon: 'info',
      type: 'button',
      onPress: () => Alert.alert('Versiyon', packageJson.version),
    },
  ];

  const renderItem = ({ item }: { item: SettingItemProps }) => {
    return (
      <TouchableOpacity
        style={[
          styles.settingCard,
          { backgroundColor: isDarkMode ? '#2C2C2C' : '#F9F9F9' },
        ]}
        activeOpacity={item.type === 'button' ? 0.7 : 1}
        onPress={item.type === 'button' ? item.onPress : undefined}
      >
        <View style={styles.settingLeft}>
          <MaterialIcons
            name={item.icon}
            size={28}
            color={isDarkMode ? '#FFF' : '#1E1E1E'}
          />
          <View style={{ marginLeft: 15 }}>
            <Text
              style={[
                styles.settingTitle,
                { color: isDarkMode ? '#FFF' : '#1E1E1E' },
              ]}
            >
              {item.title}
            </Text>
            {item.description && (
              <Text
                style={[
                  styles.settingDescription,
                  { color: isDarkMode ? '#CCC' : '#555' },
                ]}
              >
                {item.description}
              </Text>
            )}
          </View>
        </View>

        {item.type === 'switch' && (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#767577', true: theme.primary }}
            thumbColor={item.value ? '#fff' : '#f4f3f4'}
          />
        )}
        {item.type === 'button' && (
          <MaterialIcons
            name="keyboard-arrow-right"
            size={28}
            color={isDarkMode ? '#FFF' : '#888'}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#FFF' },
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>
        Ayarlar
      </Text>
      <FlatList
        data={settingsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingTitle: { fontSize: 18, fontWeight: '600' },
  settingDescription: { fontSize: 14, marginTop: 2 },
});
