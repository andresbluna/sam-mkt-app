import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/common/Header';
import { Card, Section, ListItem } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfileScreenNew() {
  const { theme } = useTheme();
  const { user: authUser, logout } = useAuth();
  const { userProfile, isLoading, updateUserProfile } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const profile = userProfile || authUser;

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Perfil" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: theme.spacing.md },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card
          style={[
            styles.profileHeader,
            { backgroundColor: theme.colors.surface },
          ]}>
          <View style={styles.avatarContainer}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: theme.colors.primaryLight },
              ]}>
              <Ionicons name="person" size={40} color={theme.colors.primary} />
            </View>
          </View>

          <Text style={[theme.typography.h3, { color: theme.colors.text }]}>
            {profile?.name}
          </Text>
          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.textSecondary, marginTop: theme.spacing.sm },
            ]}>
            {profile?.email}
          </Text>

          {profile?.plan && (
            <View
              style={[
                styles.planBadge,
                { backgroundColor: theme.colors.primary },
              ]}>
              <Text
                style={[
                  theme.typography.bodySm,
                  { color: '#FFFFFF', fontWeight: '600' },
                ]}>
                Plan: {profile.plan}
              </Text>
            </View>
          )}
        </Card>

        {/* Stats */}
        <Section>
          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statBox,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              ]}>
              <Text style={[theme.typography.h3, { color: theme.colors.primary }]}>
                0
              </Text>
              <Text
                style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
                Publicaciones
              </Text>
            </View>
            <View
              style={[
                styles.statBox,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              ]}>
              <Text style={[theme.typography.h3, { color: theme.colors.secondary }]}>
                0
              </Text>
              <Text
                style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
                Publicadas
              </Text>
            </View>
          </View>
        </Section>

        {/* Acciones */}
        <Section title="Acciones">
          <Card style={{ backgroundColor: theme.colors.surface, padding: 0 }}>
            <ListItem
              title="Editar Perfil"
              icon={<Ionicons name="pencil" size={20} color={theme.colors.primary} />}
              rightElement={<Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />}
              onPress={() => setIsEditing(!isEditing)}
            />
            <ListItem
              title="Configuración"
              icon={<Ionicons name="settings" size={20} color={theme.colors.primary} />}
              rightElement={<Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />}
              onPress={() => router.push('/(tabs)/settings' as any)}
            />
          </Card>
        </Section>

        {/* Logout */}
        <View style={{ marginTop: theme.spacing.xl, marginBottom: 100 }}>
          <Button
            title="Cerrar Sesión"
            onPress={handleLogout}
            variant="danger"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planBadge: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
});

