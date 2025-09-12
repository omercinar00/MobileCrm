import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import projectManagementAndCRMCore from '../core';

// Utils
export function convertIntToDateTime(value: any): string {
  if (!value) return 'Bulunmadı';
  const str = value.toString();
  const year = +str.substr(0, 4);
  const month = +str.substr(4, 2) - 1; // JS ayları 0-11
  const day = +str.substr(6, 2);
  const hour = +str.substr(8, 2);
  const min = +str.substr(10, 2);
  return new Date(year, month, day, hour, min).toLocaleString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function convertPriorityCodeToName(
  priorityCode: string,
  priorityList: any,
) {
  const item = priorityList.find((p: any) => p.ParameterCode === priorityCode);
  return item ? item.ParameterName : '';
}

export function convertTaskStatusCodeToName(
  statusCode: number,
  statusList: any,
) {
  const item = statusList.find((s: any) => s.ParameterCode === statusCode);
  return item ? item.ParameterName : '';
}

export function getPriorityColor(priorityCode: string) {
  switch (priorityCode) {
    case '1':
      return '#2E7D32'; // Düşük
    case '2':
      return '#F9A825'; // Orta
    case '3':
      return '#C62828'; // Yüksek
    default:
      return '#757575';
  }
}

// Sabit listeler
const priorityList = [
  { ParameterCode: '1', ParameterName: 'Düşük' },
  { ParameterCode: '2', ParameterName: 'Orta' },
  { ParameterCode: '3', ParameterName: 'Yüksek' },
];

const statusList = [
  { ParameterCode: 1, ParameterName: 'Aktif' },
  { ParameterCode: 2, ParameterName: 'Kapalı' },
];

export default function AllRequestErrorListScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const queryRequest: any = {};
    queryRequest.IsActive = true;
    let errorAndTaskList_ =
      await projectManagementAndCRMCore.services.taskAndErrorService.getTaskAndErrorListByCriteria(
        queryRequest,
      );

    // Son gelen en üstte olacak şekilde No'ya göre sıralıyoruz
    errorAndTaskList_ = errorAndTaskList_.sort((a: any, b: any) => b.No - a.No);

    setData(errorAndTaskList_);
    setLoading(false);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: theme.cardBackground }]}
      onPress={() => {
        if (item.Type === '1') {
          navigation.navigate('ErrorDetail', { item }); // Hata için ayrı detay sayfası
        } else {
          navigation.navigate('RequestDetail', { item }); // Talep için ayrı detay sayfası
        }
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.text }]}>
          #{item.No} - {item.Title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {item.Type === '1' ? 'Hata' : 'Talep'} |{' '}
          {convertIntToDateTime(item.CreatedDate)}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Kimin: {item.CreatedUserName}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: getPriorityColor(item.Priority),
          padding: 8,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: '#fff' }}>
          {convertPriorityCodeToName(item.Priority, priorityList)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {loading && <ActivityIndicator size="large" color={theme.primary} />}

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Filtrele</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={item => item.Oid.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Detay Modal */}
      <Modal visible={!!selectedItem} animationType="slide">
        <ScrollView style={{ padding: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            {selectedItem?.Title}
          </Text>
          <Text style={{ marginVertical: 6 }}>
            Tip: {selectedItem?.Type === '1' ? 'Hata' : 'Talep'}
          </Text>
          <Text style={{ marginVertical: 6 }}>
            Durum:{' '}
            {convertTaskStatusCodeToName(selectedItem?.StatusCode, statusList)}
          </Text>
          <Text style={{ marginVertical: 6 }}>
            Önem:{' '}
            {convertPriorityCodeToName(selectedItem?.Priority, priorityList)}
          </Text>
          <Text style={{ marginVertical: 6 }}>
            Kimin oluşturduğu: {selectedItem?.CreatedUserName}
          </Text>
          <Text style={{ marginVertical: 6 }}>
            Tarih: {convertIntToDateTime(selectedItem?.CreatedDate)}
          </Text>

          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.primary }]}
            onPress={() => setSelectedItem(null)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Kapat</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* Filtre Modal */}
      <Modal visible={filterModalVisible} animationType="slide">
        <ScrollView style={{ padding: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Filtreler</Text>
          {/* Buraya Picker / DatePicker / RadioButton ekle */}
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.primary }]}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Uygula / Kapat
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  filterButton: {
    backgroundColor: '#5898F1',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
});
