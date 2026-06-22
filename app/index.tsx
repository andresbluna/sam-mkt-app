import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Index() {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
