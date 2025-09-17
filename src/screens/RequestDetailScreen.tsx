import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Button, Avatar } from 'react-native-paper';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../theme/ThemeContext';

interface RequestDetailScreenProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  taskList?: any;
  item?: any;
  taskNoteList?: any[];
  uploadedDocumentList?: any[];
  taskHistoryList?: any[];
  navigation?: any;
}

function RequestDetailScreen({
  taskList,
  taskNoteList = [],
  uploadedDocumentList = [],
  taskHistoryList = [],
  navigation,
}: RequestDetailScreenProps) {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'details', title: 'Detaylar' },
    { key: 'history', title: 'Talep Geçmişi' },
    { key: 'documents', title: 'Dökümanlar' },
  ]);

  const screenWidth = Dimensions.get('window').width;
  const [commentText, setCommentText] = useState('');

  const DetailsRoute = () => (
    <KeyboardAwareFlatList
      data={taskNoteList}
      keyExtractor={item => item.Oid.toString()}
      ListHeaderComponent={
        <View>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Talep Bilgileri
          </Text>
          <Text style={{ color: theme.text }}>{`Talep No: ${
            taskList?.TaskNo || '-'
          }`}</Text>
          <Text style={{ color: theme.text }}>{`Talep Başlığı: ${
            taskList?.TaskTitle || '-'
          }`}</Text>
          <Text style={{ color: theme.text }}>{`Talebin Sahibi: ${
            taskList?.CreatedUserName || '-'
          }`}</Text>
          <Text style={{ color: theme.text }}>{`Kurum: ${
            taskList?.CompanyName || '-'
          }`}</Text>

          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Talep Açıklaması
          </Text>
          <TextInput
            value={taskList?.TaskExplanation || ''}
            editable={false}
            multiline
            style={[
              styles.taskExplanation,
              { backgroundColor: theme.cardBackground, color: theme.text },
            ]}
          />

          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Yorumlar
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.commentContainer}>
          <Avatar.Image size={35} source={{ uri: item.userAvatarUrl }} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={[styles.commentUser, { color: theme.primary }]}>
              {item.userName}
            </Text>
            <Text style={[styles.commentDate, { color: theme.text }]}>
              {item.date}
            </Text>
            <Text style={{ color: theme.text }}>{item.note}</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ marginVertical: 10, color: theme.text }}>
          Bu Talep İçin Henüz Yorum Girilmedi!
        </Text>
      }
      ListFooterComponent={
        <View style={{ padding: 10 }}>
          <TextInput
            placeholder="Yorum ekle..."
            placeholderTextColor={theme.text + '88'}
            value={commentText}
            onChangeText={setCommentText}
            style={[
              styles.addCommentInput,
              { backgroundColor: theme.inputBackground, color: theme.text },
            ]}
          />
          <Button
            mode="contained"
            onPress={() => {
              console.log('Yorum eklendi:', commentText);
              setCommentText('');
            }}
            style={{ marginTop: 5, backgroundColor: theme.primary }}
            textColor="#fff"
          >
            Ekle
          </Button>
        </View>
      }
      contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
    />
  );

  const HistoryRoute = () => (
    <KeyboardAwareFlatList
      data={taskHistoryList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View
          style={[
            styles.historyItem,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <Text style={[styles.historyText, { color: theme.text }]}>
            {item.date}
          </Text>
          <Text style={[styles.historyText, { color: theme.text }]}>
            {item.action}
          </Text>
          <Text style={[styles.historyText, { color: theme.text }]}>
            {item.user}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ color: theme.text }}>Henüz geçmiş kaydı yok</Text>
      }
      contentContainerStyle={{ padding: 10 }}
    />
  );

  const DocumentsRoute = () => (
    <KeyboardAwareFlatList
      data={uploadedDocumentList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View
          style={[styles.docItem, { backgroundColor: theme.cardBackground }]}
        >
          <Text style={{ color: theme.text }}>{item.fileName}</Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ color: theme.text }}>Henüz döküman yok</Text>
      }
      contentContainerStyle={{ padding: 10 }}
    />
  );

  const renderScene = SceneMap({
    details: DetailsRoute,
    history: HistoryRoute,
    documents: DocumentsRoute,
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.primary, height: 3 }}
            style={{ backgroundColor: theme.primary }}
            labelStyle={{ fontWeight: '600', color: '#fff' }}
          />
        )}
      />
      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={{ margin: 10, borderColor: theme.primary }}
        textColor={theme.primary}
      >
        Kapat
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  taskExplanation: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    minHeight: 100,
    borderRadius: 5,
  },
  commentContainer: { flexDirection: 'row', marginVertical: 8 },
  commentUser: { fontWeight: 'bold' },
  commentDate: { fontSize: 12 },
  addCommentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 5,
    marginVertical: 5,
  },
  historyText: { marginBottom: 2 },
  docItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default RequestDetailScreen;
