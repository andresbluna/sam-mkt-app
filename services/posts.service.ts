import { apiClient } from './api';
import { Post, CreatePostRequest, UpdatePostRequest } from '@/types';

class PostService {
  async createPost(data: CreatePostRequest): Promise<Post> {
    try {
      const response = await apiClient.getInstance().post<Post>('/posts', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPosts(): Promise<Post[]> {
    try {
      const response = await apiClient.getInstance().get<Post[]>('/posts');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postId: number): Promise<Post> {
    try {
      const response = await apiClient.getInstance().get<Post>(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(postId: number, data: UpdatePostRequest): Promise<Post> {
    try {
      const response = await apiClient.getInstance().patch<Post>(`/posts/${postId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: number): Promise<void> {
    try {
      await apiClient.getInstance().delete(`/posts/${postId}`);
    } catch (error) {
      throw error;
    }
  }

  async generateContent(prompt: string): Promise<any> {
    try {
      const response = await apiClient.getInstance().post('/posts/generate/content', {
        prompt,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async publishPost(postId: number, imageUrl: string, caption: string): Promise<any> {
    try {
      const response = await apiClient.getInstance().post(`/posts/${postId}/publish`, {
        imageUrl,
        caption,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPostStats(postId: number): Promise<any> {
    try {
      const response = await apiClient.getInstance().get(`/posts/${postId}/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const postService = new PostService();

