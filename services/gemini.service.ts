import { apiClient } from './api';

export interface GeneratedContent {
  image: string;
  format: 'png' | 'jpeg' | 'webp';
  caption: string;
  hashtags: string[];
}

class GeminiService {
  async generateContent(prompt: string): Promise<GeneratedContent> {
    try {
      const response = await apiClient
          .getInstance()
          .post('/gemini/generate-image', { prompt });

      const data = response.data;

      // El backend devuelve { image: string, format: string }
      const imageBase64 = data?.image || '';
      const format = data?.format || 'png';

      // Generar caption dummy a partir del prompt
      const dummyCaption = `✨ Generado para: "${prompt}" 🌟 ¡Inspírate y comparte!`;

      // Generar hashtags simples a partir de palabras clave del prompt
      const words = prompt
          .split(' ')
          .filter((w) => w.length > 3)
          .map((w) => w.replace(/[^a-zA-Z0-9]/g, '').toLowerCase())
          .slice(0, 5);

      const dummyHashtags =
          words.length > 0
              ? words
              : ['inspiración', 'creatividad', 'nuevo', 'vibrapositiva', 'descubre'];

      return {
        image: imageBase64,
        format,
        caption: dummyCaption,
        hashtags: dummyHashtags,
      };
    } catch (error) {
      // Puedes relanzar o manejar el error según tu flujo
      throw error;
    }
  }

  async generateCaption(prompt: string) {
    return apiClient.getInstance().post('/gemini/generate-caption', { prompt });
  }

  async generateHashtags(prompt: string) {
    return apiClient.getInstance().post('/gemini/generate-hashtags', { prompt });
  }

  async optimizeContent(content: string) {
    return apiClient.getInstance().post('/gemini/optimize', { content });
  }
}

export const geminiService = new GeminiService();