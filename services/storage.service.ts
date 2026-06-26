import { apiClient } from './api';

/**
 * Servicio para subir imágenes base64 y obtener URLs públicas
 * Puede adaptarse a diferentes proveedores (Cloudinary, S3, Supabase, etc.)
 */
class StorageService {
  /**
   * Sube una imagen base64 y retorna una URL pública HTTPS
   * NOTA: Este endpoint debe estar implementado en el backend
   * El backend se encarga de:
   * 1. Recibir el base64
   * 2. Subirlo a un storage (Cloudinary, S3, etc.)
   * 3. Retornar la URL pública
   * 
   * @param base64Image - Imagen en formato base64 (sin el prefijo data:image/...)
   * @param format - Formato de la imagen (png, jpg, etc.)
   * @returns URL pública de la imagen
   */
  async uploadImage(base64Image: string, format: string = 'png'): Promise<string> {
    try {
      const response = await apiClient.getInstance().post('/storage/upload', {
        image: base64Image,
        format: format,
      });
      
      // El backend debe retornar { url: "https://..." }
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image to storage:', error);
      throw error;
    }
  }

  /**
   * ALTERNATIVA: Si el backend no tiene endpoint de storage,
   * puedes usar Cloudinary directamente desde el frontend
   * 
   * Ejemplo con Cloudinary:
   * ```
   * const formData = new FormData();
   * formData.append('file', `data:image/${format};base64,${base64Image}`);
   * formData.append('upload_preset', 'YOUR_PRESET'); // Configurar en Cloudinary
   * 
   * const response = await fetch(
   *   'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
   *   { method: 'POST', body: formData }
   * );
   * const data = await response.json();
   * return data.secure_url;
   * ```
   */
  async uploadToCloudinary(
    base64Image: string,
    format: string = 'png',
    cloudName: string,
    uploadPreset: string
  ): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', `data:image/${format};base64,${base64Image}`);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
