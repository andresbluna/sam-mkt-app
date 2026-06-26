// src/services/instagram.service.ts
import { apiClient } from './api';

class InstagramService {
    /**
     * Obtiene la URL de login de Instagram para iniciar OAuth
     * @param userId - ID del usuario autenticado
     * @returns URL para abrir con Linking.openURL
     */
    async getLoginUrl(userId: number): Promise<string> {
        return `${process.env.EXPO_PUBLIC_API_URL}/instagram/auth/login?userId=${userId}`;
    }

    /**
     * Publica un post en Instagram
     * @param imageUrl - URL pública de la imagen
     * @param caption - Texto del post
     * @returns Respuesta con mediaId y éxito
     */
    async publishPost(imageUrl: string, caption: string): Promise<any> {
        const response = await apiClient.getInstance().post('/instagram/publish', {
            imageUrl,
            caption,
        });
        return response.data;
    }

    /**
     * Obtiene el estado de una publicación en Instagram
     * @param mediaId - ID del post en Instagram
     * @returns Datos del post (likes, comentarios, etc.)
     */
    async getPostStatus(mediaId: string): Promise<any> {
        const response = await apiClient.getInstance().get(`/instagram/publish/status/${mediaId}`);
        return response.data;
    }

    /**
     * Elimina un post de Instagram
     * @param mediaId - ID del post en Instagram
     * @returns Mensaje de éxito
     */
    async deletePost(mediaId: string): Promise<any> {
        const response = await apiClient.getInstance().delete(`/instagram/publish/${mediaId}`);
        return response.data;
    }
}

export const instagramService = new InstagramService();