import { apiClient } from './api';
import { GeminiRequest, GeminiResponse } from '@/types';

class GeminiService {
  async generateContent(prompt: string): Promise<any> {
    try {
      const response = await apiClient.getInstance().post<any>('/gemini/generate', {
        prompt,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async generateCaption(prompt: string): Promise<any> {
    try {
      const response = await apiClient.getInstance().post<any>('/gemini/generate-caption', {
        prompt,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async generateHashtags(prompt: string): Promise<any> {
    try {
      const response = await apiClient.getInstance().post<any>('/gemini/generate-hashtags', {
        prompt,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async optimizeContent(content: string): Promise<any> {
    try {
      const response = await apiClient.getInstance().post<any>('/gemini/optimize', {
        content,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const geminiService = new GeminiService();

