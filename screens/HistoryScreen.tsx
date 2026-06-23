import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import { usePosts } from '@/contexts/PostsContext';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Header from '@/components/ui/Header';

const COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  success: '#10B981',
  warning: '#F59E0B',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

interface TimelineEvent {
  id: string;
  type: 'created' | 'published' | 'scheduled' | 'edited';
  title: string;
  description: string;
  date: Date;
  icon: string;
  color: string;
}

export default function HistoryScreen() {
  const { posts, isLoading, fetchPosts } = usePosts();
  const [refreshing, setRefreshing] = React.useState(false);
  const [events, setEvents] = React.useState<TimelineEvent[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Build timeline events from posts
    const timelineEvents: TimelineEvent[] = [];

    posts.forEach((post) => {
      // Created event
      timelineEvents.push({
        id: `${post.id}-created`,
        type: 'created',
        title: 'Publicación Creada',
        description:
          post.content.substring(0, 50) + (post.content.length > 50 ? '...' : ''),
        date: new Date(post.created_at),
        icon: 'create',
        color: COLORS.primary,
      });

      // Published event
      if (post.status === 'published') {
        timelineEvents.push({
          id: `${post.id}-published`,
          type: 'published',
          title: 'Publicación Publicada',
          description: 'Publicado en Instagram',
          date: new Date(post.updated_at),
          icon: 'share-social',
          color: COLORS.success,
        });
      }
    });

    // Sort by date descending
    timelineEvents.sort((a, b) => b.date.getTime() - a.date.getTime());
    setEvents(timelineEvents);
  }, [posts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  if (isLoading && posts.length === 0) {
    return <LoadingSpinner />;
  }

  // Group events by date
  const groupedEvents = events.reduce(
    (acc, event) => {
      const dateKey = event.date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, TimelineEvent[]>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Historial"
        showBackButton={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {/* Activity Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{posts.length}</Text>
            <Text style={styles.summaryLabel}>Publicaciones</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {posts.filter((p) => p.status === 'published').length}
            </Text>
            <Text style={styles.summaryLabel}>Publicadas</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {new Date().toLocaleDateString('es-ES', { day: '2-digit' })}
            </Text>
            <Text style={styles.summaryLabel}>Hoy</Text>
          </View>
        </View>

        {/* Timeline */}
        {events.length > 0 ? (
          Object.entries(groupedEvents).map(([dateKey, dayEvents]) => (
            <View key={dateKey} style={styles.daySection}>
              <Text style={styles.dayHeader}>{dateKey}</Text>

              {dayEvents.map((event, index) => (
                <View key={event.id} style={styles.timelineItem}>
                  {/* Timeline dot and line */}
                  <View style={styles.timelineIndicator}>
                    <View
                      style={[
                        styles.timelineDot,
                        { backgroundColor: event.color },
                      ]}>
                      <Ionicons name={event.icon as any} size={16} color="white" />
                    </View>
                    {index !== dayEvents.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>

                  {/* Event content */}
                  <View style={styles.eventContent}>
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventTime}>
                        {event.date.toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                    <Text style={styles.eventDescription} numberOfLines={1}>
                      {event.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyStateTitle}>Sin actividad</Text>
            <Text style={styles.emptyStateDesc}>
              Tu historial de actividad aparecerá aquí
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
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  daySection: {
    marginBottom: 24,
  },
  dayHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    textTransform: 'capitalize',
    marginBottom: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: COLORS.border,
    marginTop: 8,
  },
  eventContent: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  eventTime: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  eventDescription: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
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
});

