import { apiClient } from './api';
import { User } from '@/types';

class UserService {
  async getUser(userId: number): Promise<User> {
    try {
      const response = await apiClient.getInstance().get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.getInstance().patch<User>(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async uploadProfileImage(userId: number, imageUri: string): Promise<User> {
    try {
      const formData = new FormData();
      
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      formData.append('profileImage', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      } as any);

      const updateResponse = await apiClient.getInstance().patch<User>(
        `/users/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return updateResponse.data;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();

