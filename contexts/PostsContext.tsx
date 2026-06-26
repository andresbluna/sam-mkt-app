// contexts/PostsContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Post, CreatePostRequest, UpdatePostRequest } from '@/types';
import { postService } from '@/services/posts.service';
import { instagramService } from '@/services/instagram.service'; // 👈 IMPORTAR

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (data: CreatePostRequest) => Promise<Post>;
  updatePost: (postId: number, data: UpdatePostRequest) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
  publishPost: (postId: number, imageUrl: string, caption: string) => Promise<void>;
  setError: (error: string | null) => void;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {},
  createPost: async () => ({} as Post),
  updatePost: async () => {},
  deletePost: async () => {},
  publishPost: async () => {},
  setError: () => {},
});

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const fetchedPosts = await postService.getPosts();
      setPosts(fetchedPosts);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error fetching posts';
      setError(errorMessage);
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔥 MODIFICADO: createPost ahora publica en Instagram automáticamente
  const createPost = useCallback(async (data: CreatePostRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Crear el post en tu base de datos
      const newPost = await postService.createPost(data);

      // 2. Intentar publicar en Instagram (si hay imagen y contenido)
      // IMPORTANTE: La imagen debe ser URL pública (no base64)
      // Si es base64, debes subirla a Cloudinary/S3 antes de llamar a Instagram
      if (data.image && data.content) {
        try {
          // Extrae la URL pública (asumo que ya es una URL pública)
          // Si es base64, tendrías que subirla primero y obtener la URL
          const imageUrl = data.image; // ⚠️ Debe ser URL pública
          const caption = data.content;

          // Publicar en Instagram
          const instaResult = await instagramService.publishPost(imageUrl, caption);
          console.log('✅ Publicado en Instagram:', instaResult);

          // Opcional: actualizar el post con el mediaId de Instagram
          // await postService.updatePost(newPost.id, { 
          //   instagramMediaId: instaResult.mediaId,
          //   instagramPublished: true 
          // });

          // Actualizar estado local si quieres reflejar que se publicó en Instagram
          setPosts((prev) =>
              prev.map((post) =>
                  post.id === newPost.id
                      ? { ...post, instagramPublished: true, instagramMediaId: instaResult.mediaId }
                      : post
              )
          );
        } catch (instagramError) {
          // Si falla Instagram, no interrumpimos el flujo principal
          console.warn('⚠️ No se pudo publicar en Instagram:', instagramError);
          // Podrías guardar un flag en el post indicando que falló
          // await postService.updatePost(newPost.id, { instagramPublished: false });
        }
      }

      // 3. Agregar post al estado local
      setPosts((prev) => [newPost, ...prev]);

      return newPost;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error creating post';
      setError(errorMessage);
      console.error('Error creating post:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePost = useCallback(async (postId: number, data: UpdatePostRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedPost = await postService.updatePost(postId, data);
      setPosts((prev) => prev.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error updating post';
      setError(errorMessage);
      console.error('Error updating post:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePost = useCallback(async (postId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      await postService.deletePost(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error deleting post';
      setError(errorMessage);
      console.error('Error deleting post:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Método público para publicar manualmente (opcional)
  const publishPost = useCallback(async (postId: number, imageUrl: string, caption: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await instagramService.publishPost(imageUrl, caption);

      // Actualizar estado local
      setPosts((prev) =>
          prev.map((post) =>
              post.id === postId
                  ? { ...post, status: 'published', instagramMediaId: result.mediaId }
                  : post
          )
      );
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error publishing post';
      setError(errorMessage);
      console.error('Error publishing post:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    setError,
  };

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};