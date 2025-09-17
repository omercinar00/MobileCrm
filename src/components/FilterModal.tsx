import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filterType: string | null;
  setFilterType: (value: string | null) => void;
  filterStatus: number | null;
  setFilterStatus: (value: number | null) => void;
  filterPriority: string | null;
  setFilterPriority: (value: string | null) => void;
  applyFilters: () => void;
  priorityList: { ParameterCode: string; ParameterName: string }[];
  statusList: { ParameterCode: number; ParameterName: string }[];
}

export default function FilterModal({
  visible,
  onClose,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  applyFilters,
  priorityList,
  statusList,
}: FilterModalProps) {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={{ padding: 16, backgroundColor: theme.background }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
          Filtreler
        </Text>

        {/* Tip */}
        <Text style={{ fontWeight: 'bold', marginVertical: 6 }}>Tip</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {['1', '2'].map(t => (
            <TouchableOpacity
              key={t}
              onPress={() => setFilterType(t === filterType ? null : t)}
              style={{
                padding: 10,
                marginRight: 10,
                borderRadius: 6,
                backgroundColor:
                  filterType === t ? theme.primary : theme.cardBackground,
              }}
            >
              <Text style={{ color: filterType === t ? '#fff' : theme.text }}>
                {t === '1' ? 'Hata' : 'Talep'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Durum */}
        <Text style={{ fontWeight: 'bold', marginVertical: 6 }}>Durum</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {statusList.map(s => (
            <TouchableOpacity
              key={s.ParameterCode}
              onPress={() =>
                setFilterStatus(
                  s.ParameterCode === filterStatus ? null : s.ParameterCode,
                )
              }
              style={{
                padding: 10,
                marginRight: 10,
                borderRadius: 6,
                backgroundColor:
                  filterStatus === s.ParameterCode
                    ? theme.primary
                    : theme.cardBackground,
              }}
            >
              <Text
                style={{
                  color: filterStatus === s.ParameterCode ? '#fff' : theme.text,
                }}
              >
                {s.ParameterName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Öncelik */}
        <Text style={{ fontWeight: 'bold', marginVertical: 6 }}>Önem</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {priorityList.map(p => (
            <TouchableOpacity
              key={p.ParameterCode}
              onPress={() =>
                setFilterPriority(
                  p.ParameterCode === filterPriority ? null : p.ParameterCode,
                )
              }
              style={{
                padding: 10,
                marginRight: 10,
                borderRadius: 6,
                backgroundColor:
                  filterPriority === p.ParameterCode
                    ? theme.primary
                    : theme.cardBackground,
              }}
            >
              <Text
                style={{
                  color:
                    filterPriority === p.ParameterCode ? '#fff' : theme.text,
                }}
              >
                {p.ParameterName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Uygula / Kapat */}
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: theme.primary }]}
          onPress={applyFilters}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Uygula / Kapat
          </Text>
        </TouchableOpacity>

        {/* Sadece Kapat */}
        <TouchableOpacity
          style={[
            styles.closeButton,
            { backgroundColor: theme.cardBackground, marginTop: 10 },
          ]}
          onPress={onClose}
        >
          <Text style={{ color: theme.text, fontWeight: 'bold' }}>İptal</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
});
