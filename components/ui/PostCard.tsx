import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Post } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTheme } from '@/theme/ThemeContext';
import { Image } from 'expo-image';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPublish?: () => void;
  containerStyle?: ViewStyle;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onPress,
  onEdit,
  onDelete,
  onPublish,
  containerStyle,
}) => {
  const { theme } = useTheme();

  const getStatusColor = () => {
    switch (post.status) {
      case 'published':
        return theme.colors.success;
      case 'scheduled':
        return theme.colors.primary;
      default:
        return theme.colors.textTertiary;
    }
  };

  const getStatusLabel = () => {
    switch (post.status) {
      case 'published':
        return 'Publicado';
      case 'scheduled':
        return 'Programado';
      default:
        return 'Borrador';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        containerStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.9}>
      {post.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: post.image }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
          <View
            style={[
              styles.statusBadgeOverlay,
              { backgroundColor: theme.colors.overlay },
            ]}>
            <View
              style={[styles.statusDot, { backgroundColor: getStatusColor() }]}
            />
            <Text style={[styles.statusLabelOverlay, { color: '#FFFFFF' }]}>
              {getStatusLabel()}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.content}>
        {!post.image && (
          <View style={styles.header}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}>
              <View
                style={[styles.statusDot, { backgroundColor: getStatusColor() }]}
              />
              <Text style={[styles.statusLabel, { color: theme.colors.text }]}>
                {getStatusLabel()}
              </Text>
            </View>
          </View>
        )}

        <Text
          style={[styles.caption, { color: theme.colors.text }]}
          numberOfLines={3}>
          {post.caption}
        </Text>

        <View style={styles.footerRow}>
          <Text style={[styles.date, { color: theme.colors.textTertiary }]}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: es,
            })}
          </Text>
          
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
                onPress={onEdit}>
                <Ionicons
                  name="pencil"
                  size={16}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            )}

            {onDelete && (
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  { backgroundColor: theme.colors.errorLight + '40' },
                ]}
                onPress={onDelete}>
                <Ionicons
                  name="trash"
                  size={16}
                  color={theme.colors.error}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  statusBadgeOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backdropFilter: 'blur(10px)',
  },
  statusLabelOverlay: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  caption: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostCard;

