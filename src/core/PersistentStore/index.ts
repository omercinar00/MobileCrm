import EncryptedStorage from 'react-native-encrypted-storage';
import { LOGIN_RESPONSE_KEY } from './Keys';

export default class PersistentStore {
  async clear() {
    await EncryptedStorage.clear();
  }

  async getItem(key: string) {
    const value = await EncryptedStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  async setItem(key: string, value: any) {
    if (value) {
      await EncryptedStorage.setItem(key, JSON.stringify(value));
    } else {
      await EncryptedStorage.removeItem(key);
    }
  }

  async getUser(): Promise<any | null> {
    // LoginResponse
    return this.getItem(LOGIN_RESPONSE_KEY);
  }

  async removeItem(key: string) {
    await EncryptedStorage.removeItem(key);
  }
}
