import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User } from '@/types';
import { userService } from '@/services/user.service';
import { useAuth } from './AuthContext';

interface UserContextType {
  userProfile: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUserProfile: (userId: number) => Promise<void>;
  updateUserProfile: (userId: number, data: Partial<User>) => Promise<void>;
  setError: (error: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  userProfile: null,
  isLoading: false,
  error: null,
  fetchUserProfile: async () => {},
  updateUserProfile: async () => {},
  setError: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Auto-fetch user profile when auth user changes
  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
    }
  }, [user?.id]);

  const fetchUserProfile = useCallback(async (userId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const profile = await userService.getUser(userId);
      setUserProfile(profile);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error fetching user profile';
      setError(errorMessage);
      console.error('Error fetching user profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserProfile = useCallback(async (userId: number, data: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const updatedProfile = await userService.updateUser(userId, data);
      setUserProfile(updatedProfile);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Error updating user profile';
      setError(errorMessage);
      console.error('Error updating user profile:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    userProfile,
    isLoading,
    error,
    fetchUserProfile,
    updateUserProfile,
    setError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

