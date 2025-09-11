import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { db, storage } from '../../../configs/firebase';

export default class FirebaseService {
  getInstitutionInfoList = async (): Promise<any[]> => {
    const categoryCollectionRef = collection(db, 'InstitutionInfo');
    const querySnapshot = await getDocs(query(categoryCollectionRef));
    return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
  };

  deleteFileByUrl = async (fileUrl: string) => {
    try {
      const storage = getStorage();
      const filePath = decodeURIComponent(
        fileUrl.split('/o/')[1].split('?')[0],
      );
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  saveInstitutionInfo = async (saveData: any, logoDocument: any) => {
    const categoryCollectionRef = collection(db, 'InstitutionInfo');
    const storage = getStorage();
    let logoUrl = '';
    let logoInfo = {};
    if (logoDocument && !logoDocument.FileUrl) {
      const newFileRef = ref(storage, `Logo/${logoDocument.FileName}`);
      await uploadBytes(newFileRef, logoDocument.File);
      const fileUrl = await getDownloadURL(newFileRef);
      logoUrl = fileUrl;
      logoInfo = {
        ...logoDocument,
        FileUrl: fileUrl,
        FilePath: `Logo/${logoDocument.FileName}`,
      };
    } else if (logoDocument) {
      logoUrl = logoDocument.FileUrl;
      logoInfo = logoDocument;
    }

    await addDoc(categoryCollectionRef, {
      ...saveData,
      logoUrl,
      LogoInfo: logoInfo,
    });
  };

  updateInstitutionInfo = async (saveData: any, logoDocument: any) => {
    const categoryCollectionRef = doc(db, 'InstitutionInfo', saveData.id);
    const storage = getStorage();
    let logoUrl = '';
    let logoInfo = {};
    if (logoDocument && !logoDocument.FileUrl) {
      const newFileRef = ref(storage, `Logo/${logoDocument.FileName}`);
      await uploadBytes(newFileRef, logoDocument.File);
      const fileUrl = await getDownloadURL(newFileRef);
      logoUrl = fileUrl;
      logoInfo = {
        ...logoDocument,
        FileUrl: fileUrl,
        FilePath: `Logo/${logoDocument.FileName}`,
      };
    } else if (logoDocument) {
      logoUrl = logoDocument.FileUrl;
      logoInfo = logoDocument;
    }

    await updateDoc(categoryCollectionRef, {
      ...saveData,
      logoUrl,
      LogoInfo: logoInfo,
    });
  };

  updateInstitutionInfoSignessDocuments = async (
    id: string,
    documentList: any[],
  ) => {
    const categoryCollectionRef = doc(db, 'InstitutionInfo', id);
    const operationUserId = await EncryptedStorage.getItem('UserId');
    const operationUserName = await EncryptedStorage.getItem('UserName');

    await updateDoc(categoryCollectionRef, {
      DocumentList: documentList,
      OperationUserId: operationUserId,
      OperationUserName: operationUserName,
    });
  };

  getInstitutionInfoById = async (docId: string) => {
    const docRef = doc(db, 'InstitutionInfo', docId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists())
      return { ...docSnapshot.data(), id: docSnapshot.id };
    return null;
  };
}
