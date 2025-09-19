import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Item = { label: string; value: any };

type Props = {
  items: Item[];
  selectedValue: any;
  onValueChange: (value: any) => void;
  placeholder?: string;
};

export default function SearchablePicker({
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Kullanıcı Seçiniz...',
}: Props) {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  useEffect(() => {
    setFilteredItems(
      items.filter(i =>
        i.label.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText, items]);

  const selectedLabel = items.find(i => i.value === selectedValue)?.label;

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.shadowColor,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: selectedValue ? theme.text : theme.placeholder }}>
          {selectedLabel || placeholder}
        </Text>

        {selectedValue && (
          <TouchableOpacity
            onPress={() => onValueChange(null)}
            style={{
              position: 'absolute',
              right: 10,
              top: 5,
              padding: 6, // dokunmayı kolaylaştırmak için
            }}
          >
            <Text
              style={{
                color: theme.errorText,
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              ×
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          style={[
            styles.modalBackground,
            { backgroundColor: theme.shadowColor + '55' },
          ]}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme.background },
            ]}
          >
            <TextInput
              placeholder="Ara..."
              placeholderTextColor={theme.placeholder}
              style={[
                styles.searchInput,
                { color: theme.text, borderBottomColor: theme.shadowColor },
              ]}
              value={searchText}
              onChangeText={setSearchText}
            />
            <FlatList
              data={filteredItems}
              keyExtractor={item => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    { borderBottomColor: theme.shadowColor },
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                    setSearchText('');
                  }}
                >
                  <Text style={{ color: theme.text }}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
            <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                  backgroundColor: theme.inputBackground,
                },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={{
                  color: theme.primary,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                Kapat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '91%',
    maxHeight: '70%',
    borderRadius: 10,
    padding: 5,
  },
  searchInput: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 5,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
