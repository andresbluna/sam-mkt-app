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

const COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
};

export default function HomeScreen() {
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
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, {user?.name}! 👋</Text>
            <Text style={styles.subtitle}>Bienvenido a tu panel</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/profile')}
            style={styles.profileButton}>
            <Ionicons name="person-circle" size={44} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <Ionicons name="document" size={32} color={COLORS.white} />
            <Text style={styles.statValue}>{posts.length}</Text>
            <Text style={styles.statLabel}>Publicaciones</Text>
          </View>

          <View style={[styles.statCard, styles.statCardSecondary]}>
            <Ionicons name="checkmark-circle" size={32} color={COLORS.white} />
            <Text style={styles.statValue}>{publishedCount}</Text>
            <Text style={styles.statLabel}>Publicadas</Text>
          </View>

          <View style={[styles.statCard, styles.statCardTertiary]}>
            <Ionicons name="create" size={32} color={COLORS.white} />
            <Text style={styles.statValue}>{draftCount}</Text>
            <Text style={styles.statLabel}>Borradores</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/create')}>
              <Ionicons name="add-circle" size={32} color={COLORS.primary} />
              <Text style={styles.actionTitle}>Crear Post</Text>
              <Text style={styles.actionDesc}>Nuevo contenido</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/posts')}>
              <Ionicons name="grid" size={32} color={COLORS.secondary} />
              <Text style={styles.actionTitle}>Mis Posts</Text>
              <Text style={styles.actionDesc}>Ver todos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/history')}>
              <Ionicons name="time" size={32} color="#F59E0B" />
              <Text style={styles.actionTitle}>Historial</Text>
              <Text style={styles.actionDesc}>Actividad</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/profile')}>
              <Ionicons name="settings" size={32} color="#8B5CF6" />
              <Text style={styles.actionTitle}>Perfil</Text>
              <Text style={styles.actionDesc}>Configuración</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Publicaciones Recientes</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/posts')}>
                <Text style={styles.seeAll}>Ver todo</Text>
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

        {/* Empty State */}
        {posts.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyStateTitle}>Sin publicaciones</Text>
            <Text style={styles.emptyStateDesc}>
              Crea tu primer post para comenzar
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => router.push('/(tabs)/create')}>
              <Text style={styles.emptyStateButtonText}>Crear Publicación</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  profileButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardPrimary: {
    backgroundColor: COLORS.primary,
  },
  statCardSecondary: {
    backgroundColor: COLORS.secondary,
  },
  statCardTertiary: {
    backgroundColor: '#06B6D4',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
  },
  actionDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 16,
  },
  emptyStateDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  emptyStateButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

