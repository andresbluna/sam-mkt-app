// src/services/instagram.service.ts
import { apiClient } from './api';

interface InstagramOAuthResponse {
    url: string;
}

interface InstagramStatusResponse {
    connected: boolean;
    igUserId?: string;
    pageId?: string;
    expiresAt?: string;
}

class InstagramService {
    /**
     * Obtiene la URL de OAuth de Instagram para iniciar el flujo de autorización
     * ⚠️ REQUIERE: Token de autenticación (Bearer token) en headers
     * 
     * @param userId - ID del usuario autenticado
     * @returns URL de OAuth para abrir con Linking.openURL
     */
    async getOAuthUrl(userId: number): Promise<string> {
        const response = await apiClient.getInstance().get<InstagramOAuthResponse>(
            `/instagram/auth/url?userId=${userId}`
        );
        return response.data.url;
    }

    /**
     * Verifica el estado de conexión de Instagram del usuario
     * ⚠️ REQUIERE: Token de autenticación (Bearer token) en headers
     * 
     * @param userId - ID del usuario autenticado
     * @returns Estado de la conexión de Instagram
     */
    async getConnectionStatus(userId: number): Promise<InstagramStatusResponse> {
        const response = await apiClient.getInstance().get<InstagramStatusResponse>(
            `/instagram/auth/status/${userId}`
        );
        return response.data;
    }

    /**
     * Publica un post en Instagram
     * ⚠️ IMPORTANTE: La imagen debe ser una URL pública HTTPS
     * ⚠️ REQUIERE: Token de autenticación (Bearer token) - el backend extrae req.user.id del JWT
     * 
     * @param imageUrl - URL pública HTTPS de la imagen
     * @param caption - Texto del post (máx 2200 caracteres)
     * @returns Respuesta con mediaId y éxito
     */
    async publishPost(imageUrl: string, caption: string): Promise<{ success: boolean; mediaId: string }> {
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

    /**
     * LEGACY: Método anterior para obtener URL de login (mantener por compatibilidad)
     * @deprecated Usar getOAuthUrl en su lugar
     */
    async getLoginUrl(userId: number): Promise<string> {
        return this.getOAuthUrl(userId);
    }
}

export const instagramService = new InstagramService();