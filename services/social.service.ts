import { apiClient } from './api';
import { SocialAccount, PublishResponse } from '@/types';

class SocialService {
  /**
   * Obtiene todas las cuentas sociales de un usuario
   * @param userId - ID numérico del usuario
   */
  async getUserSocialAccounts(userId: number): Promise<SocialAccount[]> {
    try {
      const response = await apiClient.getInstance().get<SocialAccount[]>(`/social/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtiene una cuenta social específica
   * @param id - ID de la cuenta social
   */
  async getSocialAccount(id: number): Promise<SocialAccount> {
    try {
      const response = await apiClient.getInstance().get<SocialAccount>(`/social/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Conecta una nueva cuenta social manualmente
   * @param data - Datos de la cuenta a conectar
   */
  async connectSocialAccount(data: Partial<SocialAccount>): Promise<SocialAccount> {
    try {
      const response = await apiClient.getInstance().post<SocialAccount>('/social', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza el token o estado de una cuenta social
   * @param id - ID de la cuenta social
   * @param data - Datos a actualizar
   */
  async updateSocialAccount(id: number, data: { accessToken?: string; status?: string }): Promise<SocialAccount> {
    try {
      const response = await apiClient.getInstance().patch<SocialAccount>(`/social/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Desconecta/elimina una cuenta social
   * @param id - ID de la cuenta social
   */
  async disconnectSocialAccount(id: number): Promise<{ success: boolean }> {
    try {
      const response = await apiClient.getInstance().delete(`/social/${id}`);
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

