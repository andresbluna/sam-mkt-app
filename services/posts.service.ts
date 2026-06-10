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

  async getPost(postId: string): Promise<Post> {
    try {
      const response = await apiClient.getInstance().get<Post>(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(postId: string, data: UpdatePostRequest): Promise<Post> {
    try {
      const response = await apiClient.getInstance().patch<Post>(`/posts/${postId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      await apiClient.getInstance().delete(`/posts/${postId}`);
    } catch (error) {
      throw error;
    }
  }

  async publishPost(postId: string, platform: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.getInstance().post(`/posts/${postId}/publish`, {
        platform,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const postService = new PostService();

