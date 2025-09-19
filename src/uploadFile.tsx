import { launchImageLibrary } from 'react-native-image-picker';
import dayjs from 'dayjs';
import { Alert } from 'react-native';

export function OnFileChangeMobile(
  fileExplanation: string,
  willAddObject: any,
  successCallback: any,
) {
  try {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {
          const msg = response.errorMessage || 'Resim seçilemedi';
          Alert.alert('Hata', msg);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const file = response.assets[0];
          const originalName = file.fileName || 'unknown_file';
          const fileExtension = `.${originalName.split('.').pop() || 'jpg'}`;
          const fileName = `${originalName.slice(
            0,
            originalName.length - fileExtension.length,
          )}_${dayjs().format('YYYYMMDDHHmmss')}`;

          const tempFile = {
            FileName: fileName,
            FileExtension: fileExtension,
            Extension: fileExtension,
            Length: file.fileSize,
            Base64String: file.base64,
            ProcessDate: dayjs().format(),
            FileExplanation: fileExplanation,
            Oid: 0,
            ...willAddObject,
          };

          const willUploadFile = {
            IsActive: true,
            FileName: fileName,
            Title: fileName,
            OriginalFileName: fileName,
            FileExtension: fileExtension,
            Extension: fileExtension,
            FileFullPath: '',
            IsConverted: false,
            TemporaryFileName: fileName,
            FileExplanation: fileExplanation,
            Oid: 0,
            ...willAddObject,
          };

          Alert.alert('Başarılı', 'Dosya seçildi.');
          successCallback(tempFile, willUploadFile);
        }
      },
    );
  } catch (e: any) {
    const msg = 'Dosya yükleme sırasında bir hata oluştu.';
    Alert.alert('Hata', msg);
  }
}