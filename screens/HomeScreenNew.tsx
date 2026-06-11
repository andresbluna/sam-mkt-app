import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/common/Header';
import { Card, Section } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export default function HomeScreenNew() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { posts, fetchPosts, isLoading } = usePosts();
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  const QuickActionCard: React.FC<{
    icon: string;
    title: string;
    subtitle: string;
    onPress: () => void;
    gradient?: boolean;
  }> = ({ icon, title, subtitle, onPress, gradient }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.actionCard,
        {
          backgroundColor: gradient ? undefined : theme.colors.surface,
          borderColor: theme.colors.border,
          ...theme.shadows.md,
        },
      ]}>
      <View
        style={[
          styles.actionIcon,
          {
            backgroundColor: gradient ? theme.colors.primary : theme.colors.primaryLight,
          },
        ]}>
        <Ionicons
          name={icon as any}
          size={24}
          color={gradient ? '#FFFFFF' : theme.colors.primary}
        />
      </View>
      <View style={styles.actionContent}>
        <Text style={[theme.typography.h4, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const StatCard: React.FC<{ label: string; value: string; icon: string }> = ({
    label,
    value,
    icon,
  }) => (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: theme.colors.primaryLight },
        ]}>
        <Ionicons name={icon as any} size={20} color={theme.colors.primary} />
      </View>
      <View>
        <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
        <Text style={[theme.typography.h3, { color: theme.colors.text }]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header showLogo title="Dashboard" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: theme.spacing.md },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.xl }}>
          <Text style={[theme.typography.h2, { color: theme.colors.text }]}>
            Hola, {user?.name}! 👋
          </Text>
          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.textSecondary, marginTop: theme.spacing.sm },
            ]}>
            ¿Qué campaña quieres crear hoy?
          </Text>
        </View>

        {/* Stats */}
        <Section>
          <View style={styles.statsGrid}>
            <StatCard
              label="Publicaciones"
              value={posts.length.toString()}
              icon="document-text"
            />
            <StatCard
              label="Publicadas"
              value={publishedCount.toString()}
              icon="checkmark-circle"
            />
            <StatCard
              label="Borradores"
              value={draftCount.toString()}
              icon="create"
            />
          </View>
        </Section>

        {/* Quick Actions */}
        <Section title="Acciones Rápidas">
          <QuickActionCard
            icon="camera"
            title="Crear Post"
            subtitle="Genera contenido con IA"
            onPress={() => router.push('/(tabs)/create')}
            gradient
          />
          <QuickActionCard
            icon="bar-chart"
            title="Ver Historial"
            subtitle="Revisa tus actividades"
            onPress={() => router.push('/(tabs)/history')}
          />
          <QuickActionCard
            icon="link"
            title="Conectar Instagram"
            subtitle="Sincroniza tus cuentas"
            onPress={() => {}}
          />
        </Section>

        {/* Recent Posts Preview */}
        {posts.length > 0 && (
          <Section title="Publicaciones Recientes">
            {posts.slice(0, 3).map((post) => (
              <Card
                key={post.id}
                style={{
                  backgroundColor: theme.colors.surface,
                  marginBottom: theme.spacing.md,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        theme.typography.body,
                        { color: theme.colors.text, fontWeight: '500' },
                      ]}
                      numberOfLines={2}>
                      {post.caption}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: theme.spacing.sm,
                        gap: theme.spacing.sm,
                      }}>
                      <View
                        style={{
                          backgroundColor: theme.colors.primary,
                          paddingHorizontal: theme.spacing.sm,
                          borderRadius: theme.borderRadius.full,
                        }}>
                        <Text
                          style={[
                            theme.typography.caption,
                            { color: '#FFFFFF', fontWeight: '600' },
                          ]}>
                          {post.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </View>
              </Card>
            ))}
          </Section>
        )}
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
    paddingBottom: 100,
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
});

