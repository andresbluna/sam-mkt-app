// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  plan?: string;
  createdAt: string;
  updatedAt: string;
}

// Post Types
export interface Post {
  id: string;
  userId: string;
  title?: string;
  caption: string;
  hashtags: string[];
  image?: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  caption: string;
  hashtags: string[];
  image?: string;
  title?: string;
}

export interface UpdatePostRequest {
  caption?: string;
  hashtags?: string[];
  image?: string;
  title?: string;
  status?: 'draft' | 'published' | 'scheduled';
}

// Gemini Types
export interface GeminiRequest {
  prompt: string;
}

export interface GeminiResponse {
  caption: string;
  hashtags: string[];
}

// Social Types
export interface SocialAccount {
  id: string;
  userId: string;
  platform: 'instagram' | 'facebook' | 'twitter';
  accountId: string;
  accountName: string;
  isConnected: boolean;
  connectedAt?: string;
}

export interface PublishRequest {
  platform: 'instagram' | 'facebook' | 'twitter';
  postId: string;
}

export interface PublishResponse {
  success: boolean;
  message: string;
  publishedAt: string;
}

// API Error Types
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

