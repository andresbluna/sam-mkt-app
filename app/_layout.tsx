import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as RNThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider, useTheme } from '@/theme/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { UserProvider } from '@/contexts/UserContext';
import { PostsProvider } from '@/contexts/PostsContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import LoginScreenNew from '@/screens/LoginScreenNew';
import RegisterScreenNew from '@/screens/RegisterScreenNew';

function RootLayoutNav() {
  const { theme, isDark } = useTheme();
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <RNThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <>
            <Stack.Screen name="(tabs)" options={{ animationEnabled: false }} />
            <Stack.Screen name="post/[id]" options={{ presentation: 'card' }} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={LoginScreenNew}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreenNew}
              options={{ animationEnabled: false }}
            />
          </>
        )}
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </RNThemeProvider>
  );
}

function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <PostsProvider>
            <RootLayoutNav />
          </PostsProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default RootLayout;

