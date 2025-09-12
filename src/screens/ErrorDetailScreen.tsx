import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';

export default function ErrorDetailScreen() {
  const { theme } = useTheme();
  const route = useRoute();
  const { item }: any = route.params;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Hata Detayı</Text>
      <Text style={[styles.text, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.text, { color: theme.text }]}>{item.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 6 },
});
