import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
      const token = await AsyncStorage.getItem(this.namespace);

    return token ? JSON.parse(token) : [];
  }

  async setAccessToken(accessToken) {
      return await AsyncStorage.setItem(this.namespace, JSON.stringify(accessToken));
  }

  async removeAccessToken() {
      await AsyncStorage.removeItem(this.namespace);
    // Remove the access token from the storage
  }
}

export default AuthStorage;