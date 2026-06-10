import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native';
import { Post } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPublish?: () => void;
  containerStyle?: ViewStyle;
}

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

const PostCard: React.FC<PostCardProps> = ({
  post,
  onPress,
  onEdit,
  onDelete,
  onPublish,
  containerStyle,
}) => {
  const getStatusColor = () => {
    switch (post.status) {
      case 'published':
        return COLORS.success;
      case 'scheduled':
        return COLORS.secondary;
      default:
        return COLORS.textLight;
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
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}>
      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor() },
              ]}
            />
            <Text style={styles.statusLabel}>{getStatusLabel()}</Text>
          </View>
        </View>

        <Text style={styles.caption} numberOfLines={2}>
          {post.caption}
        </Text>

        {post.hashtags && post.hashtags.length > 0 && (
          <View style={styles.hashtags}>
            {post.hashtags.slice(0, 3).map((tag, index) => (
              <Text key={index} style={styles.hashtag}>
                #{tag}
              </Text>
            ))}
            {post.hashtags.length > 3 && (
              <Text style={styles.moreHashtags}>+{post.hashtags.length - 3}</Text>
            )}
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.date}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: es,
            })}
          </Text>

          <View style={styles.actions}>
            {post.status === 'draft' && onPublish && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onPublish}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="share-social" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            )}

            {onEdit && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onEdit}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="pencil" size={18} color={COLORS.secondary} />
              </TouchableOpacity>
            )}

            {onDelete && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onDelete}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="trash" size={18} color="#EF4444" />
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
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 12,
  },
  header: {
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  caption: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 8,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 6,
  },
  hashtag: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  moreHashtags: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  date: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 6,
  },
});

export default PostCard;

