import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PostCard from '@/components/ui/PostCard';
import { useTheme } from '@/theme/ThemeContext';
import SamLogo from '@/components/common/SamLogo';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { posts, isLoading, fetchPosts } = usePosts();
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const recentPosts = posts.slice(0, 5);
  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;

  if (isLoading && posts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Personalizado */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.text }]}>
              Hola, {user?.name.split(' ')[0]}! 👋
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Bienvenido de nuevo a Sam.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}>
            <View style={[styles.profileButton, { backgroundColor: theme.colors.surfaceVariant }]}>
              <SamLogo size="small" showText={false} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats con diseño moderno */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.primary, ...theme.shadows.md }]}>
            <View style={styles.statIconBadge}>
              <Ionicons name="documents-outline" size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.statValue}>{posts.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.colors.secondary, ...theme.shadows.md }]}>
            <View style={styles.statIconBadge}>
              <Ionicons name="checkmark-done-outline" size={24} color={theme.colors.secondary} />
            </View>
            <Text style={styles.statValue}>{publishedCount}</Text>
            <Text style={styles.statLabel}>Publicadas</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#06B6D4', ...theme.shadows.md }]}>
            <View style={styles.statIconBadge}>
              <Ionicons name="create-outline" size={24} color="#06B6D4" />
            </View>
            <Text style={styles.statValue}>{draftCount}</Text>
            <Text style={styles.statLabel}>Borradores</Text>
          </View>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Acciones Rápidas</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
              onPress={() => router.push('/(tabs)/create')}
              activeOpacity={0.7}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.primaryLight + '40' }]}>
                <Ionicons name="add" size={28} color={theme.colors.primary} />
              </View>
              <Text style={[styles.actionTitle, { color: theme.colors.text }]}>Crear Post</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
              onPress={() => router.push('/(tabs)/posts')}
              activeOpacity={0.7}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.secondaryLight + '40' }]}>
                <Ionicons name="grid-outline" size={26} color={theme.colors.secondary} />
              </View>
              <Text style={[styles.actionTitle, { color: theme.colors.text }]}>Mis Posts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenido Reciente */}
        {recentPosts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recientes</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/posts')}>
                <Text style={[styles.seeAll, { color: theme.colors.primary }]}>Ver todo</Text>
              </TouchableOpacity>
            </View>

            {recentPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => router.push(`/post/${post.id}`)}
              />
            ))}
          </View>
        )}

        {posts.length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Ionicons name="rocket-outline" size={48} color={theme.colors.textTertiary} />
            <Text style={[styles.emptyStateTitle, { color: theme.colors.text }]}>Tu feed está vacío</Text>
            <Text style={[styles.emptyStateDesc, { color: theme.colors.textSecondary }]}>
              Comienza creando contenido increíble con la ayuda de Sam.
            </Text>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  profileButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '700',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  emptyState: {
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
  emptyStateDesc: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});

