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
  access_token?: string; // Sigue siendo opcional por si el backend lo implementa después
  user: User;
}

// User Types
export interface User {
  id: number;
  uuid: string;
  email: string;
  name: string;
  plan?: string;
  created_at: string;
  updated_at: string;
}

// Post Types
export interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url?: string;
  platform: string;
  status: string;
  instagram_media_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  image_url?: string;
  platform?: string;
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

