import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAwFTaqBohclPyOtCSTjpo3mHu8zRA6Fg0',
  authDomain: 'belsoft-mayor-mobile-app.firebaseapp.com',
  projectId: 'belsoft-mayor-mobile-app',
  storageBucket: 'belsoft-mayor-mobile-app.appspot.com',
  messagingSenderId: '657058636423',
  appId: '1:657058636423:web:2fece8ca45615549560e22',
  measurementId: 'G-WGC2P4H2EB',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
