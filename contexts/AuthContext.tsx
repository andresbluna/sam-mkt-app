import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthResponse } from '@/types';
import { authService } from '@/services/auth.service';
import { LoginRequest, RegisterRequest } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  restoreToken: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isSignedIn: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  restoreToken: async () => {},
  error: null,
  setError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore token on app launch
  useEffect(() => {
    restoreToken();
  }, []);

  const restoreToken = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = await authService.getStoredToken();
      if (token) {
        const storedUser = await authService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        }
      }
    } catch (err) {
      setError('Error restoring token');
      console.error('Error restoring token:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      console.log('=== AuthContext: Login Response ===');
      console.log('response:', response);
      console.log('response.user:', response.user);
      console.log('response.user.id:', response.user?.id);
      console.log('===================================');
      
      setUser(response.user);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error during login';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.register(data);
      setUser(response.user);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error during registration';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError('Error during logout');
      console.error('Error during logout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isSignedIn: !!user,
    login,
    register,
    logout,
    restoreToken,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

