// DocumentListMobile.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import projectManagementAndCRMCore from '../core';

interface DocumentListMobileProps {
  documents: any[];
}

const getFileIcon = (extension: string) => {
  switch (extension?.toLowerCase()) {
    case '.pdf':
      return 'file-pdf';
    case '.doc':
    case '.docx':
      return 'file-word';
    case '.xls':
    case '.xlsx':
    case '.csv':
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

export default function DocumentListMobile({
  documents,
}: DocumentListMobileProps) {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openDocument = async (doc: any) => {
    try {
      const ext = doc.FileExtension?.replace('.', '').toLowerCase();
      if (!ext) return;

      // Servis çağrısıyla Base64 veya web URL alın
      const serviceDocument: any =
        await projectManagementAndCRMCore.services.fileService.getFileByOid(
          doc.Oid,
        );

      const base64Data = serviceDocument?.Base64String;
      const fileUrl = serviceDocument?.FileUrl;

      // Resimler → modal ile aç
      if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
        if (base64Data) {
          setSelectedImage(`data:image/*;base64,${base64Data}`);
          setModalVisible(true);
        } else if (fileUrl) {
          Linking.openURL(fileUrl);
        } else {
          Alert.alert('Hata', 'Resim bulunamadı.');
        }
        return;
      }

      // PDF/Word/Excel → mobilde uyarı + web yönlendirme
      Alert.alert(
        'Bilgi',
        'Bu dosya mobilde açılamıyor. Webde görüntülemek ister misiniz?',
        [
          { text: 'Hayır', style: 'cancel' },
          {
            text: 'Evet',
            onPress: () => {
              if (fileUrl) {
                Linking.openURL(fileUrl);
              } else if (base64Data) {
                // Blob oluşturup webde aç
                const bytes = atob(base64Data);
                const out = new Uint8Array(bytes.length);
                for (let i = 0; i < bytes.length; i++)
                  out[i] = bytes.charCodeAt(i);

                let mimeType = 'application/octet-stream';
                if (ext === 'pdf') mimeType = 'application/pdf';
                else if (['xls', 'xlsx', 'csv'].includes(ext))
                  mimeType = 'application/vnd.ms-excel';
                else if (['doc', 'docx'].includes(ext))
                  mimeType =
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

                const blob = new Blob([out], { type: mimeType });
                const url = URL.createObjectURL(blob);
                Linking.openURL(url);
              } else {
                Alert.alert('Hata', 'Dosya bulunamadı.');
              }
            },
          },
        ],
      );
    } catch (err) {
      console.log(err);
      Alert.alert('Hata', 'Dosya açılamadı.');
    }
  };

  return (
    <View>
      {documents?.length > 0 ? (
        documents.map((doc, index) => (
          <TouchableOpacity
            key={doc.Oid || index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.cardBackground,
              padding: 10,
              marginVertical: 5,
              borderRadius: 5,
            }}
            onPress={() => openDocument(doc)}
          >
            <MaterialCommunityIcons
              name={getFileIcon(doc.FileExtension)}
              size={24}
              color={theme.primary}
            />
            <Text style={{ color: theme.text, marginLeft: 10 }}>
              {doc.FileDisplayname || doc.OriginalFilename}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={{ color: theme.text, padding: 10 }}>
          Henüz döküman yok
        </Text>
      )}

      {/* Modal ile resim önizleme */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        />
        <Image
          source={{ uri: selectedImage || '' }}
          style={styles.modalImage}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000088',
  },
  modalImage: {
    backgroundColor: '#00000088',
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
