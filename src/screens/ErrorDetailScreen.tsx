import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Button, Avatar } from 'react-native-paper';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

interface ErrorDetailScreenProps {
  taskList?: any;
  taskNoteList?: any[];
  uploadedDocumentList?: any[];
  taskHistoryList?: any[];
  navigation?: any;
}

const ErrorDetailScreen: React.FC<ErrorDetailScreenProps> = ({
  taskList,
  taskNoteList = [],
  uploadedDocumentList = [],
  taskHistoryList = [],
  navigation,
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'details', title: 'Detaylar' },
    { key: 'history', title: 'Hata Geçmişi' },
    { key: 'documents', title: 'Dökümanlar' },
  ]);

  const screenWidth = Dimensions.get('window').width;
  const [commentText, setCommentText] = useState('');

  const DetailsRoute = () => (
    <KeyboardAwareFlatList
      data={taskNoteList}
      keyExtractor={item => item.Oid.toString()}
      ListHeaderComponent={
        <>
          <Text style={styles.sectionTitle}>Hata Bilgileri</Text>
          <Text>{`Hata No: ${taskList?.TaskNo || '-'}`}</Text>
          <Text>{`Hata Başlığı: ${taskList?.TaskTitle || '-'}`}</Text>
          <Text>{`Talebin Sahibi: ${taskList?.CreatedUserName || '-'}`}</Text>
          <Text>{`Kurum: ${taskList?.CompanyName || '-'}`}</Text>

          <Text style={styles.sectionTitle}>Hata Açıklaması</Text>
          <TextInput
            value={taskList?.TaskExplanation || ''}
            editable={false}
            multiline
            style={styles.taskExplanation}
          />

          <Text style={styles.sectionTitle}>Yorumlar</Text>
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.commentContainer}>
          <Avatar.Image size={35} source={{ uri: item.userAvatarUrl }} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.commentUser}>{item.userName}</Text>
            <Text style={styles.commentDate}>{item.date}</Text>
            <Text>{item.note}</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ marginVertical: 10 }}>
          Bu Hata İçin Henüz Yorum Girilmedi!
        </Text>
      }
      ListFooterComponent={
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={80}
        >
          <TextInput
            placeholder="Yorum ekle..."
            value={commentText}
            onChangeText={setCommentText}
            style={styles.addCommentInput}
          />
          <Button
            mode="contained"
            onPress={() => {
              setCommentText('');
            }}
            style={{ marginTop: 5 }}
          >
            Ekle
          </Button>
        </KeyboardAvoidingView>
      }
      contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
    />
  );

  const HistoryRoute = () => (
    <KeyboardAwareFlatList
      data={taskHistoryList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>{item.date}</Text>
          <Text style={styles.historyText}>{item.action}</Text>
          <Text style={styles.historyText}>{item.user}</Text>
        </View>
      )}
      ListEmptyComponent={<Text>Henüz geçmiş kaydı yok</Text>}
      contentContainerStyle={{ padding: 10 }}
    />
  );

  const DocumentsRoute = () => (
    <KeyboardAwareFlatList
      data={uploadedDocumentList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.docItem}>
          <Text>{item.fileName}</Text>
        </View>
      )}
      ListEmptyComponent={<Text>Henüz döküman yok</Text>}
      contentContainerStyle={{ padding: 10 }}
    />
  );

  const renderScene = SceneMap({
    details: DetailsRoute,
    history: HistoryRoute,
    documents: DocumentsRoute,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#fff', height: 3 }}
            style={{ backgroundColor: '#2499E3' }}
            labelStyle={{ fontWeight: '600' }}
          />
        )}
      />
      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={{ margin: 10 }}
      >
        Kapat
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '600',
    color: '#2499E3',
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
    backgroundColor: '#f9f9f9',
  },
  commentContainer: { flexDirection: 'row', marginVertical: 8 },
  commentUser: { fontWeight: 'bold', color: '#2499E3' },
  commentDate: { fontSize: 12, color: '#aaa' },
  addCommentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyText: { marginBottom: 2 },
  docItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default ErrorDetailScreen;
