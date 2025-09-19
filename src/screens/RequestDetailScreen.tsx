import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Button, Avatar } from 'react-native-paper';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import {
  convertInstitutionOidToName,
  convertModuleOidToName,
  convertPriorityCodeToName,
  convertProjectOidToName,
  convertTaskStatusCodeToName,
  convertUserOidToName,
  formatDate2,
} from '../utils';
import RenderHTML from 'react-native-render-html';
import DocumentListMobile from '../components/DocumentListMobile';
interface RequestDetailScreenProps {
  navigation?: any;
  route?: any;
}

function RequestDetailScreen({ navigation, route }: RequestDetailScreenProps) {
  const { detailData = {}, allPageServices = {} } = route?.params || {};
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'details', title: 'Detaylar' },
    { key: 'history', title: 'Talep Geçmişi' },
    { key: 'documents', title: 'Dökümanlar' },
  ]);
  const screenWidth = Dimensions.get('window').width;
  const [commentText, setCommentText] = useState('');

  // Array veriler
  const comments = detailData || [];
  const history = (detailData?.TaskDetailList || []).slice().reverse();
  const documents = detailData?.TaskDocumentList || [];

  // Talep bilgileri için iki sütunlu yapı
  const infoItems = [
    {
      icon: 'arrow-forward',
      label: 'Talebin Sahibi',
      value: convertUserOidToName(
        detailData?.CreatedUserOid,
        allPageServices.userList,
      ),
    },
    {
      icon: 'home',
      label: 'Kurum',
      value: convertInstitutionOidToName(
        detailData?.CompanyOid,
        allPageServices.institutionList,
      ),
    },
    {
      icon: 'file-copy',
      label: 'Proje',
      value: convertProjectOidToName(
        detailData?.ProjectOid,
        allPageServices.projectList,
      ),
    },
    {
      icon: 'info',
      label: 'Durumu',
      value: convertTaskStatusCodeToName(
        detailData?.TaskStatusCode,
        allPageServices.requestStatus,
      ),
    },
    {
      icon: 'content-paste',
      label: 'Öncelik',
      value: convertPriorityCodeToName(
        Number.parseInt(detailData?.Priority),
        allPageServices.priorityList,
      ),
    },
    {
      icon: 'query-builder',
      label: 'Th. Bitiş Tarihi',
      value: detailData?.EndDate,
    },
    {
      icon: 'web',
      label: 'Modül / Sayfa',
      value: convertModuleOidToName(
        detailData?.ModuleOid,
        allPageServices.moduleList,
      ),
    },
    {
      icon: 'person',
      label: 'İletilen Personel',
      value: convertUserOidToName(
        detailData?.SendUserOid,
        allPageServices.userList,
      ),
    },
  ];

  const getFileIcon = (extension: string) => {
    switch (extension.toLowerCase()) {
      case '.pdf':
        return 'file-pdf';
      case '.doc':
      case '.docx':
        return 'file-word';
      case '.xls':
      case '.xlsx':
        return 'file-excel';
      case '.png':
      case '.jpg':
      case '.jpeg':
      case '.gif':
        return 'file-image';
      default:
        return 'file';
    }
  };
  const { width } = useWindowDimensions();

  const DetailsRoute = () => (
    <KeyboardAwareFlatList
      data={comments}
      keyExtractor={(item, index) => item?.Oid?.toString() || index.toString()}
      ListHeaderComponent={
        <View>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Talep Bilgileri
          </Text>

          {/* İki sütunlu talep bilgileri */}
          <View style={styles.infoContainer}>
            {infoItems.map((item, idx) => (
              <View key={idx} style={styles.infoItem}>
                <MaterialIcons
                  name={item.icon as any}
                  size={20}
                  color="#2499E3"
                />
                <View style={{ marginLeft: 6 }}>
                  <Text style={[styles.infoLabel, { color: theme.primary }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.infoValue, { color: theme.text }]}>
                    {item.value || '-'}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Talep Açıklaması
          </Text>
          <RenderHTML
            contentWidth={width}
            source={{ html: detailData?.TaskExplanation || '<p>-</p>' }}
            baseStyle={{
              color: theme.text,
              backgroundColor: theme.cardBackground,
              padding: 10,
              borderRadius: 5,
              minHeight: 100,
            }}
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
            placeholderTextColor={theme.placeholder}
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
      data={history}
      keyExtractor={(item, index) => item?.Oid?.toString() || index.toString()}
      renderItem={({ item, index }) => (
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          {/* Timeline çizgisi ve nokta */}
          <View style={{ alignItems: 'center', width: 40 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: theme.primary,
              }}
            />
            {index !== history.length - 1 && (
              <View
                style={{
                  width: 2,
                  flex: 1,
                  backgroundColor: theme.primary,
                  marginTop: 2,
                }}
              />
            )}
          </View>

          {/* İçerik */}
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={{ color: theme.text, fontStyle: 'italic' }}>
              {convertUserOidToName(
                item.CreatedUserOid,
                allPageServices.userList,
              )}{' '}
              &gt;&gt;{' '}
              {convertUserOidToName(item.SendUserOid, allPageServices.userList)}
            </Text>
            <Text style={{ color: theme.text }}>{item.Description}</Text>
            <Text style={{ color: theme.primary, fontWeight: '600' }}>
              {formatDate2(item.CreatedDate)}
            </Text>
          </View>
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ color: theme.text }}>Henüz geçmiş kaydı yok</Text>
      }
      contentContainerStyle={{ padding: 10 }}
    />
  );

  const DocumentsRoute = () => <DocumentListMobile documents={documents} />;

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
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoLabel: { fontWeight: '600' },
  infoValue: {},
});

export default RequestDetailScreen;
