import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { usePosts } from '@/contexts/PostsContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PostCard from '@/components/ui/PostCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Header from '@/components/ui/Header';

const COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

type FilterStatus = 'all' | 'draft' | 'published' | 'scheduled';

export default function PostsScreen() {
  const { posts, isLoading, fetchPosts, deletePost, error, setError } = usePosts();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const filterOptions: { label: string; value: FilterStatus }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Borradores', value: 'draft' },
    { label: 'Publicados', value: 'published' },
    { label: 'Programados', value: 'scheduled' },
  ];

  if (isLoading && posts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Mis Publicaciones"
        showBackButton={false}
        rightIcon="add"
        onRightPress={() => router.push('/(tabs)/create')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{posts.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {posts.filter((p) => p.status === 'published').length}
            </Text>
            <Text style={styles.statLabel}>Publicados</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {posts.filter((p) => p.status === 'draft').length}
            </Text>
            <Text style={styles.statLabel}>Borradores</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.filterButton,
                filter === option.value && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(option.value)}>
              <Text
                style={[
                  styles.filterButtonText,
                  filter === option.value && styles.filterButtonTextActive,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {error && (
          <ErrorMessage 
            message={error} 
            onClose={() => setError(null)}
            containerStyle={styles.errorContainer}
          />
        )}

        {/* Posts List */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPress={() => router.push(`/post/${post.id}`)}
              onDelete={() => handleDelete(post.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyStateTitle}>Sin publicaciones</Text>
            <Text style={styles.emptyStateDesc}>
              {filter === 'all'
                ? 'No hay publicaciones aún'
                : `No hay publicaciones ${filter === 'draft' ? 'en borrador' : 'publicadas'}`}
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
    paddingVertical: 16,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    scrollEnabled: true,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  errorContainer: {
    marginBottom: 16,
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

