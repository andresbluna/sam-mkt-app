import { apiClient } from './api';
import { GeminiRequest, GeminiResponse } from '@/types';

class GeminiService {
  async generateContent(prompt: string): Promise<GeminiResponse> {
    try {
      const response = await apiClient.getInstance().post<GeminiResponse>('/gemini/generate', {
        prompt,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const geminiService = new GeminiService();

