import React, { createContext, useContext, useState, useCallback } from 'react';
import { Post, CreatePostRequest, UpdatePostRequest } from '@/types';
import { postService } from '@/services/posts.service';

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (data: CreatePostRequest) => Promise<Post>;
  updatePost: (postId: string, data: UpdatePostRequest) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  publishPost: (postId: string, platform: string) => Promise<void>;
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

  const createPost = useCallback(async (data: CreatePostRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newPost = await postService.createPost(data);
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

  const updatePost = useCallback(async (postId: string, data: UpdatePostRequest) => {
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

  const deletePost = useCallback(async (postId: string) => {
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

  const publishPost = useCallback(async (postId: string, platform: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await postService.publishPost(postId, platform);
      
      // Update post status in local state
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, status: 'published' as const } : post
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

