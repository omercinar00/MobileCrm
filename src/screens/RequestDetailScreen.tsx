import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import {
  convertIntToDateTime,
  convertPriorityCodeToName,
  convertTaskStatusCodeToName,
} from '../utils';
import projectManagementAndCRMCore from '../core';
import { GeneralParameters } from '../constants/parameters';

export default function RequestDetailScreen({ route }: any) {
  const { theme } = useTheme();
  const { item } = route.params;

  const [statusList, setStatusList] = useState<any[]>([]);
  const [priorityList, setPriorityList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const requestStatusList =
        await projectManagementAndCRMCore.services.parameterServices.getGeneralParameterList(
          GeneralParameters.REQUEST_STATUS,
        );
      setStatusList(requestStatusList || []);

      const priorityList_ =
        await projectManagementAndCRMCore.services.parameterServices.getGeneralParameterList(
          GeneralParameters.PRIORITY,
        );
      setPriorityList(priorityList_ || []);
    } catch (error) {
      console.log('RequestDetail fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Basit HTML temizleme
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        #{item.No} - {item.Title}
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Tip: {item.Type === '1' ? 'Hata' : 'Talep'}
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Durum: {convertTaskStatusCodeToName(item.StatusCode, statusList)}
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Önem: {convertPriorityCodeToName(item.Priority, priorityList)}
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Kimin oluşturduğu: {item.CreatedUserName}
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Tarih: {convertIntToDateTime(item.CreatedDate)}
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Açıklama: {item.Explanation ? stripHtml(item.Explanation) : 'Bulunmadı'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 6 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
