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

import PostCard from '@/components/ui/PostCard';

import SamLogo from '@/components/common/SamLogo';

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
          backgroundColor: gradient ? theme.colors.primary : theme.colors.surface,
          borderColor: gradient ? theme.colors.primary : theme.colors.border,
          ...(gradient ? {} : theme.shadows.md),
        },
      ]}>
      <View
        style={[
          styles.actionIcon,
          {
            backgroundColor: gradient ? 'rgba(255, 255, 255, 0.2)' : theme.colors.primaryLight,
          },
        ]}>
        <Ionicons
          name={icon as any}
          size={24}
          color={gradient ? '#FFFFFF' : theme.colors.primary}
        />
      </View>
      <View style={styles.actionContent}>
        <Text style={[theme.typography.h4, { color: gradient ? '#FFFFFF' : theme.colors.text }]}>{title}</Text>
        <Text style={[theme.typography.bodySm, { color: gradient ? 'rgba(255, 255, 255, 0.8)' : theme.colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const StatCard: React.FC<{ label: string; value: string; icon: string; color?: string }> = ({
    label,
    value,
    icon,
    color,
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
          { backgroundColor: (color || theme.colors.primary) + '15' },
        ]}>
        <Ionicons name={icon as any} size={22} color={color || theme.colors.primary} />
      </View>
      <View>
        <Text style={[theme.typography.h3, { color: theme.colors.text, lineHeight: 24 }]}>{value}</Text>
        <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 }]}>
          {label}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: theme.spacing.md },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Greeting with Logo */}
        <View style={{ marginTop: theme.spacing.xl, marginBottom: theme.spacing.xl }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.xs }}>
            <Text style={[theme.typography.h2, { color: theme.colors.text, fontSize: 32, marginRight: theme.spacing.sm }]}>
              Hola, {user?.name.split(' ')[0]}! 👋
            </Text>
            <SamLogo size="large" showText={false} />
          </View>
          <Text
            style={[
              theme.typography.bodyLg,
              { color: theme.colors.textSecondary, opacity: 0.8 },
            ]}>
            Tu asistente de marketing está listo.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            label="Total"
            value={posts.length.toString()}
            icon="layers-outline"
          />
          <StatCard
            label="Enviados"
            value={publishedCount.toString()}
            icon="paper-plane-outline"
            color={theme.colors.secondary}
          />
        </View>

        {/* Quick Actions */}
        <Section title="Acciones Rápidas">
          <QuickActionCard
            icon="camera"
            title="Generar contenido"
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
              <PostCard
                key={post.id}
                post={post}
                onPress={() => router.push(`/post/${post.id}`)}
              />
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
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
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
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
});

