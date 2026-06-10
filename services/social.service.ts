import { apiClient } from './api';
import { SocialAccount, PublishResponse } from '@/types';

class SocialService {
  async getUserSocialAccounts(userId: string): Promise<SocialAccount[]> {
    try {
      const response = await apiClient.getInstance().get<SocialAccount[]>(`/social/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async connectSocialAccount(data: Partial<SocialAccount>): Promise<SocialAccount> {
    try {
      const response = await apiClient.getInstance().post<SocialAccount>('/social', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async publishToInstagram(postId: string): Promise<PublishResponse> {
    try {
      const response = await apiClient.getInstance().post<PublishResponse>('/instagram/publish', {
        postId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const socialService = new SocialService();

