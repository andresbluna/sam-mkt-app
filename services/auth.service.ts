import { apiClient } from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.getInstance().post<AuthResponse>('/auth/login', credentials);
      
      console.log('=== AuthService: Login Response ===');
      console.log('response.data:', response.data);
      console.log('response.data.user:', response.data.user);
      console.log('response.data.user?.id:', response.data.user?.id);
      console.log('====================================');
      
      await this.saveAuthData(response.data);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.getInstance().post<AuthResponse>('/auth/register', data);
      
      await this.saveAuthData(response.data);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      apiClient.clearAuthToken();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async saveAuthData(data: AuthResponse): Promise<void> {
    try {
      if (data.access_token) {
        await AsyncStorage.setItem('authToken', data.access_token);
        apiClient.setAuthToken(data.access_token);
      }
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  }

  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error retrieving stored user:', error);
      return null;
    }
  }

  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error retrieving stored token:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    return !!token;
  }
}

export const authService = new AuthService();


